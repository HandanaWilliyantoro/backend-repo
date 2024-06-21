import { db, admin } from '../config/firebaseConfig';
import {User} from '../domain/user'

const update = async (id: string, data: User) => {
  const updatedUser = await db.collection('USERS').doc(id).set(data, { merge: true });
  return updatedUser
};

const retrieve = async (id: string) => {
  if(id){
    const userDoc = await db.collection('USERS').doc(id).get();
    return userDoc.exists ? {user: userDoc.data()} : null;
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

const claim = async (idToken?: string) => {
  if(idToken){
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const uid = decodedToken.uid;
    const userDoc = await db.collection('USERS').doc(uid).get();
    const user = userDoc.exists ? userDoc.data() : null
    const claim = user ? await admin.auth().setCustomUserClaims(uid, { role: user.role}) : undefined;
    return claim
  }
}

export { update, retrieve, claim };
