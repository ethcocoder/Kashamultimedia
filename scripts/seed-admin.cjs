/**
 * Seed Admin User Script for Kasha Multimedia CMS
 * 
 * This script creates an admin user in Firebase Authentication
 * and writes the corresponding user profile to Firestore for RBAC.
 * 
 * Usage: node scripts/seed-admin.js
 * 
 * This uses the Google Application Default Credentials or
 * a service account key file if GOOGLE_APPLICATION_CREDENTIALS is set.
 */

const admin = require('firebase-admin');

// Firebase project configuration
const projectId = 'kashamultimedia';

// Initialize with Application Default Credentials
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  projectId: projectId,
});

const EMAIL = 'paradox@gmail.com';
const PASSWORD = '12345678';

async function seedAdmin() {
  console.log('🔐 Seeding admin user for Kasha Multimedia CMS...');
  console.log(`   Email: ${EMAIL}`);
  console.log(`   Project: ${projectId}`);
  console.log('');

  try {
    // Step 1: Check if user already exists
    let uid;
    try {
      const existingUser = await admin.auth().getUserByEmail(EMAIL);
      uid = existingUser.uid;
      console.log(`✅ User already exists with UID: ${uid}`);
      console.log('   Updating password...');
    } catch (err) {
      if (err.code !== 'auth/user-not-found') throw err;
      console.log('   Creating new user...');
    }

    // Step 2: Create or update the auth user
    const userRecord = await admin.auth().upsertUser({
      email: EMAIL,
      password: PASSWORD,
      emailVerified: true,
      displayName: 'Kasha Admin',
      uid: uid, // Keep same UID if updating
    });

    console.log(`✅ Auth user ready: ${userRecord.uid}`);
    console.log(`   Email: ${userRecord.email}`);
    console.log(`   Verified: ${userRecord.emailVerified}`);

    // Step 3: Write admin profile to Firestore (required for RBAC)
    const userRef = admin.firestore().collection('users').doc(userRecord.uid);
    await userRef.set({
      uid: userRecord.uid,
      email: userRecord.email,
      displayName: userRecord.displayName,
      role: 'admin',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      lastLogin: admin.firestore.FieldValue.serverTimestamp(),
    }, { merge: true });

    console.log('✅ Firestore admin profile written');
    console.log('');
    console.log('🎉 Admin account ready! You can now log in at /admin/login');
    console.log(`   Email: ${EMAIL}`);
    console.log(`   Password: ${PASSWORD}`);

  } catch (error) {
    console.error('❌ Error seeding admin user:', error.message);
    console.error('');
    console.error('Possible causes:');
    console.error('  1. GOOGLE_APPLICATION_CREDENTIALS not set');
    console.error('  2. Service account key file missing or invalid');
    console.error('  3. Service account lacks "Firebase Admin" IAM role');
    console.error('  4. Email/password auth not enabled in Firebase Console');
    console.error('');
    console.error('Fix:');
    console.error('  1. Download service account key from:');
    console.error('     Firebase Console > Project Settings > Service Accounts');
    console.error('  2. Set: export GOOGLE_APPLICATION_CREDENTIALS="path/to/key.json"');
    console.error('  3. Ensure the service account has "Firebase Admin" role');
    console.error('  4. Enable Email/Password sign-in in:');
    console.error('     Firebase Console > Authentication > Sign-in methods');
    process.exit(1);
  }

  process.exit(0);
}

seedAdmin();
