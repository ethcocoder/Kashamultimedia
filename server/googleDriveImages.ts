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

export function normalizeImageSource(value: string): string {
  const legacySource = value.startsWith("/manus-storage/") || value.startsWith("https://manus-storage/");
  if (legacySource) return value;
  const driveImage = parseGoogleDriveImageLink(value);
  if (driveImage) return driveImage.url;
  throw new TRPCError({
    code: "BAD_REQUEST",
    message: "Use a Google Drive sharing link for this image. Set General access to Anyone with the link before saving.",
  });
}

export function requireGoogleDriveImage(value: string): GoogleDriveImage {
  const driveImage = parseGoogleDriveImageLink(value);
  if (driveImage) return driveImage;
  throw new TRPCError({
    code: "BAD_REQUEST",
    message: "Enter a valid Google Drive sharing link. Set General access to Anyone with the link before saving.",
  });
}
