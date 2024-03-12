import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged} from 'firebase/auth';
import {getFirestore, collection, doc, setDoc} from 'firebase/firestore'
import app from '../firebaseConfig';


const auth = getAuth(app)
const firestore = getFirestore(app)


const usuario = onAuthStateChanged(auth,(user) => {
    if(user){
         const uid = user.uid;
         console.log(uid);
    }
})

const handleCreateAccount = (email, senha) => {
    createUserWithEmailAndPassword(
        auth,email,senha)
        .then((response) => {
            const uid = response.user.uid
            const data = {
                id:uid,
                email,
            };
            const usersRef = collection(firestore, 'usuarios');
            const userDoc = doc(usersRef, uid);
            setDoc(userDoc, data);
        setTimeout( () => navigation.navigate('home'), duration = 2000)
    }).catch(error => {
        console.log(error)
    })
}

export {handleCreateAccount, firestore, usuario, auth};