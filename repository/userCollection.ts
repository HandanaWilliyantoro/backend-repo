import { db, admin } from '../config/firebaseConfig';
import {User} from '../domain/user'

const update = async (id: string, data: User) => {
  const updatedUser = await db.collection('USERS').doc(id).set(data, { merge: true });
  return updatedUser
};

const retrieve = async (id: string) => {
  if(id){
    const userDoc = await db.collection('USERS').doc(id).get();
    const customToken = await admin.auth().createCustomToken(id);
    return userDoc.exists ? {user: userDoc.data(), access_token: customToken} : null;
  } else {
    const usersCollection = db.collection('USERS');
    const snapshot = await usersCollection.get();
    const users: User[] = [];

    snapshot.forEach(doc => {
      users.push({ id: doc.id, ...doc.data() });
    });

    return users;
  }
};

export { update, retrieve };
