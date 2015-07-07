// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

var connectionsId = '#nav-connections';
var groupsId = '#nav-groups';
var emailsId = '#nav-emails';

var selectNavButton = function(navButtonId) {
  $(connectionsId).removeClass('selected');
  $(groupsId).removeClass('selected');
  $(emailsId).removeClass('selected');
  $(navButtonId).addClass('selected');
}

var ready = function() {

  $("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
  });

  routie({
    'connections/:id?': function(id) {
      selectNavButton(connectionsId);
      if (!id) {
        console.log("Connections");
      } else if (id === "new") {
        console.log("YO lets make a new connection!");
      } else {
        console.log("YO!" + id);
        // check if id exists, else go to connections index
      }
    },
    'groups': function() {
      selectNavButton(groupsId);
    },
    'emails': function() {
      selectNavButton(emailsId);
    },
    '*': function() {
      selectNavButton(connectionsId);
    }
  });

  $(connectionsId).click(function(e) {
    e.preventDefault();
    routie('connections');
  });

  $(groupsId).click(function(e) {
    e.preventDefault();
    routie('groups');
  });

  $(emailsId).click(function(e) {
    e.preventDefault();
    routie('emails');
  });
};

$(document).ready(ready);
$(document).on('page:load', ready);
