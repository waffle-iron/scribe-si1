(function () {
	angular.module('ScribeApp').directive('messages', function () {

		return {
			restrict: 'E',
			templateUrl: './directives/messagesView.html',
			controller: 'messagesController'
		};

	});
})();
