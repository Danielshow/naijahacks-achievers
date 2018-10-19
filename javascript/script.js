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

// slido function
window.onscroll = function() {
  scrollFunction()
};

function scrollFunction(){
  if (document.body.scrollTop > 600 || document.documentElement.scrollTop > 600){
    document.getElementById('slido').style.display = "block";
  }

}
