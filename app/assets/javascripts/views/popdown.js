InTouch.Views.Popdown = Backbone.View.extend({

  events: {
    'click' : 'hide',
  },

  visible: false,

  initialize: function(options) {
    this.$contentEl = options.contentEl;
    this.listenTo(this.model, "change", this.render);
  },

  show: function(innerHTML) {
    var html = innerHTML || 'Something went wrong. Please try again!';
    this.$el.addClass('open error');
    this.$contentEl.html(html);
    this.visible = true;
  },

  hide: function() {
    this.$el.removeClass('open success error notice')
    this.visible = false;
  }
});
