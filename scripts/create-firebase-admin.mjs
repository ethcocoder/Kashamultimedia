// Server-only utility: creates or resets the requested Firebase administrator without writing credentials to disk.
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const email = process.env.FIREBASE_ADMIN_EMAIL;
const password = process.env.FIREBASE_ADMIN_PASSWORD;
const rawCredential = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;

if (!email || !password || !rawCredential) {
  throw new Error("FIREBASE_ADMIN_EMAIL, FIREBASE_ADMIN_PASSWORD, and FIREBASE_SERVICE_ACCOUNT_JSON are required");
}

const account = JSON.parse(rawCredential);
if (!getApps().length) {
  initializeApp({
    credential: cert({ projectId: account.project_id, clientEmail: account.client_email, privateKey: account.private_key }),
  });
}

const auth = getAuth();
try {
  const existing = await auth.getUserByEmail(email);
  await auth.updateUser(existing.uid, { password, disabled: false });
  console.log(`Firebase admin account reset for ${email}`);
} catch (error) {
  if (error?.code !== "auth/user-not-found") throw error;
  await auth.createUser({ email, password, disabled: false, emailVerified: false });
  console.log(`Firebase admin account created for ${email}`);
}
