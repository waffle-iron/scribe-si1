(function () {
	angular.module('ScribeApp').controller('mainMenuController', function ($scope, tabs) {

		// título do menu principal
		$scope.header = "Meu Drive";

		// opções do menu principal
		$scope.links = [
			{ name: 'Meu Drive', 		icon: 'folder' },
			{ name: 'Compartilhados',	icon: 'folder_shared' },
			{ name: 'Excluídos',		icon: 'delete' },
			{ name: 'Favoritos',		icon: 'star' }
		];

		$scope.setMainTab = function (index) {
			tabs.main.set(index);
		};

		$scope.checkMainTab = function (index) {
			return tabs.main.get() === index;
		};

		// título do menu de arquivos recentes
		$scope.recentHeader = "Arquivos Recentes"

		$scope.recentFiles = [
			{ name: 'Prova de Cálculo' },
			{ name: 'Lista de Lógica' },
			{ name: 'AngularJS Basics v1' },
			{ name: 'Learn AngularJS' },
		];

	});
})();
