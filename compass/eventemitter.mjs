class EmitEvent extends Event {

    constructor(name, data = {}) {
        super(name);

        Object.assign(this, data);
        Object.freeze(this);
    }
}

export class EventEmitter extends EventTarget {

    on(name, func) {
        this.addEventListener(name, func);
    }

    off(name, func) {
        this.removeEventListener(name, func);
    }

    once(name, func) {
        this.addEventListener(name, func, { once: true });
    }

    emit(name, data) {
        this.dispatchEvent(new EmitEvent(name, data));
    }
}
