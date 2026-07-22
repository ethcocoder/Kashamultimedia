import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Instructions for the user:
// 1. Go to Firebase Console > Project Settings > Service Accounts
// 2. Click "Generate new private key"
// 3. Save the JSON file as 'service-account.json' in the project root
const serviceAccountPath = join(__dirname, '..', 'service-account.json');

if (!existsSync(serviceAccountPath)) {
  console.error('\nError: service-account.json not found in project root.');
  console.log('Please download your Firebase Service Account JSON and save it as "service-account.json" in the root directory.');
  process.exit(1);
}

const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf8'));

initializeApp({
  credential: cert(serviceAccount),
});

const adminEmail = process.argv[2] || 'admin@kashamultimedia.com';
const adminPassword = process.argv[3] || 'KashaCMS2026!';
const adminDisplayName = 'Kasha Admin';

async function setupAdmin() {
  try {
    let userRecord;
    try {
      userRecord = await getAuth().getUserByEmail(adminEmail);
      console.log(`\nAdmin user already exists: ${userRecord.uid}`);
    } catch (e) {
      if (e.code === 'auth/user-not-found') {
        userRecord = await getAuth().createUser({
          email: adminEmail,
          password: adminPassword,
          displayName: adminDisplayName,
        });
        console.log(`\nAdmin user created: ${userRecord.uid}`);
      } else {
        throw e;
      }
    }

    // Set custom claims for admin
    await getAuth().setCustomUserClaims(userRecord.uid, { admin: true });
    console.log(`Admin claims set for: ${adminEmail}`);
    
    console.log('\n-----------------------------------');
    console.log('PRODUCTION ADMIN CREDENTIALS');
    console.log('-----------------------------------');
    console.log(`Email:    ${adminEmail}`);
    console.log(`Password: ${adminPassword}`);
    console.log('-----------------------------------\n');
    console.log('Keep these credentials secure!');
    
  } catch (err) {
    console.error('\nError setting up admin:', err.message);
  }
  process.exit(0);
}

setupAdmin();
