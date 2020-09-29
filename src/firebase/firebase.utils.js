import firebase from 'firebase/app';

import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyB2ROjoI6gyTCea0-ImBmqlQ3b5300rU2g",
    authDomain: "crwn-db-54168.firebaseapp.com",
    databaseURL: "https://crwn-db-54168.firebaseio.com",
    projectId: "crwn-db-54168",
    storageBucket: "crwn-db-54168.appspot.com",
    messagingSenderId: "917865552066",
    appId: "1:917865552066:web:a9c3928b91b9a0fd1cc35b",
    measurementId: "G-V71X71LSBE"
  };

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`)

  const snapShot = await userRef.get(); 

  if(!snapShot.exists) {
    const {displayName, email} = userAuth;
    const createdAt = new Date();


    try {
      await userRef.set(
        {
          displayName,
          email,
          createdAt,
          ...additionalData
        }
      )
    } catch(error) {
      console.log('error creating user', error.meassge)
    }
  }
  return userRef;
}

export const auth = firebase.auth();
export const firestore =  firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;