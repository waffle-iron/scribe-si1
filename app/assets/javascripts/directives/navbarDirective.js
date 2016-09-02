(function () {
	angular.module('ScribeApp').directive('navbar', function () {

		return {
			restrict: 'E',
			templateUrl: './directives/navbarView.html',
			controller: 'navbarController'
		};

	});
})();
