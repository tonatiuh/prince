Prince.Views.HomeContainer = Backbone.View.extend({

  events : {
    'click .js-attack' : 'attack'
  },

  initialize : function(){
    this.$attack = this.$el.find('.js-attack');

    this.addEnemy = new Prince.Views.AddEnemy({
      el         : '.js-add-enemy',
      collection : this.collection
    });

    this.list = new Prince.Views.HomeEnemyList({
      el         : '#js-enemy-list',
      collection : this.collection
    });

    this.collection.on('change' , this.enableAttack,  this);
  },

  enableAttack : function(){
    var active = this.collection.where({active : true});
    this.$attack.prop('disabled', !active.length);
  },

  attack : function(){
    var enemies = _.map(this.collection.where({active : true}), function(enemy){
      enemy      = enemy.toJSON();
      enemy.name = enemy.name.replace(/ /g, '_');
      return enemy;
    });

    localStorage.setItem('enemies', JSON.stringify(enemies));
    window.location.assign('attack');
  }

});

