if (!(document.body.style.width > 992 || document.documentElement.style.width > 992)) {
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
}

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

function cat() {
  if (this.value == 'music') {
    m = Array.from(music);
    for (let i = 0; i < m.length; i++) {
      console.log(m[i].style.display = 'none');
    }
  }
}


minSearch.addEventListener('click', dateSearch, false);
maxSearch.addEventListener('click', eventSearch, false);

// minSearch function
function dateSearch() {
  filter = byMonth.value;
  console.log(filter);
  list = document.getElementsByClassName('details');

  // res = new RegExp(filter, "gi");
  for (i = 0; i < list.length; i++) {
    li = list[i].getElementsByTagName('span')[0];
    if (li.innerHTML.indexOf(filter) != -1) {
      list[i].parentNode.style.display = 'block';
    } else {
      list[i].parentNode.style.display = 'none';
    }
    if (li.innerHTML.indexOf(filter) == -1) {
      err.style.display = 'block';
      popup.style.display = 'block';
    }
  }
}
// maxSearch function
function eventSearch() {
  filter = byEvent.value.toUpperCase();
  list = document.getElementsByClassName('details');

  for (i = 0; i < list.length; i++) {
    li = list[i].getElementsByTagName('h6')[0];
    if (li.innerHTML.toUpperCase().indexOf(filter) != -1) {
      list[i].parentNode.style.display = 'block';
    } else {
      list[i].parentNode.style.display = 'none';
    }
    if (li.innerHTML.indexOf(filter) == -1) {
      err.style.display = 'block';
      popup.style.display = 'block';
    }
  }
}


// Get the modal
const modal = document.getElementById('myModal');
// Get the image and insert it inside the modal - use its "alt" text as a caption
const img = document.querySelectorAll('.myImg:nth-child(n)');
const caption = document.getElementById('caption');
for (var i = 0; i < img.length; i++) {
  img[i].onclick = function () {
    modal.style.display = 'block';
    caption.style.display = 'block';
  };
}

// Get the <span> element that closes the modal
const span = document.getElementsByClassName('close')[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = 'none';
  caption.style.display = 'none';
};
