function Logger(variable, tabs = 1, tabSize = 4) {
    this.variable = variable;
    this.tabs = tabs;
    this.tabSize = tabSize;

    this.res = '';
}

Logger.prototype.log = function () {
    console.log(this.res);
}

Logger.prototype.toString = function () {
    return this.res;
}

Logger.prototype.prepare = function () {
    if(this.variable === null){
        this.res = 'null';

    } else if (Array.isArray(this.variable)) {
        this.res = this.logArray(this.variable);

    } else if (typeof this.variable === 'object') {
        this.res = this.logObject(this.variable);

    } else if (['number', 'string', 'boolean'].indexOf(typeof this.variable) != -1) {
        this.res = this.variable.toString();
    }

    return this;
}

Logger.prototype.logArray = function () {
    let res = '';
    res += '[';

    for (i = 0; i < this.variable.length; i++) {
        res += "\n" +
            ' '.repeat(this.tabs * this.tabSize) +
            i +
            ": " +
            (new Logger(this.variable[i], this.tabs + 1, this.tabSize)).prepare().toString();
    }

    res += "\n" + ' '.repeat((this.tabs - 1) * this.tabSize) + ']';

    return res;
}

Logger.prototype.logObject = function () {
    let res = '';

    res += '{'
    for (var key in this.variable) {
        res += "\n" +
            ' '.repeat(this.tabs * this.tabSize) +
            key +
            ": " +
            (new Logger(this.variable[key], this.tabs + 1, this.tabSize)).prepare().toString();
    }
    res += "\n" + ' '.repeat((this.tabs - 1) * this.tabSize) + '}';

    return res;
}


function init(variable, tabs = 1, tabSize = 4) {
    return (new Logger(variable, tabs, tabSize)).prepare();
}

module.exports = {
    Logger,
    init
}