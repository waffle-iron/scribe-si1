(function () {
	angular.module('ScribeApp')
	.controller('shareController', function ($scope, share) {

		$scope.gridHeaderShare = [
			{ name: 'Nome', icon: 'sort_by_alpha', col: 5 },
			{ name: 'Proprietário', icon: 'person', col: 2 },
			{ name: 'Última Modificação', icon: 'access_time', col: 2 },
			{ name: 'Tamanho', icon: 'insert_drive_file', col: 2 },
			{ name: 'Permissões', icon: 'info_outline', col: 1 }
		];

    // $scope.getSharedFiles = function () {
    //    return share.getFiles();
    // };

		$scope.getIcon = function (item) {
			if (item.type === 'file')
				return 'insert_drive_file';
			else
				return 'folder';
		};

	});
})();
