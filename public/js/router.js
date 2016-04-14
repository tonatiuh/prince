Prince.Router = Backbone.Router.extend({

  routes: {
    ""       : "home",
    "attack" : "attack"
  },

  home : function(){
    this.collection = new Prince.Collections.Enemies();
    this.container  = new Prince.Views.HomeContainer({
      el         : '.container',
      collection : this.collection
    });
  },

  attack : function(){
    this.collection = new Prince.Collections.Enemies();
    this.container  = new Prince.Views.AttackContainer({
      el         : '.container',
      collection : this.collection
    });
  }

});
