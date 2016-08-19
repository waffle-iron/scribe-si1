angular
  .module('myApp', ['ngMaterial', 'mdScribeEditor'])
  .config(function() {})
  .controller('MainController', ['$scope', '$mdSidenav', function($scope, $mdSidenav) {
	  
      $scope.html = 'Texto do arquivo aqui';

	  $scope.toggleSidenav = function(menuId) 
	  {
		$mdSidenav(menuId).toggle();
	  }
	
  }]);