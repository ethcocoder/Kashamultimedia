// Broadcast Atelier direction: these tests protect the boundary between Kasha's open public signal and its private editorial control room.
import { TRPCError } from "@trpc/server";
import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createContext(role: "admin" | "user"): TrpcContext {
  const now = new Date();
  return {
    user: { id: 1, openId: `${role}-test-user`, name: "Test user", email: "test@example.com", loginMethod: "test", role, createdAt: now, updatedAt: now, lastSignedIn: now },
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("Kasha content access", () => {
  it("rejects a non-admin user before dynamic programme content can be listed", async () => {
    const caller = appRouter.createCaller(createContext("user"));
    await expect(caller.admin.programs.list()).rejects.toMatchObject<Partial<TRPCError>>({ code: "FORBIDDEN" });
  });

  it("validates public contact input before it reaches the inquiry archive", async () => {
    const caller = appRouter.createCaller(createContext("user"));
    await expect(caller.public.submitInquiry({ name: "A", email: "not-an-email", brief: "too short" })).rejects.toBeInstanceOf(TRPCError);
  });
});
