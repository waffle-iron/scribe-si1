(function () {
	angular.module('ScribeApp').factory('files', function ($http) {
		var service = {}

		service.getChildrenFolders = function(current_folder_id) {
			return $http.get('folders/children/' + current_folder_id + '.json');
		}

		service.getChildrenFiles = function(current_folder_id) {
			return $http.get('documents/children/' + current_folder_id + '.json');
		}

		service.getCurrentFolder = function(current_folder_id) {
			return $http.get('my-drive/' + current_folder_id + '.json');
		}

		service.getFolderInfo = function(data) {
			var folder = {};
			folder.name = service.getFolderName(data);
			folder.type = 'folder';
			folder.owner = 'me';
			folder.update = service.getFolderUpdate(data);
			folder.size = '-'

			return folder;
		}

		service.getFolderName = function(data) {
			return data.name;
		}

		service.getFolderUpdate = function(data) {
			return data.updated_at;
		}

		service.setCurrentFolder = function(folder) {
			currentFolder = folder;
		}

		return service;
	});
})();
