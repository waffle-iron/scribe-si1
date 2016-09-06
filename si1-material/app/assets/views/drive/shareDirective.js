(function () {
	angular.module('ScribeApp').directive('share', function () {

		return {
			restrict: 'E',
			templateUrl: 'views/drive/shareView.html',
			controller: 'shareController'
		};

	});
})();
