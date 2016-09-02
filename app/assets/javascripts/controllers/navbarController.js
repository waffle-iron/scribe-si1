(function () {
	angular.module('ScribeApp')
	.controller('navbarController', function ($scope, tabs) {

		$scope.checkMenuTab = function (index) {
			return tabs.menu.get() === index;
		};

	});
})();
