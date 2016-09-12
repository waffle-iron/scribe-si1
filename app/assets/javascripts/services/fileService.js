(function () {
	angular.module('ScribeApp').factory('files', function ($http) {

		return {
			getRootFolder: function (current_root_folder_id) {
				return $http.get('/my-drive/' + current_root_folder_id + '.json');
			},

			getChildren: function (current_root_folder_id) {
				return $http.get('/folders/children/' + current_root_folder_id + '.json');
			}
		};

	});
})();
