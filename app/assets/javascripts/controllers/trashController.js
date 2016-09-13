(function () {
	angular.module('ScribeApp')
	.controller('trashController', function ($scope, trash) {

		$scope.gridHeaderTrash = [
			{ name: 'Nome', icon: 'sort_by_alpha', col: 7 },
			{ name: 'Última Modificação', icon: 'access_time', col: 5 }
		];

		$scope.eoq = [ {
			name: "teste 1",
			updated_at: "12312",
			checked: false
		}, {
			name: "teste 2",
			updated_at: "12312",
			checked: false
		}, {
			name: "teste 3",
			updated_at: "12312",
			checked: false
		}];

		$scope.setSelected = function(item, classe){
			console.log(item);
		};

		$scope.deleteFiles = function(){

		};

		$scope.getDeletedFiles = function () {
			 return $scope.eoq;
		};

	});
})();
