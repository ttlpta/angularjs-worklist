workDetailComponent.component('workDetail', {
    templateUrl: 'work-detail/work-detail.template.html',
    controllerAs: 'workDetailCrl',
    controller: ['$scope', '$routeParams', 'Work','workService', workDetailController]
});

function workDetailController($scope, $routeParams, Work, workService) {
    var self = this;
    this.work = Work.get({action: 'edit', id: $routeParams.workId});
    this.saveMemo = function(){
        var title = self.work.title;
        var detail = self.work.detail;
        workService.saveWork(title, detail, $routeParams.workId);
    };
}