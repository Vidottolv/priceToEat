import {createUserWithEmailAndPassword, getAuth} from 'firebase/auth';
import {getFirestore, collection, doc, setDoc} from 'firebase/firestore'
import app from '../firebaseConfig';


const auth = getAuth(app)
const firestore = getFirestore(app)

const handleCreateAccount = (email, senha) => {
    createUserWithEmailAndPassword(
        auth,email,senha)
        .then((response) => {
            const uid = response.user.uid
            const data = {
                id:uid,
                email,
                nome,
            };
            const usersRef = collection(firestore, 'usuarios');
            const userDoc = doc(usersRef, uid);
            setDoc(userDoc, data);
        setTimeout( () => navigation.navigate('home'), duration = 2000)
    }).catch(error => {
        console.log(error)
    })
}

const handleSignIn = (email, senha) => {
    signInWithEmailAndPassword(auth,email,password)
    .then((userCredential) => {
        navigation.navigate('home')
        const user = userCredential.user;
        console.log('sucesso')
    }).catch(error => {
        console.log(error)
    })}

export {handleCreateAccount, handleSignIn};