(function () {
	angular.module('ScribeApp').controller('editorController', function ($scope, $cookies, httpToolsService) {

		$scope.document_id = $cookies.getObject('current_document');

    httpToolsService.request('GET', '/documents/' + $scope.document_id + '.json', '').then(
			function (res) {
				$scope.document = res.data;
			},
			function (err) { console.log(err); }
		);

		$scope.changeFileExtension = function (extension) {
			$scope.document.extension = extension;
		};

		$scope.saveDocument = function () {

      var token = $('meta[name=csrf-token]').attr("content");

      var config = {
        authenticity_token: token,
        file: {
          name: $scope.document.name,
          extension: $scope.document.extension,
          content: $('#file-content').text()
        }
      };

      httpToolsService.request('PUT', '/documents/' + $scope.document_id, config).then(
        function (res) {
          console.log(res);
        },
        function (err) { console.log(err); }
      );
		};

	});
})();
