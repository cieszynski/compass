import { EventEmitter } from "./eventemitter.mjs";

class Compass extends EventEmitter {

    #queue = new Set();

    constructor() {
        super();

        this.#connect();
    }

    #connect() {
        const socket = new WebSocket("/");

        socket.onerror = () => {
            this.emit("error");
        };

        socket.onopen = () => {
            this.emit("open");

            for (const data of this.#queue) {
                socket.send(data)
            }

            this.#queue.clear();
        };

        socket.onclose = (event) => {
            switch (event.code) {
                case 1006:
                    setTimeout(() => {
                        this.emit("connecting");
                        this.#connect();
                    }, 1000);
                    break;
                default:
                    this.emit("closed");
            }
        };

        socket.onmessage = (event) => this.#messageHandler(event.data);

        this.send = (data) => {
            console.assert(typeof data === 'string');
            
            if (socket?.readyState < WebSocket.CLOSING) {
                socket.send(data);
            } else {
                this.#queue.add(data);
            }
        };
    }

    #messageHandler(data) {
        console.log(data);
    }
}

export class Needle extends Compass {
    constructor() {
        super();
    }
}

export class Rose extends Compass {
    constructor() {
        super();
    }
}
