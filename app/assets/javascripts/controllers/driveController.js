(function () {
	angular.module('ScribeApp')
	.controller('driveController', function ($scope, $cookies, files) {
		var current_root_folder_id = $cookies.getObject('current_root_folder_id');
		contents = [];

		var getCurrentChildrenFolders = function(current_folder_id) {
			files.getChildrenFolders(current_folder_id).success(function(res) {
				if (res != null) {
					contents.push(res);
					console.log(res);
				}
			});
		}

		var getCurrentChildrenFiles = function(current_folder_id) {
			files.getChildrenFiles(current_folder_id).success(function(res) {
				if (res != null) {
					contents.push(res);
					console.log(res);
				}
			});
		}

		var getFolderInfo = function(){
			files.getCurrentFolder(current_root_folder_id).success(function(res) {
				$scope.pagination = [res]
			}).error(function(error) {
				console.log(error);
			});
		}

		getFolderInfo();
		getCurrentChildrenFolders(current_root_folder_id);
		getCurrentChildrenFiles(current_root_folder_id);

		$scope.contents = contents;
		console.log(contents);
		console.log($scope.contents);

		$scope.gridHeader = [
			{ name: 'Nome', icon: 'sort_by_alpha', col: 5 },
			{ name: 'Proprietário', icon: 'person', col: 2 },
			{ name: 'Última Modificação', icon: 'access_time', col: 3 },
			{ name: 'Tamanho', icon: 'insert_drive_file', col: 2 }
		];

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
