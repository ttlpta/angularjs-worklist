coreWork.factory('Work', ['$resource',
    function ($resource) {
        return $resource('server/controller.php', {}, {
            query: {
                method: 'GET',
                params: {action: 'list'},
                isArray: true
            }
        });
    }
]);
//service
coreWork.factory('workService', ['Work',
    function (Work) {
        return {
            saveWork: function (title, detail) {
                if (title) {
                    workData = new Work({title: title, detail: detail});
                    workData.action = 'save';
                    workData.$save(function () {
                        alert('Save');
                    });
                }
            }
        };
    }
]);
