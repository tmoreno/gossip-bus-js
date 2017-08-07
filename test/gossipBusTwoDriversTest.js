const Driver = require("../src/driver");
const GossipBus = require("../src/gossipBus");

describe("Gossip Bus with two drivers", function() {

    let numStops;
    let mike;
	let peter;
	let bill;
	let james;
    let gossipBus;

    beforeEach(function() {
        mike = new Driver("mike", [ 1, 2, 3, 4 ]);
		peter = new Driver("peter", [ 1, 4, 5, 6 ]);
		bill = new Driver("bill", [ 2, 3, 6, 4 ]);
		james = new Driver("james", [ 2, 3, 4, 5, 1 ]);

		gossipBus = new GossipBus();
    });

    it("join at first stop return one", function() {
        gossipBus.addDriver(mike);
		gossipBus.addDriver(peter);

		numStops = gossipBus.calcNumStops();
        
        expect(numStops).toBe(1);
    });

	it("join at last stop return route length", function() {
		gossipBus.addDriver(mike);
		gossipBus.addDriver(bill);

		numStops = gossipBus.calcNumStops();

		expect(numStops).toBe(4);
	});

	it("never join return never", function() {
		gossipBus.addDriver(peter);
		gossipBus.addDriver(bill);

		numStops = gossipBus.calcNumStops();

		expect(numStops).toBe("never");
	});

	it("join after a loop return longest route length", function() {
		gossipBus.addDriver(mike);
		gossipBus.addDriver(james);

		numStops = gossipBus.calcNumStops();

		expect(numStops).toBe(5);
	});

	it("kataExample2", function() {
		let driver1 = new Driver("driver1", [ 2, 1, 2 ]);
		let driver2 = new Driver("driver2", [ 5, 2, 8 ]);

		gossipBus.addDriver(driver1);
		gossipBus.addDriver(driver2);

		numStops = gossipBus.calcNumStops();

		expect(numStops).toBe("never");
	});

});