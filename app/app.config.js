angular.module('workListModule').config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');
        $routeProvider.
            when('/work', {
                template: '<work-list layout="column" style="min-width: 100%;"></work-list>'
            }).
            otherwise('/work');
    }
]);