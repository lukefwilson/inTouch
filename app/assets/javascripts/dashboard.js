// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

var connectionsId = 'connections';
var groupsId = 'groups';
var emailsId = 'emails';

var $popdown;
var $sidebarWrapper;

var connections;
var sidebarConnections;

var ConnectionModel = Backbone.Model.extend({
  url: '/connections'
});
var ConnectionCollection = Backbone.Collection.extend({
  model: ConnectionModel
});

var SidebarConnectionView = Backbone.View.extend({
  tagName: "li",

  template: HandlebarsTemplates['connections/sidebar_list_item'],

  events: {},

  initialize: function() {
    this.listenTo(this.model, "change", this.render);
  },

  render: function() {
    this.$el.html(this.template(this.model.attributes));
    return this;
  }
});

var SidebarConnectionsView = Backbone.View.extend({
  render: function(){
    this.$el.html('');
    this.collection.each(function(connection){
      var connectionView = new SidebarConnectionView({ model: connection });
      this.$el.append(connectionView.render().el);
    }, this);
    return this;
  }
});

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

var showPopdownError = function(customText) {
  var html = customText || 'Something went wrong. Please try again!';
  $popdown.addClass('open error');
  $popdown.children().eq(0).html(html);
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

var postNewModelWithForm = function(form, type) {
  var $form = $(form);

  var $formButton = $form.find('button:submit');
  $formButton.prop('disabled', true);
  $buttonIcon = $formButton.children('i');
  $buttonIcon.removeClass('fa-plus').addClass('fa-circle-o-notch fa-spin')

  var formData = $.formToJSON($form);

  var model;
  if (type === 'connections') {
    model = new ConnectionModel(formData);
  }
  model.save({}, {
    error: function() {
      $buttonIcon.removeClass('fa-circle-o-notch fa-spin').addClass('fa-plus')
      $formButton.prop('disabled', false);
      showPopdownError();
    },
    success: function (response) {
      connections.add(model); // TODO clean up with events
      sidebarConnections.render();
      routie(type + '/' + response.id);
    }
  });
}

var parseModels = function($listEl) {
  var models = [];
  $listEl.children().each(function (i, listItem) {
    models.push(listItem.dataset);
  });
  return models;
}

var ready = function() {
  $popdown = $('#popdown-wrapper');
  $sidebarWrapper = $('#sidebar-wrapper');

  connections = new ConnectionCollection(parseModels($("#connections ul")));
  sidebarConnections = new SidebarConnectionsView({el: $("#connections ul"), collection: connections});

  $popdown.on('click', function(e) {
    $popdown.removeClass('open success error notice')
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
