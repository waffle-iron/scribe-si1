(function () {
	angular.module('ScribeApp').directive('profilePreview', function () {

		return {
			restrict: 'E',
			templateUrl: './directives/profilePreviewView.html',
			controller: 'profilePreviewController'
		};

	});
})();
