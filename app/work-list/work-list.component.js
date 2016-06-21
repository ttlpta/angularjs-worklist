workListComponent.component('workList', {
    templateUrl: 'work-list/work-list.template.html',
    controllerAs: 'workListCrl',
    controller: ['$http', 'workService', workListController]
});

function workListController($http, workService) {
    var self = this;
	var works;
    $http.get('server/controller.php?action=list').then(function(response) {
		self.works = response.data;
	});
	
    this.saveMemo = function () {
        var title = self.title;
        var detail = self.detail;
        var work = [];
        var a = workService.saveWork(title, detail);
        console.log(a);
		alert('dasdasd');
        work['title'] =  title;
        self.works.push(work);
        self.title = '';
        self.detail = '';
    };
}
