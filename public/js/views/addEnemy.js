Prince.Views.AddEnemy = Backbone.View.extend({

  events : {
    'keyup .js-add-enemy-name'   : 'enable',
    'keyup .js-add-enemy-planet' : 'enable',
    'click .js-add-enemy-add'    : 'add'
  },

  initialize: function(){
    this.$name   = this.$el.find('.js-add-enemy-name');
    this.$planet = this.$el.find('.js-add-enemy-planet');
    this.$add    = this.$el.find('.js-add-enemy-add');

    this.collection.on('error', this.onError, this);
  },

  enable : function(){
    var valid = !(this.$name.val() && this.$planet.val());
    this.$add.prop('disabled', valid);
  },

  add : function(event){
    event.preventDefault();

    var request = this.collection.create({
      name   : $.trim(this.$name.val()),
      planet : $.trim(this.$planet.val())
    });
  },

  onError : function(enemy, jqXhr){
    if(jqXhr.status === 200){ return false; }
    this.collection.remove(enemy);
  }

});
