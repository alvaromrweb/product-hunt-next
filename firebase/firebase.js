import app, {initializeApp} from "firebase/app";
import firebaseConfig from "./config";
import {getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore';
import { getStorage } from '@firebase/storage';

class Firebase {
    constructor() {
        const app = initializeApp(firebaseConfig);
        this.auth = getAuth(app)
        this.db = getFirestore(app)
        this.storage = getStorage(app);
    }

    async registrar(nombre, email, password) {
        await createUserWithEmailAndPassword(this.auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                updateProfile(user, {
                    displayName: nombre
                  }).then(() => {
                    return user
                  }).catch((error) => {
                    console.log(error)
                  });
            })
            .catch((error) => {
                console.log(error)
            });
        
    }

    async login(email, password) {
        return await signInWithEmailAndPassword(this.auth, email, password)
    }

    async logout() {
        return await signOut(this.auth)
    }
}

const firebase = new Firebase()
export default firebase