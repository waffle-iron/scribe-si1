(function () {
	angular.module('ScribeApp').factory('user', function ($http, $cookies) {
		var service = {};

		service.getCurrentUser = function(current_user_id){
			return $http.get('users/' + current_user_id + '.json');
		}

		service.getUserInfo = function(data){
			var user = {};
			user.name = service.getUsername(data);
			user.avatarPath = 'imgs/chico.jpg'
			user.premiumUser = true;

			return user;
		}

		service.getUsername = function (data) {
			var formattedName = data.first_name + ' ' + data.last_name;
			return formattedName;
		},

		service.getAvatarPath = function () {
			return avatarPath;
		},

		service.isPremiumUser = function () {
			return premiumUser;
		}

		return service;
	});
})();
