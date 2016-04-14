Prince.Views.AttackContainer = Backbone.View.extend({

  initialize : function(){
    this.list = new Prince.Views.AttackEnemyList({
      el         : '#containers',
      collection : this.collection
    });
  }

});
