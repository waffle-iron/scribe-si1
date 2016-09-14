(function () {
	angular.module('ScribeApp').factory('share', function ($http) {

		return {
			getSharedFiles: function (user_id) {
				return $http.get('/documents/shared/' + user_id + '.json');
			}
		};

	});
})();
