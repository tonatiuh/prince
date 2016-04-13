Prince.Views.HomeContainer = Backbone.View.extend({
  initialize : function(){

    this.addEnemy = new Prince.Views.AddEnemy({
      el         : '.js-add-enemy',
      collection : this.collection
    });

    this.list = new Prince.Views.EnemyList({
      el         : '#js-enemy-list',
      collection : this.collection
    });

  }
});
