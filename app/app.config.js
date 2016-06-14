angular.module('workListModule').config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');
        $routeProvider.
            when('/work', {
                template: '<work-list></work-list>'
            }).
            when('/work/:workId', {
                template: '<work-detail></work-detail>'
            }).
            otherwise('/work');
    }
]);