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
