const openNav = () => {
  document.getElementById('mysidenav').style.width = '200px';
  document.getElementById('main').style.marginLeft = '-200px';
  document.getElementById('main').style.marginRight = '200px';
  document.getElementById('openMenu').style.display = 'none';
  document.getElementById('closeMenu').style.display = 'block';
};

const closeNav = () => {
  document.getElementById('mysidenav').style.width = '0';
  document.getElementById('main').style.marginLeft = '0';
  document.getElementById('main').style.marginRight = '0';
  document.getElementById('openMenu').style.display = '';
  document.getElementById('closeMenu').style.display = 'none';
};
// confirmation button
const confirm = document.getElementById('confirm');
const disable = document.getElementById('disable').disabled = true;

confirm.addEventListener('click', () => {
  if (confirm.checked) {
    document.getElementById('disable').disabled = false;
  } else {
    document.getElementById('disable').disabled = true;
  }
});

// my work
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

  console.log(valid);
  console.log("djdjdjd");
  const formData = new FormData(document.forms.createEvent);
  fetch(`${url}/menu/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  }).then(response => response.json()).then((data) => {
    if (data.status === 200) {
      customAlert.alert('Food Updated successfully');
      loadAvailableFoods();
    }
  });
});
};

  console.log(document.forms);
submit.addEventListener('click', createEvent);
