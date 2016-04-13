Prince.attack = function(){
  var $attackAll       = $('#js-attack-all');
  var $containers      = $('#containers');
  var $mainReport      = $('#mainReport');
  var $mainReportTitle = $('.main-title');

  /*
   * Attack All
   * */
  var $attackAllButton = $attackAll.find('.js-attack');
  var $attackAllTime   = $attackAll.find('.js-time');
  var $attackAllRate   = $attackAll.find('.js-rate');

  $attackAllTime.on('focusout keyup', function(event){ $attackAllButton.data('time', this.value); $attackAllButton.trigger('enableAttack'); });
  $attackAllRate.on('focusout keyup', function(event){ $attackAllButton.data('rate', this.value); $attackAllButton.trigger('enableAttack'); });

  $attackAllButton.on('enableAttack', function(){ $attackAllButton.prop('disabled', !($attackAllTime.val() && $attackAllRate.val())); });

  $attackAllButton.click(function(event){
    event.preventDefault();

    $attackAllTime.val('');
    $attackAllRate.val('');
    $attackAllButton.prop('disabled', true);
    var data = $attackAllButton.data();

    var $list = $containers.find('.js-container');
    _.each($list, function(el){
      var $el = $(el);
      $el.data(data);
      $el.find('.js-duration').val(data.time);
      $el.find('.js-rate').val(data.rate);
      $el.find('.js-attack').click();
    });
  });

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
        $container.find('.controls').addClass('bg-info');
        $mainReport[0].contentDocument.location.reload(true);
        var name   = $container.attr('data-name');
        var planet = $container.attr('data-planet');
        $mainReport.attr('src', 'reports/'+name+'.html');
        $mainReportTitle.find('.name').text(name);
        $mainReportTitle.find('.planet').text("("+planet+")");
      });

      $container.on('enableAttack', function(){ $attack.prop('disabled', !($container.data().time && $container.data().rate)); });

      $attack.click(function(event){
        event.preventDefault();
        $progress.removeClass('hide');
        var data = $container.data();
        var $bar = $progress.find('.progress-bar');

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
