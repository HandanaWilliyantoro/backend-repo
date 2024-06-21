import dotenv from 'dotenv';
import * as admin from 'firebase-admin'
dotenv.config();

// Define your Firebase configuration as a ServiceAccount object
const serviceAccount: admin.ServiceAccount = {
  projectId: (process.env.PROJECT_ID || ''),
  privateKey: (process.env.PRIVATE_KEY || '').replace(/\\n/g, '\n'),
  clientEmail: process.env.CLIENT_EMAIL || '',
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${serviceAccount?.projectId}.firebaseio.com`
});

const db = admin.firestore();
export {admin, db}