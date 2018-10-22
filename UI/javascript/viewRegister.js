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



// Get the modal
var modal = document.getElementById('myModal');
// Get the image and insert it inside the modal - use its "alt" text as a caption
var reg = document.querySelectorAll('.reg:nth-child(n)');
var caption = document.getElementById("caption");
for (var i = 0; i < reg.length; i++) {
  reg[i].onclick = function() {
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
