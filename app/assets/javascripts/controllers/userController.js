(function () {
  angular.module('ScribeApp').controller('userController', function($scope, $window, httpRequest) {

    $scope.authenticateUser = function (token) {
      request_body = {
        'authenticity_token': token,
        'user': {
          'email': $scope._email,
          'password': $scope._password
        }
      };

      httpRequest.request('POST', 'login', request_body);
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

      httpRequest.request('POST', 'users', request_body);
    };

    $scope.login = function(token){
      $scope.authenticateUser(token);
    };

    $scope.register = function(token){
      $scope.createUser(token);
    };

    $scope.showRegisterForm = function(){
      $window.location.href = '/register';
    };
  });
})();
