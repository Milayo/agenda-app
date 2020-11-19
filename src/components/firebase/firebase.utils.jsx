import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
	apiKey: "AIzaSyBck_GCZM0_zO4z_VyOrvkbHZQE-o-cnT4",
	authDomain: "agenda-app-527ce.firebaseapp.com",
	databaseURL: "https://agenda-app-527ce.firebaseio.com",
	projectId: "agenda-app-527ce",
	storageBucket: "agenda-app-527ce.appspot.com",
	messagingSenderId: "283082231019",
	appId: "1:283082231019:web:bd0760329584a95cf202ae",
	measurementId: "G-D07KVQ7WGH",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
	if (!userAuth) return;

	const userRef = firestore.doc(`users/${userAuth.uid}`);

	const snapShot = await userRef.get();

	if (!snapShot.exists) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await userRef.set({
				displayName,
				email,
				createdAt,
				...additionalData,
			});
		} catch (error) { console.log(error)}
	}

	return userRef;
};

firebase.initializeApp(config);
firebase.firestore().enablePersistence();

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export default firebase;
