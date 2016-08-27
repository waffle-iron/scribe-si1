(function () {
	angular.module('ScribeApp').directive('profilePreview', function () {

		return {
			restrict: 'E',
			templateUrl: 'views/profilepreview/profilePreviewView.html',
			controller: 'profilePreviewController'
		};

	});
})();
