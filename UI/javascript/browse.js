const closeNav = () => {
  document.getElementById('mysidenav').style.width = '0';
  document.getElementById('main').style.marginLeft = '0';
  document.getElementById('main').style.marginRight = '0';
  document.getElementById('openMenu').style.display = '';
  document.getElementById('closeMenu').style.display = 'none';
};
const openNav = () => {
  document.getElementById('mysidenav').style.width = '200px';
  document.getElementById('main').style.marginLeft = '-200px';
  document.getElementById('main').style.marginRight = '200px';
  document.getElementById('openMenu').style.display = 'none';
  document.getElementById('closeMenu').style.display = 'block';
};

const music = document.getElementsByClassName('music');
const arts = document.getElementsByClassName('arts');
const business = document.getElementsByClassName('business');
const sport = document.getElementsByClassName('sport');
const party = document.getElementsByClassName('party');
const festival = document.getElementsByClassName('festival');
const sciTech = document.getElementsByClassName('sciTech');
const conference = document.getElementsByClassName('conference');

// date by id
const minSearch = document.getElementById('minSearch');
const maxSearch = document.getElementById('maxSearch');
const catalog = document.getElementById('catalog');
const today = document.getElementById('today');
const tomorrow = document.getElementById('tomorrow');
const this_week = document.getElementById('this_week');
const this_month = document.getElementById('this_month');
const next_month = document.getElementById('next_month');
const byMonth = document.getElementById('byMonth');
const byEvent = document.getElementById('byEvent');
const err = document.getElementById('err');
const ok = document.getElementById('ok');
const popup = document.getElementById('popup');

catalog.addEventListener('change', cat, false);

// function cat() {
//   if (this.value == 'music') {
//     m = Array.from(music);
//     for (let i = 0; i < m.length; i++) {
//       console.log(m[i].style.display = 'none');
//     }
//   }
// }


minSearch.addEventListener('click', dateSearch, false);
maxSearch.addEventListener('click', eventSearch, false);

// minSearch function
function dateSearch() {
  const filter = byMonth.value;
  const list = document.getElementsByClassName('details');

  // res = new RegExp(filter, "gi");
  for (let i = 0; i < list.length; i += 1) {
    const li = list[i].getElementsByTagName('span')[0];
    if (li.innerHTML.indexOf(filter) !== -1) {
      list[i].parentNode.style.display = 'block';
    } else {
      list[i].parentNode.style.display = 'none';
    }
    if (li.innerHTML.indexOf(filter) === -1) {
      err.style.display = 'block';
      popup.style.display = 'block';
    }
  }
}
// maxSearch function
function eventSearch() {
  const filter = byEvent.value.toUpperCase();
  const list = document.getElementsByClassName('details');

  for (let i = 0; i < list.length; i += 1) {
    const li = list[i].getElementsByTagName('h6')[0];
    if (li.innerHTML.toUpperCase().indexOf(filter) !== -1) {
      list[i].parentNode.style.display = 'block';
    } else {
      list[i].parentNode.style.display = 'none';
    }
    if (li.innerHTML.indexOf(filter) === -1) {
      err.style.display = 'block';
      popup.style.display = 'block';
    }
  }
}


// Get the modal
// const modal = document.getElementById('myModal');
// // Get the image and insert it inside the modal - use its "alt" text as a caption
// const img = document.querySelectorAll('.myImg:nth-child(n)');
// const caption = document.getElementById('caption');
// for (let i = 0; i < img.length; i += 1) {
//   img[i].onclick = () => {
//     img[i].getAttribute('data-id');
//     modal.style.display = 'block';
//     caption.style.display = 'block';
//   };
// }
//
// // Get the <span> element that closes the modal
// const span = document.getElementsByClassName('close')[0];
//
// // When the user clicks on <span> (x), close the modal
// span.onclick = () => {
//   modal.style.display = 'none';
//   caption.style.display = 'none';
// };

// start backend implementation
const wrapper = document.getElementById('f1');
const loadingOverlay = document.getElementById('loadingOverlay');
const url = 'http://localhost:3000/api/v1';
const modalImage = document.getElementById('modalImage');
const modalcontent = document.getElementById('modalcontent');
// Get the image and insert it inside the modal - use its "alt" text as a caption
window.addEventListener('load', () => {
  loadingOverlay.style.display = 'flex';
  fetch(`${url}/event`).then(response => response.json()).then((data) => {
    if (data.status === 200) {
      loadingOverlay.style.display = 'none';
      wrapper.innerHTML = '';
      for (let i = 0; i < data.data.length; i += 1) {
        const dt = data.data[i];
        wrapper.innerHTML += `<div class="fl2">
                      <img src=${dt.image} class="img" alt = ${dt.title}>
                      <div class="details">
                        <h6>${dt.title}</h6>
                        <span>${dt.startdate.slice(0, 10)}</span>
                        <span><a href="#" class="myImg" data-id=${dt.id}>view details</a></span>
                      </div>
                    </div>`;
      }
      const modal = document.getElementById('myModal');
      const img = document.querySelectorAll('.myImg:nth-child(n)');
      const caption = document.getElementById('caption');
      let id = null;
      for (let i = 0; i < img.length; i += 1) {
        img[i].addEventListener('click', () => {
          id = img[i].getAttribute('data-id');
          fetchData(id);
        });
      }
      const eventemail = document.getElementById('eventemail');
      const eventname = document.getElementById('eventname');
      const errorf = document.getElementById('errorf');
      const regbtn = document.getElementById('regbtn');
      regbtn.addEventListener('click', () => {
        postRegister(id, eventemail.value, eventname.value);
      });
      const span = document.getElementsByClassName('close')[0];
      // modeal close
      span.onclick = () => {
        errorf.innerText = '';
        modal.style.display = 'none';
        caption.style.display = 'none';
      };
    }
  }).catch((err) => {
    loadingOverlay.style.display = 'none';
  });
});

const modal = document.getElementById('myModal');
const caption = document.getElementById('caption');
// fetch data for an events
const fetchData = (id) => {
  fetch(`${url}/event/${id}`).then(response => response.json()).then((data) => {
    if (data.status === 200) {
      const d = data.data;
      modalImage.innerHTML = `<img src=${d.image} class="modal-content" id="img01" alt=${d.title}>`;
      modalcontent.innerHTML = `<h6>${d.title}</h6>
      <span>Date: ${d.startdate.slice(0, 10)} to ${d.enddate.slice(0, 10)}</span>
      <p> Description: <br> ${d.description} </p> <br>
      Time: ${d.starttime} to ${d.endtime}
      <p> Location: ${d.location} Category: ${d.category}</p>
      <p>Organizer: ${d.organizer}</p><br><hr>
      About us <br> ${d.organizerdescription}
      `;
      modal.style.display = 'block';
      caption.style.display = 'block';
    }
  });
};

const verifyEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

const errorf = document.getElementById('errorf');

// Reguster user for an event
const postRegister = (id, email, name) => {
  if (!verifyEmail(email)) {
    errorf.innerText = 'Enter a valid email';
    return;
  }
  if (name.trim().length < 1) {
    errorf.innerText = 'Name must not be empty';
    return;
  }
  fetch(`${url}/event/register/${id}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: name.trim(),
      email: email.trim(),
    }),
  }).then(response => response.json()).then((data) => {
    if (data.status === 200) {
      errorf.innerText = 'Registered Successful';
      eventemail.value = '';
      eventname.value = '';
    }
  }).catch((err) => {
    errorf.innerText = 'Registration Failed, Try Again';
  });
};
