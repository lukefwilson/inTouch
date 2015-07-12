InTouch.Views.Modal = Backbone.View.extend({

  events: {},

  $contentEl: null,

  visible: false,

  initialize: function(options) {
    this.$contentEl = options.contentEl;
    this.listenTo(this.model, "change", this.render);
  },

  show: function(innerHTML) {
    this.$contentEl.html(innerHTML)
    this.$el.fadeIn();
    this.visible = true;
  },

  hide: function() {
    this.$el.fadeOut();
    this.visible = false;
  }
});
