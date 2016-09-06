(function () {
	angular.module('ScribeApp').directive('mainMenu', function () {

		return {
			restrict: 'E',
			templateUrl: 'views/mainmenu/mainMenuView.html',
			controller: 'mainMenuController'
		};

	});
})();
