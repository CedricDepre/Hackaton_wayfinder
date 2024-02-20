const Room = {
    FORUM: {name: 'FORUM', exits: new Map()},
    H1_1: {name: 'H1_1', exits: new Map()},
    H1_2: {name: 'H1_2', exits: new Map()},
    H1_3: {name: 'H1_3', exits: new Map()},
    H1_4: {name: 'H1_4', exits: new Map()},
    H2_1: {name: 'H2_1', exits: new Map()},
    H2_2: {name: 'H2_2', exits: new Map()},
    H2_3: {name: 'H2_3', exits: new Map()},
    H3_1: {name: 'H3_1', exits: new Map()},
    H3_2: {name: 'H3_2', exits: new Map()},
    H3_3: {name: 'H3_3', exits: new Map()},
    H4_1: {name: 'H4_1', exits: new Map()},
    H4_2: {name: 'H4_2', exits: new Map()},
    H4_3: {name: 'H4_3', exits: new Map()},
    H5_0: {name: 'H5_0', exits: new Map()},
    H5_1: {name: 'H5_1', exits: new Map()},
    H5_2: {name: 'H5_2', exits: new Map()},
    H6_1: {name: 'H6_1', exits: new Map()},
    H6_2: {name: 'H6_2', exits: new Map()},

    setExits(room, ...rooms) {
        rooms.forEach(exitRoom => {
            room.exits.set(exitRoom.name, exitRoom);
            exitRoom.exits.set(room.name, room);
        });
    },

    fromString(str) {
        const upperStr = str.toUpperCase().replace(".","_");
        return Room[upperStr] || null;
    },

    getName() {
        return this.name.toLowerCase();
    },

    getExitString() {
        let returnString = "Exits:";
        for (let exit of this.exits.keys()) {
            returnString += ` ${exit}`;
        }
        return returnString;
    },

    getExit(direction) {
        return this.exits.get(direction);
    },

    toString() {
        return `You are in ${this.getName()}\n${this.getExitString()}`;
    }
};


// Initialize the exits for each room
Room.setExits(Room.FORUM, Room.H6_1);
Room.setExits(Room.H1_1, Room.H1_2, Room.H1_3, Room.H2_1);
Room.setExits(Room.H1_2, Room.H1_1, Room.H1_3);
Room.setExits(Room.H1_3, Room.H1_4, Room.H1_2, Room.H1_1);
Room.setExits(Room.H1_4, Room.H1_3);
Room.setExits(Room.H2_1, Room.H2_2, Room.H1_1,  Room.H3_1, Room.H6_2);
Room.setExits(Room.H2_2, Room.H2_1, Room.H2_3);
Room.setExits(Room.H2_3, Room.H2_2, Room.H4_1, Room.H5_0);
Room.setExits(Room.H3_1, Room.H2_1, Room.H3_2, Room.H3_3);
Room.setExits(Room.H3_2, Room.H3_1, Room.H3_3);
Room.setExits(Room.H3_3, Room.H3_2, Room.H3_1);
Room.setExits(Room.H4_1, Room.H4_2, Room.H4_3, Room.H2_3);
Room.setExits(Room.H4_2, Room.H4_1, Room.H4_3);
Room.setExits(Room.H4_3, Room.H4_2, Room.H4_1);
Room.setExits(Room.H5_0, Room.H5_1, Room.H2_3);
Room.setExits(Room.H5_1, Room.H5_2, Room.H5_0);
Room.setExits(Room.H5_2, Room.H5_1);
Room.setExits(Room.H6_1, Room.FORUM, Room.H6_2);
Room.setExits(Room.H6_2, Room.H2_1, Room.H6_1);


const findShortestPath = (start, end) => {
    const queue = [start]
    const path = new Map()
    const visited = [start]

    while (queue.length > 0) {
        const currentRoom = queue[queue.length - 1]

        if (currentRoom === end) {
            console.log("queue", queue)
            return CreateArrayFromQueue(queue)
        }

        allExits = getAllExits(currentRoom)

        for (neighbour of allExits) {
            neighbour = neighbour[1]
            if (!visited.includes(neighbour)) {
                queue.push(neighbour)
                visited.push(neighbour)
                path[neighbour] = currentRoom
            }
        }
    }
}

const CreateArrayFromQueue = (queue) => {
    arr = []
    for (obj of queue) {
        arr.push(obj.name)
    }
    return arr
}
const getAllExits = (room) => {
    if (!room) {
        return null
    }
    if (!room.exits) {
        return null
    }

    return Array.from(room.exits.entries());
};