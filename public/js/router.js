Prince.Router = Backbone.Router.extend({

  routes: {
    "": "home",
  },

  home: function(){
    this.collection = new Prince.Collections.Enemies();
    this.container  = new Prince.Views.HomeContainer({
      el         : '.container',
      collection : this.collection
    });
  }

});
