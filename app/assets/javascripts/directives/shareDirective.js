(function () {
	angular.module('ScribeApp').directive('share', function () {

		return {
			restrict: 'E',
			templateUrl: '../directives/shareView.html',
			controller: 'shareController'
		};

	});
})();
