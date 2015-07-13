/* Utilities */
$.formToJSON = function($form) {
  var array = $form.serializeArray();
  var json = {};

  $.each(array, function() {
      json[this.name] = this.value || '';
  });

  return json;
};
$.parseListData = function($listEl) {
  var models = [];
  $listEl.children().each(function (i, listItem) {
    models.push(listItem.dataset);
  });
  return models;
};

/* Logic */
var sidebarNav = {
  connectionsId: 'connections',
  groupsId: 'groups',
  emailsId: 'emails',
  $sidebarWrapper: null,

  initialize: function() {
    sidebarNav.$sidebarWrapper = $('#sidebar-wrapper');

    $('#nav-' + sidebarNav.connectionsId).click(function(e) {
      e.preventDefault();
      sidebarNav.switchToNav(sidebarNav.connectionsId);
    });

    $('#nav-' + sidebarNav.groupsId).click(function(e) {
      e.preventDefault();
      sidebarNav.switchToNav(sidebarNav.groupsId);
    });

    $('#nav-' + sidebarNav.emailsId).click(function(e) {
      e.preventDefault();
      sidebarNav.switchToNav(sidebarNav.emailsId);
    });
  },

  selectNavContent: function(navName) {
    var $navContent = $('#' + navName);
    $navContent.addClass('selected');
    $navContent.removeClass('not-selected');
    $('#nav-' + navName).addClass('selected');

    $navContent.removeClass('hidden'); // for initial load
  },

  deselectNavContent: function(navName) {
    var $navContent = $('#' + navName);
    $navContent.removeClass('selected');
    $navContent.addClass('not-selected');
    $('#nav-' + navName).removeClass('selected');
  },

  animateNavSwitch: function(navName) {
    if (navName === sidebarNav.connectionsId) {
      sidebarNav.selectNavContent(sidebarNav.connectionsId);
      sidebarNav.deselectNavContent(sidebarNav.groupsId);
      sidebarNav.deselectNavContent(sidebarNav.emailsId);
    } else if (navName === sidebarNav.groupsId) {
      sidebarNav.deselectNavContent(sidebarNav.connectionsId);
      sidebarNav.selectNavContent(sidebarNav.groupsId);
      sidebarNav.deselectNavContent(sidebarNav.emailsId);
    } else if (navName === sidebarNav.emailsId) {
      sidebarNav.deselectNavContent(sidebarNav.connectionsId);
      sidebarNav.deselectNavContent(sidebarNav.groupsId);
      sidebarNav.selectNavContent(sidebarNav.emailsId);
    }
  },

  switchToNav: function(navName) {
    if (sidebarNav.$sidebarWrapper.width() > 100) {
      if (sidebarNav.$sidebarWrapper.scrollTop() > 0) {
        sidebarNav.$sidebarWrapper.scrollTo(0, 100,
          {
            onAfter : function() {
              sidebarNav.animateNavSwitch(navName);
            }
          }
        );
      } else {
        sidebarNav.animateNavSwitch(navName);
      }
    }
  }
};

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
      if (type === 'connections') {
        connectionCollection.add(model);
      }
      routie(type + '/' + response.id);
    }
  });
};

var ready = function() {
  connectionCollection = new InTouch.Collections.Connections(
      $.parseListData($("#connections ul"))
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

  sidebarNav.initialize();

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
        modalView.show('<p>new new new</p>');
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
};

$(document).ready(ready);
$(document).on('page:load', ready);
