#!/usr/bin/env python3
"""
Seed admin user for Kasha Multimedia CMS.
Enables Identity Platform on the Firebase project, then creates the admin user.
Uses the service account key for authentication.
"""

import json
import jwt
import time
import requests
import sys
import os

# Load service account
SERVICE_ACCOUNT_PATH = os.path.join(os.path.dirname(__file__), 'service-account.json')
if not os.path.exists(SERVICE_ACCOUNT_PATH):
    # Try the upload path
    SERVICE_ACCOUNT_PATH = '/home/ubuntu/upload/kashamultimedia-firebase-adminsdk-fbsvc-7ef4ddf9c8.json'

with open(SERVICE_ACCOUNT_PATH) as f:
    sa = json.load(f)

PROJECT_ID = 'kashamultimedia'
API_KEY = 'AIzaSyAP77EKvO3_X-DJrQ7yV_XyQG62yGx7Tq0'

EMAIL = 'paradox@gmail.com'
PASSWORD = '12345678'

def get_access_token():
    now = int(time.time())
    claims = {
        'iss': sa['client_email'],
        'scope': 'https://www.googleapis.com/auth/cloud-platform https://www.googleapis.com/auth/identitytoolkit',
        'aud': 'https://oauth2.googleapis.com/token',
        'iat': now,
        'exp': now + 3600,
    }
    token = jwt.encode(claims, sa['private_key'], algorithm='RS256')
    r = requests.post('https://oauth2.googleapis.com/token', data={
        'grant_type': 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        'assertion': token,
    })
    if r.status_code != 200:
        print(f"Token error: {r.status_code} {r.text}")
        sys.exit(1)
    return r.json()['access_token']

def enable_identity_platform(access_token):
    """Enable Identity Platform config on the project."""
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-Type': 'application/json',
    }
    
    # First try to enable the Identity Platform API via Service Usage
    print("Step 1: Enabling Identity Platform API...")
    r1 = requests.post(
        f'https://serviceusage.googleapis.com/v1/projects/{PROJECT_ID}/services/identitytoolkit.googleapis.com:enable',
        headers=headers
    )
    print(f"  Service enable: {r1.status_code}")
    if r1.status_code == 200:
        print(f"  Operation: {r1.json().get('name', 'done')}")
        # Wait for operation to complete
        op_name = r1.json().get('name', '')
        if op_name:
            time.sleep(5)
            # Check operation status
            r_check = requests.get(f'https://serviceusage.googleapis.com/v1/{op_name}', headers=headers)
            print(f"  Op status: {r_check.status_code} {r_check.text[:200]}")
    
    # Now try to configure sign-in methods
    print("\nStep 2: Configuring sign-in methods...")
    r2 = requests.patch(
        f'https://identitytoolkit.googleapis.com/v2/projects/{PROJECT_ID}/config?updateMask=signIn',
        headers=headers,
        json={
            'signIn': {
                'allowDuplicateEmails': False,
                'email': {
                    'enabled': True,
                },
            }
        }
    )
    print(f"  Config: {r2.status_code} {r2.text[:300]}")
    return r2.status_code in [200, 201, 204]

def create_user(access_token):
    """Create the admin user via Identity Toolkit REST API."""
    headers = {'Content-Type': 'application/json'}
    
    print(f"\nStep 3: Creating user {EMAIL}...")
    r = requests.post(
        f'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key={API_KEY}',
        json={
            'email': EMAIL,
            'password': PASSWORD,
            'returnSecureToken': True,
        },
        headers=headers
    )
    return r

def write_firestore(access_token, uid):
    """Write admin profile to Firestore."""
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-Type': 'application/json',
    }
    
    print(f"\nStep 4: Writing Firestore profile for {uid}...")
    r = requests.patch(
        f'https://firestore.googleapis.com/v1/projects/{PROJECT_ID}/databases/(default)/documents/users/{uid}',
        headers=headers,
        json={
            'fields': {
                'uid': {'stringValue': uid},
                'email': {'stringValue': EMAIL},
                'displayName': {'stringValue': 'Kasha Admin'},
                'role': {'stringValue': 'admin'},
                'createdAt': {'stringValue': str(int(time.time() * 1000))},
            }
        }
    )
    print(f"  Firestore: {r.status_code} {r.text[:200]}")
    return r.status_code in [200, 201]

def main():
    print("=" * 50)
    print("  KASHA MULTIMEDIA CMS - Admin User Seeder")
    print("=" * 50)
    print(f"  Project: {PROJECT_ID}")
    print(f"  Email: {EMAIL}")
    print(f"  Password: {PASSWORD}")
    print("=" * 50)
    
    access_token = get_access_token()
    print("✅ Access token obtained\n")
    
    # Step 1: Enable Identity Platform
    enabled = enable_identity_platform(access_token)
    
    if not enabled:
        print("\n⚠️  Identity Platform config couldn't be enabled via API.")
        print("   This may require enabling it manually in Firebase Console:")
        print("   https://console.firebase.google.com/project/kashamultimedia/authentication/providers")
        print("   → Click 'Get started' on Email/Password provider")
        print("\n   Alternatively, you can create the user directly from:")
        print("   Firebase Console → Authentication → Users → Add user")
        print(f"   Email: {EMAIL}")
        print(f"   Password: {PASSWORD}")
        
        # Try one more time after a brief wait
        print("\n   Retrying user creation in 3 seconds...")
        time.sleep(3)
    
    # Step 2: Create user
    r = create_user(access_token)
    if r.status_code == 200:
        data = r.json()
        uid = data.get('localId', '')
        print(f"✅ User created! UID: {uid}")
        print(f"✅ ID Token obtained (user is signed in)")
        
        # Write Firestore profile
        write_firestore(access_token, uid)
        
        print("\n" + "=" * 50)
        print("  ✅ ADMIN USER READY!")
        print("=" * 50)
        print(f"  Email:    {EMAIL}")
        print(f"  Password: {PASSWORD}")
        print(f"  UID:      {uid}")
        print("=" * 50)
        print("\n  You can now log in at: /admin/login")
        print("=" * 50)
    else:
        print(f"❌ User creation failed: {r.status_code}")
        print(f"   Response: {r.text}")
        print("\n   Please enable Email/Password sign-in in Firebase Console:")
        print("   1. Go to https://console.firebase.google.com/project/kashamultimedia/authentication/providers")
        print("   2. Click 'Get started' on Email/Password provider")
        print("   3. Then run this script again")
        sys.exit(1)

if __name__ == '__main__':
    main()
