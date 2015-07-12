InTouch.Views.ConnectionsList = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.collection, "update", this.render);
  },

  render: function(){
    this.$el.html('');
    this.collection.each(function(connection){
      var connectionView = new InTouch.Views.ConnectionListItem({ model: connection });
      this.$el.append(connectionView.render().el);
    }, this);
    return this;
  }
});
