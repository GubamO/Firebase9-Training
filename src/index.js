import { initializeApp } from "firebase/app";
import { collection, getFirestore, getDocs } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyBJkzDeHudZLoCfYAtMYhKkJlVPbwDgtHo",
    authDomain: "fir-auth-training-392e0.firebaseapp.com",
    projectId: "fir-auth-training-392e0",
    storageBucket: "fir-auth-training-392e0.appspot.com",
    messagingSenderId: "1094398364846",
    appId: "1:1094398364846:web:d853ae9c2b53d000c9713f"
  };

initializeApp(firebaseConfig);

const db = getFirestore();

// collection ref

const colRef = collection(db, 'books')

// get collection data

getDocs(colRef)
  .then(snapshot => {0 
    // console.log(snapshot.docs)
    let books = []
    snapshot.docs.forEach(doc => {
      books.push({ ...doc.data(), id: doc.id })
    })
    console.log(books)
  })
  .catch(err => {
    console.log(err.message)
  })

  // adding docs
const addBookForm = document.querySelector('.add')
addBookForm.addEventListener('submit', (e) => {
  e.preventDefault()

  addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
  })
  .then(() => {
    addBookForm.reset()
  })
})

// deleting docs
const deleteBookForm = document.querySelector('.delete')
deleteBookForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const docRef = doc(db, 'books', deleteBookForm.id.value)

  deleteDoc(docRef)
    .then(() => {
      deleteBookForm.reset()
    })
})

