app.controller('ListCtrl', function($scope, $mdDialog, $mdToast){

  $scope.currentFolder = null;

  // Mock data
  $scope.mainFolders = [
    { name: 'Documentos 1', folders: [], documents: [
      { name: 'Doc 1', format: 'txt', text: 'Loren ipsun dowk dodkl20' },
      { name: 'Doc 2', format: 'txt', text: 'lorem ipsum eoqpsun eo ddm' },
      { name: 'Doc 3', format: 'txt', text: 'lorem ips123psun 41 eo ddm' },
      { name: 'Doc 4', format: 'txt', text: 'lorem ipsum eoqpsun eo ddm' }
    ]},
    { name: 'Documentos 2', folders: [], documents: [
      { name: 'Doc 1',format: 'txt', text: 'Loren ipsun dowk dodkl20ASDASD' },
      { name: 'Doc 2', format: 'txt', text: 'lorem ipsum eoqpsun eo ddm' }
    ]},
    { name: 'Documentos 3', folders: [], documents: [] }
  ];

  //methods
  $scope.createDoc = function(folderDocuments) {
    if (folderDocuments != undefined){
      folderDocuments.push({ name: 'Documento sem título', format: 'txt', text: ''});
    };
  };

  $scope.createFolder = function(ev, folder){

    var confirm = $mdDialog.prompt()
    if (folder == undefined) {
        confirm.title('Adicionar pasta.')
        .textContent('Por favor, insira um nome para a sua pasta.')
        .placeholder('Nome da pasta')
        .targetEvent(ev)
        .ok('Confirmar')
        .cancel('Cancelar');
    } else {
        $scope.currentFolder = folder;
        confirm.title('Adiconar pasta dentro da pasta "' + folder.name + '".')
        .textContent('Por favor, insira um nome para a sua pasta.')
        .placeholder('Nome da pasta')
        .targetEvent(ev)
        .ok('Confirmar')
        .cancel('Cancelar');
    };

    $mdDialog.show(confirm).then(function(result) {
      if (result != undefined) {
        if ($scope.currentFolder == null){
          $scope.mainFolders.push({ name: result, documents: []});
          $mdToast.show(
            $mdToast.simple()
              .textContent('Pasta ' + result + ' adicionada com sucesso!')
              .position("top right")
              .hideDelay(2000)
          );
        } else {
          folder.folders.push({ name: result, documents: []});
          $mdToast.show(
            $mdToast.simple()
              .textContent('Pasta ' + result + ' adicionada em ' + $scope.currentFolder.name + ' com sucesso!')
              .position("top right")
              .hideDelay(2000)
          );
        };
      } else {
        $mdToast.show(
          $mdToast.simple()
            .textContent('Pasta não adicionada! Por favor, insira um nome válido para a pasta.')
            .position("top right")
            .hideDelay(2000)
        );
      };
    }, function() {
      $mdToast.show(
        $mdToast.simple()
          .textContent('Nenhuma pasta foi criada.')
          .position("top right")
          .hideDelay(2000)
      );
    });
  };

  $scope.docClicked = function (document){
    $scope.currentDocument = document;
    $("#textArea").val($scope.currentDocument.text);
  };

  $scope.isDocClicked = function() {
    return !($scope.currentDocument === null);
  };

  $scope.getDocument = function() {
    return $scope.currentDocument;
  };

  $scope.showConfirm = function(ev) {
    var confirm = $mdDialog.confirm()
          .title('Você realmente deseja sair?')
          .targetEvent(ev)
          .ok('Sim')
          .cancel('Não');
    $mdDialog.show(confirm).then(function() {
      console.log('SAIU');
    }, function() {
      console.log('CONTINUA');
    });
  };

});

app.controller('AppCtrl', function ($scope, $timeout, $mdSidenav, $log) {

  $scope.openMenu = buildDelayedToggler('left');

  function debounce(func, wait, context) {
    var timer;
    return function debounced() {
      var context = $scope,
          args = Array.prototype.slice.call(arguments);
      $timeout.cancel(timer);
      timer = $timeout(function() {
        timer = undefined;
        func.apply(context, args);
      }, wait || 10);
    };
  }

  function buildDelayedToggler(navID) {
    return debounce(function() {
      $mdSidenav(navID)
        .toggle()
    }, 200);
  }

});
