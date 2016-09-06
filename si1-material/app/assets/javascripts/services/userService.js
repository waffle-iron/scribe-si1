(function () {
	angular.module('ScribeApp').service('user', function () {
		var username = 'Francisco Júnior';
		var avatarPath = 'imgs/chico.jpg';
		var premiumUser = false;

		return {
			getUsername: function () {
				return username;
			},

			getAvatarPath: function () {
				return avatarPath;
			},

			isPremiumUser: function () {
				return premiumUser;
			}
		};

	});
})();
