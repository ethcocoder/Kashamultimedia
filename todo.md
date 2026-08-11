# Kasha Multimedia Revision Tasks

- [x] Restore a visible light/dark mode toggle in the global header.
- [x] Add English/Amharic language switching for the primary navigation and homepage content.
- [x] Add a visible admin login entry point and a dedicated `/admin` login route.
- [x] Preserve the Broadcast Atelier visual system across the restored controls.
- [x] Validate desktop and mobile states, type-check, build, checkpoint, and push the revision.

## Firebase Authentication Revision

- [x] Keep the Firebase service-account private key out of source control and frontend bundles.
- [x] Add the Firebase web configuration through environment variables and client initialization.
- [x] Add server-side Firebase Admin verification for protected admin sessions.
- [x] Create the requested test admin account and verify sign-in.
- [x] Replace the localStorage-only admin preview with Firebase-backed auth state.
- [ ] Run type-check, build, security checks, and push the integration.
- [x] Route unauthenticated Firebase admin requests back to `/admin` rather than the unrelated default login flow.
- [x] Re-test unauthenticated and expired-session handling for `/admin/dashboard`.
- [x] Add an automated expiry check for Firebase-derived server sessions.
- [ ] Commit and push the Firebase authentication integration to the target GitHub repository.
