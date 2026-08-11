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
- [x] Run type-check, build, security checks, and push the integration.
- [x] Route unauthenticated Firebase admin requests back to `/admin` rather than the unrelated default login flow.
- [x] Re-test unauthenticated and expired-session handling for `/admin/dashboard`.
- [x] Add an automated expiry check for Firebase-derived server sessions.
- [x] Commit and push the Firebase authentication integration to the target GitHub repository.

## Dynamic Content Platform Revision

- [x] Define editable data models for site settings, hero, programmes, services, events, journal entries, and contact details.
- [x] Create and migrate the database schema for all editable public-site content.
- [x] Add secure administrator-only CRUD APIs with publishing controls and content ordering.
- [ ] Convert all public landing-page sections from hardcoded copy into dynamic managed content.
- [x] Build a professional Broadcast Atelier admin dashboard overview with content status and quick actions.
- [x] Build dedicated admin management screens for every editable content area.
- [ ] Add admin-facing validation, loading, error, empty, and success states.
- [ ] Validate public updates, dashboard management workflows, responsive behavior, security, and repository sync.
- [ ] Move ticker, section rails, hero-footer, image-label, and footer strings into administrator-managed site settings.
- [ ] Add visible mutation error feedback to all control-room saves, publishing actions, inbox actions, and media uploads.
- [ ] Verify the professional control room at tablet and mobile widths, including navigation, editors, and tables.
- [ ] Push the completed dynamic-content control-room revision to the target repository.
