coreWork.factory('workService', ['$resource',
    function($resource) {
		return $resource('server/controller.php', {}, {
			query: {
				method: 'GET',
				params: {action: 'list'},
				isArray: true
			}, 
			get: {
				method: 'GET',
				params: {action: 'edit'}
			},
			delete: {
				method: 'DELETE',
				params: {action: 'delete'}
			}
		});
    }
]);
