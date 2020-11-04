var calculatorpage = function(){
      this.first= element(by.model('first'));
      this.second=element(by.model('second'));
      this.operation=element(by.model('operator'));
      this.gobutton=element(by.id('gobutton'));
      this.result=element(by.css('div.container.ng-scope table.table:nth-child(3) tbody:nth-child(2) tr.ng-scope > td.ng-binding:nth-child(3)'));
}
module.exports = new calculatorpage();
