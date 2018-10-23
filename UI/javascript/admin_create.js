const title = document.getElementById('title');
const locatn = document.getElementById('location');
const startdate = document.getElementById('startdate');
const enddate = document.getElementById('enddate');
const starttime = document.getElementById('starttime');
const endtime = document.getElementById('endtime');
const description = document.getElementById('description');
const organizer = document.getElementById('organizer');
const organizerD = document.getElementById('organizer_description');
const category = document.getElementsByName('category');
const submit = document.getElementById('disable');
const error = document.getElementById('error');
const loadingOverlay = document.getElementById('loadingOverlay');
const dialogoverlay = document.getElementById('dialogoverlay');
const dialogbox = document.getElementById('dialogbox');
const dialogbody = document.getElementById('dialogbody');
const url = 'http://localhost:3000/api/v1';
const close = document.getElementById('closebutton');
const imagefile = document.getElementById('imagefile');
const imageError = document.getElementById('imageError');
const logout = document.getElementById('logout');

let token = '';
const confirm = document.getElementById('confirm');
const disable = document.getElementById('disable').disabled = true;

confirm.addEventListener('click', () => {
  if (confirm.checked) {
    document.getElementById('disable').disabled = false;
  } else {
    document.getElementById('disable').disabled = true;
  }
});
window.addEventListener('load', () => {
  loadingOverlay.style.display = 'flex';
  if (localStorage.getItem('token') && localStorage.getItem('token') !== 'null') {
    token = localStorage.getItem('token');
    fetch(`${url}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(response => response.json()).then((data) => {
      if (data.status !== 200) {
        loadingOverlay.style.display = 'none';
        window.location.replace('./signup.html');
        return;
      }
      if (data.status === 200 && data.data[0].roles !== 'admin') {
        loadingOverlay.style.display = 'none';
        window.location.replace('./profile.html');
        return;
      }
      loadingOverlay.style.display = 'none';
    }).catch((err) => {
      loadingOverlay.style.display = 'none';
      window.location.replace('./signup.html');
    });
  } else {
    loadingOverlay.style.display = 'none';
    window.location.replace('./signup.html');
  }
});

imagefile.addEventListener('change', () => {
  imageError.innerText = '';
  if (imagefile.files[0].size > 2000000) {
    imageError.innerText = 'Image must not be greater than 2mb';
    imagefile.value = ''
    return;
  }
})

const createEvent = (e) => {
  e.preventDefault();
  let valid = true;
  if (title.value.trim().length < 1) {
    title.className += ' invalid';
    valid = false;
  }
  if (locatn.value.trim().length < 1) {
    locatn.placeholder = 'Please Enter a Location';
    valid = false;
  }
  if (startdate.value.trim().length < 1) {
    startdate.className += ' invalid';
    valid = false;
  }
  if (enddate.value.trim().length < 1) {
    enddate.className += ' invalid';
    valid = false;
  }
  if (starttime.value.trim().length < 1) {
    starttime.className += ' invalid';
    valid = false;
  }
  if (endtime.value.trim().length < 1) {
    endtime.className += ' invalid';
    valid = false;
  }
  if (description.value.trim().length < 1) {
    description.placeholder = 'Add an event description';
    valid = false;
  }
  if (organizer.value.trim().length < 1) {
    organizer.className += ' invalid';
    valid = false;
  }
  if (organizerD.value.trim().length < 1) {
    organizerD.placeholder = 'Enter the organizer company\'s description';
    valid = false;
  }
  if (category.value === 'undefined') {
    category.className += ' invalid';
    valid = false;
  }
  if (valid === false) {
    error.innerText = 'Some error occur, Kindly check through the form';
    return;
  }
  // API
  const formData = new FormData(document.forms.createEvent);
  loadingOverlay.style.display = 'flex';
  fetch(`${url}/event`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  }).then(response => response.json()).then((data) => {
    if (data.status === 200) {
      loadingOverlay.style.display = 'none';
      dialogbody.innerHTML = `Holla!!!! Event Created <br>
      Talk about us on social media !!!`
      dialogbox.style.display = 'block';
      dialogoverlay.style.display = 'block';
    }
  }).catch((err) => {
    loadingOverlay.style.display = 'none';
    dialogbody.innerHTML = `${err.message}`;
    dialogbox.style.display = 'block';
    dialogoverlay.style.display = 'block';
  });
};

close.addEventListener('click', () => {
  dialogbox.style.display = 'none';
  window.location.replace('./create.html')
})

const logoutUser = ((e) => {
  e.preventDefault();
  fetch(`${url}/auth/logout`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(response => response.json()).then((data) => {
    if (data.status === 200) {
      if (typeof (Storage) !== 'undefined') {
        localStorage.setItem('token', `${data.data.token}`);
      }
      window.location.replace('./signup.html');
    }
  }).catch((err) => {
    window.location.replace('./signup.html')
  });
});
logout.addEventListener('click', logoutUser)
submit.addEventListener('click', createEvent);
