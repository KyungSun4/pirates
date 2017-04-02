console.log('hello wordl');

var express = require('express');
var app = express();
var serv = require('http').Server(app);

var TO_RADIANS = Math.PI / 180;

app.get('/', function(reg, res) {
    res.sendFile(__dirname + '/client/mobile.html');
});
app.use('/client', express.static(__dirname + '/client'));

serv.listen(2000);

console.log('MISSION GO')



var socketlist = {};

var mapw = 10000;
var maph = 10000;

var ctypes = [{
    range: 1000, //machine gun
    btype: 1,
    type: 0,
    reload: 19,
}, {
    range: 1000, //big cannon
    btype: 0,
    type: 1,
    reload: 30,
}, {
    range: 1000, //small canon
    btype: 0,
    type: 2,
    reload: 20,
}, {
    range: 1000, //catapult
    btype: 0,
    type: 3,
    reload: 20,
}, {
    range: 1000, //med missle
    btype: 1,
    type: 3,
    reload: 20,
}, {
    range: 1000, //big missle
    btype: 1,
    type: 4,
    reload: 10,
}, {
    range: 1000, //yammato cannon
    btype: 1,
    type: 5,
    reload: 10,

}, ];
var btypes = [{
    width: 8,
    height: 8,
    damage: 10,
    speed: 10,
}, {
    width: 12,
    height: 4,
    damage: 5,
    speed: 20,
}];
var ptypes = [{
    reload: 30,
    vel: 20,
    rotdrag: 1,
    maxrot: 10,
    rotaccel: 1,
    width: 38,
    height: 30,
    type: 0,
    worth: 10,

}, {
    reload: 30,
    vel: 7,
    rotdrag: 2,
    maxrot: 10,
    rotaccel: 2,
    width: 40,
    height: 30,
    type: 1,
    worth: 10,

}, ];

