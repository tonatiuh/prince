Prince.Models.Enemy = Backbone.Model.extend({
  url : '/enemy',

  defaults : {
    name   : '',
    planet : ''
  },

  initialize: function(){
    this.on('add', this.setId, this);
  },

  setId : function(){ this.set('cid', this.cid); }
});
