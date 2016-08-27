(function () {
	angular.module('ScribeApp')
	.controller('driveController', function ($scope, files) {

		$scope.pagination = [files.getCurrentFolder()];

		$scope.gridHeader = [
			{ name: 'Nome', icon: 'sort_by_alpha', col: 5 },
			{ name: 'Proprietário', icon: 'person', col: 2 },
			{ name: 'Última Modificação', icon: 'access_time', col: 3 },
			{ name: 'Tamanho', icon: 'insert_drive_file', col: 2 }
		];

		$scope.getCurrentFolder = function () {
			return files.getCurrentFolder();
		};

		$scope.setCurrentFolder = function (index) {
			files.setCurrentFolder($scope.pagination[index]);
			$scope.pagination.splice(index + 1, $scope.pagination.length - index + 1);
		};

		$scope.fileAction = function (item) {
			if (item.type === 'file') {
				// do something
				return;
			} else {
				files.setCurrentFolder(item);
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
