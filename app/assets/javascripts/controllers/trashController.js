(function () {
	angular.module('ScribeApp')
	.controller('trashController', function ($scope, trash, $mdDialog, $mdToast) {

    $scope.selectedItems = [];

		$scope.gridHeaderTrash = [
			{ name: 'Nome', icon: 'sort_by_alpha', col: 7 },
			{ name: 'Última Modificação', icon: 'access_time', col: 5 }
		];

		$scope.eoq = [ {
			name: "teste 1",
			updated_at: "12312",
		}, {
			name: "teste 2",
			updated_at: "12312",
		}, {
			name: "teste 3",
			updated_at: "12312",
		}];

    $scope.setProperty = function(){
      var deletedItems = $scope.getDeletedFiles();
      for (var i = 0; i < deletedItems.length; i++) {
        deletedItems[i]['selected'] = false;
      }
    };

    $scope.selectItem = function (item){
      item.selected = !item.selected;
    };

    $scope.deleteFileDialog = function (ev, file){
      var confirm = $mdDialog.confirm()
        .title('Excluir arquivo')
        .textContent('Você realmente deseja mover o item ' + name + ' para a lixeira?')
        .ariaLabel('Excluir Arquivo')
        .targetEvent(ev)
        .ok('Deletar')
        .cancel('Cancelar');

      $mdDialog.show(confirm).then(function() {
        $scope.deleteFile(file);
      }, function() {

      });
    };

		$scope.deleteFile = function(file){

      var toast = $mdToast.simple()
        .textContent('Arquivo excluído com sucesso! (' + file.name + ')')
        .action('DESFAZER')
        .highlightAction(true)
        .highlightClass('md-accent')// Accent is used by default, this just demonstrates the usage.
        .position("top right");

      $mdToast.show(toast).then(function(response) {
        if ( response == 'ok' ) {
          alert('You clicked the \'UNDO\' action.');
        } else {
          console.log(file);
        }
      });
		};

		$scope.getDeletedFiles = function () {
      return $scope.eoq;
		};

    $scope.deleteFiles = function() {
      console.log($scope.selectedItems);
    }

	});
})();
