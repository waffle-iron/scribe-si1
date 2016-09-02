(function () {
  angular.module('ScribeApp').controller('authController', function($scope, httpRequest) {

    $scope.authenticateUser = function (token) {
      request_body = {
        'authenticity_token': token,
        'auth': {
          'email': $scope._email,
          'password': $scope._password
        }
      };

      httpRequest.request('POST', 'login', request_body);
    };

    $scope.login = function(token){
      $scope.authenticateUser(token);
    };
  });
})();
