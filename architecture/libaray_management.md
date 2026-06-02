# Library Management Architecture

This document defines the architectural implementation for the OpenHW Studio compiler's Library Manager. The goal of this system is to establish a robust, fast, and space-efficient way to handle Arduino libraries, ensuring isolated versioning for concurrent user simulations without bloating the server.

## Overview: Two-Tier Library Pool

The library manager (`dynamicLibraryManager.js`) operates on a two-tier storage system located in the backend data directory. The installed libraries for both pools are structurally defined and tracked in the `src/config/libraries.json` file, which contains two distinct lists (`"permanent"` and `"cached"`):

1. **Permanent Pool (`permanent/`)**: 
   - Contains pre-installed, core classroom libraries (e.g., `Servo`, `ArduinoJson`).
   - **Configuration:** Driven by the `"permanent"` array in `libraries.json`, which acts as the strict manifest for mandatory libraries.
   - **Lifecycle:** Synchronized once at server boot (`syncPermanentLibraries()`). It is read-only for compiler workers and is never pruned.

2. **Dynamic LRU Cache (`cache/`)**: 
   - Stores dynamically fetched libraries, supporting specific versions (e.g., `cache/ArduinoJson@6.21.3/`).
   - **Tracking:** The `"cached"` array in `libraries.json` tracks dynamically installed libraries, complementing the disk-level tracking.
   - **Pruning:** Subject to a strict 512 MB capacity limit. When a new download pushes the cache over 512 MB, an LRU (Least Recently Used) algorithm prunes the oldest accessed libraries until the pool shrinks to 400 MB.
   - **Timestamps:** Each library usage updates its `lastAccessed` timestamp (`fs.utimesSync`) to ensure active libraries survive pruning cycles.

## How Libraries Are Processed & Downloaded

When a user's compilation job requires a specific library (e.g., via `library.txt` or automatic resolution), the manager resolves and fetches it using the following pipeline:

### 1. Index Resolution
- **Fast Local Cache:** The backend first attempts to resolve the exact Arduino CDN download URL using a fast, locally cached `library_index.json` (`getLibraryMetadata`). This allows instant URL lookups without launching sub-processes.
- **Slow Fallback:** If the library or specific version is missing from the local cache, the backend falls back to invoking `arduino-cli lib search <LibraryName> --format json`. It parses the JSON output to find the exact `.zip` resource URL.

### 2. Download and Extraction
- Once the CDN URL is resolved, the backend fetches the ZIP archive directly into memory.
- It extracts the archive directly into the target directory (`permanent/` or `cache/`).
- The system verifies the internal ZIP structure (e.g., ensuring a single root folder matches the library name) and automatically restructures it if necessary.

### 3. LRU Cache Pruning
- After extraction, if the target was the dynamic cache, the pruner checks total cache disk usage (`getDirectorySize`). If over 512 MB, older folders are recursively deleted until the target 400 MB is met.

## Compilation Resolution (Shadowing)

To allow users to request specific library versions that might conflict with the `permanent/` pool, the backend utilizes `arduino-cli`'s `--libraries` flag with ordered precedence.

Before compiling, `ensureLibrariesForCompile(entries)` checks the requested libraries and constructs an ordered array of library paths:

1. **Version-Specific Cache:** `cache/<Name>@<version>/` (Highest priority)
2. **Permanent Pool:** `permanent/`
3. **General Cache:** `cache/` (Lowest priority, for unversioned dynamic fetches)

By providing the version-specific path *first*, `arduino-cli` naturally overrides the permanent pool. This ensures 100% isolation with zero conflicts, allowing simultaneous simulations of different boards using different versions of the same library.
