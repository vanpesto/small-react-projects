import firebase from 'firebase/app'
import "firebase/auth"

var app =  firebase.initializeApp({
    apiKey: "AIzaSyA5SkY3x5JrDdeui5a21qBA_i3BhrMgXdU",
    authDomain: "auth-development-6df4e.firebaseapp.com",
    projectId: "auth-development-6df4e",
    storageBucket: "auth-development-6df4e.appspot.com",
    messagingSenderId: "822536297998",
    appId: "1:822536297998:web:66a5635d3452d49a96e65f"
});
export const auth = app.auth()
export default app
 