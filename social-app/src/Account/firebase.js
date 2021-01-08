import firebase from 'firebase'
import "firebase/auth"

var app =  firebase.initializeApp({
    apiKey: "AIzaSyASt-GU3tXsIWyifq2i2Wlvfa0wn55Us-s",
    authDomain: "social-app-a3253.firebaseapp.com",
    databaseURL: "https://social-app-a3253-default-rtdb.firebaseio.com",
    projectId: "social-app-a3253",
    storageBucket: "social-app-a3253.appspot.com",
    messagingSenderId: "774022938333",
    appId: "1:774022938333:web:9c32b23044db36e059a534",
    measurementId: "G-R2P4D23YRW"
  });
 
 
export const auth = app.auth()
export default app
 