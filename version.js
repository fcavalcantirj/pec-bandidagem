// Auto-generated version file from package.json
// This file is updated during the build process
// Build date: 2025-09-17T19:49:11.901Z

window.PROJECT_VERSION = {
  version: "1.1.0",
  name: "pec-bandidagem-visualizations",
  buildDate: "2025-09-17",
  buildTime: "2025-09-17T19:49:11.901Z",
  gitCommit: "d9e1142",
  deploymentUrl: typeof window !== 'undefined' ? window.location.origin : 'localhost'
};

// Function to inject version into footer
function injectVersionInfo() {
  const versionContainer = document.getElementById('version-info');
  if (versionContainer) {
    const versionInfo = `
      <div class="version-display" style="text-align: center; font-size: 0.85rem;">
        <div style="margin-bottom: 0.5rem; color: #e2e8f0;">📦 Versão da Aplicação</div>
        <div style="display: flex; justify-content: center; align-items: center; gap: 1rem; flex-wrap: wrap;">
          <span class="version-number" style="color: #10b981; font-weight: 600; font-size: 1.1rem;">v${PROJECT_VERSION.version}</span>
          <span class="build-date" style="color: #94a3b8;">📅 ${PROJECT_VERSION.buildDate}</span>
          <span class="git-commit" style="color: #f59e0b; font-family: monospace;">🔗 #${PROJECT_VERSION.gitCommit}</span>
        </div>
      </div>
    `;
    versionContainer.innerHTML = versionInfo;
  }
}

// Auto-inject when DOM is ready
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectVersionInfo);
  } else {
    injectVersionInfo();
  }
}