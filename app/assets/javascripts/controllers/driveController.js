(function () {
	angular.module('ScribeApp')
	.controller('driveController', function ($scope, files, $mdDialog, $mdMedia, $mdToast) {

		$scope.pagination = [files.getCurrentFolder()];

		$scope.gridHeader = [
			{ name: 'Nome', icon: 'sort_by_alpha', col: 5 },
			{ name: 'Proprietário', icon: 'person', col: 2 },
			{ name: 'Última Modificação', icon: 'access_time', col: 2 },
			{ name: 'Tamanho', icon: 'insert_drive_file', col: 2 },
			{ name: 'Ação', icon: 'code', col: 1}
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

		$scope.createFolder = function (folderName) {
			console.log("Criando pasta de nome " + folderName + " dentro da pasta " + $scope.getCurrentFolder().name);
		};

		$scope.createFile = function (fileName) {
			console.log("Criando arquivo de nome " + fileName + " dentro da pasta " + $scope.getCurrentFolder().name);
		};

		$scope.shareFile = function (shareObject) {
			console.log(shareObject.permission);
			console.log("Compartilhando com " + shareObject.email + " com permissão para edição " + shareObject.permission);
		};

		$scope.createFolderDialog = function(ev) {
	    var confirm = $mdDialog.prompt()
	      .title('Criar pasta')
	      .textContent('A pasta será criada dentro da pasta ' + $scope.getCurrentFolder().name)
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
						.textContent("Não criou nenhuma pasta dentro de " + $scope.getCurrentFolder().name)
						.position("top right")
						.hideDelay(3000)
				);
	    });
	  };

	$scope.createFileDialog = function(ev) {
		var confirm = $mdDialog.prompt()
			.title('Criar arquivo')
			.textContent('Criar um arquivo dentro da pasta ' + $scope.getCurrentFolder().name)
			.placeholder('Documento sem título')
			.ariaLabel('Docuemtno sem título')
			.targetEvent(ev)
			.ok('Criar')
			.cancel('Cancelar');

		$mdDialog.show(confirm).then(function(result) {
			$scope.createFile(result);
		}, function() {
			$mdToast.show(
	      $mdToast.simple()
	        .textContent('Não criou nenhum arquivo dentro de ' + $scope.getCurrentFolder().name)
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
			clickOutsideToClose:true,
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
