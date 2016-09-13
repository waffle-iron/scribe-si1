(function () {
	angular.module('ScribeApp').directive('mainMenu', function () {

		return {
			restrict: 'E',
			templateUrl: './directives/messagesView.html',
			controller: 'messagesController'
		};

	});
})();
