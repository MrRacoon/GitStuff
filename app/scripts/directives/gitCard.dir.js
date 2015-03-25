/**
 * gitCard
 *
 * Given a Username, Fill out the card using either
 * 'long' or 'short' format.
 *
 */
angular.module('gitStuffApp')
// Make a directive called gitCard (git-card), and depend on the service
// 'gitService'
.directive('gitCard', ['gitService',
    function (gitService) {
        'use strict'; // strict ballin'

        // Directives return a configuring object
        // https://docs.angularjs.org/guide/directive
        return {

            // Restrict the directive to an 'element' tag
            restrict: 'E',

            // Go find our view template
            templateUrl: 'views/gitCard.html',

            // Isolate the scope to these three variables
            scope: {
                'userName'  : '=', // Get our user login
                'isLong'    : '=', // Do we want the long or short view
                'hide'      : '='  // Hide the card?
            },

            // the function to run over the directive
            link: function (scope) {

                // Initialize the user info to be undefined
                scope.userInfo = undefined;

                // Function to set the userInfo data
                function setUser (data) {
                    scope.userInfo = data;
                    console.log(data);
                }

                // Take a login, and get the user information if it isn't
                // undefined, then set the User information to a variable on
                // the scope.
                function getUser (login) {
                    if(login) {
                        gitService.getUser(login).then(setUser);
                    }
                }

                // Watch the 'userName' variable. Call `getUser` everytime it
                // changes
                scope.$watch('userName', getUser);
            }
    };
}]);
