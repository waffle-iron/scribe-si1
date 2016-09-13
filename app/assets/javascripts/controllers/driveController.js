(function () {
	angular.module('ScribeApp')
	.controller('driveController', function ($scope, $cookies, $timeout, files, $mdDialog, $mdToast, httpToolsService) {
		// the user's root folder id, used to make http requests to the server.
		var current_root_folder_id = $cookies.getObject('current_root_folder_id');

		$cookies.remove('current_document');

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
		$scope.gridHeaderDrive = [
			{ name: 'Nome', icon: 'sort_by_alpha', col: 7 },
			{ name: 'Última Modificação', icon: 'access_time', col: 2 },
			{ name: 'Ação', icon: 'code', col: 3}
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

				$scope.pagination.push(item);

			}, 100);
		};

		$scope.setPagination = function (index) {
			$scope.pagination = $scope.pagination.splice(0, index + 1);
			$scope.setCurrentFolderId($scope.pagination[index].id);
			$scope.currentFolder = $scope.pagination[index];
			$scope.getChildren($scope.currentFolder.id);
		};

		// action() when a file or folder is clicked on the list.
		$scope.fileAction = function (item) {
			if (item.type === 'file') {
				$cookies.put("current_document", item.id);
				httpToolsService.redirect('/documents/' + item.id + '/edit/');
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

			$scope.createFolder = function (folderName) {

				var token = $('meta[name=csrf-token]').attr("content");

				var config = {
					authenticity_token: token,
					folder: {
						name: folderName,
						parent_folder_id: $scope.currentFolder.id,
						user_id: $cookies.getObject('current_user_id')
					}
				};

				httpToolsService.request('POST', '/my-drive', config).then(
					function (res) {
			 			if (res.data.success){
							$timeout(function () {
								update($scope.currentFolder);
							}, 50);
			 			}
			 		},
					function (err) { console.log(err) }
				);

			};

			$scope.createFile = function (fileName) {

				var token = $('meta[name=csrf-token]').attr("content");

				var config = {
					authenticity_token: token,
					file: {
						name: fileName,
						extension: '.txt',
						content: '',
						folder_id: $scope.currentFolder.id,
						user_id: $cookies.getObject('current_user_id')
					}
				};

				httpToolsService.request('POST', '/documents', config).then(
					function (res) {
			 			if (res.data.success){
							$timeout(function () {
								update($scope.currentFolder);
							}, 50);
			 			}
			 		},
					function (err) { console.log(err) }
				);

			};

			$scope.renameItem = function(newName, item){
				var token = $('meta[name=csrf-token]').attr("content");
				var name = newName;
				var config;
				var route;

				if (!newName)
					name = item.name;

				if (item.type === 'file') {
					config = {
						authenticity_token: token,
						file: {
							name: name,
							extension: item.extension,
							contents: item.content,
							folder_id: item.folder_id,
							user_id: item.user_id
						}
					};
					route = '/documents/' + item.id
				} else {
					config = {
						authenticity_token: token,
						folder: {
							name: name,
							parent_folder_id: item.parent_folder_id,
							user_id: item.user_id
						}
					};
					route = '/my-drive/' + item.id
				}

				httpToolsService.request('PUT', route , config).then(
					function (res) {
			 			if (res.data.success){
							$timeout(function () {
								update($scope.currentFolder);
							}, 50);
			 			}
			 		},
					function (err) { console.log(err) }
				);
			};

			$scope.shareFile = function (shareObject) {
				console.log("Compartilhando com " + shareObject.email + " com permissão para edição " + shareObject.permission);
			};

			$scope.createFolderDialog = function(ev) {
		    var confirm = $mdDialog.prompt()
		      .title('Criar pasta')
		      .textContent('A pasta será criada dentro da pasta ' + $scope.currentFolder.name)
		      .placeholder('Nome da pasta')
		      .ariaLabel('Nome da pasta')
		      .targetEvent(ev)
		      .ok('Criar')
		      .cancel('Cancelar');

		    $mdDialog.show(confirm).then(function(result) {
					$scope.createFolder(result);
				}, function() {
					$mdToast.show(
						$mdToast.simple()
							.textContent("Não criou nenhuma pasta dentro de " + $scope.currentFolder.name)
							.position("top right")
							.hideDelay(3000)
					);
		    });
		  };

		$scope.createFileDialog = function(ev) {
			var confirm = $mdDialog.prompt()
				.title('Criar arquivo')
				.textContent('Criar um arquivo dentro da pasta ' + $scope.currentFolder.name)
				.placeholder('Documento sem título')
				.ariaLabel('Documento sem título')
				.targetEvent(ev)
				.ok('Criar')
				.cancel('Cancelar');

			$mdDialog.show(confirm).then(function(result) {
				$scope.createFile(result);
			}, function() {
				$mdToast.show(
		      $mdToast.simple()
		        .textContent('Não criou nenhum arquivo dentro de ' + $scope.currentFolder.name)
		        .position("top right")
		        .hideDelay(3000)
		    );
			});
		};

		$scope.shareFileDialog = function(ev) {
			$mdDialog.show({
				controller: DialogController,
				templateUrl: '../directives/shareDialog.html',
				parent: angular.element(document.body),
				targetEvent: ev,
				clickOutsideToClose:false,
			})
			.then(function(answer) {
	      $scope.shareFile(answer);
	    }, function() {
				$mdToast.show(
					$mdToast.simple()
						.textContent('Nenhum arquivo foi compartilhado')
						.position("top right")
						.hideDelay(3000)
				);
	    });
		};

		$scope.renameItemDialog = function(ev, item) {
			var confirm = $mdDialog.prompt()
				.title('Renomear item')
				.textContent('Renomear o item ' + item.name)
				.placeholder('Nome do item')
				.ariaLabel('Nome do item')
				.targetEvent(ev)
				.ok('Renomear')
				.cancel('Cancelar');

			$mdDialog.show(confirm).then(function(result) {
				$scope.renameItem(result, item);
			}, function() {
				$mdToast.show(
		      $mdToast.simple()
		        .textContent('O arquivo ' + item.name + ' não foi renomeado.')
		        .position("top right")
		        .hideDelay(3000)
		    );
			});
		};

		var update = function (item){

			$scope.getChildren(item.id);

		};

	});
})();

function DialogController($scope, $mdDialog) {

		$scope.checked = false;

		$scope.validateFields = function() {
			return $("#friend-email").val() === "";
		};

		$scope.clickCheckBox = function() {
			$scope.checked = !$scope.checked;
		};

    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.answer = function() {
			var answer = { email: $('#friend-email').val(), permission: $scope.checked };
      $mdDialog.hide(answer);
    };
}
