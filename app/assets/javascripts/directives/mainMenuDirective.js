(function () {
	angular.module('ScribeApp').directive('mainMenu', function () {

		return {
			restrict: 'E',
			templateUrl: './directives/mainMenuView.html',
			controller: 'mainMenuController'
		};

	});
})();
