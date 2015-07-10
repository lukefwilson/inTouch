// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

var connectionsId = 'connections';
var groupsId = 'groups';
var emailsId = 'emails';

var modalVisible = false;
var showModal = function(template) {
  $('#modal-content').html(template)
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

  $navContent.removeClass('hidden'); // for initial load
}

var deselectNavContent = function(navName) {
  var $navContent = $('#' + navName);
  $navContent.removeClass('selected');
  $navContent.addClass('not-selected');
  $('#nav-' + navName).removeClass('selected');
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

var postForm = function(form, postUrl) {
  var $form = $(form);
  var $formButton = $form.find('button:submit');

  $formButton.prop('disabled', true);

  $buttonIcon = $formButton.children('i');
  $buttonIcon.removeClass('fa-plus').addClass('fa-circle-o-notch fa-spin')

  $.ajax({
    type: "POST",
    url: postUrl,
    data: $form.serialize(),
    dataType: "json",
    success: function(response){
      routie('connections/' + response.id);
    },
    error: function(response) {
      $buttonIcon.removeClass('fa-circle-o-notch fa-spin').addClass('fa-plus')
      $formButton.prop('disabled', false);
      // show validation errors
      // response.responseJSON.errors
    }
  });
  return false;
}

var ready = function() {

  $("#sidebar-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
    $("#sidebar-toggle i").toggleClass("toggled");
  });

  routie({
    'connections/:id': function(id) {
      if (id === "new") {
        var template = HandlebarsTemplates['connections/new']();
        showModal(template);
      } else {
        console.log("YO!" + id);
      }
    },
    'groups/:id': function(id) {
      if (id === "new") {
        showModal();
      } else {
        console.log("YO group" + id);
      }
    },
    'emails/:id': function(id) {
      console.log("YO email" + id);
    },
    'settings': function(id) {
      showModal();
    },
    '*': function() {
      hideModal();
    }
  });

  $('#nav-' + connectionsId).click(function(e) {
    e.preventDefault();
    switchToNav(connectionsId);
  });

  $('#nav-' + groupsId).click(function(e) {
    e.preventDefault();
    switchToNav(groupsId);
  });

  $('#nav-' + emailsId).click(function(e) {
    e.preventDefault();
    switchToNav(emailsId);
  });

  $('#modal-view-wrapper').click(function(e) {
    // close modal on click
    if (e.target.id === 'modal-view-wrapper') {
      routie('');
    }
  });
};

$(document).ready(ready);
$(document).on('page:load', ready);
