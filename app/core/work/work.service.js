//service
coreWork.factory('workService', ['$http',
    function ($http) {
		var a;
		var self = this;
        return {
			listWork : function () {
				return $http.get('server/controller.php?action=list')
			},
			listDetailWork : function (id) {
				return $http.patch('server/controller.php', {action : 'edit', id : id})
			},
            saveWork : function (title, detail, id) {
				data = {
					title : title,
					detail : detail,
					action : 'save'
				};
				
				if (id)
					data.id = id;
				
				return $http.post('server/controller.php', data);
            },
			deleteWork : function (id) {
				return $http.delete('server/controller.php', {data: {action: 'delete', id : id}});
			}
        };
    }
]);
