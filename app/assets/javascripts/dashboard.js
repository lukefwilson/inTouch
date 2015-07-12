// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

var connectionsId = 'connections';
var groupsId = 'groups';
var emailsId = 'emails';

var $sidebarWrapper;

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

var animateNavSwitch = function(navName) {
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

var switchToNav = function(navName) {
  if ($sidebarWrapper.width() > 100) {
    if ($sidebarWrapper.scrollTop() > 0) {
      $sidebarWrapper.scrollTo(0, 100,
        {
          onAfter : function() {
            animateNavSwitch(navName);
          }
        }
      );
    } else {
      animateNavSwitch(navName);
    }
  }
}

$.formToJSON = function($form) {
  var array = $form.serializeArray();
  var json = {};

  $.each(array, function() {
      json[this.name] = this.value || '';
  });

  return json;
}

var parseModelsFromListElement = function($listEl) {
  var models = [];
  $listEl.children().each(function (i, listItem) {
    models.push(listItem.dataset);
  });
  return models;
}

var postNewModelWithForm = function(form, type) {
  var $form = $(form);

  var $formButton = $form.find('button:submit');
  $formButton.prop('disabled', true);
  $buttonIcon = $formButton.children('i');
  $buttonIcon.removeClass('fa-plus').addClass('fa-circle-o-notch fa-spin')

  var formData = $.formToJSON($form);

  var model;
  if (type === 'connections') {
    model = new InTouch.Models.Connection(formData);
  }
  model.save({}, {
    error: function() {
      $buttonIcon.removeClass('fa-circle-o-notch fa-spin').addClass('fa-plus')
      $formButton.prop('disabled', false);
      popdownView.show();
    },
    success: function (response) {
      connectionCollection.add(model); // TODO clean up with events
      sidebarConnectionsListView.render();
      routie(type + '/' + response.id);
    }
  });
}

var ready = function() {
  $sidebarWrapper = $('#sidebar-wrapper');

  connectionCollection = new InTouch.Collections.Connections(
      parseModelsFromListElement($("#connections ul"))
    );

  sidebarConnectionsListView = new InTouch.Views.ConnectionsList({
      el: $("#connections ul"),
      collection: connectionCollection
    });

  modalView = new InTouch.Views.Modal({
      el: $('#modal-view-wrapper'),
      contentEl: $('#modal-content')
    });

  popdownView = new InTouch.Views.Popdown({
    el: $('#popdown-wrapper'),
    contentEl: $('.popdown-content:first')
  });

  $("#sidebar-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
    $("#sidebar-toggle i").toggleClass("toggled");
  });

  routie({
    'connections/:id': function(id) {
      if (id === "new") {
        var template = HandlebarsTemplates['connections/new']();
        modalView.show(template);
      } else {
        console.log("YO!" + id);
      }
    },
    'groups/:id': function(id) {
      if (id === "new") {
        modalView.show();
      } else {
        console.log("YO group" + id);
      }
    },
    'emails/:id': function(id) {
      console.log("YO email" + id);
    },
    'settings': function(id) {
      modalView.show();
    },
    '*': function() {
      modalView.hide();
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
