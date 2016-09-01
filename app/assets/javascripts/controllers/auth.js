(function () {
  angular.module('ScribeApp').controller('authCtrl', function($scope, httpRequest) {

    $scope.authenticateUser = function () {
      httpRequest.request('POST', 'login');
    };

    $scope.login = function(){
      $scope.authenticateUser();
    };
  });
});
