'use strict';

const _ = require('underscore');

module.exports = {

  mustHave: function(object, attrs){
    return attrs.every(function(attr){
      return _.has(object, attr)
    });
  }

};
