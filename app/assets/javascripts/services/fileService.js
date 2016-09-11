(function () {
	angular.module('ScribeApp').service('files', function () {

		var root = {
			name: 'Meu Drive',
			type: 'folder',
			update: new Date(),
			size: '-',
			owner: 'eu',
			contents: [{
				name: 'Geografia',
				type: 'folder',
				update: new Date(),
				size: '-',
				owner: 'eu',
				contents: [{
					name: 'Provas',
					type: 'folder',
					update: new Date(),
					size: '-',
					owner: 'eu',
					contents: [{
						name: 'Primeira Etapa 2015.1',
						type: 'file',
						update: new Date(),
						size: '16 kbs',
						owner: 'eu'
					}, {
						name: 'Segunda Etapa 2015.1',
						type: 'file',
						update: new Date(),
						size: '12 kbs',
						owner: 'eu'
					}, {
						name: 'Terceira Etapa 2016.1',
						type: 'file',
						update: new Date(),
						size: '22 kbs',
						owner: 'eu'
					}]
				}, {
					name: 'Listas de Exercícios',
					type: 'folder',
					update: new Date(),
					size: '-',
					owner: 'eu',
					contents: [{
						name: 'Topografia',
						type: 'file',
						update: new Date(),
						size: '8 kbs',
						owner: 'eu'
					}]
				}]
			}]
		};

		var currentFolder = root;

		return {
			getFiles: function () {
				return root;
			},

			getCurrentFolder: function () {
				return currentFolder;
			},

			setCurrentFolder: function (folder) {
				currentFolder = folder;
			}
		};

	});
})();
