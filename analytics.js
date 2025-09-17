// Enhanced Google Analytics 4 Configuration for PEC da Bandidagem
// Political Analysis Platform - Advanced Event Tracking

// Global tracking functions available across all pages
window.PECAnalytics = {

  // Initialize GA4 with enhanced configuration
  init: function(pageType, pageTitle) {
    gtag('config', 'G-P47CK1TDL8', {
      send_page_view: true,
      allow_google_signals: true,
      allow_ad_personalization_signals: false, // Privacy-focused for political content
      page_title: pageTitle,
      page_location: window.location.href,
      content_group1: pageType,
      content_group2: 'Political Analysis',
      custom_map: {
        'custom_parameter_1': 'interaction_type',
        'custom_parameter_2': 'political_entity'
      }
    });

    // Set up universal engagement tracking
    this.setupEngagementTracking(pageType);
  },

  // Core event tracking functions
  trackVisualizationInteraction: function(chartType, action, details, value = 1) {
    gtag('event', 'visualization_interaction', {
      chart_type: chartType,
      interaction_action: action,
      interaction_details: details,
      event_category: 'Data Visualization',
      event_label: `${chartType}_${action}`,
      value: value,
      page_type: this.getCurrentPageType()
    });
  },

  trackPoliticalAnalysis: function(entityType, entityName, analysisType) {
    gtag('event', 'political_analysis', {
      entity_type: entityType, // 'party', 'state', 'deputy'
      entity_name: entityName,
      analysis_type: analysisType, // 'view', 'compare', 'filter', 'export'
      event_category: 'Political Analysis',
      event_label: `${entityType}_${entityName}`,
      value: 1,
      custom_parameter_2: entityName
    });
  },

  trackReportAccess: function(reportSection, accessMethod) {
    gtag('event', 'report_access', {
      report_section: reportSection,
      access_method: accessMethod, // 'nav_card', 'cta_button', 'inline_link', 'breadcrumb'
      event_category: 'Content Engagement',
      event_label: `Report_${reportSection}`,
      value: 1
    });
  },

  trackNavigationFlow: function(fromPage, toPage, navigationMethod) {
    gtag('event', 'navigation_flow', {
      from_page: fromPage,
      to_page: toPage,
      navigation_method: navigationMethod, // 'nav_card', 'breadcrumb', 'back_button', 'direct_url'
      event_category: 'User Flow',
      event_label: `${fromPage}_to_${toPage}`,
      value: 1
    });
  },

  trackDataExport: function(dataType, format, filterApplied) {
    gtag('event', 'data_export', {
      data_type: dataType, // 'party_data', 'state_data', 'full_dataset'
      export_format: format, // 'csv', 'json', 'pdf', 'image'
      filters_applied: filterApplied,
      event_category: 'Data Usage',
      event_label: `Export_${dataType}_${format}`,
      value: 1
    });
  },

  trackSearchQuery: function(query, resultsCount, searchType) {
    gtag('event', 'site_search', {
      search_term: query,
      search_results: resultsCount,
      search_type: searchType, // 'party', 'state', 'deputy', 'general'
      event_category: 'Site Search',
      event_label: query,
      value: resultsCount
    });
  },

  trackSocialShare: function(platform, contentShared, pageType) {
    gtag('event', 'social_share', {
      platform: platform, // 'twitter', 'facebook', 'linkedin', 'whatsapp', 'copy_link'
      content_shared: contentShared,
      page_type: pageType,
      event_category: 'Social Engagement',
      event_label: `Share_${platform}`,
      value: 1
    });
  },

  trackContentEngagement: function(contentType, engagementLevel, timeSpent, scrollDepth) {
    gtag('event', 'content_engagement', {
      content_type: contentType,
      engagement_level: engagementLevel, // 'low', 'medium', 'high', 'expert'
      time_spent_seconds: timeSpent,
      scroll_depth_percentage: scrollDepth,
      event_category: 'Content Performance',
      event_label: `${contentType}_${engagementLevel}`,
      value: timeSpent
    });
  },

  trackVisualizationPerformance: function(chartType, loadTime, interactionCount) {
    gtag('event', 'visualization_performance', {
      chart_type: chartType,
      load_time_ms: loadTime,
      interaction_count: interactionCount,
      event_category: 'Technical Performance',
      event_label: `Performance_${chartType}`,
      value: loadTime
    });
  },

  // Conversion events (high-value actions)
  trackConversion: function(conversionType, value = 1) {
    gtag('event', 'conversion', {
      conversion_type: conversionType, // 'report_complete_read', 'data_deep_analysis', 'expert_engagement'
      currency: 'BRL', // For value tracking
      value: value,
      event_category: 'Conversions',
      event_label: conversionType
    });
  },

  // Enhanced engagement tracking setup
  setupEngagementTracking: function(pageType) {
    let startTime = Date.now();
    let scrollMilestones = [25, 50, 75, 90];
    let scrolledMilestones = [];
    let interactionCount = 0;
    let hasDeepEngagement = false;

    // Scroll depth tracking
    window.addEventListener('scroll', () => {
      const scrollPercentage = Math.round(
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
      );

      scrollMilestones.forEach(milestone => {
        if (scrollPercentage >= milestone && !scrolledMilestones.includes(milestone)) {
          scrolledMilestones.push(milestone);
          gtag('event', 'scroll_depth', {
            scroll_percentage: milestone,
            time_to_scroll: Math.round((Date.now() - startTime) / 1000),
            page_type: pageType,
            event_category: 'Page Engagement',
            event_label: `Scroll_${milestone}%`,
            value: milestone
          });

          // Deep engagement detection
          if (milestone >= 75 && !hasDeepEngagement) {
            hasDeepEngagement = true;
            this.trackConversion('deep_content_engagement');
          }
        }
      });
    });

    // Click tracking for interactive elements
    document.addEventListener('click', (event) => {
      interactionCount++;

      // Track specific element interactions
      const element = event.target;
      const elementType = this.getElementType(element);

      if (elementType) {
        gtag('event', 'element_interaction', {
          element_type: elementType,
          element_text: element.textContent?.substring(0, 50) || '',
          page_type: pageType,
          interaction_sequence: interactionCount,
          event_category: 'User Interaction',
          event_label: `Click_${elementType}`,
          value: 1
        });
      }
    });

    // Page exit tracking
    window.addEventListener('beforeunload', () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      const maxScroll = Math.max(...scrolledMilestones, 0);

      // Determine engagement level
      let engagementLevel = 'low';
      if (timeSpent > 180 && maxScroll > 75) engagementLevel = 'expert';
      else if (timeSpent > 120 && maxScroll > 50) engagementLevel = 'high';
      else if (timeSpent > 60 && maxScroll > 25) engagementLevel = 'medium';

      this.trackContentEngagement(pageType, engagementLevel, timeSpent, maxScroll);

      // Track conversion for expert-level engagement
      if (engagementLevel === 'expert') {
        this.trackConversion('expert_engagement_session', timeSpent);
      }
    });

    // Visibility change tracking (tab switching)
    document.addEventListener('visibilitychange', () => {
      gtag('event', 'visibility_change', {
        visibility_state: document.visibilityState,
        time_since_load: Math.round((Date.now() - startTime) / 1000),
        page_type: pageType,
        event_category: 'User Behavior',
        event_label: `Visibility_${document.visibilityState}`,
        value: 1
      });
    });
  },

  // Helper functions
  getCurrentPageType: function() {
    const path = window.location.pathname;
    if (path.includes('partidos')) return 'partidos';
    if (path.includes('estados')) return 'estados';
    if (path.includes('fluxo')) return 'fluxo';
    if (path.includes('relatorio')) return 'relatorio';
    return 'homepage';
  },

  getElementType: function(element) {
    // Classify clicked elements for better analytics
    if (element.matches('a')) return 'link';
    if (element.matches('button')) return 'button';
    if (element.matches('.nav-card')) return 'navigation_card';
    if (element.matches('.chart, .visualization, svg')) return 'chart_element';
    if (element.matches('.insight-card')) return 'insight_card';
    if (element.matches('.cta-button, .cta-link')) return 'cta_element';
    if (element.matches('h1, h2, h3, h4, h5, h6')) return 'heading';
    if (element.matches('.tooltip')) return 'tooltip';
    return null;
  },

  // Debug function for testing
  debug: function() {
    console.log('PEC Analytics initialized for:', this.getCurrentPageType());
    console.log('Tracking functions available:', Object.keys(this));
  }
};

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  // Determine page type and title from current page
  const pageType = PECAnalytics.getCurrentPageType();
  const pageTitle = document.title;

  // Initialize analytics
  PECAnalytics.init(pageType, pageTitle);

  // Optional: Enable debug mode in development
  if (window.location.hostname === 'localhost' || window.location.hostname.includes('vercel')) {
    PECAnalytics.debug();
  }
});