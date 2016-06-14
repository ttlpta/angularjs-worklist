workListComponent.component('workList', {
    templateUrl: 'work-list/work-list.template.html',
    controllerAs: 'workListCrl',
    controller: ['$sce', 'Work', workListController]
});

function workListController($sce, Work) {
    var self = this;
    this.works = Work.query();
    this.saveMemo = function () {
        var work = [];
        var title = self.title;
        var detail = self.detail;
        if (title) {
            self.work = new Work({title: title, detail: detail});
            self.work.action = 'save';
            self.work.$save(function () {
                alert('Save');
            });
            work['title'] = $sce.trustAsHtml('<a href="#">' + title + '</a>');
            self.works.push(work);
            self.title = '';
            self.detail = '';
        }
    }
}
