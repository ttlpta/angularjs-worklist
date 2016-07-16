workListComponent.component('workList', {
    templateUrl: 'work-list/work-list.template.html',
    controllerAs: 'workListCrl',
    controller: ['$http', '$location','$mdBottomSheet', 'workService', workListController]
});

function workListController($http, $location, $mdBottomSheet, workService) {
    var self = this;
	var works = [];
	
	var priotyTitle = function(prioty){
		var title;
		switch(+prioty){
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
	
	this.works = workService.query();
	
	var work = workService.get({ id: 1 }); 
	this.work = work;
	// this.work.priotyTitle = priotyTitle(this.work.prioty);
	console.log(work.id);
	self.selected = 1;
						  
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
	
	
	this.selectWork = function (id) {
		this.work = workService.get({ id: id }); 
		this.work.priotyTitle = priotyTitle(this.work.prioty);
		self.selected = id;
	};
	
	this.editWork = function(id){
		$mdBottomSheet.show({
			controllerAs  : "workDetailCtrl",
			templateUrl   : './work-detail/work-detail.template.html',
			controller    : [ '$mdBottomSheet', 'workService', WorkDetailController],
			parent        : angular.element(document.getElementById('content'))
        }).then(function(clickedItem) {
			$log.debug( clickedItem.name + ' clicked!');
        });

        function WorkDetailController( $mdBottomSheet, workService ) {
			var self = this;
			this.work = workService.get({ action: 'edit', id: id }); 
        }
	}
}
