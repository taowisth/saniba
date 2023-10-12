import {initializeApp} from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js'

import {
    getFirestore, collection, getDocs, addDoc, setDoc, doc
} from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js'

import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js'


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
const db = getFirestore()
const auth = getAuth();

// COLLECTION REFERENCE
const colRef = collection(db, "brief");


// GET DATA FROM FS
getDocs(colRef)
    .then((snapshot) => {
        let content = []
        snapshot.docs.forEach((doc) => {
        books.push({ ...doc.data(), id: doc.id })
    })
        console.log(content)
    })
    .catch(err => {
        console.log(err.message)
    })

//SING UP
//LOG IN - LOG OUT

//CHECK IF LOG IN OR OUT


onAuthStateChanged(auth, (user) => {
  console.log('user status changed: ', user)
  if (user == null){
      document.getElementsByTagName("body").innerHTML = "User is not registered. You are redirecting to main page.";    
      location.replace("../index.html");
  } else {
        const email = user.email;
        //addDoc(colRef, {
          //  email: email
        //})
        setDoc(doc(db, "brief", email), {
            email: email,
          })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });

        const unsubButton = document.querySelector('.select-button-passive')
        unsubButton.addEventListener('click', () => {
        if (document.getElementsByClassName('select-button-passive')[0].id){
            const email = user.email;
            setDoc(doc(db, "brief", email), {
                email: email,
                category: "social media",
                })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
        }
        })
  }
})

//DELETE ACCOUNT


//PHONE NUMBER