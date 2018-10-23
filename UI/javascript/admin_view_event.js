
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
