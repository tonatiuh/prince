Prince.Views.EnemyList = Backbone.View.extend({

  initialize: function(){
    this.template = _.template($('#list-item-template').html());

    this.collection.on('add'    , this.render, this);
    this.collection.on('remove' , this.remove, this);
    this.collection.fetch();

    if(this.init){ this.init(); }
  },

  render : function(enemy){
    var newEnemy = this.template(enemy.toJSON());
    this.$el.append(newEnemy);
  },

  remove : function(enemy){
    this.$el.find('[data-id=' + enemy.cid + ']').remove();
  }

});
