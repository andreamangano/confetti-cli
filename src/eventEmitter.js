const isFunction = obj => {
  return typeof obj === 'function' || false;
};
class EventEmitter {
  constructor() {
    this.listeners = new Map();
  }

  addListener(label, callback) {
    if (!this.listeners.has(label)) {
      this.listeners.set(label, []);
    }
    this.listeners.get(label).push(callback);
  }

  removeListener(label, callback) {
    const listeners = this.listeners.get(label);
    let index;
    if (listeners && listeners.length) {
      index = listeners.reduce((i, listener, index) => {
        return (isFunction(listener) && listener === callback)
          ? index
          : i;
      }, -1);
      if (index > -1) {
        listeners.splice(index, 1);
        this.listeners.set(label, listeners);
        return true;
      }
    }
    return false;
  }

  emit(label, ...args) {
    const listeners = this.listeners.get(label);
    if (listeners && listeners.length) {
      listeners.forEach(listener => {
        listener(...args);
      });
      return true;
    }
    return false;
  }
}

export default EventEmitter;
