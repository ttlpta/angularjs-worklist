workListComponent.component('workList', {
    templateUrl: 'work-list/work-list.template.html',
    controllerAs: 'workListCrl',
    controller: ['$http', '$location', 'workService', workListController]
});

function workListController($http, $location, workService) {
    var self = this;
	var works = [];
    $http.get('server/controller.php?action=list').then(function(response) {
		self.works = response.data;
		self.url_detail = function(id){
			return $location.absUrl()+'/'+id;
		}
	});
	
    this.saveWork = function () {
        var title = self.title;
        var detail = self.detail;
		var id;
		var work = [];
		
		if (title)
			workService.saveWork(title, detail).then(function successCallback(response) {
				work['title'] =  title;
				work['url_detail'] =  $location.absUrl()+'/'+response.data.id;
				
				self.works.push(work);
				alert('save');
				self.title = '';
				self.detail = '';
			}, function errorCallback(response) {
				alert(response);
			});
    };
	
	// this.deleteWork = function ($id) {
		
	// }
}
