var Prince = {
  Models      : {},
  Collections : {},
  Views       : {},

  Init : function(){
    Prince.router = new Prince.Router();
    Backbone.history.start();
  }
};

$(Prince.Init);

_.templateSettings = {
  interpolate: /\{\{(.+?)\}\}/g
};
