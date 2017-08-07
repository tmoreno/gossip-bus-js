const Driver = require("../src/driver");

describe("DriverTest", function() {

    let driver;
    const route = [ 1, 2, 3, 4 ];

    beforeEach(function() {
        driver = new Driver("mike", route);
    });

    it("driver visits all stops", function() {
        expect(driver.getStop()).toBe(1);

		driver.goToNextStop();
		expect(driver.getStop()).toBe(2);

		driver.goToNextStop();
		expect(driver.getStop()).toBe(3);

		driver.goToNextStop();
		expect(driver.getStop()).toBe(4);
    });

    it("driver visits first stop after a loop", function() {
		driver.goToNextStop();
		driver.goToNextStop();
		driver.goToNextStop();
		driver.goToNextStop();

        expect(driver.getStop()).toBe(1);
    });
    
	it("share gossips", function() {
		let mike = new Driver("mike", route);
		let laura = new Driver("laura", route);
		let james = new Driver("james", route);

        mike.shareGossips(laura);
        expect(mike.getGossipsKnowed()).toEqual(["mike", "laura"]);
        expect(laura.getGossipsKnowed()).toEqual(["mike", "laura"]);
		
        james.shareGossips(laura);
        expect(mike.getGossipsKnowed()).toEqual(["mike", "laura"]);
        expect(laura.getGossipsKnowed()).toEqual(["james", "mike", "laura"]);
        expect(james.getGossipsKnowed()).toEqual(["james", "mike", "laura"]);
	});
});