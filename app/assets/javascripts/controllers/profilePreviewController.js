(function () {
	angular.module('ScribeApp')
	.controller('profilePreviewController', function ($scope, tabs, user) {

		// atributos do usuário, retirados do userService
		$scope.user = {
			name: user.getUsername(),
			avatarPath: user.getAvatarPath(),
			premiumUser: user.isPremiumUser()
		};

		// tabs do menu azul de perfil
		$scope.options = [
			{ name: 'Menu Principal',	icon: 'reorder' },
			{ name: 'Mensagens',		icon: 'email' },
			{ name: 'Perfil',			icon: 'account_circle' },
			{ name: 'Configurações',	icon: 'settings' },
			{ name: 'Logout',			icon: 'exit_to_app' }
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
