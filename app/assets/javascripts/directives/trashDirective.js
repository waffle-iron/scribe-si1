(function () {
	angular.module('ScribeApp').directive('trash', function () {

		return {
			restrict: 'E',
			templateUrl: '../directives/trashView.html',
			controller: 'trashController'
		};

	});
})();
