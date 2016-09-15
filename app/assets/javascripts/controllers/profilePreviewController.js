(function () {
	angular.module('ScribeApp')
	.controller('profilePreviewController', function ($scope, $cookies, $http, tabs, user, httpToolsService) {
		var current_user_id = $cookies.getObject('current_user_id')

		$scope.userData = user.getUserData(current_user_id).then(
			function (res) { $scope.userData = res.data; },
			function (err) { console.log(err); }
		);

		// tabs do menu azul de perfil
		$scope.options = [
			{ name: 'Menu Principal',	icon: 'reorder' },
			{ name: 'Mensagens',		icon: 'email' },
			{ name: 'Logout',			icon: 'exit_to_app' }
		];

		$scope.logout = function() {
			$cookies.remove('current_user_id');
			$cookies.remove('current_document');
			$cookies.remove('current_root_folder_id');
			httpToolsService.redirect('/logout');
		};

		// seta o index da tab do menu azul
		$scope.setMenuTab = function (index) {
			if (index === $scope.options.length - 1) {
				$scope.logout();
			}
			tabs.menu.set(index);
		};

		// checa se a tab ativa do menu azul é a mesma do índice passado
		$scope.checkMenuTab = function (index) {
			return tabs.menu.get() === index;
		};

		$scope.getFullName = function () {
			return $scope.userData.first_name + " " + $scope.userData.last_name;
		};

	});
})();
