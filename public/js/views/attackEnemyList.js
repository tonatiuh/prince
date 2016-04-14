Prince.Views.AttackEnemyList = Prince.Views.EnemyList.extend({

  init : function(){
    this.views = [];
    this.list  = _.map(JSON.parse(localStorage.getItem('enemies')), function(active){
      return active.name;
    });

    this.collection.on('add', this.clean, this);
  },

  clean : function(enemy){
    if(!_.contains(this.list, enemy.get('name'))){ return this.remove(enemy); }

    this.views.push(new Prince.Views.ItemView({
      el    : this.$el.find('[data-id=' + enemy.cid + ']'),
      model : enemy
    }));
  }

});
