// add admin cloud function
const adminForm = document.querySelector('.admin-actions');
adminForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const adminEmail = document.querySelector('#admin-email').value;
  const addAdminRole = functions.httpsCallable('addAdminRole');
  addAdminRole({ email: adminEmail }).then(result => {
    console.log(result);
  });
});

// listen for auth status changes
auth.onAuthStateChanged(user => {
  console.log(user);
  if (user) {
    user.getIdTokenResult().then(idTokenResult => {
      user.admin = idTokenResult.claims.admin;
      setupUI(user);
    });
    db.collection('workouts').onSnapshot(snapshot => {
      setupWorkouts(snapshot.docs);
    }, err => console.log(err.message));
  } else {
    setupUI();
    setupWorkouts([]);
  }
});

// create new workout
const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit', (e) => {
  e.preventDefault();

  
  db.collection('workouts').add({
    title: createForm.title.value,
    color: createForm.color.value,
    data:{
      data1: createForm.workouta.value!=""?createForm.workouta.value:null,
      data2: createForm.workoutb.value!=""?createForm.workoutb.value:null,
      data3: createForm.workoutc.value!=""?createForm.workoutc.value:null,
      data4: createForm.workoutd.value!=""?createForm.workoutd.value:null,
      data5: createForm.workoute.value!=""?createForm.workoute.value:null,
      data6: createForm.workoutf.value !=""?createForm.workoutf.value:null,
      data7: createForm.workoutg.value!=""?createForm.workoutg.value:null,
      data8: createForm.workouth.value!=""?createForm.workouth.value:null,
      data9:  createForm.workouti.value!="" ?createForm.workouti.value:null,
      data10: createForm.workoutj.value!=""?createForm.workoutj.value:null,
      data11: createForm.workoutk.value!=""?createForm.workoutk.value:null,
      data12: createForm.workoutl.value !=""?createForm.workoutl.value:null,
      data13: createForm.workoutm.value!="" ?createForm.workoutm.value:null,
      data14: createForm.workoutn.value!=""?createForm.workoutn.value:null,
      data15: createForm.workouto.value!=""?createForm.workouto.value:null,
      data16: createForm.workoutp.value!=""?createForm.workoutp.value:null,
      data17: createForm.workoutq.value!=""?createForm.workoutq.value:null,
      data18: createForm.workoutr.value!=""?createForm.workoutr.value:null,
      data19: createForm.workouts.value!=""?createForm.workouts.value:null,
      data20: createForm.workoutt.value !=""?createForm.workoutt.value:null,
    }
  }).then(() => {
    // close the create modal & reset form
    const modal = document.querySelector('#modal-create');
    M.Modal.getInstance(modal).close();
    createForm.reset();
  }).catch(err => {
    console.log(err.message);
  });
});

// signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // get user info
  const email = signupForm['signup-email'].value;
  const password = signupForm['signup-password'].value;

  // sign up the user & add firestore data
  auth.createUserWithEmailAndPassword(email, password).then(cred => {
    return db.collection('users').doc(cred.user.uid).set({
      bio: signupForm['signup-bio'].value
    });
  }).then(() => {
    // close the signup modal & reset form
    const modal = document.querySelector('#modal-signup');
    M.Modal.getInstance(modal).close();
    signupForm.reset();
    signupForm.querySelector('.error').innerHTML = ''
  }).catch(err => {
    signupForm.querySelector('.error').innerHTML = err.message;
  });
});

// logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut();
});

// login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // get user info
  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value;

  // log the user in
  auth.signInWithEmailAndPassword(email, password).then((cred) => {
    // close the signup modal & reset form
    const modal = document.querySelector('#modal-login');
    M.Modal.getInstance(modal).close();
    loginForm.reset();
    loginForm.querySelector('.error').innerHTML = '';
  }).catch(err => {
    loginForm.querySelector('.error').innerHTML = err.message;
  });

});