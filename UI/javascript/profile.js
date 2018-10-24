function openNav() {
  document.getElementById('mysidenav').style.width = '200px';
  document.getElementById('main').style.marginLeft = '-200px';
  document.getElementById('main').style.marginRight = '200px';
  document.getElementById('openMenu').style.display = 'none';
  document.getElementById('closeMenu').style.display = 'block';
}

function closeNav() {
  document.getElementById('mysidenav').style.width = '0';
  document.getElementById('main').style.marginLeft = '0';
  document.getElementById('main').style.marginRight = '0';
  document.getElementById('openMenu').style.display = '';
  document.getElementById('closeMenu').style.display = 'none';
}

const url = 'http://localhost:3000/api/v1';
let token = null;
const username = document.getElementById('username');
const loadingOverlay = document.getElementById('loadingOverlay');

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
      if (data.status === 200 && data.data[0].roles === 'admin') {
        loadingOverlay.style.display = 'none';
        window.location.replace('./admin_create.html');
        return;
      }
      loadingOverlay.style.display = 'none';
      username.innerText = data.data[0].username;
    }).catch((err) => {
      loadingOverlay.style.display = 'none';
      window.location.replace('./signup.html');
    });
  } else {
    loadingOverlay.style.display = 'none';
    window.location.replace('./signup.html');
  }
});

const logout = document.getElementById('logout');
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
    window.location.replace('./signup.html');
  });
});

logout.addEventListener('click', logoutUser);
const smlogout = document.getElementById('sm_logout');
smlogout.addEventListener('click', logoutUser);
