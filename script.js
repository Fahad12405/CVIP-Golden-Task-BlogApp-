// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut  } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import { getFirestore, addDoc, collection } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js"; 
  
  
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDSgZ7rqx23PfQyaMfLcXt8wP-iIS8V8kw",
    authDomain: "blog-app-12d56.firebaseapp.com",
    projectId: "blog-app-12d56",
    storageBucket: "blog-app-12d56.appspot.com",
    messagingSenderId: "563838247249",
    appId: "1:563838247249:web:27157969f9dbcc17f2f370",
    measurementId: "G-GCX5N82GDB"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);

  const registerForm = document.getElementById("register-form")
  const loginForm = document.getElementById("login-form")
  const loader = document.getElementById("form-loader")
  const signupPanel = document.getElementById("main-div")
  const logout = document.getElementById("user-logout")


  
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      console.log("User Is logged In :", uid)

      loader.style.display = 'none'
      window.location.href = '/dashboard.html'

    } else {
      // User is signed out
      loader.style.display = 'none'
      console.log("User Is Not logged In")

      signupPanel.style.display = 'block'
    }
  });



 
  registerForm?.addEventListener('submit' , (e)=>{
    e.preventDefault()
    console.log(e)
    
    const username = e.target[0].value
    const email = e.target[1].value
    const password = e.target[2].value
    
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        // alert("Sign Up"+ user.uid)
        window.location.href = 'dashboard.html'
        
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // alert("Failed" + errorCode )
        swal("This email is already exist", "", "warning");
      });
      
      // loader.style.display = 'block'
      // signupPanel.style.display = 'none'
      console.log(username ,email, password)
      saveData(username ,email, password)
      e.target[0].value = ""
      e.target[1].value = ""
      e.target[2].value = ""
  })




  loginForm?.addEventListener('submit' , (e)=>{
    e.preventDefault()
    // console.log(e)

    const email = e.target[0].value
    const password = e.target[1].value
    
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        console.log(user)
        // alert("login"+ user.uid)
        window.location.href = 'dashboard.html'
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // alert("Failed" + errorCode )
        swal("email or password error", "", "warning");
        signupPanel.style.display = 'block'
      });
      // loader.style.display = 'block'
      // signupPanel.style.display = 'none'

      e.target[0].value = ""
      e.target[1].value = ""
  })

  logout?.addEventListener('click', () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      console.log("Sign-out successful.")
      window.location.href = 'index.html'
    
    }).catch((error) => {
      // An error happened.
      console.log("An error happened.")
    });
  
    loader.style.display = 'block'
    
  })

// ===============Saving data on firestore=================
const saveData = async (username, email, password) => {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      username,
      email,
      password,
    });
  
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}