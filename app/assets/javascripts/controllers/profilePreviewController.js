(function () {
	angular.module('ScribeApp')
	.controller('profilePreviewController', function ($scope, $cookies, $http, tabs, user) {
		var current_user_id = $cookies.getObject('current_user_id')

		$scope.userData = user.getUserData(current_user_id).then(
			function (res) { $scope.userData = res.data; },
			function (err) { console.log(err); }
		);

		// tabs do menu azul de perfil
		$scope.options = [
			{ name: 'Menu Principal',	icon: 'reorder', href: '' },
			{ name: 'Mensagens',		icon: 'email', href: '' },
			{ name: 'Logout',			icon: 'exit_to_app', href: '/logout' }
		];

		// seta o index da tab do menu azul
		$scope.setMenuTab = function (index) {
			tabs.menu.set(index);
		};

		// checa se a tab ativa do menu azul é a mesma do índice passado
		$scope.checkMenuTab = function (index) {
			return tabs.menu.get() === index;
		};

	});
})();
