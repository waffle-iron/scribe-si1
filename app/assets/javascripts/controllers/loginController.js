app.controller('MainCtrl', function($scope){

  $scope.validateLogin = function(){
    $window.location.href="/panel/home";
  }

});
