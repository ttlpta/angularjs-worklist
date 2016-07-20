workListComponent.component('workList', {
    templateUrl: 'work-list/work-list.template.html',
    controllerAs: 'workListCrl',
    controller: ['$http', '$location','$mdBottomSheet', 'workService', '$scope', '$mdDialog', '$filter', '$mdSidenav', workListController]
});

function workListController($http, $location, $mdBottomSheet, workService, $scope, $mdDialog, $filter, $mdSidenav) {
    var self = this;
	
	this.works = workService.query(function(works){
		self._displayFirstWorkInList(works);
	});
	
	this.selectWork = function (id) {
		this.work = workService.get({ id: id }); 
		self.selected = id;
	};
	
	this.addWork = function () {
		this.editWork();
	};
	
	this.editWork = function(id){
		var mdBottomSheetData = {
			controllerAs : "workDetailCtrl",
			templateUrl : './work-detail/work-detail.template.html',
			controller : ['workService', WorkDetailController],
			parent : angular.element(document.getElementById('content'))
        }; 
		if (id){
			mdBottomSheetData.scope = $scope;
			mdBottomSheetData.preserveScope = true;
		} 
		$mdBottomSheet.show(mdBottomSheetData);
        function WorkDetailController( workService ) {
			var ADD_FORM = 1;
			var EDIT_FORM = 2;
			this.formTitle = (id) ? 'Edit work' : 'Add Work';
			this.formType = (id) ? EDIT_FORM : ADD_FORM;
			this.work = new workService();
			this.saveWork = function () {
				if (id){
					self.work.$save(function(work) {
						self.work = workService.get({ id: self.selected }); 
						self.works = workService.query();
					});
				} else {
					this.work.$save(function(work) {
						self.work = workService.get({ id: work.id }); 
						self.selected = work.id;
						self.works = workService.query();
					});
				}
				
				$mdBottomSheet.hide();
			};
        }
	}
	
	this.deleteWork = function(id, ev){
		var confirm = $mdDialog.confirm()
			.title('Delete')
			.textContent('Would you like to delete your work?')
			.ariaLabel('Delete')
			.targetEvent(ev)
			.ok('Yes')
			.cancel('No');
			$mdDialog.show(confirm).then(function() {
				workService.delete({id: id}, function() {
					self.works = workService.query(function(works){
						self._displayFirstWorkInList(works);
					});
				});
			});
	};
	
	this.toggleList = function(){
		$mdSidenav('left').toggle();
	};
	
	this._displayFirstWorkInList = function(works){
		if (works.length) {
			works = $filter('orderBy')(works, '-prioty');
			self.selected = works[0].id;
			self.work = workService.get({ id: works[0].id });
		} else {
			self.work = [];
		}
	}
}
