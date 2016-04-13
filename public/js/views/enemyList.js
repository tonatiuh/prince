Prince.Views.EnemyList = Backbone.View.extend({

  events : {
    'click .js-active' : 'activate'
  },

  initialize: function(){
    this.$list    = this.$el.find('.list');
    this.template = _.template($('#list-item-template').html());

    this.collection.on('add'    , this.render, this);
    this.collection.on('remove' , this.remove, this);
    this.collection.fetch();
  },

  activate : function(event){
    var $el   = $(event.currentTarget);
    var id    = $el.attr('data-id');
    var model = this.collection.findWhere({cid : id});
    model.set('active', $el.is(':checked'));
  },

  render : function(enemy){
    var newEnemy = this.template(enemy.toJSON());
    this.$el.append(newEnemy);
  },

  remove : function(enemy){
    this.$el.find('tr[data-id=' + enemy.cid + ']').remove();
  }


});
