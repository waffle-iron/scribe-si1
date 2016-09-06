(function () {
	angular.module('ScribeApp').directive('navbar', function () {

		return {
			restrict: 'E',
			templateUrl: 'views/navbar/navbarView.html',
			controller: 'navbarController'
		};
		
	});
})();
