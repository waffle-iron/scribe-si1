(function () {
	angular.module('ScribeApp')
	.controller('editorController', function ($scope, files) {

    $scope.saveDocument = function(){
      console.log("Salvando");
    };

})();
