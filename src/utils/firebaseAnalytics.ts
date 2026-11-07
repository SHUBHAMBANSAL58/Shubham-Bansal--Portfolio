import { getAnalytics, isSupported, logEvent, Analytics } from 'firebase/analytics';
import app from '../lib/firebase';
import firebaseConfig from '../../firebase-applet-config.json';

let analyticsPromise: Promise<Analytics | null> | null = null;

function getAnalyticsInstance(): Promise<Analytics | null> {
  if (typeof window === 'undefined') {
    return Promise.resolve(null);
  }
  // Firebase Analytics requires a valid measurementId (e.g. G-XXXXX)
  if (!firebaseConfig.measurementId) {
    return Promise.resolve(null);
  }
  if (!analyticsPromise) {
    analyticsPromise = isSupported()
      .then((supported) => {
        if (supported && firebaseConfig.measurementId) {
          try {
            return getAnalytics(app);
          } catch (err) {
            console.debug('Firebase Analytics initialization skipped:', err);
            return null;
          }
        }
        return null;
      })
      .catch(() => null);
  }
  return analyticsPromise;
}

/**
 * Safely track an analytics event to Firebase Analytics
 */
export async function trackEvent(eventName: string, params?: Record<string, unknown>): Promise<void> {
  try {
    const analytics = await getAnalyticsInstance();
    if (analytics) {
      logEvent(analytics, eventName, params);
    }
  } catch (err) {
    // Analytics failures should never break the user experience
    console.debug('Analytics event tracked locally:', eventName, params);
  }
}

// Pre-defined tracking helper methods for consistent telemetry
export const AnalyticsEvents = {
  trackAskAIAssistantClicked: () =>
    trackEvent('ask_ai_assistant_clicked', { source: 'floating_button' }),
  trackProjectViewDetails: (projectId: string, projectTitle: string) =>
    trackEvent('project_view_details', { project_id: projectId, project_title: projectTitle }),
  trackProjectArchitectureOpened: (projectId?: string) =>
    trackEvent('project_architecture_opened', { project_id: projectId || 'all' }),
  trackThemeToggle: (newTheme: string) =>
    trackEvent('theme_toggle_clicked', { theme: newTheme }),
  trackTagFilterToggled: (tag: string, active: boolean) =>
    trackEvent('tag_filter_toggled', { tag, active }),
  trackReadmeGenerated: (projectTitle: string) =>
    trackEvent('readme_generated', { project_title: projectTitle }),
  trackContactFormSubmitted: (hasSubject: boolean) =>
    trackEvent('contact_form_submitted', { has_subject: hasSubject }),
};
