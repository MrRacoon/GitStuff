'use strict';

/**
 * @ngdoc service
 * @name gitStuffApp.gitService
 * @description
 * # gitService
 * Service in the gitStuffApp.
 */
angular.module('gitStuffApp')
  .service('gitService', function ($http, $q, $cacheFactory) {

    // Make caches for holding our data as a strategy to fight off the rate
    // limiter
    var uCache = $cacheFactory('uCache');
    var rCache = $cacheFactory('rCache');
    var fCache = $cacheFactory('fCache');

    // AngularJS will instantiate a singleton by calling "new" on this function
    this.getUser = function (searchTerm) {

      // Look to see if the user exists in the cache
      var cachedUser = uCache.get(searchTerm);
      var def = $q.defer();

      if (cachedUser) {
        def.resolve(cachedUser);
        return def.promise;
      }

      $http.get('https://api.github.com/users/' + searchTerm)
        .success(function (data) {
          uCache.put(searchTerm, data);
          def.resolve(data);
        })
        .error(function () {
          def.reject('Oops! No user found with username ' + searchTerm);
        });
      return def.promise;

    };


    this.getRepos = function (searchTerm) {

      // Look to see if the repos exists in the cache
      var cachedRepos = rCache.get(searchTerm);
      var def = $q.defer();

      if (cachedRepos) {
        def.resolve(cachedRepos);
        return def.promise;
      }

      $http.get('https://api.github.com/users/' + searchTerm + '/repos')
        .success(function (data) {
          rCache.put(searchTerm, data);
          def.resolve(data);
        })
        .error(function () {
          def.reject('Failed to get repos for user "' + searchTerm + '"');
        });
      return def.promise;

    };

    this.getFollowers = function (username) {

      var cachedFollowers = fCache.get(username);
      var def = $q.defer();

      if (cachedFollowers) {
        console.log('From Cache')
        def.resolve(cachedFollowers);
        return def.promise;
      }

      $http.get('https://api.github.com/users/' + username + '/followers')
        .success(function (data) {
          fCache.put(username, data);
          def.resolve(data);
        })
        .error(function () {
          def.reject('Failed to get repos for user "' + username + '"');
        });
      return def.promise;

    };
  });
