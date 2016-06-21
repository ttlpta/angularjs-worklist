// coreWork.factory('Work', ['$http',
    // function ($http) {
        // return {
            
        // };

        //return $resource('server/controller.php', {}, {
        //    query: {
        //        method: 'GET',
        //        params: {action: 'list'},
        //        isArray: true
        //    }
        //});
    // }
// ]);
//service
coreWork.factory('workService', ['$http',
    function ($http) {
        return {
            saveWork: function (title, detail) {
                if (title) {
					data = {
						title : title,
						detail : detail,
						action : 'save'
					};
					
					var a;
					$http.post('server/controller.php', data).then(function successCallback(response) {
						.a = response.data;
					});
					
					return a;
                }
            }
        };
    }
]);