var types = [{
    type: 0, //canoe
    width: 50,
    height: 44,
    mass: 1,
    health: 100,
    maxhealth: 100,
    accel: 2,
    drag: .2,
    maxSpd: 10,
    rotaccel: 1,
    rotdrag: 1,
    maxrot: 10,
    handling: 10,
    points: [],
    reload: 30,
    worth: 10,
    frame: 1,
    maxPlanes: 0,
    cannons: [{
        type: 0,
        dist: 20,
        ang: 0,

    }],
}, {
    type: 1, //raft
    width: 42,
    height: 22,
    mass: 1,
    health: 100,
    maxhealth: 100,
    accel: 2,
    drag: .2,
    maxSpd: 10,
    rotaccel: 1,
    rotdrag: 1,
    maxrot: 10,
    handling: 10,
    points: [],
    reload: 30,
    worth: 10,
    frame: 1,
    maxPlanes: 0,
    cannons: [{
        type: 0,
        dist: 14,
        ang: 0,

    }],
}, {
    type: 2, //small ship
    width: 74,
    height: 34,
    mass: 1,
    health: 100,
    maxhealth: 100,
    accel: 2,
    drag: .2,
    maxSpd: 10,
    rotaccel: 1,
    rotdrag: 1,
    maxrot: 10,
    handling: 10,
    points: [],
    reload: 30,
    worth: 10,
    frame: 1,
    maxPlanes: 0,
    cannons: [{
        type: 2,
        dist: 18,
        ang: 0,

    }],
}, {
    type: 3, //S mil
    width: 98,
    height: 30,
    mass: 1,
    health: 100,
    maxhealth: 100,
    accel: 2,
    drag: .2,
    maxSpd: 10,
    rotaccel: 1,
    rotdrag: 1,
    maxrot: 10,
    handling: 10,
    points: [],
    reload: 30,
    worth: 10,
    frame: 1,
    maxPlanes: 0,
    cannons: [{
        type: 4,
        dist: 26,
        ang: 0,

    }],
}, {
    type: 4, //s sub
    width: 88,
    height: 30,
    mass: 1,
    health: 100,
    maxhealth: 100,
    accel: 2,
    drag: .2,
    maxSpd: 10,
    rotaccel: 1,
    rotdrag: 1,
    maxrot: 10,
    handling: 10,
    points: [],
    reload: 30,
    worth: 10,
    frame: 1,
    maxPlanes: 0,
    cannons: [{
        type: 0,
        dist: 20,
        ang: 0,

    }],
}, {
    type: 5, //m sub
    width: 138,
    height: 38,
    mass: 1,
    health: 100,
    maxhealth: 100,
    accel: 2,
    drag: .2,
    maxSpd: 10,
    rotaccel: 1,
    rotdrag: 1,
    maxrot: 10,
    handling: 10,
    points: [],
    reload: 30,
    worth: 10,
    frame: 1,
    maxPlanes: 0,
    cannons: [{
        type: 0,
        dist: 20,
        ang: 0,

    }],
}, {
    type: 6, //m pirtae
    width: 122,
    height: 46,
    mass: 1,
    health: 100,
    maxhealth: 100,
    accel: 2,
    drag: .2,
    maxSpd: 10,
    rotaccel: 1,
    rotdrag: 1,
    maxrot: 10,
    handling: 10,
    points: [],
    reload: 30,
    worth: 10,
    frame: 1,
    maxPlanes: 0,
    cannons: [{
        type: 2,
        dist: 12,
        ang: 90,
    }, {
        type: 2,
        dist: 12,
        ang: 270,
    }],
}, {
    type: 7, //L pirta
    width: 156,
    height: 62,
    mass: 1,
    health: 100,
    maxhealth: 100,
    accel: 2,
    drag: .2,
    maxSpd: 10,
    rotaccel: 1,
    rotdrag: 1,
    maxrot: 10,
    handling: 10,
    points: [],
    reload: 30,
    worth: 10,
    frame: 1,
    maxPlanes: 0,
    cannons: [{
        type: 1,
        dist: 28,
        ang: 45,

    }, {
        type: 1,
        dist: 28,
        ang: 315,

    }, {
        type: 1,
        dist: 60,
        ang: 160,

    }, {
        type: 1,
        dist: 60,
        ang: 200,

    }, ],
}, {
    type: 8, //M mil extinct
    width: 49,
    height: 17,
    mass: 1,
    health: 100,
    maxhealth: 100,
    accel: 2,
    drag: .2,
    maxSpd: 10,
    rotaccel: 1,
    rotdrag: 1,
    maxrot: 10,
    handling: 10,
    points: [],
    reload: 30,
    worth: 10,
    frame: 1,
    maxPlanes: 0,
    cannons: [{
        type: 0,
        dist: 20,
        ang: 0,

    }],
}, {
    type: 9, // big carrier
    width: 352,
    height: 134,
    mass: 1,
    health: 100,
    maxhealth: 100,
    accel: 2,
    drag: .2,
    maxSpd: 10,
    rotaccel: 1,
    rotdrag: 1,
    maxrot: 10,
    handling: 10,
    points: [],
    reload: 30,
    worth: 10,
    frame: 1,
    maxPlanes: 0,
    cannons: [{
        type: 4,
        dist: 102.4,
        ang: 19,

    }, {
        type: 4,
        dist: 100,
        ang: 348.5,

    }],
}, {
    type: 10, //XL pirate
    width: 182,
    height: 58,
    mass: 1,
    health: 100,
    maxhealth: 100,
    accel: 2,
    drag: .2,
    maxSpd: 10,
    rotaccel: 1,
    rotdrag: 1,
    maxrot: 10,
    handling: 10,
    points: [],
    reload: 30,
    worth: 10,
    frame: 1,
    maxPlanes: 0,
    cannons: [{
        type: 2,
        dist: 45,
        ang: 0,

    }, {
        type: 2,
        dist: 22.4,
        ang: 63.4,

    }, {
        type: 2,
        dist: 22.4,
        ang: 296.6,

    }, {
        type: 2,
        dist: 34,
        ang: 140,

    }, {
        type: 2,
        dist: 34,
        ang: 220,

    }, {
        type: 2,
        dist: 74.7,
        ang: 164,

    }, {
        type: 2,
        dist: 74.7,
        ang: 195,

    }],
}, {
    type: 11, //small carrier
    width: 238,
    height: 76,
    mass: 1,
    health: 100,
    maxhealth: 100,
    accel: 2,
    drag: .2,
    maxSpd: 10,
    rotaccel: 1,
    rotdrag: 1,
    maxrot: 10,
    handling: 10,
    points: [],
    reload: 30,
    worth: 10,
    frame: 1,
    maxPlanes: 0,
    cannons: [{
        type: 4,
        dist: 105,
        ang: 16,

    }],
}, {
    type: 12, //black sub
    width: 174,
    height: 54,
    mass: 1,
    health: 100,
    maxhealth: 100,
    accel: 2,
    drag: .2,
    maxSpd: 10,
    rotaccel: 1,
    rotdrag: 1,
    maxrot: 10,
    handling: 10,
    points: [],
    reload: 30,
    worth: 10,
    frame: 1,
    maxPlanes: 0,
    cannons: [{
        type: 0,
        dist: 20,
        ang: 0,

    }],
}, {
    type: 13, //battle ship
    width: 198,
    height: 46,
    mass: 1,
    health: 100,
    maxhealth: 100,
    accel: 2,
    drag: .2,
    maxSpd: 10,
    rotaccel: 1,
    rotdrag: 1,
    maxrot: 10,
    handling: 10,
    points: [],
    reload: 30,
    worth: 10,
    frame: 1,
    maxPlanes: 0,
    cannons: [{
        type: 5,
        dist: 44,
        ang: 0,

    }, {
        type: 5,
        dist: 22,
        ang: 0,

    }, {
        type: 5,
        dist: 38,
        ang: 180,

    }, {
        type: 5,
        dist: 58,
        ang: 180,

    }, {
        type: 0,
        dist: 20,
        ang: 53,

    }, {
        type: 0,
        dist: 20,
        ang: 307,

    }, {
        type: 0,
        dist: 30.5,
        ang: 153,

    }, {
        type: 0,
        dist: 30.5,
        ang: 206.6,

    }],
}, {
    type: 14, //destroyer heli 1 with H
    width: 170,
    height: 42,
    mass: 1,
    health: 100,
    maxhealth: 100,
    accel: 2,
    drag: .2,
    maxSpd: 10,
    rotaccel: 1,
    rotdrag: 1,
    maxrot: 10,
    handling: 10,
    points: [],
    reload: 30,
    worth: 10,
    frame: 1,
    maxPlanes: 0,
    cannons: [{
        type: 5,
        dist: 48,
        ang: 0,
    }, {
        type: 5,
        dist: 44,
        ang: 180,

    }, {
        type: 0,
        dist: 19,
        ang: 66,

    }, {
        type: 0,
        dist: 19,
        ang: 294,

    }],
}, {
    type: 15, //helli boat
    width: 152,
    height: 42,
    mass: 1,
    health: 100,
    maxhealth: 100,
    accel: 2,
    drag: .2,
    maxSpd: 10,
    rotaccel: 1,
    rotdrag: 1,
    maxrot: 10,
    handling: 10,
    points: [],
    reload: 30,
    worth: 10,
    frame: 1,
    maxPlanes: 1,
    cannons: [{
        type: 4,
        dist: 34,
        ang: 0,

    }],
}, {
    type: 16, //saracuse
    width: 200,
    height: 96,
    mass: 1,
    health: 100,
    maxhealth: 100,
    accel: 2,
    drag: .2,
    maxSpd: 10,
    rotaccel: 1,
    rotdrag: 1,
    maxrot: 10,
    handling: 10,
    points: [],
    reload: 30,
    worth: 10,
    frame: 1,
    maxPlanes: 0,
    cannons: [{
        type: 3,
        dist: 0,
        ang: 0,

    }],
}, {
    type: 17, //argo
    width: 142,
    height: 66,
    mass: 1,
    health: 100,
    maxhealth: 100,
    accel: 2,
    drag: .2,
    maxSpd: 10,
    rotaccel: 1,
    rotdrag: 1,
    maxrot: 10,
    handling: 10,
    points: [],
    reload: 30,
    worth: 10,
    frame: 1,
    maxPlanes: 0,
    cannons: [{
        type: 0,
        dist: 20,
        ang: 0,

    }],
}, {
    type: 18, //blac pearl
    width: 200,
    height: 70,
    mass: 1,
    health: 100,
    maxhealth: 100,
    accel: 2,
    drag: .2,
    maxSpd: 10,
    rotaccel: 1,
    rotdrag: 1,
    maxrot: 10,
    handling: 10,
    points: [],
    reload: 30,
    worth: 10,
    frame: 1,
    maxPlanes: 0,
    cannons: [{
        type: 0,
        dist: 20,
        ang: 0,

    }],
}, {
    type: 19, //bismark
    width: 284,
    height: 54,
    mass: 1,
    health: 100,
    maxhealth: 100,
    accel: 2,
    drag: .2,
    maxSpd: 10,
    rotaccel: 1,
    rotdrag: 1,
    maxrot: 10,
    handling: 10,
    points: [],
    reload: 30,
    worth: 10,
    frame: 1,
    maxPlanes: 0,
    cannons: [{
        type: 5,
        dist: 49,
        ang: 0,
    }, {
        type: 5,
        dist: 77,
        ang: 0,
    }, {
        type: 5,
        dist: 59,
        ang: 180,
    }, {
        type: 5,
        dist: 84,
        ang: 180,
    }, {
        type: 4,
        dist: 43,
        ang: 152,
    }, {
        type: 4,
        dist: 43,
        ang: 208,
    }, {
        type: 4,
        dist: 30,
        ang: 40.2,
    }, {
        type: 4,
        dist: 30,
        ang: 319.8,
    }, {
        type: 4,
        dist: 20.4,
        ang: 101.3,
    }, {
        type: 4,
        dist: 20.4,
        ang: 258.7,
    }, {
        type: 0,
        dist: 18.9,
        ang: 58,
    }, {
        type: 0,
        dist: 18.9,
        ang: 302,
    }, {
        type: 0,
        dist: 22.6,
        ang: 135,
    }, {
        type: 0,
        dist: 22.6,
        ang: 225,
    }, {
        type: 0,
        dist: 54.4,
        ang: 162.9,
    }, {
        type: 0,
        dist: 54.4,
        ang: 197.1,
    }],
}, {
    type: 20, //attack sub
    width: 168,
    height: 38,
    mass: 1,
    health: 100,
    maxhealth: 100,
    accel: 2,
    drag: .2,
    maxSpd: 10,
    rotaccel: 1,
    rotdrag: 1,
    maxrot: 10,
    handling: 10,
    points: [],
    reload: 30,
    worth: 10,
    frame: 1,
    maxPlanes: 0,
    cannons: [{
        type: 0,
        dist: 20,
        ang: 0,
    }],
}, {
    type: 21, //cruise missle sub
    width: 176,
    height: 57,
    mass: 1,
    health: 100,
    maxhealth: 100,
    accel: 2,
    drag: .2,
    maxSpd: 10,
    rotaccel: 1,
    rotdrag: 1,
    maxrot: 10,
    handling: 10,
    points: [],
    reload: 30,
    worth: 10,
    frame: 1,
    maxPlanes: 0,
    cannons: [{
        type: 0,
        dist: 20,
        ang: 0,
    }],
}, {
    type: 22, //littoral combat ship
    width: 152,
    height: 38,
    mass: 1,
    health: 100,
    maxhealth: 100,
    accel: 2,
    drag: .2,
    maxSpd: 10,
    rotaccel: 1,
    rotdrag: 1,
    maxrot: 10,
    handling: 10,
    points: [],
    reload: 30,
    worth: 10,
    frame: 1,
    maxPlanes: 0,
    cannons: [{
        type: 0,
        dist: 20,
        ang: 0,
    }],
}, {
    type: 23, //sloop
    width: 118,
    height: 34,
    mass: 1,
    health: 100,
    maxhealth: 100,
    accel: 2,
    drag: .2,
    maxSpd: 10,
    rotaccel: 1,
    rotdrag: 1,
    maxrot: 10,
    handling: 10,
    points: [],
    reload: 30,
    worth: 10,
    frame: 1,
    maxPlanes: 0,
    cannons: [{
        type: 0,
        dist: 20,
        ang: 0,
    }],
}, {
    type: 24, //ZHENGHE
    width: 216,
    height: 82,
    mass: 1,
    health: 100,
    maxhealth: 100,
    accel: 2,
    drag: .2,
    maxSpd: 10,
    rotaccel: 1,
    rotdrag: 1,
    maxrot: 10,
    handling: 10,
    points: [],
    reload: 30,
    worth: 10,
    frame: 1,
    maxPlanes: 0,
    cannons: [{
        type: 0,
        dist: 20,
        ang: 0,
    }],
}, {
    type: 25, //USS MISSOURI
    width: 254,
    height: 50,
    mass: 1,
    health: 100,
    maxhealth: 100,
    accel: 2,
    drag: .2,
    maxSpd: 10,
    rotaccel: 1,
    rotdrag: 1,
    maxrot: 10,
    handling: 10,
    points: [],
    reload: 30,
    worth: 10,
    frame: 1,
    maxPlanes: 0,
    cannons: [{
        type: 0,
        dist: 20,
        ang: 0,
    }],
}, {
    type: 26, //YAMATO
    width: 298,
    height: 62,
    mass: 1,
    health: 100,
    maxhealth: 100,
    accel: 2,
    drag: .2,
    maxSpd: 10,
    rotaccel: 1,
    rotdrag: 1,
    maxrot: 10,
    handling: 10,
    points: [],
    reload: 30,
    worth: 10,
    frame: 1,
    maxPlanes: 0,
    cannons: [{
        type: 0,
        dist: 20,
        ang: 0,
    }],
}, {
    type: 27, //USS Huntley (Sub)
    width: 98,
    height: 30,
    mass: 1,
    health: 100,
    maxhealth: 100,
    accel: 2,
    drag: .2,
    maxSpd: 10,
    rotaccel: 1,
    rotdrag: 1,
    maxrot: 10,
    handling: 10,
    points: [],
    reload: 30,
    worth: 10,
    frame: 1,
    maxPlanes: 0,
    cannons: [{
        type: 0,
        dist: 20,
        ang: 0,
    }],
}, {
    type: 28, //UBOAT
    width: 178,
    height: 34,
    mass: 1,
    health: 100,
    maxhealth: 100,
    accel: 2,
    drag: .2,
    maxSpd: 10,
    rotaccel: 1,
    rotdrag: 1,
    maxrot: 10,
    handling: 10,
    points: [],
    reload: 30,
    worth: 10,
    frame: 1,
    maxPlanes: 0,
    cannons: [{
        type: 0,
        dist: 20,
        ang: 0,
    }],
}, {
    type: 29, //Corvette
    width: 152,
    height: 38,
    mass: 1,
    health: 100,
    maxhealth: 100,
    accel: 2,
    drag: .2,
    maxSpd: 10,
    rotaccel: 1,
    rotdrag: 1,
    maxrot: 10,
    handling: 10,
    points: [],
    reload: 30,
    worth: 10,
    frame: 1,
    maxPlanes: 0,
    cannons: [{
        type: 0,
        dist: 20,
        ang: 0,
    }],
}, {
    type: 30, //Destroyer v3
    width: 172,
    height: 42,
    mass: 1,
    health: 100,
    maxhealth: 100,
    accel: 2,
    drag: .2,
    maxSpd: 10,
    rotaccel: 1,
    rotdrag: 1,
    maxrot: 10,
    handling: 10,
    points: [],
    reload: 30,
    worth: 10,
    frame: 1,
    maxPlanes: 0,
    cannons: [{
        type: 0,
        dist: 20,
        ang: 0,
    }],
}];

