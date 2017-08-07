const Driver = require("../src/driver");
const GossipBus = require("../src/gossipBus");

describe("Gossip Bus with one driver", function() {

    let mike;
    let gossipBus;

    beforeEach(function() {
        mike = new Driver("mike", [ 1, 2, 3, 4 ]);

		gossipBus = new GossipBus();
    });

    it("return never", function() {
        gossipBus.addDriver(mike);

        numStops = gossipBus.calcNumStops();
        
        expect(numStops).toBe("never");
    });
});