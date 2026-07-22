import { initializeApp, cert, applicationDefault } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const serviceAccount = JSON.parse(
  readFileSync(join(__dirname, '..', 'wereda4-barber-firebase-adminsdk-fbsvc-2c9469f752.json'), 'utf8')
);

initializeApp({
  credential: cert(serviceAccount),
});

const adminEmail = 'paradox@gmail.com';
const adminPassword = '12345678';
const adminDisplayName = 'paradox';

async function setupAdmin() {
  try {
    let userRecord;
    try {
      userRecord = await getAuth().getUserByEmail(adminEmail);
      console.log(`Admin user already exists: ${userRecord.uid}`);
    } catch (e) {
      if (e.code === 'auth/user-not-found') {
        userRecord = await getAuth().createUser({
          email: adminEmail,
          password: adminPassword,
          displayName: adminDisplayName,
        });
        console.log(`Admin user created: ${userRecord.uid}`);
      } else {
        throw e;
      }
    }

    await getAuth().setCustomUserClaims(userRecord.uid, { admin: true });
    console.log(`Admin claims set for: ${adminEmail}`);
    console.log('\nLogin credentials:');
    console.log(`  Email:    ${adminEmail}`);
    console.log(`  Password: ${adminPassword}`);
    console.log(`  Display:  ${adminDisplayName}`);
  } catch (err) {
    console.error('Error setting up admin:', err.message);
  }
  process.exit(0);
}

setupAdmin();
