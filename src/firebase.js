import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBr3icdmd6-bSGUXk7SWh4TfA_hDP4gxJ0",
    authDomain: "slack-clone-462e1.firebaseapp.com",
    databaseURL: "https://slack-clone-462e1.firebaseio.com",
    projectId: "slack-clone-462e1",
    storageBucket: "slack-clone-462e1.appspot.com",
    messagingSenderId: "37244691791",
    appId: "1:37244691791:web:856d6826698b9c64f2113a",
    measurementId: "G-QHP9EL5HH0"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth()
  const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
