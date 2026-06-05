# [BOARD] OpenHW-Studio: Compiler Backend Architecture

> **Role:** Orchestrates the high-performance, isolated compilation of Arduino C++ sketches into machine-level `.hex`/`.uf2` binaries, manages virtual filesystem bundling for MicroPython/CircuitPython, and operates a robust, weighted concurrency queue with a 1 GB partitioned library storage manager.

---

## 🖥️ 1. Hardware Sizing & Capacity Budget (8GB / 4 Cores)

The backend is specifically engineered for an **8GB RAM / 4 CPU Core** server. The architecture isolates the heavy compile tasks from the long-running simulations, splitting the system resources mathematically to ensure the server never crashes under peak classroom load.

### 🧠 RAM Budget (Total: 8.0 GB)
Memory exhaustion (OOM) is fatal. The system guarantees RAM safety via a strict **Unified Resource Manager**:
1. **OS & System Reserve (2.0 GB):** Required for Ubuntu, Node.js, and background services.
2. **Unified points pool (Remaining RAM):** Calculated dynamically as `Total Physical Memory - 2.0 GB`. On an 8GB machine, this creates a pool of approximately **6.2 GB (6200 points)**, where **1 point = 1 MB RAM**. Both compilation requests and running simulations draw from this same pool.

### ⚡ CPU Budget (Total: 4 Cores)
Unlike RAM, hitting the CPU ceiling is not fatal—the Linux OS scheduler simply time-slices the tasks, meaning things just run a little slower.
1. **OS & System (~0.5 Cores):** General server overhead.
2. **Simulations (~1.5 Cores):** QEMU and Renode use very little CPU when idle/waiting for `delay()`. 15 active simulations spread their load and generally consume the equivalent of 1 to 2 cores.
3. **Compilers (~2.0 Cores):** Compiling code is highly CPU-intensive. When compiles run, they will max out the remaining processing power to finish as fast as possible (usually 5–10 seconds), then immediately release the CPU back to the simulations.

---

## ⚙️ 2. Unified Resource Manager & Credit System

To prevent Out-Of-Memory (OOM) kernel crashes (Exit Code 137) and CPU thrashing during peak classroom usage, the backend implements a **Unified Resource Manager** (`resourceManager.js`) that enforces point-based concurrency.

### Point Cost & Configuration
The memory consumption (in points) is not hardcoded but dynamically loaded from `data/calibrated_budget.json`:
- **AVR/Uno Compile:** ~150 points
- **AVR/Uno Simulation:** ~50 points
- **Pico Compile:** ~300 points
- **Pico Simulation:** ~100 points
- **ESP32 Compile:** ~800 points
- **ESP32 Simulation:** ~250 points
- **STM32 Compile:** ~400 points
- **STM32 Simulation:** ~150 points

### Queue Behavior
- **FIFO Queuing:** If a new compile or simulation request exceeds the maximum available points, it is placed in a pending queue.
- **Auto-Dequeue:** As compilations finish or simulation VMs are terminated/garbage-collected, their points are returned to the pool, automatically starting the next queued job.
- **Strict Compile Timeout:** Any compilation job that exceeds 3 minutes (`COMPILE_TIMEOUT_MS` = 180000ms) is forcefully terminated to prevent malformed code from permanently consuming points.

---

## ⚙️ 3. Automated Calibration Suite
The backend features a **Calibration Suite** (`calibrationSuite.js`) to establish worst-case resource costs:
- **First Boot Calibration:** If `data/calibrated_budget.json` is missing on startup, the server automatically executes a worst-case compilation stress test.
- **Measurement:** Polling checks system memory delta during compilation, applies a 20% safety margin, and saves the calibrated values.
- **Admin Interface Controls:** Admins can trigger recalibration on-demand from the Resource Budget tab or download the live `calibrated_budget.json` configuration file.

---

## 🛑 4. Simulation Resource Limits & Timeouts

The backend simulates ESP32 and STM32 using heavy processes (QEMU and Renode) which consume significant RAM. To ensure scalability and prevent zombie processes, strict runtime limits are enforced:

### Hard Execution Timeout
- **Limit:** 10 minutes (600,000 ms).
- **Behavior:** No single simulation session is allowed to run for more than 10 minutes. Once the limit is reached, the VM is forcefully killed and the user must request a fresh compilation/simulation.

### Inactivity Monitor
- **Limit:** 1 minute (60,000 ms).
- **Behavior:** The backend tracks the user's last interaction via the `WebSocketManager`. If no activity is detected for 1 minute, the simulation is stopped to free up resources.
- **Activity Triggers:** Activity is refreshed by explicit user actions (e.g., clicking a button, sending a `SET_GPIO` command) OR by an automated `PING` message sent by the frontend client (e.g., every 30 seconds) while the browser tab remains active and focused.


---


