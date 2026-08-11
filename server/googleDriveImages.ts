import { TRPCError } from "@trpc/server";

const driveIdPattern = /^[A-Za-z0-9_-]{10,}$/;

export type GoogleDriveImage = {
  fileId: string;
  url: string;
};

export function parseGoogleDriveImageLink(value: string): GoogleDriveImage | null {
  try {
    const source = new URL(value.trim());
    const isGoogleDrive = /(^|\.)drive\.google\.com$/.test(source.hostname)
      || /(^|\.)docs\.google\.com$/.test(source.hostname)
      || /(^|\.)driveusercontent\.google\.com$/.test(source.hostname);
    if (!isGoogleDrive) return null;

    const pathMatch = source.pathname.match(/\/(?:file|d)\/d\/([A-Za-z0-9_-]{10,})|\/file\/d\/([A-Za-z0-9_-]{10,})/);
    const fileId = source.searchParams.get("id") || pathMatch?.[1] || pathMatch?.[2];
    if (!fileId || !driveIdPattern.test(fileId)) return null;
    return { fileId, url: `https://drive.google.com/uc?export=view&id=${encodeURIComponent(fileId)}` };
  } catch {
    return null;
  }
}

export async function verifyGoogleDriveImagePublic(driveImage: GoogleDriveImage): Promise<GoogleDriveImage> {
  let response: Response;
  try {
    response = await fetch(driveImage.url, { redirect: "follow", signal: AbortSignal.timeout(10_000) });
  } catch {
    throw new TRPCError({ code: "BAD_REQUEST", message: "Kasha could not reach this Google Drive image. Check the sharing link and try again." });
  }

  const contentType = response.headers.get("content-type")?.toLowerCase() ?? "";
  if (!response.ok || !contentType.startsWith("image/")) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "This Google Drive file is not publicly available as an image. In Google Drive, set General access to Anyone with the link, then copy the sharing link again.",
    });
  }
  return driveImage;
}

export async function normalizeImageSource(value: string): Promise<string> {
  const legacySource = value.startsWith("/manus-storage/") || value.startsWith("https://manus-storage/");
  if (legacySource) return value;
  const driveImage = parseGoogleDriveImageLink(value);
  if (driveImage) return (await verifyGoogleDriveImagePublic(driveImage)).url;
  throw new TRPCError({
    code: "BAD_REQUEST",
    message: "Use a Google Drive sharing link for this image. Set General access to Anyone with the link before saving.",
  });
}

export async function requireGoogleDriveImage(value: string): Promise<GoogleDriveImage> {
  const driveImage = parseGoogleDriveImageLink(value);
  if (driveImage) return verifyGoogleDriveImagePublic(driveImage);
  throw new TRPCError({
    code: "BAD_REQUEST",
    message: "Enter a valid Google Drive sharing link. Set General access to Anyone with the link before saving.",
  });
}
