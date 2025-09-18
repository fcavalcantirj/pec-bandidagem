#!/bin/bash

# PEC da Bandidagem - Build & Deployment Script
# Usage: ./build.sh [command]
# Commands: build, serve, deploy, clean, help

set -e

PROJECT_NAME="PEC da Bandidagem"
DIST_DIR="dist"
PORT=8080

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Helper functions
log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_header() {
    echo ""
    echo "🏛️  $PROJECT_NAME - Build Script"
    echo "========================================"
    echo ""
}

# Build function - prepare dist folder for deployment
build() {
    log_info "Building project for deployment..."

    # Generate version file
    log_info "Generating version information..."
    node generate-version.js

    # Clean and create dist directory
    rm -rf "$DIST_DIR"
    mkdir -p "$DIST_DIR"

    # Copy essential files
    log_info "Copying files to $DIST_DIR..."
    cp index.html "$DIST_DIR/"
    cp deputados.html "$DIST_DIR/"
    cp partidos.html "$DIST_DIR/"
    cp estados.html "$DIST_DIR/"
    cp fluxo.html "$DIST_DIR/"
    cp relatorio.html "$DIST_DIR/"
    cp despesas.html "$DIST_DIR/"
    cp data.js "$DIST_DIR/"
    cp analytics.js "$DIST_DIR/"
    cp version.js "$DIST_DIR/"

    # Copy SEO files
    cp sitemap.xml "$DIST_DIR/"
    cp robots.txt "$DIST_DIR/"

    # Copy documentation for GitHub Pages
    cp -r docs "$DIST_DIR/"

    # Create a simple .nojekyll file for GitHub Pages
    touch "$DIST_DIR/.nojekyll"

    # Verify all files copied correctly
    log_info "Verifying build..."
    local required_files=("index.html" "deputados.html" "partidos.html" "estados.html" "fluxo.html" "relatorio.html" "despesas.html" "data.js" "analytics.js" "version.js")

    for file in "${required_files[@]}"; do
        if [ -f "$DIST_DIR/$file" ]; then
            log_success "$file copied successfully"
        else
            log_error "$file missing in dist!"
            exit 1
        fi
    done

    # Calculate sizes
    local dist_size=$(du -sh "$DIST_DIR" | cut -f1)
    local file_count=$(find "$DIST_DIR" -type f | wc -l | tr -d ' ')

    log_success "Build completed successfully!"
    log_info "📊 Build Stats:"
    echo "   📁 Output directory: $DIST_DIR"
    echo "   📏 Total size: $dist_size"
    echo "   📄 Files: $file_count"
    echo ""
    echo "🚀 Deployment options:"
    echo "   • GitHub Pages: Push to gh-pages branch"
    echo "   • Netlify: Drag & drop $DIST_DIR folder"
    echo "   • Static hosting: Upload $DIST_DIR contents"
}

# Serve function - start local development server
serve() {
    log_info "Starting development server..."

    # Check if port is available
    if lsof -Pi :$PORT -sTCP:LISTEN -t >/dev/null ; then
        log_warning "Port $PORT is already in use"
        PORT=$((PORT + 1))
        log_info "Using port $PORT instead"
    fi

    log_success "🌐 Server starting on http://localhost:$PORT"
    log_info "📱 Access the visualizations:"
    echo "   🏠 Main page:      http://localhost:$PORT"
    echo "   🎯 Parties:       http://localhost:$PORT/partidos.html"
    echo "   🗺️  States:        http://localhost:$PORT/estados.html"
    echo "   🔄 Vote flow:     http://localhost:$PORT/fluxo.html"
    echo ""
    echo "⏹️  Press Ctrl+C to stop the server"
    echo "========================================"
    echo ""

    # Start Python HTTP server
    python3 -m http.server $PORT
}

# Deploy function - prepare for various deployment platforms
deploy() {
    log_info "Preparing deployment configurations..."

    # Build first
    build

    # Create deployment configs
    log_info "Creating deployment configurations..."

    # Netlify config
    cat > "$DIST_DIR/_redirects" << EOF
# Redirects for SPA-like behavior
/partidos  /partidos.html  200
/estados   /estados.html   200
/fluxo     /fluxo.html     200

# Fallback for 404s
/*  /index.html  404
EOF

    # Create a simple netlify.toml
    cat > "$DIST_DIR/netlify.toml" << EOF
[build]
  publish = "."

[build.environment]
  NODE_VERSION = "18"

[[headers]]
  for = "*.html"
  [headers.values]
    Cache-Control = "public, max-age=3600"

[[headers]]
  for = "*.js"
  [headers.values]
    Cache-Control = "public, max-age=86400"
EOF

    # Create GitHub Pages workflow suggestion
    mkdir -p .github/workflows
    cat > .github/workflows/deploy.yml << EOF
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  deploy:
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Build
        run: ./build.sh build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
EOF

    log_success "🚀 Deployment configurations created!"
    log_info "📋 Next steps:"
    echo ""
    echo "🔵 GitHub Pages:"
    echo "   1. Push this repository to GitHub"
    echo "   2. Enable Pages in repository settings"
    echo "   3. Set source to 'GitHub Actions'"
    echo ""
    echo "🟢 Netlify:"
    echo "   1. Drag & drop the '$DIST_DIR' folder to Netlify"
    echo "   2. Or connect your GitHub repository"
    echo ""
    echo "🟠 Other platforms:"
    echo "   1. Upload contents of '$DIST_DIR' folder"
    echo "   2. Set index.html as the main page"
}

# Clean function - remove build artifacts
clean() {
    log_info "Cleaning build artifacts..."

    if [ -d "$DIST_DIR" ]; then
        rm -rf "$DIST_DIR"
        log_success "Removed $DIST_DIR directory"
    fi

    if [ -d ".github" ]; then
        rm -rf ".github"
        log_success "Removed .github directory"
    fi

    # Clean any temporary files
    find . -name ".DS_Store" -delete 2>/dev/null || true
    find . -name "*.tmp" -delete 2>/dev/null || true

    log_success "Clean completed!"
}

# Help function
help() {
    echo "🏛️  $PROJECT_NAME - Build Script"
    echo "========================================"
    echo ""
    echo "Usage: ./build.sh [command]"
    echo ""
    echo "Commands:"
    echo "  build    📦 Build project for deployment (creates dist/ folder)"
    echo "  serve    🌐 Start local development server"
    echo "  deploy   🚀 Build + create deployment configurations"
    echo "  clean    🧹 Remove build artifacts and temp files"
    echo "  help     ❓ Show this help message"
    echo ""
    echo "Examples:"
    echo "  ./build.sh serve     # Start development server"
    echo "  ./build.sh deploy    # Prepare for deployment"
    echo "  npm start           # Alternative to serve"
    echo ""
    echo "🔗 More info: See README.md"
}

# Main script logic
case "${1:-help}" in
    "build")
        print_header
        build
        ;;
    "serve")
        print_header
        serve
        ;;
    "deploy")
        print_header
        deploy
        ;;
    "clean")
        print_header
        clean
        ;;
    "help"|"-h"|"--help")
        help
        ;;
    *)
        log_error "Unknown command: $1"
        echo ""
        help
        exit 1
        ;;
esac