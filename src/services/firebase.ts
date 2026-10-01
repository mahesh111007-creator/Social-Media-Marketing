/**
 * Firebase Client & Google Authentication Service
 * Strictly adheres to Google Workspace Integration skill requirements:
 * - Scopes: presentations and drive.file
 * - In-memory access token caching only (no localStorage/sessionStorage)
 * - Auto-clears token on sign out
 */

import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
  type User,
} from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize or reuse Firebase app
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);

// Provider with required Google Workspace Scopes
const provider = new GoogleAuthProvider();
export const WORKSPACE_SCOPES = [
  'https://www.googleapis.com/auth/presentations',
  'https://www.googleapis.com/auth/drive.file',
];

WORKSPACE_SCOPES.forEach((scope) => {
  provider.addScope(scope);
});

// Prompt consent to ensure fresh tokens with required scopes
provider.setCustomParameters({
  prompt: 'consent',
  access_type: 'offline',
});

// In-memory token cache (NEVER persist in localStorage / sessionStorage)
let cachedAccessToken: string | null = null;
let isSigningIn = false;

/**
 * Initialize auth state listener. Call this on app load.
 */
export const initAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      if (cachedAccessToken) {
        if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
      } else if (!isSigningIn) {
        // If user is logged in to Firebase but in-memory OAuth token is expired or wiped on page reload,
        // we prompt the user when they initiate a Slides action or they can click Google Sign In.
        if (onAuthFailure) onAuthFailure();
      }
    } else {
      cachedAccessToken = null;
      if (onAuthFailure) onAuthFailure();
    }
  });
};

/**
 * Must be called from a button click or user interaction
 */
export const googleSignIn = async (): Promise<{ user: User; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('Failed to retrieve Google OAuth access token from Firebase credential');
    }

    cachedAccessToken = credential.accessToken;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error: unknown) {
    console.error('Google Sign-in error:', error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

/**
 * Get current in-memory cached access token
 */
export const getAccessToken = async (): Promise<string | null> => {
  return cachedAccessToken;
};

/**
 * Signs user out and wipes in-memory token cache
 */
export const logout = async (): Promise<void> => {
  try {
    await signOut(auth);
  } finally {
    cachedAccessToken = null;
  }
};
