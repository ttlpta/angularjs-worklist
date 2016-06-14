workListComponent.component('workList', {
    templateUrl: 'work-list/work-list.template.html',
    controllerAs: 'workListCrl',
    controller: ['Work', 'workService', workListController]
});

function workListController(Work, workService) {
    var self = this;
    this.works = Work.query();
    this.saveMemo = function () {
        var title = self.title;
        var detail = self.detail;
        var work = [];
        workService.saveWork(title, detail)
        work['title'] =  title;
        self.works.push(work);
        self.title = '';
        self.detail = '';
    };
}
