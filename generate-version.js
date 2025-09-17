#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read package.json
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

// Get git commit hash if available
let gitCommit = 'local';
try {
  const gitHead = fs.readFileSync('.git/HEAD', 'utf8').trim();
  if (gitHead.startsWith('ref: ')) {
    const refPath = gitHead.substring(5);
    const commitHash = fs.readFileSync(`.git/${refPath}`, 'utf8').trim();
    gitCommit = commitHash.substring(0, 7);
  } else {
    gitCommit = gitHead.substring(0, 7);
  }
} catch (e) {
  // Fallback for Vercel/CI environments
  gitCommit = process.env.VERCEL_GIT_COMMIT_SHA?.substring(0, 7) ||
              process.env.GITHUB_SHA?.substring(0, 7) ||
              'unknown';
}

const buildDate = new Date().toISOString().split('T')[0];
const buildTime = new Date().toISOString();

const versionContent = `// Auto-generated version file from package.json
// This file is updated during the build process
// Build date: ${buildTime}

window.PROJECT_VERSION = {
  version: "${packageJson.version}",
  name: "${packageJson.name}",
  buildDate: "${buildDate}",
  buildTime: "${buildTime}",
  gitCommit: "${gitCommit}",
  deploymentUrl: typeof window !== 'undefined' ? window.location.origin : 'localhost'
};

// Function to inject version into footer
function injectVersionInfo() {
  const versionContainer = document.getElementById('version-info');
  if (versionContainer) {
    const versionInfo = \`
      <div class="version-display">
        <span class="version-number">v\${PROJECT_VERSION.version}</span>
        <span class="build-date">\${PROJECT_VERSION.buildDate}</span>
        <span class="git-commit">#\${PROJECT_VERSION.gitCommit}</span>
      </div>
    \`;
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
}`;

fs.writeFileSync('version.js', versionContent);
console.log(`✅ Generated version.js (v${packageJson.version}, commit: ${gitCommit})`);