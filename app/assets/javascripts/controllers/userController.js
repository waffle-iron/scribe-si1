(function () {
  angular.module('ScribeApp').controller('userController', function($scope, $window, $cookies, httpToolsService) {

    $scope.authenticateUser = function (token) {
      request_body = {
        'authenticity_token': token,
        'user': {
          'email': $scope._email,
          'password': $scope._password
        }
      };
    };

    $scope.createUser = function (token) {
      request_body = {
        'authenticity_token': token,
        'user': {
          'first_name': $scope._firstname,
          'last_name': $scope._lastname,
          'email': $scope._email,
          'username': $scope._username,
          'password': $scope._password
        }
      }

      httpToolsService.request('POST', 'users', request_body);
      httpToolsService.redirect('/login');
    };

    $scope.login = function(token){
      $scope.authenticateUser(token);
    };

    $scope.register = function(token){
      $scope.createUser(token);
    };

    $scope.showRegisterForm = function(){
      httpToolsService.redirect('/register');
    };
  });
})();
