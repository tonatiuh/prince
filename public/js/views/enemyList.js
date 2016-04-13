Prince.Views.EnemyList = Backbone.View.extend({

  initialize: function(){
    this.$list    = this.$el.find('.list');
    this.template = _.template($('#list-item-template').html());

    this.collection.on('add'   , this.render, this);
    this.collection.on('remove', this.remove, this);
    this.collection.fetch();
  },

  render : function(enemy){
    var newEnemy = this.template(enemy.toJSON());
    this.$el.append(newEnemy);
  },

  remove : function(enemy){
    this.$el.find('[data-id=' + enemy.cid + ']').remove();
  }

});
