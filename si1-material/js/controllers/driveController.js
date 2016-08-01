app.controller('DriveController', function($scope) {

	// contains all files on the drive
	$scope.files = [
		{ name: "Geografia", type: "folder", contents: [
			{ name: "Prova de Geografia", type: "file", contents: "Dasdasdasda", updateDate: "1469969538034"},
			{ name: "Provas", type: "folder" }
		] },
		{ name: "Filosofia", type: "folder" }
	];

	// contains the
	$scope.pagination = [
		{ name: "Minhas pastas", contents: $scope.files }
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
			// do something
		}
	};

	$scope.changeFolder = function(index) {
		$scope.pagination = $scope.pagination.splice(0, index + 1);
		$scope.currentFolder = $scope.pagination.slice(-1)[0];
	};
});
