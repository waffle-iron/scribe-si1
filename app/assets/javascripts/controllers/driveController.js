(function () {
	angular.module('ScribeApp')
	.controller('driveController', function ($scope, $cookies, $timeout, files) {
		var current_root_folder_id = $cookies.getObject('current_root_folder_id');

		// current folder
		$scope.currentFolder = files.getRootFolder(current_root_folder_id).then(
			function (res) { $scope.currentFolder = res; },
			function (err) { console.log(err); }
		);

		// contents of the current folder
		$scope.contents = files.getChildren(current_root_folder_id).then(
			function (res) { $scope.contents = res; },
			function (err) { console.log(err); }
		);

		$scope.pagination = [$scope.currentFolder];

		$scope.gridHeader = [
			{ name: 'Nome', icon: 'sort_by_alpha', col: 5 },
			{ name: 'Proprietário', icon: 'person', col: 2 },
			{ name: 'Última Modificação', icon: 'access_time', col: 3 },
			{ name: 'Tamanho', icon: 'insert_drive_file', col: 2 }
		];

		$scope.setCurrentFolderId = function (item) {
			current_root_folder_id = item.id;
		};

		$scope.setCurrentFolder = function (item) {
			$scope.currentFolder = files.getRootFolder(current_root_folder_id).then(
				function (res) { $scope.currentFolder = res; },
				function (err) { console.log(err); }
			);

			$scope.contents = files.getChildren(current_root_folder_id).then(
				function (res) { $scope.contents = res; },
				function (err) { console.log(err); }
			);

			var index = $scope.pagination.indexOf(item);

			if (!index)
				$scope.pagination.splice(index + 1, $scope.pagination.length - index + 1);
			else
				$scope.pagination.push(item);
		};

		$scope.fileAction = function (item) {
			if (item.type === 'file') {
				// do something
				return;
			} else {
				// sets the new ID
				$scope.setCurrentFolderId(item);

				// delays the call for 1000ms, so it is processed after we set the
				// currentFolderId.
				$timeout(function () {
					// sets the current folder and contents
					$scope.setCurrentFolder(item);
				}, 1000);
			}
		};

		$scope.getIcon = function (item) {
			if (item.type === 'file') return 'insert_drive_file';
			else return 'folder';
		};

		$scope.showArrow = function (index) {
			return index === $scope.pagination.length - 1;
		};

	});
})();
