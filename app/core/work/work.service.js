//service
coreWork.factory('workService', ['$http',
    function ($http) {
		var a;
		var self = this;
        return {
            saveWork: function (title, detail, id) {
				data = {
					title : title,
					detail : detail,
					action : 'save'
				};
				
				if (id)
					data.id = id;
				
				return $http.post('server/controller.php', data);
            }
        };
    }
]);
