import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCRfxgiYyIgrK8IMy8otwLXoLJH29MKbSI",
    authDomain: "petmagnet-421d0.firebaseapp.com",
    databaseURL: "https://petmagnet-421d0.firebaseio.com",
    projectId: "petmagnet-421d0",
    storageBucket: "petmagnet-421d0.appspot.com",
    messagingSenderId: "759305058777",
    appId: "1:759305058777:web:67a3c6afc5b91fbcc881c8",
    measurementId: "G-L09TBGR221"
};

firebase.initializeApp(firebaseConfig)

export default firebase;