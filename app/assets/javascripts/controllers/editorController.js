(function () {
	angular.module('ScribeApp').controller('editorController', function ($scope, $cookies, $timeout, $sce, $mdToast, $mdDialog, httpToolsService) {

		$scope.document_id = $cookies.getObject('current_document');

    httpToolsService.request('GET', '/documents/' + $scope.document_id + '.json', '').then(
			function (res) {
				$timeout(function () {
					$scope.document = res.data;
					$scope.fileContent = $sce.trustAsHtml(res.data.content);
				}, 10);
			},
			function (err) { console.log(err); }
		);

		$scope.returnToDrive = function () {
			httpToolsService.redirect('/my-drive');
		}

		$scope.changeFileExtension = function (extension) {
			$scope.document.extension = extension;

			$mdToast.show(
				$mdToast.simple()
					.textContent('Extensão alterada para .' + extension)
					.position('bottom left')
					.hideDelay(3000)
			);
		};

		$scope.saveDocument = function () {
      var token = $('meta[name=csrf-token]').attr("content");

			var fileContent = $('#file-content').html();
			if ($scope.document.extension === 'txt') {
				fileContent = $('#file-content').text();
			}

      var config = {
        authenticity_token: token,
        file: {
          name: $scope.document.name,
          extension: $scope.document.extension,
          content: fileContent
        }
      };

      httpToolsService.request('PUT', '/documents/' + $scope.document_id, config).then(
        function (res) {
					if (res.data.success) {
						$mdToast.show(
							$mdToast.simple()
								.textContent('Seu arquivo ' + $scope.document.name + '.' + $scope.document.extension + ' foi salvo com sucesso! :)')
								.position('bottom left')
								.hideDelay(5000)
						);
					}
          console.log(res);
        },
        function (err) { console.log(err); }
      );
		};

	});
})();
