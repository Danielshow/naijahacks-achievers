if (!(document.body.style.width > 992 || document.documentElement.style.width > 992)) {
  function openNav() {
    document.getElementById('mysidenav').style.width = "200px";
    document.getElementById('main').style.marginLeft = "-200px";
    document.getElementById('main').style.marginRight = "200px";
    document.getElementById('openMenu').style.display = "none";
    document.getElementById('closeMenu').style.display = "block";
  }

  function closeNav() {
    document.getElementById('mysidenav').style.width = '0';
    document.getElementById("main").style.marginLeft = "0";
    document.getElementById("main").style.marginRight = "0";
    document.getElementById('openMenu').style.display = "";
    document.getElementById('closeMenu').style.display = "none";
  }
}

const music = document.getElementsByClassName('music')
const arts = document.getElementsByClassName('arts')
const business = document.getElementsByClassName('business')
const sport = document.getElementsByClassName('sport')
const party = document.getElementsByClassName('party')
const festival = document.getElementsByClassName('festival')
const sciTech = document.getElementsByClassName('sciTech')
const conference = document.getElementsByClassName('conference');

//date by id
let minSearch = document.getElementById('minSearch');
let maxSearch = document.getElementById('maxSearch');
let catalog = document.getElementById('catalog');
let today = document.getElementById('today');
let tomorrow = document.getElementById('tomorrow');
let this_week = document.getElementById('this_week');
let this_month = document.getElementById('this_month');
let next_month = document.getElementById('next_month');
let byMonth = document.getElementById('byMonth');
let byEvent = document.getElementById('byEvent');
let err = document.getElementById('err');
let ok = document.getElementById('ok');
let popup = document.getElementById('popup')

catalog.addEventListener('change', cat, false);

function cat() {
  if (this.value == "music") {
    m = Array.from(music);
    for (let i = 0; i < m.length; i++) {
      console.log(m[i].style.display = 'none');
    }
  }
}

ok.addEventListener('click', ()=>{
  err.style.display = 'none';
  popup.style.display = 'none';
})
minSearch.addEventListener('click', dateSearch, false)
maxSearch.addEventListener('click', eventSearch, false)

// minSearch function
function dateSearch(){
  filter = byMonth.value;
  console.log(filter);
  list = document.getElementsByClassName("details");

  //res = new RegExp(filter, "gi");
  for (i = 0; i < list.length; i++) {
    li = list[i].getElementsByTagName("span")[0];
    if(li.innerHTML.indexOf(filter) != -1){
      list[i].parentNode.style.display = "block";
    } else if(li.innerHTML.indexOf(filter) == -1){
      list[i].parentNode.style.display = "none";
        err.style.display = 'block';
        popup.style.display = 'block';
    }
  }
}
// maxSearch function
function eventSearch() {
  filter = byEvent.value.toUpperCase();
  list = document.getElementsByClassName("details");

  for (i = 0; i < list.length; i++) {
    li = list[i].getElementsByTagName("h6")[0];
    if (li.innerHTML.toUpperCase().indexOf(filter) != -1) {
      list[i].parentNode.style.display = "block";
    } else {
      list[i].parentNode.style.display = "none";
      err.style.display = 'block';
      popup.style.display = 'block';
    }
  }
}



// Get the modal
var modal = document.getElementById('myModal');
// Get the image and insert it inside the modal - use its "alt" text as a caption
var img = document.querySelectorAll('.myImg:nth-child(n)');
var caption = document.getElementById("caption");
for(var i=0; i<img.length; i++){
  img[i].onclick = function(){
      modal.style.display = "block";
      caption.style.display = 'block';
  }
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
    caption.style.display = 'none';
}
