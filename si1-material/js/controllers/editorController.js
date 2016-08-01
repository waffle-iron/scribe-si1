app.controller('EditorController', function($scope, $mdToast) {

	$scope.currentDocument = { name: "Texto teste", ext: "txt", text: "Lorem ipsum dolor sit amet" };


  $scope.saveDocument = function(document) {
    document.text = $("#textArea").val();
    $mdToast.show(
      $mdToast.simple()
        .textContent('Documento salvo com sucesso!')
        .position("top right")
        .hideDelay(2000)
    );
  };

});
