InTouch.Views.Modal = Backbone.View.extend({

  events: {
    'click' : 'handleClick',
  },

  $contentEl: null,

  visible: false,

  initialize: function(options) {
    this.$contentEl = options.contentEl;
    this.listenTo(this.model, "change", this.render);
  },

  show: function(innerHTML) {
    if (this.visible) {
      var $content = this.$contentEl;
      this.$contentEl.fadeOut({
        duration: 200,
        done: function() {
          $content.html(innerHTML);
          $content.fadeIn();
        }
      });
    } else {
      this.$contentEl.html(innerHTML)
      this.$el.fadeIn(200);
    }
    this.visible = true;
  },

  hide: function() {
    this.$el.fadeOut();
    this.visible = false;
  },

  handleClick: function(e) {
    if (e.target === this.$el[0]) {
      routie('');
    }
  },
});
