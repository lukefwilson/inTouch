// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

var connectionsId = 'connections';
var groupsId = 'groups';
var emailsId = 'emails';

var modalVisible = false;
var showModal = function() {
  $('#modal-view-wrapper').fadeIn();
  modalVisible = true;
}
var hideModal = function() {
  $('#modal-view-wrapper').fadeOut();
  modalVisible = false;
}

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

  $("#sidebar-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
    $("#sidebar-toggle i").toggleClass("toggled");
  });

  routie({
    'connections/:id?': function(id) {
      switchToNav(connectionsId);
      if (!id) {
        console.log("Connections");
      } else if (id === "new") {
        showModal();
      } else {
        console.log("YO!" + id);
        // check if id exists, else go to connections index
      }
    },
    'groups/:id?': function(id) {
      switchToNav(groupsId);
      if (!id) {
        console.log("groups");
      } else if (id === "new") {
        console.log("YO lets make a new group!");
      } else {
        console.log("YO group" + id);
        // check if id exists, else go to connections index
      }
    },
    'emails': function(id) {
      switchToNav(emailsId);
      if (!id) {
        console.log("emails");
      } else if (id === "new") {
        console.log("YO lets make a new email!");
      } else {
        console.log("YO email" + id);
        // check if id exists, else go to connections index
      }
    },
    '*': function() {
      switchToNav(connectionsId);
      hideModal();
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

  $('#modal-view-wrapper').click(function(e) {
    // close modal on click
    console.log(e.target);
    if (e.target.id === 'modal-view-wrapper') {
      routie('');
    }
  });

};

$(document).ready(ready);
$(document).on('page:load', ready);
