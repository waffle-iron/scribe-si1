app.controller('MainCtrl', function($scope){

});

var currentDoc = null;

app.controller('ListCtrl', function($scope, $mdDialog){

  $scope.currentDocument;

  // Mock data
  $scope.mainFolders = [
    { name: 'Documentos 1', documents: [
      { name: 'Doc 1', format: 'txt', text: 'Loren ipsun dowk dodkl20' },
      { name: 'Doc 2', format: 'txt', text: 'lorem ipsum eoqpsun eo ddm' },
      { name: 'Doc 3', format: 'txt', text: 'lorem ips123psun 41 eo ddm' },
      { name: 'Doc 4', format: 'txt', text: 'lorem ipsum eoqpsun eo ddm' }
    ]},
    { name: 'Documentos 2', documents: [
      { name: 'Doc 1',format: 'txt', text: 'Loren ipsun dowk dodkl20ASDASD' },
      { name: 'Doc 2', format: 'txt', text: 'lorem ipsum eoqpsun eo ddm' }
    ]},
    { name: 'Documentos 3', documents: [] }
  ];

  //methods
  $scope.createDoc = function(folderDocuments) {
    if (folderDocuments != undefined){
      folderDocuments.push({ name: 'Documento sem título', format: 'txt', text: ''});
    };
  };

  $scope.docClicked = function (document){
    currentDoc = document;
    $scope.currentDocument = currentDoc;
    $("#textArea").val($scope.currentDocument.text);
  };

  $scope.isDocClicked = function() {
    return !(currentDoc === null);
  };

  $scope.saveDocument = function(document) {
    document.text = $("#textArea").val();
  };

  $scope.getDocument = function() {
    return $scope.currentDocument;
  };

  $scope.signOut = function() {
    confirm("eoq");
  };

  $scope.showConfirm = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.confirm()
          .title('Você realmente deseja sair?')
          .targetEvent(ev)
          .ok('Sim')
          .cancel('Não');
    $mdDialog.show(confirm).then(function() {
      console.log('saiu');
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
