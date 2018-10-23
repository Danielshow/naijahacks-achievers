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

function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  const x = document.getElementsByClassName('step');
  for (let i = 0; i < x.length; i += 1) {
    x[i].className = x[i].className.replace(' active', '');
  }
  x[n].className += ' active';
}

function showTab(n) {
  const x = document.getElementsByClassName('tab');
  x[n].style.display = 'block';
  if (n === 0) {
    document.getElementById('prevBtn').style.display = 'none';
  } else {
    document.getElementById('prevBtn').style.display = 'inline';
  }
  if (n === (x.length - 1)) {
    document.getElementById('nextBtn').innerHTML = 'Submit';
  } else if (n === (x.length - 2)) {
    document.getElementById('nextBtn').innerHTML = 'Almost there';
  } else {
    document.getElementById('nextBtn').innerHTML = 'Next';
  }
  fixStepIndicator(n);
}

let currentTab = 0;
showTab(currentTab); // Display the crurrent tab


function nextPrev(n) {
  const x = document.getElementsByClassName('tab');
  if (n === 1 && !validateForm()) return false;
  x[currentTab].style.display = 'none';
  currentTab += n;
  if (currentTab >= x.length) {
    document.getElementById('regForm').submit();
    return false;
  }
  showTab(currentTab);
}

// Link with backend API code
const url = 'https://teamachievers.herokuapp.com/api/v1';

const verifyEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

const verifyPassword = (password) => {
  const re = /\w+/;
  return re.test(password) && password.length >= 6;
};

const verifyPhone = (number) => {
  const re = /^\d+$/;
  return re.test(number) && number.length === 11;
};

const loginEmail = document.getElementById('loginemail');
const loginPassword = document.getElementById('loginpassword');
const loginSubmit = document.getElementById('loginsubmit');
const loginError = document.getElementById('loginerror');
const firstname = document.getElementById('firstname');
const lastname = document.getElementById('lastname');
const email = document.getElementById('email');
const phonenumber = document.getElementById('phone');
const username = document.getElementById('username');
const password = document.getElementById('password');
const cpassword = document.getElementById('cpassword');
const nameerror = document.getElementById('nameerror');
const contacterror = document.getElementById('contacterror');
const infoerror = document.getElementById('infoerror');
const submitRegister = document.getElementById('nextBtn');
const loadingOverlay = document.getElementById('loadingOverlay');
const dialogoverlay = document.getElementById('dialogoverlay');
const dialogbox = document.getElementById('dialogbox');
const close = document.getElementById('closebutton');
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
      if (data.status === 200 && data.data[0].roles === 'user') {
        loadingOverlay.style.display = 'none';
        window.location.replace('./profile.html');
        return;
      }
      if (data.status === 200 && data.data[0].roles === 'admin') {
        loadingOverlay.style.display = 'none';
        window.location.replace('./admin.html');
        return;
      }
      loadingOverlay.style.display = 'none';
    }).catch((err) => {
      loadingOverlay.style.display = 'none';
    });
  } else {
    loadingOverlay.style.display = 'none';
  }
});

const registerToApi = () => {
  fetch(`${url}/auth/signUp`, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      firstname: firstname.value,
      lastname: lastname.value,
      email: email.value,
      phonenumber: phonenumber.value,
      username: username.value,
      password: password.value,
      confirmpassword: cpassword.value,
    }),
  }).then(response => response.json()).then((data) => {
    if (data.status === 200) {
      infoerror.innerText = '';
      loadingOverlay.style.display = 'none';
      dialogoverlay.style.display = 'block';
      dialogbox.style.display = 'block';
      return;
    }
    loadingOverlay.style.display = 'none';
    infoerror.innerText = data.message;
  }).catch((err) => {
    loadingOverlay.style.display = 'none';
    infoerror.innerText = 'Network problem, Please reload';
  });
};

const validateForm = () => {
  let valid = true;
  if (firstname.value.trim().length < 1) {
    nameerror.innerText = 'First name cannot be empty';
    firstname.className += ' invalid';
    valid = false;
    return;
  }
  if (lastname.value.trim().length < 1) {
    lastname.className += ' invalid';
    nameerror.innerText = 'Last name cannot be empty';
    valid = false;
    return;
  }
  nameerror.innerText = '';
  if (submitRegister.innerText === 'Almost there') {
    if (!verifyEmail(email.value)) {
      contacterror.innerText = 'Email syntax is wrong';
      email.className += ' invalid';
      valid = false;
      return;
    } if (!verifyPhone(phonenumber.value)) {
      contacterror.innerText = 'Phone number is Invalid';
      phonenumber.className += ' invalid';
      valid = false;
      return;
    }
  }
  contacterror.innerText = '';
  if (submitRegister.innerText === 'Submit') {
    if (username.value.trim().length < 1) {
      infoerror.innerText = 'Username cannot be empty';
      username.className += ' invalid';
      valid = false;
      return;
    }
    if (!verifyPassword(password.value)) {
      infoerror.innerText = 'Number or Alphabets must be Included in password';
      password.className += ' invalid';
      valid = false;
      return;
    }
    if (password.value !== cpassword.value) {
      infoerror.innerText = 'Confirm password and Password not equal';
      cpassword.className += ' invalid';
      valid = false;
      return;
    }
    loadingOverlay.style.display = 'flex';
    return registerToApi();
  }
  if (valid) {
    document.getElementsByClassName('step')[currentTab].className += ' finish';
  }
  return valid;
};

close.addEventListener('click', () => {
  dialogoverlay.style.display = 'none';
  dialogbox.style.display = 'none';
  window.location.replace('./signUp.html');
});

const loginUser = (e) => {
  e.preventDefault();
  if (!verifyEmail(loginEmail.value)) {
    loginError.innerHTML = 'Email syntax is Incorrect';
    return;
  }
  if (!verifyPassword(loginPassword.value)) {
    loginError.innerHTML = 'Password must contain alphabet or numbers';
    return;
  }
  if (loginPassword.value.length < 6) {
    loginError.innerHTML = 'Password must not be less than six characters';
    return;
  }
  loginError.innerHTML = '';
  fetch(`${url}/auth/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: loginEmail.value,
      password: loginPassword.value,
    }),
  }).then(response => response.json()).then((data) => {
    if (data.status === 200) {
      if (typeof (Storage) !== 'undefined') {
        localStorage.setItem('token', `${data.data.token}`);
      }
      window.location.replace('./profile.html');
      return;
    }
    loginError.innerHTML = data.message;
  });
};


loginSubmit.addEventListener('click', loginUser);