var getRandomColor = function() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    console.log(color);
    return color;
}
var buyplane = function(shipin, i) {
    var y = 0;
    for (var h in Player.list[shipin.playerid].Ship.list[shipin.id].Plane.list) {
        y++;
    }
    if (Player.list[shipin.playerid].money >= types[i].worth && y < Player.list[shipin.playerid].Ship.list[shipin.id].maxPlanes) {
        plane = shipin.Plane(shipin.id, shipin.playerid);
        plane.reload = ptypes[i].reload;
        plane.vel = ptypes[i].vel;
        plane.rotdrag = ptypes[i].rotdrag;
        plane.maxrot = ptypes[i].maxrot;
        plane.rotaccel = ptypes[i].rotaccel;
        plane.width = ptypes[i].width;
        plane.height = ptypes[i].height;
        plane.type = ptypes[i].type;
        plane.worth = ptypes[i].worth;
        Player.list[shipin.playerid].money = Player.list[shipin.playerid].money - ptypes[i].worth;
        plane.x = shipin.x;
        plane.y = shipin.y;
    }
}
var changetype = function(shipin, i) {
    shipin.type = types[i].type;
    shipin.width = types[i].width;
    shipin.height = types[i].height;
    shipin.mass = types[i].mass;
    shipin.health = types[i].health;
    shipin.maxhealth = types[i].maxhealth;
    shipin.accel = types[i].accel;
    shipin.drag = types[i].drag;
    shipin.maxSpd = types[i].maxSpd;
    shipin.rotaccel = types[i].rotaccel;
    shipin.rotdrag = types[i].rotdrag;
    shipin.maxrot = types[i].maxrot;
    shipin.handling = types[i].handling;
    shipin.points = types[i].points;
    shipin.reload = types[i].reload;
    shipin.worth = types[i].worth;
    shipin.frame = types[i].frame;
    shipin.maxPlanes = types[i].maxPlanes;
    for (var h in shipin.Cannon.list) {

        delete shipin.Cannon.list[h];
    }
    for (j = 0; j < types[i].cannons.length; j++) {
        var ca = shipin.Cannon(shipin.id, shipin.playerid, types[i].cannons[j].dist, types[i].cannons[j].ang);

        ca.type = types[i].cannons[j].type;
        ca.btype = ctypes[ca.type].btype;
        ca.reload = ctypes[ca.type].reload + Math.round(3 * Math.random());;
        ca.width = ctypes[ca.type].width;
        ca.height = ctypes[ca.type].height;
        ca.range = ctypes[ca.type].range;


    }

}

var buytype = function(shipin, i) {
        if (Player.list[shipin.playerid].money >= types[i].worth) {
            changetype(shipin, i);
            Player.list[shipin.playerid].money = Player.list[shipin.playerid].money - types[i].worth;
        }
    }
    //var shiplist = [];

