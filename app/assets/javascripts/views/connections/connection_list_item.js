InTouch.Views.ConnectionListItem = Backbone.View.extend({
  tagName: "li",

  template: HandlebarsTemplates['connections/list_item'],

  events: {},

  initialize: function() {
    this.listenTo(this.model, "change", this.render);
  },

  render: function() {
    this.$el.html(this.template(this.model.attributes));
    return this;
  }
});
