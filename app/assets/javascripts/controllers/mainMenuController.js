(function () {
	angular.module('ScribeApp').controller('mainMenuController', function ($scope, tabs) {

		// título do menu principal
		$scope.header = "Meu Drive";

		// opções do menu principal
		$scope.links = [
			{ name: 'Meu Drive', 		icon: 'folder' },
			{ name: 'Compartilhados',	icon: 'folder_shared' },
		];

		$scope.setMainTab = function (index) {
			tabs.main.set(index);
		};

		$scope.checkMainTab = function (index) {
			return tabs.main.get() === index;
		};

	});
})();
