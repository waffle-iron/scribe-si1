(function () {
	angular.module('ScribeApp').service('tabs', function () {

		// index do menu azul do perfil
		var menuTab = 0;

		// index do main menu, que controla o drive
		var mainTab = 0;

		return {

			// métodos pra manipular menuTab
			menu: {
				set: function (index) {
					menuTab = index;
				},
				get: function () {
					return menuTab;
				}
			},

			// métodos pra manipular mainTab
			main: {
				set: function (index) {
					mainTab = index;
				},
				get: function () {
					return mainTab;
				}
			}

		};

	});
})();
