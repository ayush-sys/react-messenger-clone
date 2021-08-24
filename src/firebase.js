import Firebase from 'firebase/app';
import 'firebase/auth';

export const auth = Firebase.initializeApp({
    apiKey: "AIzaSyB81--T0XUVZg_FvXk90Zo9MXTxIkOMDSI",
    authDomain: "messenger-clone-1758e.firebaseapp.com",
    projectId: "messenger-clone-1758e",
    storageBucket: "messenger-clone-1758e.appspot.com",
    messagingSenderId: "447387620177",
    appId: "1:447387620177:web:a719ca90424d5ac75cf970"
}).auth();
