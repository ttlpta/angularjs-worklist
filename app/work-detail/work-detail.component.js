workDetailComponent.component('workDetail', {
    templateUrl: 'work-detail/work-detail.template.html',
    controllerAs: 'workDetailCrl',
    controller: ['$scope', '$routeParams','workService', '$http', '$location', workDetailController]
});

function workDetailController($scope, $routeParams, workService, $http, $location) {
    var self = this;
	this.unChanged = true;
	var host = $location.host();
	workService.listDetailWork($routeParams.workId).then(function(response) {
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
	
	this.changed = function(){
		self.unChanged = false;
	}
	
}