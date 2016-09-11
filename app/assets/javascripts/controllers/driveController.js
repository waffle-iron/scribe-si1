(function () {
	angular.module('ScribeApp')
	.controller('driveController', function ($scope, files, $mdDialog, $mdMedia) {

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

		$scope.shareFile = function (email) {
			console.log("Compartilhando com " + email);
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
				console.log("Não criou pasta dentro da pasta " + $scope.getCurrentFolder().name);
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
			console.log("Não criou arquivo dentro da pasta " + $scope.getCurrentFolder().name);
		});
	};

	$scope.shareFileDialog = function(ev) {
		var confirm = $mdDialog.prompt()
			.title('Compartilhar arquivo')
			.textContent('Digite o e-mail da pessoa com quem deseja compartilhar')
			.placeholder('E-mail')
			.ariaLabel('E-mail')
			.targetEvent(ev)
			.ok('Compartilhar')
			.cancel('Cancelar');

		$mdDialog.show(confirm).then(function(result) {
			$scope.shareFile(result);
		}, function() {
			console.log("Não compartilhou arquivo");
		});
	};

/* CUSTOM DIALOG

	$scope.createFileDialog = function(ev) {
    $mdDialog.show({
      controller: DialogController,
      templateUrl: '../directives/shareDialog.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:false	,
    })
    .then(function(answer) {
      $scope.createFile(answer);
    }, function() {
			console.log("Não criou arquivo dentro da pasta " + $scope.getCurrentFolder().name);
    });
  };*/

	});
})();

function DialogController($scope, $mdDialog) {

  $scope.cancel = function() {
    $mdDialog.cancel();
  };

  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };
}
