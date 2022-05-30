// DOM elements
const workoutsList = document.querySelector('.workouts');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');
const adminItems = document.querySelectorAll('.admin');

const setupUI = (user) => {
  if (user) {
    if (user.admin) {
      adminItems.forEach(item => item.style.display = 'block');
    }
    // account info
    db.collection('users').doc(user.uid).get().then(doc => {
      const html = `
        <div>Logged in as ${user.email}</div>
        <div>${doc.data().bio}</div>
        <div class="pink-text">${user.admin ? 'Admin' : ''}</div>
      `;
      accountDetails.innerHTML = html;
    });
    // toggle user UI elements
    loggedInLinks.forEach(item => item.style.display = 'block');
    loggedOutLinks.forEach(item => item.style.display = 'none');
  } else {
    // clear account info
    accountDetails.innerHTML = '';
    // toggle user elements
    adminItems.forEach(item => item.style.display = 'none');
    loggedInLinks.forEach(item => item.style.display = 'none');
    loggedOutLinks.forEach(item => item.style.display = 'block');
  }
};

// setup workouts
const setupWorkouts = (data) => {

  if (data.length) {
    let html = '';
    data.forEach(doc => {
      const workouts = doc.data();
      const li = `
        <li>
          <div class="collapsible-header grey lighten-4"> ${workouts.title} 
          <button class="btn waves-effect red accent-4" style="margin-left: auto;margin-right: 0;"  name="action" onclick="deleteFunction('${workouts.title}')">Delete
        </button></div>
          <div class="collapsible-body white"> ${workouts.color} </div>
          
        </li>
      `;
      html += li;
    });
    workoutsList.innerHTML = html
    
  } else {
    workoutsList.innerHTML = '<h5 class="center-align">Login to view workouts</h5>';
  }
  
};

function deleteFunction(param){
  //TODO: delete query
  var jobskill_query = db.collection('workouts').where('title','==',param);
jobskill_query.get().then(function(querySnapshot) {
  querySnapshot.forEach(function(doc) {
    doc.ref.delete();
  });
});
  window.alert("Delete?:"+param);
}

// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);

});
