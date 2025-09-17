// Auto-generated version file from package.json
// This file is updated during the build process

window.PROJECT_VERSION = {
  version: "1.1.0",
  name: "pec-bandidagem-visualizations",
  buildDate: new Date().toISOString().split('T')[0],
  buildTime: new Date().toISOString(),
  gitCommit: process.env.VERCEL_GIT_COMMIT_SHA?.substring(0, 7) || 'local',
  deploymentUrl: process.env.VERCEL_URL || 'localhost'
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
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', injectVersionInfo);
} else {
  injectVersionInfo();
}