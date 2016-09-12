(function () {
	angular.module('ScribeApp').factory('user', function ($http, $cookies) {

		return {
			getUserData: function (current_user_id) {
				return $http.get('users/' + current_user_id + '.json');
			}
		};

	});
})();
