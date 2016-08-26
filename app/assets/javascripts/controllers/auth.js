var app = angular.module('myApp', []);

app.controller('authCtrl', function($scope){

  $scope.login = function(){
    console.log("Enviando request... Usuário:" + $scope._username + " Senha: " + $scope._password);
  };

});
