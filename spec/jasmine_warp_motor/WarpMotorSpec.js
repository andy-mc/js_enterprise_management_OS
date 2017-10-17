describe("warp_motor utility", function() {
  
  var warp_motor = require('../../warp_motor');

  it("should operate for infinite time, with all injectors at 100", function() {
    expect(warp_motor(0, 0, 0, 100)).toEqual([ [ 100, 100, 100 ], 'infinite' ]);
  });

  it("should operate for infinite time, with all injectors at 90", function() {
    expect(warp_motor(0, 0, 0, 90)).toEqual([ [ 90, 90, 90 ], 'infinite' ]);
  });

  it("should operate for infinite time, with all injectors at 30", function() {
    expect(warp_motor(0, 0, 0, 30)).toEqual([ [ 30, 30, 30 ], 'infinite' ]);
  });

  it("should operate for 90 min", function() {
    expect(warp_motor(20, 10, 0, 100)).toEqual([ [ 90, 100, 110 ], 90 ]);
  });

  it("should operate for 80 min, with 2 injectors on 1 off", function() {
    expect(warp_motor(0, 0, 100, 80)).toEqual([ [ 120, 120, 0 ], 80 ]);
  });

  it("should operate for 50 min, with all injectors at 150", function() {
    expect(warp_motor(0, 0, 0, 150)).toEqual([ [ 150, 150, 150 ], 50 ]);
  });

  it("should operate for 50 min", function() {
    expect(warp_motor(0, 0, 30, 140)).toEqual([ [ 150, 150, 120 ], 50 ]);
  });

  it("should operate for 0 min, meanings 'Unable to comply'", function() {
    expect(warp_motor(20, 50, 40, 170)).toEqual([ 'Unable to comply', 0 ]);
  });

});
