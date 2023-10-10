import {initializeApp} from 'firebase/app'

import {
    getFirestore, collection, getDocs
} from 'firebase/firestore'

import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from 'firebase/auth'

import MicroModal from 'micromodal'; 

import {modal} from './modal.js'

//CONFIG INFO - NOT SHAREABLE 
const firebaseConfig = {
    apiKey: "AIzaSyDvN85ou9jpLVqcMGW-XPgkNkkTwAgJilA",
    authDomain: "saniba-271610.firebaseapp.com",
    projectId: "saniba-271610",
    storageBucket: "saniba-271610.appspot.com",
    messagingSenderId: "848081903632",
    appId: "1:848081903632:web:b3ae12b21b4857e8cf6a95",
    measurementId: "G-RYJCEFKCFX"
  };

// INIT FIREBASE
initializeApp(firebaseConfig);

// INIT SERVICES
const db = getFirestore();
const auth = getAuth();

// COLLECTION REFERENCE
const colRef = collection(db, "bilinmiyor");

// GET DATA FROM FS
getDocs(colRef)

console.log("e")

//SING UP
const signupForm = document.querySelector('.signup' )

signupForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const email = signupForm.email.value
    const password = signupForm.password.value

    createUserWithEmailAndPassword(auth, email, password)
        .then((cred) => {
            //console.log('user created', cred.user)
            signupForm.reset();
            location.replace("../dist/brief/brief.html");
        })
        .catch((err) => {
            console.log(err.message)
        })

})

//LOG IN - LOG OUT

// logging in and out
const logoutButton = document.querySelector('.logout')
logoutButton.addEventListener('click', () => {
  signOut (auth)
    .then(() => {
      //console.log('the user signed out')
    })
    .catch((err) => {
      console. log(err.message)
    })
  })

const loginForm = document.querySelector('.login')
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = loginForm.email.value
  const password = loginForm.password.value

  signInWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      //console.log('user logged in:', cred.user)
    })
    .catch((err) => {
      console.log(err.message)
    })
})

//CHECK IF LOG IN OR OUT

onAuthStateChanged(auth, (user) => {
  console.log('user status changed: ', user)
})

//DELETE ACCOUNT

const unsubButton = document.querySelector('.unsub')
  unsubButton.addEventListener('click', () => {
})


//PHONE NUMBER

const signupPhone = document.querySelector('.phone-form' )

signupPhone.addEventListener('submit', (e) => {
    e.preventDefault()

    const appVerifier = window.recaptchaVerifier;
    const phoneNumber = signupPhone.phoneNumber.value

    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    .then((confirmationResult) => {
      prompt("jkl")
      // user in with confirmationResult.confirm(code).
      window.confirmationResult = confirmationResult;
      // ...
    }).catch((error) => {
      // Error; SMS not sent
      // ...
    });

})