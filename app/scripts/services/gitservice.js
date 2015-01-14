'use strict';

/**
 * @ngdoc service
 * @name gitStuffApp.gitService
 * @description
 * # gitService
 * Service in the gitStuffApp.
 */
angular.module('gitStuffApp')
  .service('gitService', function ($http) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var getUser = function (searchTerm) {
      $http.get('api.github.com/user/searchTerm').
        success(function (data, status, headers, config) {
          return data;
        }).
        error(function (data, status, headers, config) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          return "";
        });
    }
  });