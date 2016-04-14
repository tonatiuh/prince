Prince.Views.HomeEnemyList = Prince.Views.EnemyList.extend({

  events : {
    'click .js-active' : 'activate'
  },

  activate : function(event){
    var $el   = $(event.currentTarget);
    var id    = $el.attr('data-id');
    var model = this.collection.findWhere({cid : id});
    model.set('active', $el.is(':checked'));
  }

});
