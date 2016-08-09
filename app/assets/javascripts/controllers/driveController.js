app.controller('DriveController', function($scope, $mdDialog, $mdToast, $rootScope, $window) {

	// contains all files on the drive
	$scope.files = [
		{ name: "Geografia", type: "folder", contents: [
			{ name: "Prova de Geografia", type: "file", contents: "Dasdasdasda", updateDate: "1469969538034"},
			{ name: "Provas", type: "folder" , contents: [] }
		] },
		{ name: "Filosofia", type: "folder", contents: []}
	];

	// contains the
	$scope.pagination = [
		{ name: "Minhas Pastas", contents: $scope.files }
	];

	// the folder currently being rendered
	$scope.currentFolder = $scope.pagination.slice(-1)[0];

	$scope.openFile = function(index) {
		// if it's a file, then change pagination
		if ($scope.currentFolder.contents[index].type === "folder") {
			$scope.pagination.push($scope.currentFolder.contents[index]);
			$scope.currentFolder = $scope.pagination.slice(-1)[0];

		// if it's a text file, then open it in a new tab
		} else {
			$rootScope.$emit("CallSetDocumentMethod", $scope.currentDocument);
			$scope.setDocument($scope.currentFolder.contents[index]);
			$window.location.href = '/panel/file/edit';
		}
	};

	$scope.changeFolder = function(index) {
		$scope.pagination = $scope.pagination.splice(0, index + 1);
		$scope.currentFolder = $scope.pagination.slice(-1)[0];
	};

	$scope.createDocument = function(ev) {
		var confirm = $mdDialog.prompt()
		confirm.title('Adiconar arquivo dentro da pasta "' + $scope.currentFolder.name + '".')
		.textContent('Por favor, insira um nome para o seu arquivo')
		.placeholder('Nome do arquivo')
		.targetEvent(ev)
		.ok('Confirmar')
		.cancel('Cancelar');

		$mdDialog.show(confirm).then(function(result) {
			if (!result){
				$mdToast.show(
					$mdToast.simple()
						.textContent('Por favor, insira um nome para o seu arquivo')
						.position("bottom right")
						.hideDelay(2000)
				);
			} else {
				$scope.currentFolder.contents.push( { name: result, type: "file", contents: "Dasdasdasda", updateDate: "1469969538034" } );
				$mdToast.show(
					$mdToast.simple()
						.textContent('Arquivo ' + result + ' adicionado em ' + $scope.currentFolder.name + ' com sucesso!')
						.position("bottom right")
						.hideDelay(2000)
				);
			};
		});
	};

	$scope.createFolder = function(ev){

    var confirm = $mdDialog.prompt()
    confirm.title('Adicionar pasta dentro da pasta "' + $scope.currentFolder.name + '".')
    .textContent('Por favor, insira um nome para a sua pasta.')
    .placeholder('Nome da pasta')
    .targetEvent(ev)
    .ok('Confirmar')
    .cancel('Cancelar');

    $mdDialog.show(confirm).then(function(result) {
      if (result != undefined) {
        $scope.currentFolder.contents.push({ name: result, type: "folder", contents: [] });
        $mdToast.show(
          $mdToast.simple()
            .textContent('Pasta ' + result + ' adicionada em ' + $scope.currentFolder.name + ' com sucesso!')
            .position("bottom right")
            .hideDelay(2000)
        );
      } else {
        $mdToast.show(
          $mdToast.simple()
            .textContent('Pasta não adicionada! Por favor, insira um nome válido para a pasta.')
            .position("bottom right")
            .hideDelay(2000)
        );
      };
    });
  };


});
