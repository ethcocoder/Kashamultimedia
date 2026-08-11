// Broadcast Atelier direction: this server-only route turns a verified Firebase identity into the same secure session pattern used across Kasha's control room.
import type { Express, Request, Response } from "express";
import { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { sdk } from "./_core/sdk";
import * as db from "./db";
import { isFirebaseAdminEmail, verifyFirebaseIdToken } from "./firebaseAdmin";

export function registerFirebaseAuthRoutes(app: Express) {
  app.post("/api/firebase/session", async (req: Request, res: Response) => {
    const idToken = typeof req.body?.idToken === "string" ? req.body.idToken : "";
    if (!idToken) return res.status(400).json({ error: "Firebase ID token is required" });

    try {
      const token = await verifyFirebaseIdToken(idToken);
      const email = token.email ?? null;
      const role = isFirebaseAdminEmail(email) ? "admin" : "user";
      const openId = `firebase_${token.uid}`;
      const displayName = token.name ?? email ?? "Firebase user";

      await db.upsertUser({
        openId,
        name: displayName,
        email,
        loginMethod: "firebase",
        role,
        lastSignedIn: new Date(),
      });

      const sessionToken = await sdk.createSessionToken(openId, { name: displayName });
      res.cookie(COOKIE_NAME, sessionToken, {
        ...getSessionCookieOptions(req),
        maxAge: ONE_YEAR_MS,
      });

      return res.status(200).json({ success: true, role });
    } catch (error) {
      console.error("[Firebase Auth] Session exchange failed", error);
      return res.status(401).json({ error: "Firebase sign-in could not be verified" });
    }
  });
}
