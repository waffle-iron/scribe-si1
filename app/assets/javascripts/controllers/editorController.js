app.controller('EditorController', function($scope, $mdToast, $rootScope) {

	$scope.currentDocument;


  $scope.saveDocument = function(newText) {
		$scope.currentDocument.contents = newText;
    $mdToast.show(
      $mdToast.simple()
        .textContent('Documento salvo com sucesso!')
        .position("top right")
        .hideDelay(2000)
    );
  };

	$rootScope.$on("CallSetDocumentMethod", function(document){
		 $scope.setDocument(document);
	});

	$scope.setDocument = function(document){
		$scope.currentDocument = document;
	};

});
