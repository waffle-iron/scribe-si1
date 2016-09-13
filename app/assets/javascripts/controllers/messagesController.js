(function () {
	angular.module('ScribeApp').controller('messagesController', function ($scope, httpToolsService) {

		$scope.messages = [
            {
                from_user_id: 'Chico',
                message: 'Something...',
                created_at: '22 Jun 2016'
            },
            {
                from_user_id: 'Cintra',
                message: 'Tiago melhor professor',
                created_at: '22 Jun 2016'
            },
            {
                from_user_id: 'Doge',
                message: 'Doge > gato',
                created_at: '23 Jun 2016'
            },
            {
                from_user_id: 'Gato',
                message: 'Gato > doge',
                created_at: '23 Jun 2016'
            }
        ];


	});
})();
