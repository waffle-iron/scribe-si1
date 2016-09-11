(function () {
	angular.module('ScribeApp')
	.controller('profilePreviewController', function ($scope, $cookies, $http, tabs, user) {
		var current_user_id = $cookies.getObject('current_user_id')

		var getUserInfo = function(){
			user.getCurrentUser(current_user_id).success(function(res) {
				console.log(res);
				console.log(user.getUserInfo(res));
				$scope.user = user.getUserInfo(res);
			}).error(function(error) {
				console.log(error);
			});
		}

		// seta os dados do usuário no $scope
		getUserInfo();

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

		// seta o tipo de conta do usuário baseado no valor de isPremiumUser
		$scope.getAccountType = function () {
			if ($scope.user.premiumUser)
				return 'Premium User';
			else
				return 'Normal User';
		};

	});
})();
