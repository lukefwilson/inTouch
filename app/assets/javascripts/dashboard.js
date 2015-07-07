// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.



var ready = function() {

  $("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
  });

};

$(document).ready(ready);
$(document).on('page:load', ready);
