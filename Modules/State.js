const Observable = require('FuseJS/Observable');

let instance = undefined;

function State() {
    this.menuOpened = Observable(false);
}

State.singleton = function () {
    if (!instance) {
        instance = new State();
    }

    return instance;
}

State.prototype.setState = function (newState) {
    if (typeof newState !== 'object') {
        return;
    }

    for (let key in newState) {
        this[key].value = newState[key];
    }

    return this;
}

module.exports = State;