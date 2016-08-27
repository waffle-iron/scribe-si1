(function () {
	angular.module('ScribeApp').directive('drive', function () {

		return {
			restrict: 'E',
			templateUrl: 'views/drive/driveView.html',
			controller: 'driveController'
		};

	});
})();
