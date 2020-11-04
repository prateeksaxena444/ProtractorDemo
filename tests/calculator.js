describe('Calculator scenerios', function() {

    browser.ignoreSynchronization = true;
    var testData = require('../data/testdata.json');
    var calculatorpage = require('../pages/calculatorpage');

    it('launch website',function(){
        browser.get('http://juliemr.github.io/protractor-demo/');
        browser.driver.manage().window().maximize();
        expect(browser.getTitle()).toEqual('Super Calculator');
        browser.sleep(2000);
    });

    it('Addition',function(){
        calculatorpage.first.sendKeys(testData.UC1.firstValue);
        browser.sleep(500);
        calculatorpage.second.sendKeys(testData.UC1.secondValue);
        browser.sleep(500);
        calculatorpage.gobutton.click();
        browser.sleep(3000);
        var output = calculatorpage.result;
        console.log(output);
        expect(output.getText()).toBe(testData.UC1.expected);
        browser.sleep(2000);
    });

    it('subtraction',function(){
        calculatorpage.first.sendKeys(testData.UC2.firstValue);
        browser.sleep(500);
        calculatorpage.second.sendKeys(testData.UC2.secondValue);
        browser.sleep(500);
        calculatorpage.operation.click();
        var allOptions = element.all(by.options('value for (key, value) in operators'));
        var operation = allOptions.getText(testData.UC2.operation);
        operation.click();
        browser.sleep(500);
        calculatorpage.gobutton.click();
        browser.sleep(3000);
        var output = calculatorpage.result;
        console.log(output);
        expect(output.getText()).toBe(testData.UC2.expected);
    });

    /*it('close browser',function(){
        browser.close();
        browser.sleep(2000);
    });*/

});