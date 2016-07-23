app.controller('MainCtrl', function($scope){

});

app.controller('ListCtrl', function($scope, $mdDialog){

  $scope.options = [
    { name: 'Compartilhar' , index: 1, icon: 'share', func: 'shareDoc(folder.documents, document.id)'},
    { name: 'Excluir' , index: 2, icon: 'delete', func: 'deleteDoc(folder.documents, document.id)'}
  ];

  $scope.mainFolders = [
    { name: 'Textos', documents: [
      { name: 'teste1',format: 'txt', text: 'Loren ipsun dowk dodkl20' },
      { name: 'teste2', format: 'txt', text: 'lorem ipsum eoqpsun eo ddm' },
      { name: 'teste3', format: 'txt', text: 'lorem ips123psun 41 eo ddm' },
      { name: 'teste4', format: 'txt', text: 'lorem ipsum eoqpsun eo ddm' }
    ]},
    { name: 'Textos 2', documents: [
      { name: 'teste1',format: 'txt', text: 'Loren ipsun dowk dodkl20' },
      { name: 'teste2', format: 'txt', text: 'lorem ipsum eoqpsun eo ddm' }
    ]},
    { name: 'Textos 3', documents: [] }
  ];

  $scope.announceClick = function(index) {
    $mdDialog.show(
      $mdDialog.alert()
        .title('You clicked!')
        .textContent('You clicked the menu item at index ' + index )
        .ok('Nice')
    );
  };


  $scope.createDoc = function(folderDocuments) {
    folderDocuments.push({ name: 'teste1',format: 'txt', text: 'Loren ipsun dowk dodkl20'});
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
