const loadingOverlay = document.getElementById('loadingOverlay');
const dialogoverlay = document.getElementById('dialogoverlay');
const dialogbox = document.getElementById('dialogbox');
const dialogbody = document.getElementById('dialogbody');
const url = 'http://localhost:3000/api/v1';
const close = document.getElementById('closebutton');
const imagefile = document.getElementById('imagefile');
const imageError = document.getElementById('imageError');
const table = document.getElementById('usertable');

let token = '';

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
      loadUsers();
    }).catch((err) => {
      loadingOverlay.style.display = 'none';
      window.location.replace('./signup.html');
    });
  } else {
    loadingOverlay.style.display = 'none';
    window.location.replace('./signup.html');
  }
});

const loadUsers = () => {
  loadingOverlay.style.display='flex';
  fetch(`${url}/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(response => response.json()).then((data2) => {
    loadingOverlay.style.display = 'none';
    for (let i = 0; i < data2.data.length; i += 1) {
      const dt = data2.data[i];
      table.innerHTML += `<td>${dt.email}</td>
      <td class="promote" data-id=${dt.id}>Promote</td>
      <td class="delete" data-id=${dt.id}>Delete</td>
      <td>${dt.roles}<td>`;
    }
  });
}
const promoteUsers = (id) => {
  loadingOverlay.style.display = 'flex';
  fetch(`${url}/users/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      roles: 'admin',
    }),
  }).then(response => response.json()).then((data) => {
    loadingOverlay.style.display = 'none';
    if (data.status === 200) {
      loadUsers();
      alert('User promoted successfully');
    }
  });
};

const deleteUsers = (id) => {
  loadingOverlay.style.display = 'flex';
  fetch(`${url}/users/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
  }).then(response => response.json()).then((data) => {
    if (data.status === 200) {
      loadingOverlay.style.display = 'none';
      loadUsers();
      alert('User Deleted successfully');
    }
  }).catch((err) => {
    alert('Network Fail, try again')
  });
}
const adminFunction = (e) => {
  if (e.target.className === 'promote') {
    const id = e.target.getAttribute('data-id');
    const confirsm = confirm('Do you want to upgrade this user to Admin');
    if (confirsm) {
      promoteUsers(id);
    }
  } if (e.target.className === 'delete') {
    const id = e.target.getAttribute('data-id');
    const confirsm = confirm('Do you want to delete this user');
    if (confirsm) {
      deleteUsers(id);
    }
  }
};
if (document.addEventListener) {
  document.addEventListener('click', adminFunction);
}

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
    window.location.replace('./signup.html')
  });
});

const smlogout = document.addEventListener('sm_logout');
smlogout.addEventListener('click', logoutUser);
logout.addEventListener('click', logoutUser)
