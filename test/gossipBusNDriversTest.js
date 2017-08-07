const Driver = require("../src/driver");
const GossipBus = require("../src/gossipBus");

describe("Gossip Bus with n drivers", function() {

    let numStops;
    let mike;
	let peter;
	let bill;
    let james;
    let colin;
    let laura;
    let gossipBus;

    beforeEach(function() {
        mike = new Driver("mike", [ 1, 2, 3, 4 ]);
		peter = new Driver("peter", [ 1, 4, 5, 6 ]);
		bill = new Driver("bill", [ 2, 3, 6, 4 ]);
        james = new Driver("james", [ 2, 3, 4, 5, 1 ]);
        colin = new Driver("colin", [ 1, 3, 4, 5 ]);
        laura = new Driver("laura", [ 3, 2, 1, 4 ]);

		gossipBus = new GossipBus();
    });

    it("when all drivers are at first stop return one", function() {
        gossipBus.addDriver(mike);
		gossipBus.addDriver(peter);
		gossipBus.addDriver(colin);

		numStops = gossipBus.calcNumStops();

        expect(numStops).toBe(1);
    });

	it("whenAllDriversAreAtLastStopReturnRouteLength", function() {
		gossipBus.addDriver(mike);
		gossipBus.addDriver(bill);
		gossipBus.addDriver(laura);

		numStops = gossipBus.calcNumStops();

        expect(numStops).toBe(4);
    });
    
	it("whenDriversJoinAfterALoopLongestRouteLength", function() {
		gossipBus.addDriver(mike);
		gossipBus.addDriver(peter);
		gossipBus.addDriver(james);

		numStops = gossipBus.calcNumStops();

        expect(numStops).toBe(5);
	});

	it("kataExample1", function() {
		gossipBus.addDriver(new Driver("driver1", [3, 1, 2, 3]));
		gossipBus.addDriver(new Driver("driver2", [3, 2, 3, 1]));
		gossipBus.addDriver(new Driver("driver3", [4, 2, 3, 4, 5]));

		numStops = gossipBus.calcNumStops();

		expect(numStops).toBe(5);
    });
    
	it("kataExample2", function() {
		gossipBus.addDriver(new Driver("driver1", [7, 11, 2, 2, 4, 8, 2, 2]));
		gossipBus.addDriver(new Driver("driver2", [3, 0, 11, 8]));
		gossipBus.addDriver(new Driver("driver3", [5, 11, 8, 10, 3, 11]));
		gossipBus.addDriver(new Driver("driver4", [5, 9, 2, 5, 0, 3]));
		gossipBus.addDriver(new Driver("driver5", [7, 4, 8, 2, 8, 1, 0, 5]));
		gossipBus.addDriver(new Driver("driver6", [3, 6, 8, 9]));
		gossipBus.addDriver(new Driver("driver7", [4, 2, 11, 3, 3]));

		numStops = gossipBus.calcNumStops();

		expect(numStops).toBe(9);
	});
});