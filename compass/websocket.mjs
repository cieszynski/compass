import { EventEmitter } from "./eventemitter.mjs";

class bla extends EventEmitter {
}

export const compass = new bla();

const socket = new WebSocket(`ws://${location.host}`);

socket.onerror = (event) => {
    console.error(event);
};

socket.onopen = () => {
    compass.emit("open", {data:"Verbunden mit Bun Pub/Sub!"});
    console.log("Verbunden mit Bun Pub/Sub!");
};

socket.onmessage = (event) => {
    console.log(event);
};
