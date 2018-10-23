const openNav = () => {
  document.getElementById('mysidenav').style.width = "200px";
  document.getElementById('main').style.marginLeft = "-200px";
  document.getElementById('main').style.marginRight = "200px";
  document.getElementById('openMenu').style.display = "none";
  document.getElementById('closeMenu').style.display = "block";
}

const closeNav = () => {
  document.getElementById('mysidenav').style.width = '0';
  document.getElementById("main").style.marginLeft = "0";
  document.getElementById("main").style.marginRight = "0";
  document.getElementById('openMenu').style.display = "";
  document.getElementById('closeMenu').style.display = "none";
}
// Get the modal
let token = null;
let id = null;
const loadingOverlay = document.getElementById('loadingOverlay');
// event/:id/user
const table = document.getElementById('tbody');
const url = 'http://localhost:3000/api/v1';

// load event listeners
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
      id = data.data[0].id;
      getUserEvent();
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

// get particular event for a user
const getUserEvent = () => {
  loadingOverlay.style.display = 'flex';
  fetch(`${url}/event/${id}/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(response => response.json()).then((data) => {
    if (data.status === 200) {
      loadingOverlay.style.display = 'none';
      const d = data.data;
      if (data.data.length < 1) {
        alert('You have not created an event');
        loadingOverlay.style.display = 'none';
        return;
      }
      for (let i = 0; i < d.length; i += 1) {
        table.innerHTML += `<tr>
            <td>${d[i].title}</td>
            <td>${d[i].description}</td>
            <td><a href="#" class="reg" data-id=${d[i].id}>view attendant</a></td>
          </tr>`
      }
      const modal = document.getElementById('myModal');
      const reg = document.querySelectorAll('.reg:nth-child(n)');
      const caption = document.getElementById('caption');
      for (let i = 0; i < reg.length; i++) {
        reg[i].onclick = function () {
          idl = reg[i].getAttribute('data-id');
          fetchData(idl);
          modal.style.display = 'block';
          caption.style.display = 'block';
        };
      }
      const span = document.getElementsByClassName('close')[0];
      span.onclick = function () {
        modal.style.display = 'none';
        caption.style.display = 'none';
      };
    }
  }).catch((err) => {
    alert('Network error kindly reload');
  });
};

// fetch data
const viewTable = document.getElementById('viewTable');

const fetchData = (idl) => {
  fetch(`${url}/event/users/${idl}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(response => response.json()).then((data) => {
    viewTable.innerHTML = '';
    if (data.status === 200) {
      for (let i = 0; i < data.data.length; i += 1) {
        viewTable.innerHTML += `<tr>
          <td>${data.data[i].name}</td>
          <td>${data.data[i].email}</td>
        </tr>`;
      }
    }
  });
};
