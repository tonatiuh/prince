Prince.index = function(){

  // Local elements
  var $list    = $('#js-list');
  var $addForm = $('#js-add');
  var $attack  = $('.js-attack');

  /*
   * List
   * */
  var request  = $.ajax({ url : '/enemy' });
  var $enemies = $list.find('.list');
  request.success(function(list){
    _.each(list, addEnemie);
  });

  var template = _.template($('#list-template').html());

  /*
   * Form
   * */
  var newEnemy   = {};
  var $addName   = $addForm.find('.js-name');
  var $addPlanet = $addForm.find('.js-planet');
  var $addButton = $addForm.find('.js-add');

  // Attach data
  $addName.on('focusout keyup'  , function(event){ newEnemy.name   = this.value; enableForm(); });
  $addPlanet.on('focusout keyup', function(event){ newEnemy.planet = this.value; enableForm(); });

  // Save new enemy
  $addButton.click(function(event){
    event.preventDefault();
    newEnemy.name   = $.trim(newEnemy.name);
    newEnemy.planet = $.trim(newEnemy.planet);
    var request = $.ajax({
      method : 'POST'  ,
      url    : '/enemy',
      data   : newEnemy
    });

    request.success(function(response){
      addEnemie(newEnemy);
      newEnemy = {};
      $addName.val('');
      $addPlanet.val('');
      $addButton.prop('desabled', true);
    });

    request.error(function(error){
      console.log(error);
    });
  });

  /*
   * Attack
   * */
  $attack.click(function(event){
    event.preventDefault();
    var $active = $list.find('.js-active:checked');
    var enemies = _.map($active, function(element){
      var $element = $(element);
      return {
        name : $element.attr('data-name'),
        planet : $element.attr('data-planet')
      }
    });

    localStorage.setItem('enemies', JSON.stringify(enemies));
    window.location.assign('attack');
  });

  /*
   * Handlers
   * */
  function enableForm(){ $addButton.prop('disabled', !(newEnemy.name && newEnemy.planet)); };

  function addEnemie(enemie){
    enemie.name = enemie.name.replace(/_/g, ' ');
    var li = template(enemie);
    $enemies.append(li);
    var $li = $list.find('.js-active[data-planet="'+enemie.planet+'"]');

    $li.click(function(){
      var $active = $list.find('.js-active:checked');
      $attack.prop('disabled', !$active.length);
    });
  }

};
