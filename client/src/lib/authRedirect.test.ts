// Broadcast Atelier direction: this test protects the boundary between public navigation and the private Firebase admin entrance.
import { describe, expect, it } from "vitest";
import { getUnauthorizedRedirect } from "./authRedirect";

describe("getUnauthorizedRedirect", () => {
  it("sends unauthenticated admin requests to the Firebase admin login route", () => {
    expect(getUnauthorizedRedirect("/admin/dashboard")).toBe("/admin");
  });

  it("leaves public pages on the default application login behavior", () => {
    expect(getUnauthorizedRedirect("/")).toBeNull();
    expect(getUnauthorizedRedirect("/journal")).toBeNull();
  });
});
