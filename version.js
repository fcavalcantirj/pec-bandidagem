// Auto-generated version file from package.json
// This file is updated during the build process
// Build date: 2025-09-18T19:08:14.245Z

window.PROJECT_VERSION = {
  version: "1.2.0",
  name: "pec-bandidagem-visualizations",
  buildDate: "2025-09-19",
  buildTime: "2025-09-19T00:14:09.000Z",
  gitCommit: "b050909",
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