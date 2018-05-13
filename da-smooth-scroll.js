//by marc landolt
// inserted by landev to scroll from everywhere to everywhere
$(document).ready(function(){
  $("a.scroll").on('click', function(event) {
    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;
      $('html, body').animate({
        scrollTop: $(hash).offset().top -130
      }, 800, function(){
        //window.location.hash = hash;
      });
    }
  });
});





