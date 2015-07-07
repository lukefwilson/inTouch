// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

var connectionsId = 'connections';
var groupsId = 'groups';
var emailsId = 'emails';

var selectNavContent = function(navName) {
  var $navContent = $('#' + navName);
  $navContent.addClass('selected');
  $navContent.removeClass('not-selected');
  $('#nav-' + navName).addClass('selected');

  $navContent.removeClass('hidden')
  $navContent.removeClass('first-load')
}

var deselectNavContent = function(navName) {
  var $navContent = $('#' + navName);
  if ($navContent.hasClass('first-load')) {
    $navContent.addClass('hidden')
    $navContent.removeClass('first-load')
  } else {
    $navContent.removeClass('selected');
    $navContent.addClass('not-selected');
    $('#nav-' + navName).removeClass('selected');
  }
}

var switchToNav = function(navName) {
  if (navName === connectionsId) {
    selectNavContent(connectionsId);
    deselectNavContent(groupsId);
    deselectNavContent(emailsId);
  } else if (navName === groupsId) {
    deselectNavContent(connectionsId);
    selectNavContent(groupsId);
    deselectNavContent(emailsId);
  } else if (navName === emailsId) {
    deselectNavContent(connectionsId);
    deselectNavContent(groupsId);
    selectNavContent(emailsId);
  }
}

var ready = function() {

  $("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
  });

  routie({
    'connections/:id?': function(id) {
      switchToNav(connectionsId);
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
      switchToNav(groupsId);
    },
    'emails': function() {
      switchToNav(emailsId);
    },
    '*': function() {
      switchToNav(connectionsId);
    }
  });

  $('#nav-' + connectionsId).click(function(e) {
    e.preventDefault();
    routie('connections');
  });

  $('#nav-' + groupsId).click(function(e) {
    e.preventDefault();
    routie('groups');
  });

  $('#nav-' + emailsId).click(function(e) {
    e.preventDefault();
    routie('emails');
  });
};

$(document).ready(ready);
$(document).on('page:load', ready);
