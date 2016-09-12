(function () {
	angular.module('ScribeApp').service('share', function () {

		var root = {
			contents: [{		name: 'Geografia',
						type: 'file',
						update: new Date(),
						size: '-',
						owner: 'Xiok da Silvo',
						contents: [],
						size: "8kb",
						permissions: {icon: 'remove_red_eye', tooltip: 'Para Visualização'}
					}, {
						name: 'Matemática',
						type: 'file',
						update: new Date(),
						size: '-',
						owner: 'Olavo do café',
						contents: [],
						size: "8kb",
						permissions: {icon: 'mode_edit', tooltip: 'Para Edição'}
					}, {
						name: 'Matemática ADSAS',
						type: 'file',
						update: new Date(),
						size: '-',
						owner: 'Olavo do cafd2DQWDé',
						contents: [],
						size: "8kb",
						permissions: {icon: 'mode_edit', tooltip: 'Para Editar'}
					}, {
						name: 'Mat2d12d12d12demád1tica',
						type: 'file',
						update: new Date(),
						size: '-',
						owner: 'Olavo dod1d12d12d21 café',
						contents: [],
						size: "8kb",
						permissions: {icon: 'remove_red_eye', tooltip: 'Para Visualizar'}
					}
			]
		};

		return {
			getFiles: function () {
				return root;
			},
		};

	});
})();
