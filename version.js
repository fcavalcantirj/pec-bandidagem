// Auto-generated version file from package.json
// This file is updated during the build process
// Build date: 2025-09-17T22:09:05.062Z

window.PROJECT_VERSION = {
  version: "1.1.0",
  name: "pec-bandidagem-visualizations",
  buildDate: "2025-09-17",
  buildTime: "2025-09-17T22:09:05.062Z",
  gitCommit: "5b65565",
  deploymentUrl: typeof window !== 'undefined' ? window.location.origin : 'localhost'
};

// Function to inject version into footer
function injectVersionInfo() {
  const versionContainer = document.getElementById('version-info');
  if (versionContainer) {
    const versionInfo = `
      <div class="version-display">
        <span class="version-number">v${PROJECT_VERSION.version}</span>
        <span class="build-date">${PROJECT_VERSION.buildDate}</span>
        <span class="git-commit">#${PROJECT_VERSION.gitCommit}</span>
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