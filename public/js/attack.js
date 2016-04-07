Prince.attack = function(){
  var $containers = $('#containers');
  var $mainReport = $('#mainReport');

  /*
   * Containers
   * */
  var template   = _.template($('#container-template').html());
  var enemies    = JSON.parse(localStorage.getItem('enemies'));

  _.each(enemies, function(enemie){
    enemie.name = enemie.name.replace(/ /g, '_');
    var a = template(enemie);
    $containers.append(a);
  });

  setEvents(setEvents, 10);

  /*
   * Hanlders
   * */
  function setEvents(){
    var $list = $containers.find('.js-container');
    _.each($list, function(container){
      var $container = $(container);
      var $progress  = $container.find('.progress');
      var $report    = $container.find('.js-report');
      var $attack    = $container.find('.js-attack');
      var $time      = $container.find('.js-duration');
      var $rate      = $container.find('.js-rate');

      $time.on('focusout keyup', function(event){ $container.data('time', this.value); $container.trigger('enableAttack'); });
      $rate.on('focusout keyup', function(event){ $container.data('rate', this.value); $container.trigger('enableAttack'); });

      $container.click(function(){
        $('.bg-info').removeClass('bg-info');
        $container.addClass('bg-info');
        $mainReport[0].contentDocument.location.reload(true);
        var name = $container.attr('data-name');
        $mainReport.attr('src', 'reports/'+name+'.html');
      });

      $container.on('enableAttack', function(){ $attack.prop('disabled', !($container.data().time && $container.data().rate)); });

      $attack.click(function(event){
        event.preventDefault();
        $progress.removeClass('hide');
        var data = $container.data();
        var $bar = $progress.find('.progress-bar');
        console.log(data);

        var percentage = 0;
        var request    = $.ajax({
          method : 'POST',
          url    : '/attack',
          data   : data
        });

        var timer = setInterval(function(){
          if(percentage > 90){ clearInterval(timer); }else{
            percentage = percentage + (10 / data.time);
            $bar.attr('style', 'min-width: '+percentage+'%;');
            $bar.text(percentage + "%");
          }
        }, 100);

        //Attacking !
        $time.prop('disabled', true);
        $rate.prop('disabled', true);
        $attack.prop('disabled', true);

        request.success(function(response){
          percentage = 0;
          clearInterval(timer);
          $progress.addClass('hide');
          $report[0].contentDocument.location.reload(true);
          $mainReport[0].contentDocument.location.reload(true);
          $time.prop('disabled', false);
          $rate.prop('disabled', false);
          $attack.prop('disabled', false);
        });

      });

    });
  }
};
