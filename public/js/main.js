var Prince = {
  Initialize : function(){
    var controller = window.location.pathname.slice(1, window.location.pathname.length);
    (controller) || (controller = 'index');
    Prince[controller]();
  }
};

_.templateSettings = {
  interpolate: /\{\{(.+?)\}\}/g
};
$(Prince.Initialize);
