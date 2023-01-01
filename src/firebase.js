import firebase from "firebase";

const firebaseConfig = {
	apiKey: "AIzaSyCUFJEIrO38kPGNSrMHcdz9_lA9S3ke92o",
	authDomain: "planeinfo.firebaseapp.com",
	databaseURL: "https://planeinfo-default-rtdb.europe-west1.firebasedatabase.app",
	projectId: "planeinfo",
	storageBucket: "planeinfo.appspot.com",
	messagingSenderId: "101027156179",
	appId: "1:101027156179:web:e604f3d360e921be82c426",
	measurementId: "G-N5GQZ0QPS3"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage()

export { db, auth, provider, storage };
