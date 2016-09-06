(function () {
	angular.module('ScribeApp')
	.controller('shareController', function ($scope, share) {

		$scope.pagination = [share.getCurrentFolder()];

		$scope.gridHeader = [
			{ name: 'Nome', icon: 'sort_by_alpha', col: 4 },
			{ name: 'Proprietário', icon: 'person', col: 3 },
			{ name: 'Última Modificação', icon: 'access_time', col: 2 },
			{ name: 'Tamanho', icon: 'insert_drive_file', col: 2 },
			{ name: 'Permissões', icon: 'info_outline', col: 1 }
		];

		$scope.getCurrentFolder = function () {
			return share.getCurrentFolder();
		};

		$scope.setCurrentFolder = function (index) {
			share.setCurrentFolder($scope.pagination[index]);
			$scope.pagination.splice(index + 1, $scope.pagination.length - index + 1);
		};

		$scope.fileAction = function (item) {
			if (item.type === 'file') {
				// do something
				return;
			} else {
				share.setCurrentFolder(item);
				$scope.pagination.push(item);
			}
		};

		$scope.getIcon = function (item) {
			if (item.type === 'file')
				return 'insert_drive_file';
			else
				return 'folder';
		};

		$scope.showArrow = function (index) {
			return index === $scope.pagination.length - 1;
		};

	});
})();
