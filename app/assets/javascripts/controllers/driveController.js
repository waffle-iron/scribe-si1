(function () {
	angular.module('ScribeApp')
	.controller('driveController', function ($scope, $cookies, $timeout, files) {
		// the user's root folder id, used to make http requests to the server.
		var current_root_folder_id = $cookies.getObject('current_root_folder_id');

		// sets $scope.contents
		$scope.getChildren = function (current_root_folder_id) {
			files.getChildrenFolders(current_root_folder_id).then(
				function (res) {
					$scope.contents = res.data;
					for (var i = 0; i < $scope.contents.length; i++)
						$scope.contents[i].type = 'folder';

					files.getChildrenFiles(current_root_folder_id).then(
						function (res) {
							var contents = res.data;
							for (var i = 0; i < contents.length; i++)
								contents[i].type = 'file';
							$scope.contents = $scope.contents.concat(contents);
							console.log($scope.contents);
						},
						function (err) { console.log(err); }
					);
				},
				function (err) { console.log(err); }
			);
		};

		// options that will be rendered on the table's header.
		$scope.gridHeader = [
			{ name: 'Nome', icon: 'sort_by_alpha', col: 5 },
			{ name: 'Proprietário', icon: 'person', col: 2 },
			{ name: 'Última Modificação', icon: 'access_time', col: 3 },
			{ name: 'Tamanho', icon: 'insert_drive_file', col: 2 }
		];

		// sets the current folder id.
		$scope.setCurrentFolderId = function (item) {
			current_root_folder_id = item.id;
		};

		// sets the current folder.
		$scope.setCurrentFolder = function (item) {
			$scope.setCurrentFolderId(item);

			$timeout(function () {
				$scope.currentFolder = files.getRootFolder(current_root_folder_id).then(
					function (res) { $scope.currentFolder = res.data; },
					function (err) { console.log(err); }
				);

				$scope.getChildren(current_root_folder_id);

				var index = $scope.pagination.indexOf(item);

				if (!index)
					$scope.pagination.splice(index + 1, $scope.pagination.length - index + 1);
				else
					$scope.pagination.push(item);
			}, 100);
		};

		// action() when a file or folder is clicked on the list.
		$scope.fileAction = function (item) {
			if (item.type === 'file') {
				// do something
				return;
			} else {
				// sets the current folder and contents
				$scope.setCurrentFolder(item);
			}
		};

		// misc function to get the icon based on the file's type.
		$scope.getIcon = function (item) {
			if (item.type === 'file') return 'insert_drive_file';
			else return 'folder';
		};

		// misc function that determines to show or not the dropdown arrow.
		$scope.showArrow = function (index) {
			return index === $scope.pagination.length - 1;
		};

		// two way data variables.
		$scope.currentFolder = {};
		$scope.contents = [];
		$scope.pagination = [];

		// initalize the variables above by retrieving the data with http
		// requests.
		files.getRootFolder(current_root_folder_id).then(
			function (res) {
				$scope.currentFolder = res.data;
				$scope.pagination.push($scope.currentFolder);

				$scope.getChildren(current_root_folder_id);
			},
			function (err) { console.log(err); }
		);

	});
})();
