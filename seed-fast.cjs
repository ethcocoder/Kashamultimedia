const { initializeApp, cert } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');
const { getFirestore } = require('firebase-admin/firestore');
const fs = require('fs');
const path = require('path');

const serviceAccount = JSON.parse(fs.readFileSync(path.join(__dirname, 'service-account.json'), 'utf8'));

initializeApp({
  credential: cert(serviceAccount),
  projectId: 'kashamultimedia',
});

const auth = getAuth();
const db = getFirestore();

async function seedAdmin() {
  console.log('🔐 Seeding admin user...');
  
  try {
    // Check if user exists
    let uid;
    try {
      const existing = await auth.getUserByEmail('paradox@gmail.com');
      uid = existing.uid;
      console.log('   User exists, updating password...');
      // Delete and recreate to set new password
      await auth.deleteUser(uid);
      console.log('   Deleted old user');
    } catch (e) {
      if (e.code !== 'auth/user-not-found') throw e;
      console.log('   New user...');
    }

    // Create user
    const userRecord = await auth.createUser({
      email: 'paradox@gmail.com',
      password: '12345678',
      emailVerified: true,
      displayName: 'Kasha Admin',
    });
    uid = userRecord.uid;
    console.log(`✅ Auth user created: ${uid}`);

    // Set admin custom claim
    await auth.setCustomUserClaims(uid, { admin: true });
    console.log('✅ Admin claims set');

    // Write to Firestore
    await db.collection('users').doc(uid).set({
      uid: uid,
      email: 'paradox@gmail.com',
      displayName: 'Kasha Admin',
      role: 'admin',
      createdAt: new Date(),
    });
    console.log('✅ Firestore profile written');

    console.log('\n🎉 DONE! Login with:');
    console.log('   Email: paradox@gmail.com');
    console.log('   Password: 12345678');
  } catch (err) {
    console.error('❌ Error:', err.message);
  }
}

seedAdmin();
