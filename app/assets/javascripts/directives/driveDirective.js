(function () {
	angular.module('ScribeApp').directive('drive', function () {

		return {
			restrict: 'E',
			templateUrl: '../directives/driveView.html',
			controller: 'driveController'
		};

	});
})();
