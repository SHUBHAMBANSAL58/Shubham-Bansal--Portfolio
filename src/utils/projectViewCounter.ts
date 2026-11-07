import {
  doc,
  collection,
  setDoc,
  getDoc,
  onSnapshot,
  serverTimestamp,
  increment,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { trackEvent } from './firebaseAnalytics';

// Fallback initial counts to provide instant visual feedback
export const INITIAL_PROJECT_VIEWS: Record<string, number> = {
  'skillsync-ai': 142,
  'codealpha-project-management': 118,
  'codealpha-simple-ecommerce': 95,
  'developer-portfolio-showcase': 210,
};

/**
 * Increments the view counter for a project in Firestore and logs analytics
 */
export async function incrementProjectView(projectId: string, projectTitle?: string): Promise<number> {
  if (!projectId) return 0;

  // Track event in Firebase Analytics
  trackEvent('project_view_details', { project_id: projectId, project_title: projectTitle });

  try {
    const docRef = doc(db, 'projectViews', projectId);
    const snap = await getDoc(docRef);

    if (snap.exists()) {
      await setDoc(
        docRef,
        {
          projectId,
          views: increment(1),
          lastViewedAt: serverTimestamp(),
        },
        { merge: true }
      );
      const current = snap.data()?.views;
      return typeof current === 'number' ? current + 1 : 1;
    } else {
      const initialSeed = (INITIAL_PROJECT_VIEWS[projectId] || 1) + 1;
      await setDoc(docRef, {
        projectId,
        views: initialSeed,
        lastViewedAt: serverTimestamp(),
      });
      return initialSeed;
    }
  } catch (error) {
    console.debug('Firestore view increment offline/mock fallback:', error);
    return (INITIAL_PROJECT_VIEWS[projectId] || 100) + 1;
  }
}

/**
 * Real-time listener for project view counts from Firestore
 */
export function subscribeToProjectViews(
  onUpdate: (views: Record<string, number>) => void
): () => void {
  try {
    const colRef = collection(db, 'projectViews');
    const unsubscribe = onSnapshot(
      colRef,
      (snapshot) => {
        const counts: Record<string, number> = { ...INITIAL_PROJECT_VIEWS };
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          if (data && typeof data.views === 'number') {
            counts[docSnap.id] = data.views;
          }
        });
        onUpdate(counts);
      },
      (error) => {
        console.debug('Firestore subscription offline fallback:', error);
        onUpdate(INITIAL_PROJECT_VIEWS);
      }
    );
    return unsubscribe;
  } catch {
    onUpdate(INITIAL_PROJECT_VIEWS);
    return () => {};
  }
}
