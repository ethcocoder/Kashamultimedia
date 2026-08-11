import { describe, expect, it } from "vitest";
import { parseGoogleDriveImageLink } from "./googleDriveImages";

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
});
