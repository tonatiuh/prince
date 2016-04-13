Prince.Models.Enemy = Backbone.Model.extend({
  url : '/enemy',

  defaults : {
    name   : '',
    planet : '',
    active : false
  },

  initialize: function(){
    this.on('add', this.setId, this);
  },

  setId : function(){ this.set('cid', this.cid); }
});
