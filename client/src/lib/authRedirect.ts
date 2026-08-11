// Broadcast Atelier direction: authentication redirects keep public stories uninterrupted while guiding the private control room back to its own secure doorway.
export function getUnauthorizedRedirect(pathname: string) {
  return pathname.startsWith("/admin") ? "/admin" : null;
}
