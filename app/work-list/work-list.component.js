workListComponent.component('workList', {
    templateUrl: 'work-list/work-list.template.html',
    controllerAs: 'workListCrl',
    controller: ['$http', '$location', 'workService', workListController]
});

function workListController($http, $location, workService) {
    var self = this;
	var works = [];
	
	
    workService.listWork().then(function(response) {
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
		var selected;
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
	
	this.deleteWork = function (index, id) {
		workService.deleteWork(id).then(function(response) {
			alert('deleted');
			self.works.splice(index, 1);
		}, function errorCallback(response) {
			alert('error');
		});
	};
	
	var priotyTitle = function(prioty){
		console.log(prioty);
		var title;
		switch(prioty){
			case 1:
				title = 'Do after';
				break;
			case 2:
				title = 'Should do';			
				break;
			case 3: 
				title = 'Must do';
				break;
		}
		return title;
	};
	
	this.selectWork = function (id) {
		workService.listDetailWork(id).then(function(response) {
			
			self.work = response.data;
			self.work.priotyTitle = priotyTitle(response.data.id);
			console.log(self.work);
			self.selected = id;
		});	
	};
}