function inside(x, y, vs) {
    // ray-casting algorithm based on
    // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html



    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = vs[i].x,
            yi = vs[i].y;
        var xj = vs[j].x,
            yj = vs[j].y;
        var intersect = ((yi > y) != (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
    return inside;
};

/**
 * Helper function to determine whether there is an intersection between the two polygons described
 * by the lists of vertices. Uses the Separating Axis Theorem
 *
 * @param a an array of connected points [{x:, y:}, {x:, y:},...] that form a closed polygon
 * @param b an array of connected points [{x:, y:}, {x:, y:},...] that form a closed polygon
 * @return true if there is any intersection between the 2 polygons, false otherwise
 */
function doPolygonsIntersect(a, b) {

    var polygons = [a, b];
    var minA, maxA, projected, i, i1, j, minB, maxB;

    for (i = 0; i < polygons.length; i++) {

        // for each polygon, look at each edge of the polygon, and determine if it separates
        // the two shapes
        var polygon = polygons[i];
        for (i1 = 0; i1 < polygon.length; i1++) {

            // grab 2 vertices to create an edge
            var i2 = (i1 + 1) % polygon.length;
            var p1 = polygon[i1];
            var p2 = polygon[i2];

            // find the line perpendicular to this edge
            var normal = {
                x: p2.y - p1.y,
                y: p1.x - p2.x
            };

            minA = maxA = undefined;
            // for each vertex in the first shape, project it onto the line perpendicular to the edge
            // and keep track of the min and max of these values
            for (j = 0; j < a.length; j++) {
                projected = normal.x * a[j].x + normal.y * a[j].y;
                if (minA == undefined || projected < minA) { //if (isUndefined(minA) || projected < minA) {
                    minA = projected;
                }
                if (maxA == undefined || projected > maxA) { //if (isUndefined(maxA) || projected > maxA) {
                    maxA = projected;
                }
            }

            // for each vertex in the second shape, project it onto the line perpendicular to the edge
            // and keep track of the min and max of these values
            minB = maxB = undefined;
            for (j = 0; j < b.length; j++) {
                projected = normal.x * b[j].x + normal.y * b[j].y;
                if (minB == undefined || projected < minB) { //if (isUndefined(minB) || projected < minB) {
                    minB = projected;
                }
                if (maxB == undefined || projected > maxB) { //if (isUndefined(maxB) || projected > maxB) {
                    maxB = projected;
                }
            }

            // if there is no overlap between the projects, the edge we are looking at separates the two
            // polygons, and we know there is no overlap
            if (maxA < minB || maxB < minA) {
                //console.log("polygons don't intersect!");
                return false;
            }
        }
    }
    return true;
}

var Coin = function(x, y, parentid) {
    var self = {
        x: x,
        y: y,
        width: 6,
        height: 6,
        toRemove: false,
        value: 1,
        parentid: parentid,

    };

    Coin.list[Math.random()] = self;
    return self;
}

Coin.list = {};

Coin.l = 0;
var Wake = function(x, y) {
    var self = {
        time: 0,
        x: x,
        y: y,
    }
    Wake.list[Math.random()] = self;
    return self;
}
Wake.list = {};

var Bullet = function(x, y, angle, parentid, pvx, pvy, btype, range) {
    var self = {

        x: x,
        y: y,
        parentid: parentid,
        pvx: pvx,
        pvy: pvy,
        angle: angle,
        width: btypes[btype].width,
        height: btypes[btype].height,
        damage: btypes[btype].damage,
        speed: btypes[btype].speed,
        range: range,
        id: "" + Math.random(),
        toRemove: false,
        time: 0,
        type: btype,

        points: [],
        update: function() {
            //console.log(self.parentid);
            self.time++;
            if (self.speed * self.time > self.range) {
                self.toRemove = true;
            }
            self.x += self.speed * Math.cos(self.angle) + self.pvx;
            self.y += self.speed * Math.sin(self.angle) + self.pvy;


            self.points = [{
                x: this.x + Math.cos(self.angle) * self.width,
                y: this.y + Math.sin(self.angle) * self.height
            }, {
                x: this.x + Math.cos(self.angle) * self.width,
                y: this.y - Math.sin(self.angle) * self.height
            }, {
                x: this.x - Math.cos(self.angle) * self.width,
                y: this.y - Math.sin(self.angle) * self.height
            }, {
                x: this.x - Math.cos(self.angle) * self.width,
                y: this.y + Math.sin(self.angle) * self.height
            }];

        }


    };
    Bullet.list[self.id] = self;
    return self;
}
Bullet.list = {};
var Player = function(id, name) {
    //console.log('test1');
    var self = {
        color: getRandomColor(),
        left: false,
        right: false,
        up: false,
        down: false,
        shooting: false,
        mousex: 0,
        mousey: 0,
        controlx: 0,
        controly: 0,
        mobile: false,
        name: name,
        id: id,
        money: 50,
        death: false,
        gstate: 1,
        selected: 0,
        winwidth: 1000,
        winheight: 1000,
        leaderid: id,
        update: function() {
            for (var i in self.Ship.list) {
                ship = self.Ship.list[i];
                if (ship.leader) {
                    ship.left = self.left;
                    ship.right = self.right;
                    ship.up = self.up;
                    ship.down = self.down;
                    self.leaderid = ship.id;

                    ship.controlx = self.controlx;
                    ship.controly = self.controly;
                    ship.mobile = self.mobile;
                }
                ship.mousex = self.mousex;
                ship.mousey = self.mousey;
                ship.shooting = self.shooting;
            }
        },
        Ship: function(playerid, name) {
            //console.log('test2');
            var self = {
                x: -10000,
                y: -10000,
                width: 50,
                height: 44,
                angle: 30,
                playerid: playerid,
                id: Math.random(),
                //number: '' + Math.floor(10 * Math.random()),
                up: false,
                left: false,
                right: false,
                down: false,
                shooting: false,
                mousex: 0,
                mousey: 0,
                mass: 1,
                health: 100,
                maxhealth: 100,

                vel: 0,
                velx: 0,
                vely: 0,

                accel: 2,
                drag: .2,
                maxSpd: 10,

                rotvel: 0,

                rotaccel: 1,
                rotdrag: 1,
                maxrot: 10,
                handling: 10,
                points: [],
                shootime: 0,
                reload: 30,

                controlx: 0,
                controly: 0,
                mobile: false,
                name: name,
                //death: false,
                frame: 1,
                time: 0,

                worth: 10,

                type: 0,
                leader: false,
                placed: false,

                in: false,
                reld: 400,
                relangl: 0,
                tox: 0,
                toy: 0,
                distangle: 0,
                auto: 0,
                maxPlanes: 0,



                update: function() {






                    self.mass = self.width * self.height;
                    if (self.controlx > 1) {
                        self.controlx = 1;
                    }
                    if (self.controly > 1) {
                        self.controly = 1;
                    }
                    if (self.controlx < -1) {
                        self.controlx = -1;
                    }
                    if (self.controly < -1) {
                        self.controly = -1;
                    }
                    if (self.leader) {
                        if (self.mobile) {
                            if (self.controly > 0) {
                                if (self.vel < self.maxSpd) {

                                    self.vel += self.accel * self.controly;
                                }
                            } else if (self.vel > 0) {
                                //console.log(self.vel);
                                if (self.vel < self.drag) {
                                    self.vel = 0;
                                } else {
                                    self.vel -= self.drag;
                                }
                            }
                            //console.log(self.controlx);
                            if (self.controly < 0) {
                                if (self.vel > -self.maxSpd / 4) {

                                    self.vel -= (self.accel / 4) * (-self.controly);
                                }
                            } else if (self.vel < 0) {
                                if (self.vel < self.drag) {
                                    self.vel = 0;
                                } else {
                                    self.vel += self.drag;
                                }
                            }
                            if (self.controlx < 0) {
                                if (self.rotvel < self.maxrot) {
                                    if (self.vel !== 0) {
                                        self.rotvel += self.rotaccel * (-self.controlx);
                                        //console.log(self.vel);
                                    } else {

                                    }
                                }
                            }
                            if (self.rotvel > 0) {
                                if (self.controlx >= 0 || self.vel == 0) {
                                    if (self.rotvel < self.rotdrag) {
                                        self.rotvel = 0;
                                    } else {
                                        self.rotvel -= self.rotdrag;
                                        //console.log('test');
                                    }
                                }
                            }
                            if (self.controlx > 0) {
                                if (self.rotvel > -self.maxrot) {
                                    if (self.vel > .3 || self.vel < -.3) {
                                        self.rotvel -= self.rotaccel * self.controlx;
                                    } else {

                                    }
                                }
                            }
                            if (self.rotvel < 0) {
                                if (self.controlx <= 0 || self.vel == 0) {
                                    if (self.rotvel > -self.rotdrag) {
                                        self.rotvel = 0;
                                    } else {
                                        self.rotvel += self.rotdrag;
                                    }
                                }
                            }
                        } else {
                            if (self.up) {
                                if (self.vel < self.maxSpd) {

                                    self.vel += self.accel;
                                }
                            } else if (self.vel > 0) {
                                //console.log(self.vel);
                                if (self.vel < self.drag) {
                                    self.vel = 0;
                                } else {
                                    self.vel -= self.drag;
                                }
                            }
                            if (self.down) {
                                if (self.vel > -self.maxSpd / 4) {

                                    self.vel -= self.accel / 4;
                                }
                            } else if (self.vel < 0) {
                                if (self.vel < self.drag) {
                                    self.vel = 0;
                                } else {
                                    self.vel += self.drag;
                                }
                            }

                            if (self.right) {
                                if (self.rotvel < self.maxrot) {
                                    if (self.vel !== 0) {
                                        self.rotvel += self.rotaccel;
                                        //console.log(self.vel);
                                    } else {

                                    }
                                }
                            }
                            if (self.rotvel > 0) {
                                if (self.right == false || self.vel == 0) {
                                    if (self.rotvel < self.rotdrag) {
                                        self.rotvel = 0;
                                    } else {
                                        self.rotvel -= self.rotdrag;
                                        //console.log('test');
                                    }
                                }
                            }
                            if (self.left) {
                                if (self.rotvel > -self.maxrot) {
                                    if (self.vel > .3 || self.vel < -.3) {
                                        self.rotvel -= self.rotaccel;
                                    } else {

                                    }
                                }
                            }
                            if (self.rotvel < 0) {
                                if (self.left == false || self.vel == 0) {
                                    if (self.rotvel > -self.rotdrag) {
                                        self.rotvel = 0;
                                    } else {
                                        self.rotvel += self.rotdrag;
                                    }
                                }
                            }
                        }

                    } else {
                        if (self.in) {
                            for (var i in Player.list[self.playerid].Ship.list) {
                                if (Player.list[self.playerid].Ship.list[i].leader) {
                                    leader = Player.list[self.playerid].Ship.list[i];
                                }
                            }
                            self.tox = Math.cos(TO_RADIANS * self.relangl + TO_RADIANS * leader.angle) * self.reld + leader.x;
                            self.toy = Math.sin(TO_RADIANS * self.relangl + TO_RADIANS * leader.angle) * self.reld + leader.y;

                            self.distangle = Math.atan2(self.toy - self.y, self.tox - self.x) / TO_RADIANS;
                            while (self.distangle < 0) {
                                self.distangle = self.distangle + 360
                            }
                            while (self.distangle > 360) {
                                self.distangle = self.distangle - 360
                            }
                            while (self.angle < 0) {
                                self.angle = self.angle + 360
                            }
                            while (self.angle > 360) {
                                self.angle = self.angle - 360
                            }

                            var dist = Math.sqrt(Math.pow(self.toy - self.y, 2) + Math.pow(self.tox - self.x, 2));
                            if (self.x != self.tox || self.y != self.toy) {

                                if (dist > 0) {

                                    if (dist <= ((Math.pow(self.vel, 2) / self.drag) / 2) + 2) {
                                        if (self.vel >= self.drag) {
                                            self.vel = self.vel - self.drag;
                                        }


                                    } else {
                                        if (dist > 3 * self.maxSpd) {
                                            if (self.vel < self.maxSpd) {
                                                self.vel = self.vel + self.accel;
                                            }
                                        }
                                    }

                                    if (dist < self.maxSpd * 3) {
                                        if (self.vel > 0) {
                                            self.vel = self.vel - self.drag;
                                        }
                                        if (self.vel < self.drag) {
                                            self.vel = 0;
                                        }
                                    }

                                    if (self.vel > self.maxSpd) {
                                        self.vel = self.maxSpd;
                                    }


                                    if (self.vel > 0) {
                                        if ((self.angle - self.distangle + 360) % 360 < 180) {
                                            if (self.rotvel > self.distangle - self.angle) {
                                                self.rotvel = self.distangle - self.angle;
                                            }
                                            if (self.rotvel < self.maxrot) {
                                                self.rotvel = self.rotvel + self.rotaccel;
                                            }
                                        } else if ((self.angle - self.distangle + 360) % 360 > 180) {
                                            if (self.rotvel > -(self.distangle - self.angle)) {
                                                self.rotvel = self.distangle - self.angle;
                                            }
                                            if (self.rotvel > -self.maxrot) {
                                                self.rotvel = self.rotvel - self.rotaccel;
                                            }
                                        } else if (self.rotvel > 0 || self.rotvel < 0) {
                                            if (self.rotvel >= self.rotdrag) {
                                                self.rotvel = self.rotvel - self.rotdrag;
                                            } else if (self.rotvel <= -self.rotdrag) {
                                                self.rotvel = self.rotvel + self.rotdrag;
                                            } else if (Math.abs(self.rotvel) < self.rotdrag) {
                                                self.rotvel = 0;
                                            }

                                        }
                                    } else {

                                        if (self.rotvel > 0 || self.rotvel < 0) {
                                            if (self.rotvel >= self.rotdrag) {
                                                self.rotvel = self.rotvel - self.rotdrag;
                                            } else if (self.rotvel <= -self.rotdrag) {
                                                self.rotvel = self.rotvel + self.rotdrag;
                                            } else if (Math.abs(self.rotvel) < self.rotdrag) {
                                                self.rotvel = 0;
                                            }

                                        }
                                    }

                                    if (self.rotvel > self.maxrot) {
                                        self.rotvel = self.maxrot;
                                    }

                                    if (self.rotvel < -self.maxrot) {
                                        self.rotvel = -self.maxrot;
                                    }





                                    if (self.vel < self.maxSpd && self.dist < self.maxSpd) {
                                        self.x = self.tox;
                                        self.y = self.toy;
                                        self.vel = 0;
                                    }
                                }
                                //console.log(dist + ',' + self.vel);
                            }
                        }
                    }
                    /*
                    if (self.mass > 10000) {

                        if (self.x < 2000 || self.x > mapw - 2000 || self.y < 2000 || self.y > maph - 2000) {
                            self.health = self.health - .1;

                        }
                    }
                    */








                    self.points = [{
                        x: self.x + (self.width) / 2 * Math.cos(TO_RADIANS * self.angle) - (-self.height / 2) * Math.sin(self.angle * TO_RADIANS),
                        y: self.y + (self.width) / 2 * Math.sin(TO_RADIANS * self.angle) + (-self.height / 2) * Math.cos(self.angle * TO_RADIANS)
                    }, {
                        x: self.x + (self.width) / 2 * Math.cos(TO_RADIANS * self.angle) - (self.height / 2) * Math.sin(self.angle * TO_RADIANS),
                        y: self.y + (self.width) / 2 * Math.sin(TO_RADIANS * self.angle) + (self.height / 2) * Math.cos(self.angle * TO_RADIANS)
                    }, {
                        x: self.x + (-self.width) / 2 * Math.cos(TO_RADIANS * self.angle) - (self.height / 2) * Math.sin(self.angle * TO_RADIANS),
                        y: self.y + (-self.width) / 2 * Math.sin(TO_RADIANS * self.angle) + (self.height / 2) * Math.cos(self.angle * TO_RADIANS)
                    }, {
                        x: self.x + (-self.width / 2) * Math.cos(TO_RADIANS * self.angle) - (-self.height / 2) * Math.sin(self.angle * TO_RADIANS),
                        y: self.y + (-self.width / 2) * Math.sin(TO_RADIANS * self.angle) + (-self.height / 2) * Math.cos(self.angle * TO_RADIANS)
                    }];
                    var ws = Math.floor((self.mass / 6000) * self.vel)
                    for (var y = 0; y < ws; y++) {
                        Wake((self.points[3].x + self.points[2].x) / 2 + ((Math.random() + Math.random()) / 2 - .5) * self.height, (self.points[3].y + self.points[2].y) / 2 + ((Math.random() + Math.random()) / 2 - .5) * self.height)
                            //Wake(this.x + (Math.cos(TO_RADIANS * (self.angle-180)) * self.width / 2), this.y + (Math.sin(TO_RADIANS * (self.angle-180)) * self.height / 2));
                            //Wake(self.x + (-self.width) / 2 * Math.cos(TO_RADIANS * self.angle) - (-self.height / 2) * Math.sin(self.angle * TO_RADIANS), self.y + (-self.width) / 2 * Math.sin(TO_RADIANS * self.angle) + (-self.height / 2) * Math.cos(self.angle * TO_RADIANS));


                        //Wake(self.x + Math.random() * self.height / 2, self.y + Math.random() * self.height / 2);
                    }
                    self.angle += self.rotvel;
                    self.velx = self.vel * Math.cos(self.angle * TO_RADIANS);
                    self.vely = self.vel * Math.sin(self.angle * TO_RADIANS);
                    for (var j in Player.list) {
                        player = Player.list[j];
                        for (var i in player.Ship.list) {
                            if (player.Ship.list[i].id !== self.id) {
                                var ship = player.Ship.list[i];

                                if (Math.sqrt(Math.pow(self.x - ship.x, 2) + Math.pow(self.y - ship.y, 2)) <= self.width + ship.width && doPolygonsIntersect(self.points, ship.points)) {
                                    //console.log(i);
                                    var crashangle = Math.atan2(ship.y - self.y, ship.x - self.x);
                                    //console.log(crashangle);
                                    /*
                                    self.velx = (self.mass-ship.mass)*(self.velx+1)/(self.mass+ship.mass)+2*ship.mass*(ship.velx+1)/(self.mass+ship.mass);
                                    self.vely = (self.mass-ship.mass)*(self.vely+1)/(self.mass+ship.mass)+2*ship.mass*(ship.vely+1)/(self.mass+ship.mass);
                                    */
                                    self.velx = -(ship.mass / self.mass) * Math.cos(crashangle);
                                    self.vely = -(ship.mass / self.mass) * Math.sin(crashangle);
                                    self.vel = 0;

                                }
                            }
                        }


                    }

                    if (self.x > mapw - (self.width / 2)) {
                        self.x = mapw - (self.width / 2);
                    }
                    if (self.x < self.width / 2) {
                        self.x = self.width / 2;
                    }
                    if (self.y > maph - (self.width / 2)) {
                        self.y = maph - (self.width / 2);
                    }
                    if (self.y < self.width / 2) {
                        self.y = self.width / 2;
                    }

                    self.x += self.velx;
                    self.y += self.vely;
                    for (var i in Bullet.list) {
                        if (Bullet.list[i].parentid !== self.playerid) {
                            var bullet = Bullet.list[i];
                            if (doPolygonsIntersect(self.points, bullet.points)) {
                                self.health -= bullet.damage;
                                bullet.toRemove = true;
                            }
                        }
                    }

                    for (var i in Coin.list) {
                        var coin = Coin.list[i];
                        if (coin.parentid !== self.playerid && coin.x < self.x + self.width && coin.x > self.x - self.width && coin.y < self.y + self.width && coin.y > self.y - self.width && inside(coin.x, coin.y, self.points)) { //Math.sqrt(Math.pow(self.x-coin.x,2)+Math.pow(self.y-coin.y,2))<=self.width&&
                            Player.list[playerid].money += coin.value;
                            coin.toRemove = true;
                        }
                    }

                    //if (self.health <= 0) {
                    //    self.death = true;
                    //}
                    //console.log(self.vel);
                    if (self.vel > self.maxSpd) {
                        self.vel = self.maxSpd;
                    }
                    if (self.vel < -self.maxSpd / 4) {
                        self.vel = -self.maxSpd / 4;
                    }
                    self.time++;
                    if (self.time >= 40 * (self.maxSpd - self.vel + .1) && self.vel != 0) {
                        self.frame++;
                        if (self.frame == 4) {
                            self.frame = 1;
                        }
                        self.time = 0;
                    }
                    if (self.time >= 40 * ((self.maxSpd / 4) + self.vel + .1) && self.vel != 0) {

                        self.frame--;
                        if (self.frame == 0) {
                            self.frame = 3;
                        }
                        self.time = 0;
                    }

                    for (var i in Player.list[self.playerid].Ship.list[self.id].Cannon.list) {
                        var cannon = Player.list[self.playerid].Ship.list[self.id].Cannon.list[i];
                        cannon.update();
                    }
                    for (var i in Player.list[self.playerid].Ship.list[self.id].Plane.list) {
                        var plane = Player.list[self.playerid].Ship.list[self.id].Plane.list[i];
                        plane.update();

                        if (plane.health <= 0) {
                            for (i = 0; i < Math.round(plane.worth); i++) {
                                var c = Coin(plane.x + (Math.random() - .5) * plane.width, plane.y + (Math.random() - .5) * plane.width, plane.playerid);
                                //c.update();
                            }
                            delete Player.list[self.playerid].Ship.list[self.id].Plane.list[plane.id];
                        }
                    }






                    /*/
                                if (self.left && self.vel>.01) {
                                    self.angle -= self.handling;
                                    //console.log(self.vel);
                                }
                                if (this.right && self.vel>.01) {
                                    self.angle += self.handling;
                                }
                                /*/


                },
                Cannon: function(shipid, playerid, dist, ang) {
                    var self = {
                        x: 0,
                        y: 0,
                        id: Math.random(),
                        shipid: shipid,
                        playerid: playerid,
                        shootime: 0,
                        reload: 30,
                        dist: dist,
                        ang: ang,
                        angle: 0,
                        type: 0,
                        rela: 0,
                        atx: 0,
                        aty: 0,
                        btype: 0,
                        range: 10,


                        shootBullet: function(x, y, angle, id, velx, vely, type, range) {
                            var b = Bullet(x, y, angle, id, velx, vely, type, range);
                            b.update();
                        },
                        update: function() {

                            parentship = Player.list[self.playerid].Ship.list[self.shipid];
                            self.x = parentship.x + Math.cos((parentship.angle + self.ang) * TO_RADIANS) * self.dist;
                            self.y = parentship.y + Math.sin((parentship.angle + self.ang) * TO_RADIANS) * self.dist;


                            if (self.shootime > 0) {
                                self.shootime--;
                            }
                            if (self.shootime < 0) {
                                self.shootime = 0;
                            }
                            if (self.shootime <= 0) {
                                if (parentship.shooting && parentship.auto == 0) {
                                    self.angle = Math.atan2(parentship.mousey - self.y, (parentship.mousex - self.x));
                                    self.rela = self.angle - parentship.angle * TO_RADIANS;
                                    //self.shootBullet(self.x, self.y, Math.atan2(parentship.mousey - self.y, (parentship.mousex - self.x)), self.playerid, parentship.velx, parentship.vely);

                                    self.shootBullet(self.x, self.y, Math.atan2(parentship.mousey - self.y, (parentship.mousex - self.x)), self.playerid, 0, 0, self.btype, self.range);
                                    self.shootime = self.reload;
                                }

                                if (parentship.auto == 1) { //closest
                                    var pdist = 1000000;
                                    for (var i in Player.list) {
                                        for (var j in Player.list[i].Ship.list) {
                                            var nship = Player.list[i].Ship.list[j];
                                            if (nship.playerid !== self.playerid) {
                                                if (Math.sqrt(Math.pow(self.x - nship.x, 2) + Math.pow(self.y - nship.y, 2)) < pdist) {
                                                    self.atx = nship.x;
                                                    self.aty = nship.y;

                                                    pdist = Math.sqrt(Math.pow(self.x - nship.x, 2) + Math.pow(self.y - nship.y, 2));
                                                }
                                            }
                                        }
                                    }
                                    self.angle = Math.atan2(self.aty - self.y, (self.atx - self.x));
                                    self.rela = self.angle - parentship.angle * TO_RADIANS;
                                    if (pdist < self.range * 1.5) {

                                        self.shootBullet(self.x, self.y, Math.atan2(self.aty - self.y, (self.atx - self.x)), self.playerid, 0, 0, self.btype, self.range)
                                    }
                                    self.shootime = self.reload;
                                }
                                if (parentship.auto == 2) { //strongest

                                    var ph = 0;
                                    for (var i in Player.list) {
                                        for (var j in Player.list[i].Ship.list) {
                                            var nship = Player.list[i].Ship.list[j];
                                            if (nship.playerid !== self.playerid) {
                                                if (nship.health > ph && Math.sqrt(Math.pow(self.x - nship.x, 2) + Math.pow(self.y - nship.y, 2)) <= self.range) {
                                                    self.atx = nship.x;
                                                    self.aty = nship.y;


                                                }
                                            }
                                        }
                                    }
                                    self.angle = Math.atan2(self.aty - self.y, (self.atx - self.x));
                                    self.rela = self.angle - parentship.angle * TO_RADIANS;

                                    self.shootBullet(self.x, self.y, Math.atan2(self.aty - self.y, (self.atx - self.x)), self.playerid, 0, 0, self.btype, self.range)

                                    self.shootime = self.reload;
                                }
                                if (parentship.auto == 3) { //weakest

                                    var ph = 1000000;
                                    for (var i in Player.list) {
                                        for (var j in Player.list[i].Ship.list) {
                                            var nship = Player.list[i].Ship.list[j];
                                            if (nship.playerid !== self.playerid) {
                                                if (nship.health < ph && Math.sqrt(Math.pow(self.x - nship.x, 2) + Math.pow(self.y - nship.y, 2)) <= self.range) {
                                                    self.atx = nship.x;
                                                    self.aty = nship.y;
                                                }
                                            }
                                        }
                                    }
                                    self.angle = Math.atan2(self.aty - self.y, (self.atx - self.x));
                                    self.rela = self.angle - parentship.angle * TO_RADIANS;

                                    self.shootBullet(self.x, self.y, Math.atan2(self.aty - self.y, (self.atx - self.x)), self.playerid, 0, 0, self.btype, self.range)

                                    self.shootime = self.reload;
                                }

                            } else {

                            }
                            self.angle = parentship.angle * TO_RADIANS + self.rela;


                        }

                    }
                    Player.list[id].Ship.list[self.shipid].Cannon.list[self.id] = self;
                    return self;
                },
                Plane: function(shipid, playerid) {
                    var self = {

                        id: Math.random(),
                        shipid: shipid,
                        playerid: playerid,
                        shootime: 0,
                        reload: 30,

                        angle: 0,
                        health: 30,
                        maxhealth: 30,
                        rela: 0,
                        vel: 20,
                        rotvel: 0,
                        angle: 0,
                        distangle: 0,
                        rotdrag: 1,
                        maxrot: 10,
                        rotaccel: 1,
                        width: 38,
                        height: 30,
                        type: 0,
                        worth: 10,
                        frame: 1,
                        time: 0,
                        x: 0, ///Player.list[playerid].Ship.list[shipid].x,
                        y: 0, // Player.list[playerid].Ship.list[shipid].y,
                        atx: 0,
                        aty: 0,
                        btype: 0,
                        range: 1000,
                        farea: 5000,


                        shootBullet: function(x, y, angle, id, velx, vely, btype, range) {
                            var b = Bullet(x, y, angle, id, velx, vely, btype, range);
                            b.update();
                        },
                        update: function() {

                            parentship = Player.list[self.playerid].Ship.list[self.shipid];




                            if (parentship.mousex) {
                                self.tox = parentship.mousex;
                                self.toy = parentship.mousey;

                            } else {
                                self.tox = parentship.x;
                                self.toy = parentship.y;
                            }
                            var ncount = 0;
                            if (parentship.auto == 1) {
                                var pdist = 1000000;
                                for (var i in Player.list) {
                                    for (var j in Player.list[i].Ship.list) {
                                        var nship = Player.list[i].Ship.list[j];
                                        if (nship.playerid !== self.playerid) {
                                            if (Math.sqrt(Math.pow(self.x - nship.x, 2) + Math.pow(self.y - nship.y, 2)) < pdist && Math.sqrt(Math.pow(self.x - nship.x, 2) + Math.pow(self.y - nship.y, 2)) < self.farea * 2) {
                                                self.atx = nship.x;
                                                self.aty = nship.y;
                                                ncount++;


                                                pdist = Math.sqrt(Math.pow(self.x - nship.x, 2) + Math.pow(self.y - nship.y, 2));
                                            }
                                        }
                                    }
                                }

                                self.tox = self.atx;
                                self.toy = self.aty;
                            }
                            if (parentship.auto == 2) {

                                var ph = 0;
                                for (var i in Player.list) {
                                    for (var j in Player.list[i].Ship.list) {
                                        var nship = Player.list[i].Ship.list[j];
                                        if (nship.playerid !== self.playerid) {
                                            if (nship.health > ph && Math.sqrt(Math.pow(self.x - nship.x, 2) + Math.pow(self.y - nship.y, 2)) <= self.farea) {
                                                self.atx = nship.x;
                                                self.aty = nship.y;
                                                ncount++;


                                            }
                                        }
                                    }
                                }
                                self.tox = self.atx;
                                self.toy = self.aty;
                            }
                            if (parentship.auto == 3) {

                                var ph = 1000000;
                                for (var i in Player.list) {
                                    for (var j in Player.list[i].Ship.list) {
                                        var nship = Player.list[i].Ship.list[j];
                                        if (nship.playerid !== self.playerid) {
                                            if (nship.health < ph && Math.sqrt(Math.pow(self.x - nship.x, 2) + Math.pow(self.y - nship.y, 2)) <= self.farea) {
                                                self.atx = nship.x;
                                                self.aty = nship.y;
                                                ncount++;
                                            }
                                        }
                                    }
                                }
                                self.tox = self.atx;
                                self.toy = self.aty;
                            }
                            if (ncount == 0 && parentship.auto > 0) {
                                self.tox = parentship.x;
                                self.toy = parentship.y;
                            }


                            self.distangle = Math.atan2(self.toy - self.y, self.tox - self.x) / TO_RADIANS;
                            while (self.distangle < 0) {
                                self.distangle = self.distangle + 360
                            }
                            while (self.distangle > 360) {
                                self.distangle = self.distangle - 360
                            }
                            while (self.angle < 0) {
                                self.angle = self.angle + 360
                            }
                            while (self.angle > 360) {
                                self.angle = self.angle - 360
                            }
                            var dist = Math.sqrt(Math.pow(self.toy - self.y, 2) + Math.pow(self.tox - self.x, 2));





                            if (self.vel > 0) {
                                if ((self.angle - self.distangle + 360) % 360 < 180) {
                                    if (self.rotvel > self.distangle - self.angle) {
                                        self.rotvel = self.distangle - self.angle;
                                    }
                                    if (self.rotvel < self.maxrot) {
                                        self.rotvel = self.rotvel + self.rotaccel;
                                    }
                                } else if ((self.angle - self.distangle + 360) % 360 > 180) {
                                    if (self.rotvel > -(self.distangle - self.angle)) {
                                        self.rotvel = self.distangle - self.angle;
                                    }
                                    if (self.rotvel > -self.maxrot) {
                                        self.rotvel = self.rotvel - self.rotaccel;
                                    }
                                } else if (self.rotvel > 0 || self.rotvel < 0) {
                                    if (self.rotvel >= self.rotdrag) {
                                        self.rotvel = self.rotvel - self.rotdrag;
                                    } else if (self.rotvel <= -self.rotdrag) {
                                        self.rotvel = self.rotvel + self.rotdrag;
                                    } else if (Math.abs(self.rotvel) < self.rotdrag) {
                                        self.rotvel = 0;
                                    }

                                }
                            } else {

                                if (self.rotvel > 0 || self.rotvel < 0) {
                                    if (self.rotvel >= self.rotdrag) {
                                        self.rotvel = self.rotvel - self.rotdrag;
                                    } else if (self.rotvel <= -self.rotdrag) {
                                        self.rotvel = self.rotvel + self.rotdrag;
                                    } else if (Math.abs(self.rotvel) < self.rotdrag) {
                                        self.rotvel = 0;
                                    }

                                }
                            }

                            if (self.rotvel > self.maxrot) {
                                self.rotvel = self.maxrot;
                            }

                            if (self.rotvel < -self.maxrot) {
                                self.rotvel = -self.maxrot;
                            }



                            if (self.shootime > 0) {
                                self.shootime--;
                            }
                            if (self.shootime < 0) {
                                self.shootime = 0;
                            }

                            if (self.distangle - self.angle < 7 && self.distangle - self.angle > -7) {
                                /*
                                                                if (parentship.shooting && self.shootime <= 0) {

                                                                    self.shootBullet(self.x, self.y, self.angle * TO_RADIANS, self.playerid, self.velx, self.vely, self.btype, self.range)
                                                                    self.shootime = self.reload;
                                                                } */


                                if (self.shootime <= 0) {
                                    if (parentship.shooting && parentship.auto == 0) {

                                        //self.shootBullet(self.x, self.y, Math.atan2(parentship.mousey - self.y, (parentship.mousex - self.x)), self.playerid, parentship.velx, parentship.vely);

                                        self.shootBullet(self.x, self.y, self.angle * TO_RADIANS, self.playerid, 0, 0, self.btype, self.range)
                                        self.shootime = self.reload;
                                    }
                                    if (parentship.auto == 1 || parentship.auto == 2 || parentship.auto == 3) {
                                        if (ncount != 0) {
                                            self.shootBullet(self.x, self.y, self.angle * TO_RADIANS, self.playerid, 0, 0, self.btype, self.range)
                                            self.shootime = self.reload;
                                        }
                                    }
                                }



                            }




                            self.points = [{
                                x: this.x + Math.cos(TO_RADIANS * self.angle) * self.width / 2,
                                y: this.y + Math.sin(TO_RADIANS * self.angle) * self.height / 2
                            }, {
                                x: this.x + Math.cos(TO_RADIANS * self.angle) * self.width / 2,
                                y: this.y - Math.sin(TO_RADIANS * self.angle) * self.height / 2
                            }, {
                                x: this.x - Math.cos(TO_RADIANS * self.angle) * self.width / 2,
                                y: this.y - Math.sin(TO_RADIANS * self.angle) * self.height / 2
                            }, {
                                x: this.x - Math.cos(TO_RADIANS * self.angle) * self.width / 2,
                                y: this.y + Math.sin(TO_RADIANS * self.angle) * self.height / 2
                            }];
                            self.angle += self.rotvel;
                            self.velx = self.vel * Math.cos(self.angle * TO_RADIANS);
                            self.vely = self.vel * Math.sin(self.angle * TO_RADIANS);


                            self.x += self.velx;
                            self.y += self.vely;
                            for (var i in Bullet.list) {
                                if (Bullet.list[i].parentid !== self.playerid) {
                                    var bullet = Bullet.list[i];
                                    if (doPolygonsIntersect(self.points, bullet.points)) {
                                        self.health -= bullet.damage;
                                        bullet.toRemove = true;
                                    }
                                }
                            }

                            //if (self.health <= 0) {
                            //    self.death = true;
                            //}
                            //console.log(self.vel);

                            self.time++;
                            if (self.type == 1) {
                                if (self.time > 1) {
                                    self.frame++;
                                    self.time = 0;
                                }
                                if (self.frame > 2) {
                                    self.frame = 1;
                                }
                            }

                            if (self.type == 0) {
                                if (self.time > 1) {
                                    self.frame++;
                                    self.time = 0;
                                }
                                if (self.frame > 3) {
                                    self.frame = 1;
                                }
                            }

                        }

                    }


                    Player.list[id].Ship.list[self.shipid].Plane.list[self.id] = self;
                    return self;

                }


            }
            Player.list[id].Ship.list[self.id] = self;
            Player.list[id].Ship.list[self.id].Cannon.list = {};
            Player.list[id].Ship.list[self.id].Plane.list = {};
            return self;



        }



    };
    Player.list[id] = self;

    Player.list[id].Ship.list = {};
    console.log("list" + self.Ship.list);
    return self;

}
Player.list = {};
//Player.

Player.onconnect = function(socket, name) {
    var player = Player(socket.id, name);

    var ship = player.Ship(player.id, player.name);
    //var plane = ship.Plane(ship.id, player.id)
    var cannon = ship.Cannon(ship.id, player.id, 30, 0);
    changetype(ship, 0);
    ship.leader = true;

    player.selected = ship.id;
    console.log(player.selected);

    ship.x = Math.random() * 100;
    ship.y = Math.random() * 100;
    ship.placed = true;
    ship.in = true;
    socket.start = true;

    socket.on('resize', function(data) {
        player.winwidth = data.width;
        player.winheight = data.height;
    });


    socket.on('select', function(id) {

        player.selected = id;
    });
    socket.on('button', function(data) {


        var selship = player.Ship.list[player.selected];

        if (data.number == 7) {
            selship.auto = 0;
        } else if (data.number == 8) {
            selship.auto = 1;
        } else if (data.number == 9) {
            selship.auto = 2;
        } else if (data.number == 10) {
            selship.auto = 3;
        } else if (selship.type == 10) {
            if (data.number == 1) {
                buytype(selship, 24);
            }
            if (data.number == 2) {

                //  buytype(selship, 25);
            } else if (data.number == 3) {
                //buyplane(selship, 1);
                //buytype(selship, 4);
            }
        } else if (selship.type == 13) {
            if (data.number == 1) {
                buytype(selship, 19);
            }
            if (data.number == 2) {

                buytype(selship, 25);
            } else if (data.number == 3) {
                buyplane(selship, 1);
                //buytype(selship, 4);
            }
        } else if (selship.type == 5) {
            if (data.number == 1) {
                buytype(selship, 12);
            } else if (data.number == 2) {
                buytype(selship, 21);
            } else if (data.number == 3) {
                buytype(selship, 20);
            }
        } else if (selship.type == 4) {
            if (data.number == 1) {
                buytype(selship, 5);
            } else if (data.number == 2) {
                buytype(selship, 27);
            } else if (data.number == 3) {
                //buytype(selship, 4);
            }
        } else if (selship.type == 27) {
            if (data.number == 1) {
                buytype(selship, 28);
            } else if (data.number == 2) {
                //buytype(selship, 27);
            } else if (data.number == 3) {
                //buytype(selship, 4);
            }
        } else if (selship.type == 7) {
            if (data.number == 1) {
                buytype(selship, 16);
            } else if (data.number == 2) {
                buytype(selship, 18);
            } else if (data.number == 3) {
                //buytype(selship, 4);
            }
        } else if (selship.type == 6) {
            if (data.number == 1) {
                buytype(selship, 7);
            } else if (data.number == 2) {
                buytype(selship, 10);
            } else if (data.number == 3) {
                //buytype(selship, 4);
            }
        } else if (selship.type == 2) {
            if (data.number == 1) {
                buytype(selship, 6);
            } else if (data.number == 2) {

                buytype(selship, 23);
            } else if (data.number == 3) {
                buytype(selship, 17);
                //buytype(selship, 4);
            }
        } else if (selship.type == 9) {
            if (data.number == 1) {
                //buytype(selship, 13);
            } else if (data.number == 2) {
                buyplane(selship, 0);
                //buytype(selship, 14);
            } else if (data.number == 3) {
                buyplane(selship, 1);
                //buytype(selship, 4);
            }
        } else if (selship.type == 14) {
            if (data.number == 1) {
                buytype(selship, 13);
            } else if (data.number == 2) {
                buyplane(selship, 1);
                //buytype(selship, 14);
            } else if (data.number == 3) {

                //buytype(selship, 4);
            }
        } else if (selship.type == 11) {
            if (data.number == 1) {
                buytype(selship, 9);
            } else if (data.number == 2) {
                buyplane(selship, 0);
                //buytype(selship, 14);
            } else if (data.number == 3) {
                buyplane(selship, 1);
                //buytype(selship, 4);
            }
        } else if (selship.type == 15) {
            if (data.number == 1) {
                buytype(selship, 11);
            } else if (data.number == 2) {
                buytype(selship, 22);
            } else if (data.number == 3) {
                buyplane(selship, 1);
                //buytype(selship, 4);
            }
        } else if (selship.type == 30) {
            if (data.number == 1) {
                buytype(selship, 13);
            } else if (data.number == 2) {
                //buyplane(selship, 1);
                //buytype(selship, 22);
            } else if (data.number == 3) {
                buyplane(selship, 1);
                //buytype(selship, 4);
            }
        } else if (selship.type == 29) {
            if (data.number == 1) {
                buytype(selship, 30);
            } else if (data.number == 2) {
                buyplane(selship, 1);
                //buytype(selship, 22);
            } else if (data.number == 3) {
                //  buyplane(selship, 1);
                //buytype(selship, 4);
            }
        } else if (selship.type == 3) {
            if (data.number == 1) {
                buytype(selship, 15);
            } else if (data.number == 2) {
                buytype(selship, 29);
            } else if (data.number == 3) {
                //buytype(selship, 4);
            }
        } else if (selship.type == 1) {
            if (data.number == 1) {
                buytype(selship, 3);
            } else if (data.number == 2) {
                //buytype(selship, 2);
            } else if (data.number == 3) {
                //buytype(selship, 4);
            }
        } else if (selship.type == 0) {
            if (data.number == 1) {
                buytype(selship, 1);
            } else if (data.number == 2) {
                buytype(selship, 2);
            } else if (data.number == 3) {
                buytype(selship, 4);
            }
        }








        if (data.number == 4) {
            if (player.money >= 10) {
                player.gstate = 2;
                var s = player.Ship(player.id, player.name);
                var cannon = s.Cannon(s.id, player.id, 30, 0);
                changetype(s, 0);

                player.money = player.money - 10;
                s.leader = false;
            }

            //console.log(player.Ship.list);
        }
        if (data.number == 5) {
            for (var j in player.Ship.list) {
                if (player.Ship.list[j].leader = true) {
                    player.Ship.list[j].leader = false;
                }
            }
            selship.leader = true;
        }

        if (data.number == 6) {
            if (selship.leader == false) {
                selship.placed = false;
                player.gstate = 2;
            }
        }



    });
    socket.on('place', function(data) {
        for (var i in player.Ship.list) {
            shipp = player.Ship.list[i];
            if (shipp.placed == false) {
                player.gstate = 1;
                shipp.placed = true;
                shipp.reld = data.d;
                shipp.relangl = data.angle;
                for (var i in Player.list[shipp.playerid].Ship.list) {
                    if (Player.list[shipp.playerid].Ship.list[i].leader) {
                        leader = Player.list[shipp.playerid].Ship.list[i];
                    }
                }
                if (!shipp.in) {
                    shipp.x = Math.cos(TO_RADIANS * shipp.relangl + TO_RADIANS * leader.angle) * shipp.reld + leader.x;
                    shipp.y = Math.sin(TO_RADIANS * shipp.relangl + TO_RADIANS * leader.angle) * shipp.reld + leader.y;
                    shipp.in = true;
                }



            }
        }
    });


    socket.on('keypress', function(data) {
        if (data.inputId === 'left') {
            player.left = data.state;
        }
        if (data.inputId === 'right') {
            player.right = data.state;

        }
        if (data.inputId === 'up') {
            player.up = data.state;
        }
        if (data.inputId === 'down') {
            player.down = data.state;
        }

        if (data.inputId === 'shooting') {
            player.shooting = data.state;
            player.mousex = data.x;
            player.mousey = data.y;
            //console.log(player.mousex);
        }
        if (data.inputId === 'control') {
            player.controlx = data.x;
            player.controly = data.y;
            player.mobile = true;
            //console.log(data);
        }

    });
}

Player.onDisconnect = function(socket) {
    delete Player.list[socket.id];
}

var io = require('socket.io')(serv, {});


io.sockets.on('connection', function(socket) {
    socket.id = Math.random();
    socket.start = false;
    socket.emit('id', socket.id);

    socket.on('start', function(name) {
        Player.onconnect(socket, name);

        console.log(name + ' started with id ' + socket.id);
    })

    socketlist[socket.id] = socket;

    console.log('socket connection' + socket.id);

    socket.on('disconnect', function() {
        delete socketlist[socket.id];
        Player.onDisconnect(socket);

        console.log(socket.id + "disconnected");
    });

});
var getcannon = function(z) {
    var can = [];
    for (var h in z) {

        can.push({
            x: z[h].x,
            y: z[h].y,
            angle: z[h].angle,
            type: z[h].type,
        });
    }
    return can;
}

var getplane = function(z) {
    var can = [];
    for (var t in z) {

        can.push({
            x: z[t].x,
            y: z[t].y,
            angle: z[t].angle,
            type: z[t].type,
            width: z[t].width,
            height: z[t].height,
            frame: z[t].frame,
            health: z[t].health,
            maxhealth: z[t].maxhealth,
        });
    }
    return can;
}

Player.update = function() {
    var pack = [];
    for (var j in Player.list) {
        var player = Player.list[j];
        player.update();
        for (var i in player.Ship.list) {
            var ship = player.Ship.list[i];
            ship.update(ship.Cannon.list[i]);
            if (ship.health <= 0) {

                var count = 0;
                for (var h in player.Ship.list) {
                    count++;
                }
                if (count == 1) {
                    for (i = 0; i < Math.round(player.money); i++) {
                        var c = Coin(ship.x + (Math.random() - .5) * ship.width, ship.y + (Math.random() - .5) * ship.width, ship.playerid);
                        //c.update();
                    }
                    delete Player.list[player.id];

                }
                for (i = 0; i < Math.round(ship.worth); i++) {
                    var c = Coin(ship.x + (Math.random() - .5) * ship.width, ship.y + (Math.random() - .5) * ship.width, ship.playerid);
                    //c.update();
                }
                if (ship.leader == true) {
                    if (count >= 1) {
                        var numb = 0;
                        for (var t in player.Ship.list) {
                            if (numb == 0) {

                                player.Ship.list[t].leader = true;
                                player.leaderid = player.Ship.list[t].id;
                                ship.leader = false;
                            }
                            if (player.Ship.list[t] != ship) {
                                numb++;
                            }

                        }
                        if (numb == 0) {
                            var dstate = true;
                            var socket = socketlist[player.id];
                            socket.emit('dead', dstate);

                            player.death = true;
                            socket.start = false;
                        }

                    }

                }
                if (ship.id == player.selected) {
                    if (!player.death) {
                        for (var j in player.Ship.list) {
                            if (player.Ship.list[j].leader) {
                                player.selected = player.Ship.list[j].id;

                            }
                        }


                    }

                }

                delete player.Ship.list[ship.id];
            }
            if (player.Ship.list[player.selected] != null) { //try and find out why this is nessesary
                pack.push({
                    x: ship.x,
                    y: ship.y,
                    width: ship.width,
                    height: ship.height,
                    angle: ship.angle,
                    speed: ship.vel,
                    id: ship.id,
                    playerid: ship.playerid,
                    leader: ship.leader,
                    name: ship.name,
                    death: player.death,
                    health: ship.health,
                    maxhealth: ship.maxhealth,
                    frame: ship.frame,
                    money: player.money,
                    type: ship.type,
                    seltype: player.Ship.list[player.selected].type,
                    gstate: player.gstate,
                    cannons: getcannon(ship.Cannon.list),
                    planes: getplane(ship.Plane.list),
                    color: player.color,

                });
            }

        }
    }

    return pack;
}

Bullet.update = function() {
    var pack = [];
    for (var i in Bullet.list) {
        var bullet = Bullet.list[i];
        if (bullet.toRemove) {
            delete Bullet.list[i];
        }
        bullet.update();
        pack.push({
            x: bullet.x,
            y: bullet.y,
            width: bullet.width,
            height: bullet.height,
            angle: bullet.angle,
            type: bullet.type,
        });
    }
    return pack;
}
Wake.update = function() {
    var pack = [];
    for (var i in Wake.list) {
        var wake = Wake.list[i];

        if (wake.time > 20) {
            delete Wake.list[i];
        }

        pack.push({
            x: wake.x,
            y: wake.y,
            time: wake.time,
        });
        wake.time = wake.time + Math.random() * 10;
    }
    return pack;
}

Coin.update = function() {
    Coin.l = 0;
    var pack = [];
    for (var i in Coin.list) {
        var coin = Coin.list[i];
        if (coin.toRemove) {
            delete Coin.list[i];
        }
        //coin.update();
        pack.push({
            x: Math.round(10 * coin.x) / 10,
            y: Math.round(10 * coin.y) / 10,
            //width: coin.width,
            //height: coin.height
        });
        Coin.l++;

    }
    return pack;

}
setInterval(function() {
    //console.log(Coin.l);
    if (Coin.l < 1000) {
        var c = Coin(Math.random() * mapw, Math.random() * maph, 0);
        //c.update();
    } else {
        //console.log('full');
    }

    //console.log(B,ullet.list);
    var pack = {

        bullet: Bullet.update(),
        ship: Player.update(),
        coin: Coin.update(),
        wake: Wake.update(),
    };
    //console.log(Bullet.list);
    for (var i in socketlist) {
        var socket = socketlist[i];
        var perpack = {
            bullet: [],
            ship: [],
            coin: [],
            wake: [],
        };

        if (socket.start) {

            var lship = Player.list[socket.id].Ship.list[Player.list[socket.id].leaderid];
            var w = 1.2 * (Player.list[socket.id].winwidth / 2);
            var h = 1.2 * (Player.list[socket.id].winheight / 2);
            for (var j = 0; j < pack.bullet.length; j++) {
                if (pack.bullet[j].x > lship.x + w || pack.bullet[j].x < lship.x - w || pack.bullet[j].y > lship.y + h || pack.bullet[j].y < lship.y - h) {} else {
                    perpack.bullet.push(pack.bullet[j]);
                }
            }

            perpack.ship = pack.ship;

            for (var j = 0; j < pack.wake.length; j++) {
                if (pack.wake[j].x > lship.x + w || pack.wake[j].x < lship.x - w || pack.wake[j].y > lship.y + h || pack.wake[j].y < lship.y - h) {} else {
                    perpack.wake.push(pack.wake[j]);
                }
            }
            for (var j = 0; j < pack.coin.length; j++) {
                if (pack.coin[j].x > lship.x + w || pack.coin[j].x < lship.x - w || pack.coin[j].y > lship.y + h || pack.coin[j].y < lship.y - h) {} else {
                    perpack.coin.push(pack.coin[j]);
                }
            }

            socket.emit('newPoisitions', perpack);
        }
    }
}, 1000 / 40); //updates 40Hz
//when you realize comments would be nice. 12/30/16 12:02 AM CENTRAL prject probably hasnt been worked on since 9/??/16
