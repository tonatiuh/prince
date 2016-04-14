var Prince = {
  Models      : {},
  Collections : {},
  Views       : {},

  Init : function(){
    Prince.router = new Prince.Router();
    Backbone.history.start({ pushState: true, root: "/" });
  }
};

$(Prince.Init);

_.templateSettings = {
  interpolate: /\{\{(.+?)\}\}/g
};
