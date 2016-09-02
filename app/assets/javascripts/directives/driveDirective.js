(function () {
	angular.module('ScribeApp').directive('drive', function () {

		return {
			restrict: 'E',
			templateUrl: '../views/directives/driveView.html',
			controller: 'driveController'
		};

	});
})();
