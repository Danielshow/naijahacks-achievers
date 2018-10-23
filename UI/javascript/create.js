if(!(document.body.style.width > 992 || document.documentElement.style.width > 992)){
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


// confirmation button
let confirm = document.getElementById('confirm');
let disable = document.getElementById('disable').disabled=true;

confirm.addEventListener('click', ()=> {
  if(confirm.checked){
    document.getElementById('disable').disabled=false;
  }else{
    document.getElementById('disable').disabled=true;
  }
});
