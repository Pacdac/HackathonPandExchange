import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, where } from "firebase/firestore"; 

const firebaseConfig = {
    apiKey: "AIzaSyCcF0zTiJyFbag3O5Hn81qrODnxBBsKQ14",
    authDomain: "fir-test-4c4bf.firebaseapp.com",
    projectId: "fir-test-4c4bf",
    storageBucket: "fir-test-4c4bf.appspot.com",
    messagingSenderId: "695521795062",
    appId: "1:695521795062:web:fd948f638e5ac785ee85d7",
    measurementId: "G-3D06MLMCNK"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function getDCAsForUser(userAddress) {
    const dcaCollection = db.collection('moralis').doc('events').collection('DCATestnetCreation');
    dcaCollection.where('userAddress', '==', userAddress).get()
    .then(snapshot => {
        snapshot.forEach(doc => {
        const data = doc.data();
        console.log(data);
        });
    })
    .catch(error => {
        console.error(error);
    });
}