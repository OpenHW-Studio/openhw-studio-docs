---
title: "Backend Technologies"
---

# Backend Technologies

OpenHW Studio utilizes a robust, real-time backend architecture for classroom management, multi-user simulation state synchronization, and data storage.

<div class="ref-card">
  <div class="ref-header">
    <div class="ref-icon">🟢</div>
    <h2 class="ref-title">Node.js & Express</h2>
    <span class="ref-license">MIT License</span>
  </div>
  <div class="ref-desc">
    Node.js provides the asynchronous JavaScript runtime, while Express is the fast, unopinionated web framework built on top of it.
  </div>
  <div class="ref-usage">
    <strong>Usage in OpenHW Studio:</strong> Handles all HTTP API routing for user management, classroom administration, and saving/loading of projects.
  </div>
  <div class="ref-actions">
    <a href="https://github.com/expressjs/express" target="_blank" class="ref-btn">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
      GitHub
    </a>
  </div>
</div>

<div class="ref-card">
  <div class="ref-header">
    <div class="ref-icon">🍃</div>
    <h2 class="ref-title">MongoDB & Mongoose</h2>
    <span class="ref-license">MIT License</span>
  </div>
  <div class="ref-desc">
    MongoDB is a NoSQL document database, and Mongoose provides a rigorous, schema-based solution to model application data.
  </div>
  <div class="ref-usage">
    <strong>Usage in OpenHW Studio:</strong> Serves as the primary data store for user profiles, classroom assignments, saved circuits, and grading metrics.
  </div>
  <div class="ref-actions">
    <a href="https://github.com/Automattic/mongoose" target="_blank" class="ref-btn">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
      GitHub (Mongoose)
    </a>
  </div>
</div>

<div class="ref-card">
  <div class="ref-header">
    <div class="ref-icon">🔌</div>
    <h2 class="ref-title">ws (WebSockets)</h2>
    <span class="ref-license">MIT License</span>
  </div>
  <div class="ref-desc">
    `ws` is a simple to use, blazing fast, and thoroughly tested WebSocket client and server implementation.
  </div>
  <div class="ref-usage">
    <strong>Usage in OpenHW Studio:</strong> Powers the real-time "Live Classroom" feature, allowing teachers to view and interact with their students' active simulations with low latency.
  </div>
  <div class="ref-actions">
    <a href="https://github.com/websockets/ws" target="_blank" class="ref-btn">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
      GitHub
    </a>
  </div>
</div>
