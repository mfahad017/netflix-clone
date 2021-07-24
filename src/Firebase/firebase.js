import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCvUtp5BwdAAJXp5wVvWU-P6gry1fsvRDs",
    authDomain: "netflix-clone-e9902.firebaseapp.com",
    projectId: "netflix-clone-e9902",
    storageBucket: "netflix-clone-e9902.appspot.com",
    messagingSenderId: "175250063233",
    appId: "1:175250063233:web:b22d9a7628c740f5cdb280"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig)
  const db = firebaseApp.firestore()
  const auth = firebase.auth()

  export {auth}
  export default db;