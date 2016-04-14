Prince.Views.ItemView = Backbone.View.extend({

  contentTemplate : '<tr><td><input method="" placeholder="GET"></td><td><input endpoint="" placeholder="/"></td><td><input body="" placeholder="{}"></td><td><input headers="" placeholder="[]"></td></tr>',

  events : {
    'keyup .js-duration'    : 'enable',
    'keyup .js-rate'        : 'enable',
    'click .js-attack'      : 'attack',
    'click .js-add-content' : 'addContent',
    'keyup [body]'          : 'checkBody',
    'focusout [body]'       : 'addHeader'
  },

  initialize : function(){
    this.$list   = this.$el.find('.list');
    this.$time   = this.$el.find('.js-duration');
    this.$rate   = this.$el.find('.js-rate');
    this.$attack = this.$el.find('.js-attack');
    this.$report = this.$el.find('.js-report');
  },

  checkBody : function(event){
    var body = event.currentTarget.value;

    try{
      body = JSON.parse(body);
      event.currentTarget.valid = true;
    }catch(error){
      event.currentTarget.valid = false;
    }
  },

  addHeader : function(event){
    var $el = $(event.currentTarget);
    $el.removeClass('bg-danger');

    if(!event.currentTarget.valid){
      $el.addClass('bg-danger'); return false;
    }

    var $headers = $el.parents('tr').find('[headers]');
    var headers  = $headers.val();

    try{
      headers = JSON.parse(headers);
    }catch(error){
      $headers.val('["Content-Type: application/json"]');
    }

    if(!_.contains(headers, "Content-Type: application/json")){ headers.push("Content-Type: application/json"); }
    $headers.val(JSON.stringify(headers));
  },

  block : function(){
    this.$el.addClass('bg-warning');
    this.$el.find('input').prop('disabled', true);
    this.$el.find('button').prop('disabled', true);
    this.$attack.prop('disabled', true);
  },

  unblock : function(){
    this.$el.removeClass('bg-warning');
    this.$el.find('input').prop('disabled', false);
    this.$el.find('button').prop('disabled', false);
    this.$attack.prop('disabled', false);
  },

  enable : function(){
    var valid = !(this.$time.val() && this.$rate.val());
    this.$attack.prop('disabled', valid);
  },

  addContent : function(){ this.$list.append(this.contentTemplate); },

  attack : function(){
    var content = _.map(this.$list.find('tr'), function(element){
      var $info = $(element);
      return {
        method   : $info.find('[method]').val(),
        endpoint : $info.find('[endpoint]').val(),
        body     : $info.find('[body]').val(),
        headers  : $info.find('[headers]').val()
      };
    });

    var data = {
      name    : this.model.get('name'),
      host    : this.model.get('planet'),
      time    : $.trim(this.$time.val()),
      rate    : $.trim(this.$rate.val()),
      content : content
    };

    var request = $.ajax({
      method : 'POST',
      url    : '/attack',
      data   : data
    });

    request.success(this.onSuccess.bind(this));
    this.block();
  },

  onSuccess : function(){
    this.unblock.call(this);
    this.$report[0].contentDocument.location.reload(true);
  }

});
