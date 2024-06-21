"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.claim = exports.retrieve = exports.update = void 0;
const firebaseConfig_1 = require("../config/firebaseConfig");
const update = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedUser = yield firebaseConfig_1.db.collection('USERS').doc(id).set(data, { merge: true });
    return updatedUser;
});
exports.update = update;
const retrieve = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (id) {
        const userDoc = yield firebaseConfig_1.db.collection('USERS').doc(id).get();
        return userDoc.exists ? { user: userDoc.data() } : null;
    }
    else {
        const usersCollection = firebaseConfig_1.db.collection('USERS');
        const snapshot = yield usersCollection.get();
        const users = [];
        snapshot.forEach(doc => {
            users.push(Object.assign({ id: doc.id }, doc.data()));
        });
        return users;
    }
});
exports.retrieve = retrieve;
const claim = (idToken) => __awaiter(void 0, void 0, void 0, function* () {
    if (idToken) {
        const decodedToken = yield firebaseConfig_1.admin.auth().verifyIdToken(idToken);
        const uid = decodedToken.uid;
        const userDoc = yield firebaseConfig_1.db.collection('USERS').doc(uid).get();
        const user = userDoc.exists ? userDoc.data() : null;
        const claim = user ? yield firebaseConfig_1.admin.auth().setCustomUserClaims(uid, { role: user.role }) : undefined;
        return claim;
    }
});
exports.claim = claim;
