workListComponent.component('workList', {
    templateUrl: 'work-list/work-list.template.html',
    controllerAs: 'workListCrl',
    controller: ['$http', 'workService', workListController]
});

function workListController($http, workService) {
    var self = this;
	var works = [];
    $http.get('server/controller.php?action=list').then(function(response) {
		self.works = response.data;
	});
	
    this.saveMemo = function () {
        var title = self.title;
        var detail = self.detail;
		var id;
		var work = [];
		
		if (title)
			workService.saveWork(title, detail).then(function successCallback(response) {
				work['title'] =  title;
				work['id'] =  response.data.id;
				self.works.push(work);
				self.title = '';
				self.detail = '';
			}, function errorCallback(response) {
				alert(response);
			});
    };
}
