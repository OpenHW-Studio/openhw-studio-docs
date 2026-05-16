# OpenHW Studio Documentation Portal

This repository contains the professional documentation for OpenHW Studio, built using [VitePress](https://vitepress.dev/). It provides comprehensive guides on hardware simulation, autograding architecture, and system deployment.

## <svg class="status-svg" xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg> Quick Start (Local Development)

To run the documentation server locally:

1.  Navigate to this directory.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run docs:dev
    ```
4.  Open your browser to [http://localhost:5174](http://localhost:5174).

## <svg class="status-svg" xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="14" rx="2"/><path d="M17 6V4a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v2"/><path d="M12 12h.01"/><path d="M8 12h.01"/><path d="M16 12h.01"/></svg>️ Build & Production

To generate the static site for production:
```bash
npm run docs:build
```
The optimized static assets will be located in the `.vitepress/dist` directory.

## <svg class="status-svg" xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1 .6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M19.38 20A11.6 11.6 0 0 0 21 14l-9-4-9 4c0 2.9.94 5.34 2.81 7.76"/><path d="M19 13V7a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v6"/><path d="M12 10v4"/><path d="M12 7v.01"/></svg> Deployment Architecture

This portal is configured for **unified deployment** with the [OpenHW Studio Frontend](https://github.com/OpenHW-Studio/OpenHW-studio-frontend).

- **CI/CD Integration**: The main frontend GitHub Action clones this repository during the build process.
- **Dockerized Hosting**: The portal is served via Nginx as a sub-path at `/docs/` within the frontend container.
- **Base Configuration**: The `base` path is set to `/docs/` in `.vitepress/config.mts` to ensure all assets resolve correctly in production.

## <svg class="status-svg" xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z"/></svg> Writing Documentation

- **Structure**: Add or edit `.md` files in the respective category folders (`architecture`, `guides`, `grading`, `telemetry`, etc.).
- **Sidebar**: Update `.vitepress/config.mts` to reflect changes in the navigation menu or sidebar hierarchy.
- **Professionalism Policy**: Refrain from using graphical emojis. Use professional text-based identifiers (e.g., `[PASS]`, `[OK]`, `[WARN]`, `[FAIL]`) to maintain a consistent enterprise aesthetic.

---
© 2026-present OpenHW Studio Team

