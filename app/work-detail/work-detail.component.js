workDetailComponent.component('workDetail', {
    templateUrl: 'work-detail/work-detail.template.html',
    controllerAs: 'workDetailCrl',
    controller: ['$scope', '$routeParams','workService', '$http', '$location', workDetailController]
}).directive("backUrl", function() {
    return {
        template : '<a ng-href="http://localhost/angularjs-worklist/app/index.html#!/work">Back to home</a>'
    };
});;

function workDetailController($scope, $routeParams, workService, $http, $location) {
    var self = this;
	$http.patch('server/controller.php', {action : 'edit', id : $routeParams.workId}).then(function(response) {
		self.work = response.data;
	});	
	
    this.saveMemo = function(){
        var title = self.work.title;
        var detail = self.work.detail;
		
        workService.saveWork(title, detail, $routeParams.workId).then(function successCallback(response) {
			alert('save');
			$location.path('/work');
		}, function errorCallback(response) {
			alert(response);
		});;
    };
}