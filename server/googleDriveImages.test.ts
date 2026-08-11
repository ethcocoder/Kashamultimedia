import { describe, expect, it } from "vitest";
import { parseGoogleDriveImageLink, verifyGoogleDriveImagePublic } from "./googleDriveImages";

describe("Google Drive image links", () => {
  it("converts supported Drive sharing links into a display-ready image URL", () => {
    const image = parseGoogleDriveImageLink("https://drive.google.com/file/d/1aBcDeFgHiJkLmNoPqRsTuVwXyZ/view?usp=drive_link");
    expect(image).toEqual({
      fileId: "1aBcDeFgHiJkLmNoPqRsTuVwXyZ",
      url: "https://drive.google.com/uc?export=view&id=1aBcDeFgHiJkLmNoPqRsTuVwXyZ",
    });
  });

  it("rejects non-Google image URLs from the Drive-only workflow", () => {
    expect(parseGoogleDriveImageLink("https://example.com/image.jpg")).toBeNull();
  });

  it("rejects a Drive link that resolves to a private or non-image response", async () => {
    const originalFetch = globalThis.fetch;
    globalThis.fetch = async () => new Response("Sign in", { status: 200, headers: { "content-type": "text/html" } });
    try {
      await expect(verifyGoogleDriveImagePublic({ fileId: "1aBcDeFgHiJkLmNoPqRsTuVwXyZ", url: "https://drive.google.com/uc?export=view&id=1aBcDeFgHiJkLmNoPqRsTuVwXyZ" })).rejects.toThrow("not publicly available as an image");
    } finally {
      globalThis.fetch = originalFetch;
    }
  });
});
