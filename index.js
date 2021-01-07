(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var CoordinateAdaptor = /** @class */ (function () {
    function CoordinateAdaptor() {
    }
    CoordinateAdaptor.prototype.offsets = function (seeds) {
        var leaves = [];
        for (var i = 0; i < seeds.length; i++) {
            leaves.push(this.offset(seeds[i]));
        }
        return leaves;
    };
    CoordinateAdaptor.prototype.distance = function (offset) {
        return Math.sqrt(this.distanceSquare(offset));
    };
    CoordinateAdaptor.prototype.isIn = function (from, to) {
        return (((from.getRow() > this.getRow() && this.getRow() > to.getRow()) ||
            (to.getRow() > this.getRow() && this.getRow() > from.getRow())) &&
            ((from.getCol() > this.getCol() && this.getCol() > to.getCol()) ||
                (to.getCol() > this.getCol() && this.getCol() > from.getCol())));
    };
    CoordinateAdaptor.prototype.isFarther = function (offset, distance) {
        return distance * distance < this.distanceSquare(offset);
    };
    CoordinateAdaptor.prototype.isNeighbor = function (to) {
        if (this.getRow() == to.getRow()) {
            return (this.getCol() - to.getCol() == CoordinateAdaptor.NEIGHBOR ||
                to.getCol() - this.getCol() == CoordinateAdaptor.NEIGHBOR);
        }
        if (this.getCol() == to.getCol()) {
            return (this.getRow() - to.getRow() == CoordinateAdaptor.NEIGHBOR ||
                to.getRow() - this.getRow() == CoordinateAdaptor.NEIGHBOR);
        }
        return false;
    };
    CoordinateAdaptor.prototype.distanceSquare = function (offset) {
        return ((this.getRow() - offset.getRow()) * (this.getRow() - offset.getRow()) +
            (this.getCol() - offset.getCol()) * (this.getCol() - offset.getCol()));
    };
    CoordinateAdaptor.prototype.equal = function (point) {
        return point.getRow() == this.getRow() && point.getCol() == this.getCol();
    };
    CoordinateAdaptor.prototype.isIncluded = function (range) {
        for (var i = 0; i < range.length; ++i) {
            if (this.equal(range[i])) {
                return true;
            }
        }
        return false;
    };
    CoordinateAdaptor.NEIGHBOR = 1;
    return CoordinateAdaptor;
}());
exports["default"] = CoordinateAdaptor;

},{}],2:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var coordinate_adaptor_1 = require("./coordinate_adaptor");
var coordinate_value_1 = require("./coordinate_value");
var CoordinateDynamic = /** @class */ (function (_super) {
    __extends(CoordinateDynamic, _super);
    function CoordinateDynamic(row, col) {
        var _this = _super.call(this) || this;
        _this.row = row;
        _this.col = col;
        return _this;
    }
    CoordinateDynamic.prototype.getRow = function () {
        return this.row();
    };
    CoordinateDynamic.prototype.getCol = function () {
        return this.col();
    };
    CoordinateDynamic.prototype.toStatic = function () {
        return new coordinate_value_1["default"](this.row(), this.col());
    };
    CoordinateDynamic.prototype.offset = function (seed) {
        var _this = this;
        return new CoordinateDynamic(function () { return _this.row() + seed.getRow(); }, function () { return _this.col() + seed.getCol(); });
    };
    CoordinateDynamic.prototype.offsetTo = function (to, degree) {
        var _this = this;
        return new CoordinateDynamic(function () { return _this.row() + (to.getRow() - _this.row()) * degree; }, function () { return _this.col() + (to.getCol() - _this.col()) * degree; });
    };
    CoordinateDynamic.prototype.floor = function () {
        var _this = this;
        return new CoordinateDynamic(function () { return Math.floor(_this.row()); }, function () { return Math.floor(_this.col()); });
    };
    CoordinateDynamic.prototype.negative = function () {
        var _this = this;
        return new CoordinateDynamic(function () { return 0 - _this.row(); }, function () { return 0 - _this.col(); });
    };
    CoordinateDynamic.prototype.split = function (size) {
        var _this = this;
        return new CoordinateDynamic(function () { return _this.row() / (size.getRow() == 0 ? 1 : size.getRow()); }, function () { return _this.col() / (size.getCol() == 0 ? 1 : size.getCol()); });
    };
    CoordinateDynamic.prototype.swell = function (size) {
        var _this = this;
        return new CoordinateDynamic(function () { return _this.row() * size.getRow(); }, function () { return _this.col() * size.getCol(); });
    };
    CoordinateDynamic.prototype.radiation = function (radix) {
        var radiationArea = [];
        for (var i = Math.ceil(this.row() - radix); i <= Math.floor(this.row() + radix); ++i) {
            for (var j = Math.ceil(this.col() - radix); j <= Math.floor(this.col() + radix); ++j) {
                if (i == this.row() && j == this.col()) {
                    continue;
                }
                var radiationPoint = new coordinate_value_1["default"](i, j);
                if (!this.isFarther(radiationPoint, radix)) {
                    radiationArea.push(radiationPoint);
                }
            }
        }
        return radiationArea;
    };
    return CoordinateDynamic;
}(coordinate_adaptor_1["default"]));
exports["default"] = CoordinateDynamic;

},{"./coordinate_adaptor":1,"./coordinate_value":3}],3:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var coordinate_adaptor_1 = require("./coordinate_adaptor");
var CoordinateValue = /** @class */ (function (_super) {
    __extends(CoordinateValue, _super);
    function CoordinateValue(row, col) {
        var _this = _super.call(this) || this;
        _this.row = row;
        _this.col = col;
        return _this;
    }
    CoordinateValue.prototype.getRow = function () {
        return this.row;
    };
    CoordinateValue.prototype.getCol = function () {
        return this.col;
    };
    CoordinateValue.prototype.toStatic = function () {
        return this;
    };
    CoordinateValue.prototype.offset = function (seed) {
        return new CoordinateValue(this.row + seed.getRow(), this.col + seed.getCol());
    };
    CoordinateValue.prototype.offsetTo = function (to, degree) {
        return new CoordinateValue(this.row + (to.getRow() - this.row) * degree, this.col + (to.getCol() - this.col) * degree);
    };
    CoordinateValue.prototype.floor = function () {
        return new CoordinateValue(Math.floor(this.row), Math.floor(this.col));
    };
    CoordinateValue.prototype.negative = function () {
        return new CoordinateValue(0 - this.row, 0 - this.col);
    };
    CoordinateValue.prototype.split = function (size) {
        return new CoordinateValue(this.row / (size.getRow() == 0 ? 1 : size.getRow()), this.col / (size.getCol() == 0 ? 1 : size.getCol()));
    };
    CoordinateValue.prototype.swell = function (size) {
        return new CoordinateValue(this.row * size.getRow(), this.col * size.getCol());
    };
    CoordinateValue.prototype.radiation = function (radix) {
        var radiationArea = [];
        for (var i = Math.ceil(this.row - radix); i <= Math.floor(this.row + radix); ++i) {
            for (var j = Math.ceil(this.col - radix); j <= Math.floor(this.col + radix); ++j) {
                if (i == this.row && j == this.col) {
                    continue;
                }
                var radiationPoint = new CoordinateValue(i, j);
                if (!this.isFarther(radiationPoint, radix)) {
                    radiationArea.push(radiationPoint);
                }
            }
        }
        return radiationArea;
    };
    CoordinateValue.crossSeed = function () {
        return [CoordinateValue.UP, CoordinateValue.LEFT, CoordinateValue.DOWN, CoordinateValue.RIGHT];
    };
    CoordinateValue.umbrellaSeed = function () {
        return [CoordinateValue.UP, CoordinateValue.LEFTUP, CoordinateValue.RIGHTUP];
    };
    CoordinateValue.UNIT = new CoordinateValue(1, 1);
    CoordinateValue.HALF = new CoordinateValue(0.5, 0.5);
    CoordinateValue.ORIGIN = new CoordinateValue(0, 0);
    CoordinateValue.UP = new CoordinateValue(-1, 0);
    CoordinateValue.DOWN = new CoordinateValue(1, 0);
    CoordinateValue.LEFT = new CoordinateValue(0, -1);
    CoordinateValue.RIGHT = new CoordinateValue(0, 1);
    CoordinateValue.RIGHTUP = new CoordinateValue(-1, 1);
    CoordinateValue.RIGHTDOWN = new CoordinateValue(1, 1);
    CoordinateValue.LEFTUP = new CoordinateValue(-1, -1);
    CoordinateValue.LEFTDOWN = new CoordinateValue(1, -1);
    return CoordinateValue;
}(coordinate_adaptor_1["default"]));
exports["default"] = CoordinateValue;

},{"./coordinate_adaptor":1}],4:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var EventAdapter = /** @class */ (function () {
    function EventAdapter() {
        this.startStamp = EventAdapter.DEFAULT_START_STAMP;
    }
    EventAdapter.prototype.setFrom = function (from) {
        this.from = from;
    };
    EventAdapter.prototype.start = function (startStamp) {
        this.startStamp = startStamp;
    };
    EventAdapter.DEFAULT_START_STAMP = Number.MAX_VALUE;
    return EventAdapter;
}());
exports["default"] = EventAdapter;

},{}],5:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var event_adapter_1 = require("./event_adapter");
var EventKeep = /** @class */ (function (_super) {
    __extends(EventKeep, _super);
    function EventKeep() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EventKeep.prototype.getLocation = function (timeStamp) {
        return this.from;
    };
    EventKeep.prototype.getEndLocation = function (timeStamp) {
        return this.from;
    };
    return EventKeep;
}(event_adapter_1["default"]));
exports["default"] = EventKeep;

},{"./event_adapter":4}],6:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var event_adapter_1 = require("./event_adapter");
var EventLocationSetter = /** @class */ (function (_super) {
    __extends(EventLocationSetter, _super);
    function EventLocationSetter(newLocation) {
        var _this = _super.call(this) || this;
        _this.newLocation = newLocation;
        return _this;
    }
    EventLocationSetter.prototype.getLocation = function (timeStamp) {
        return this.newLocation;
    };
    EventLocationSetter.prototype.getEndLocation = function (timeStamp) {
        return this.newLocation;
    };
    return EventLocationSetter;
}(event_adapter_1["default"]));
exports["default"] = EventLocationSetter;

},{"./event_adapter":4}],7:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var event_adapter_1 = require("./event_adapter");
var EventMove = /** @class */ (function (_super) {
    __extends(EventMove, _super);
    function EventMove(to, timeCost, safe, move) {
        var _this = _super.call(this) || this;
        _this.to = to;
        _this.timeCost = timeCost;
        _this.safe = safe;
        _this.move = move;
        return _this;
    }
    EventMove.prototype.getLocation = function (timeStamp) {
        if (timeStamp <= this.startStamp) {
            return this.from;
        }
        if (timeStamp >= this.startStamp + this.timeCost) {
            return this.to;
        }
        return this.move(this.from, this.to, this.timeCost, timeStamp - this.startStamp);
    };
    EventMove.prototype.getEndLocation = function (timeStamp) {
        if (this.safe) {
            return this.to;
        }
        else {
            return this.getLocation(timeStamp);
        }
    };
    return EventMove;
}(event_adapter_1["default"]));
exports["default"] = EventMove;

},{"./event_adapter":4}],8:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var event_keep_1 = require("./event/event_keep");
var Locus = /** @class */ (function () {
    function Locus(location) {
        this.location = location;
        this.initEvent();
    }
    Locus.prototype.initEvent = function () {
        this.setEvent(new event_keep_1["default"]());
    };
    Locus.prototype.getLocation = function (timeStamp) {
        this.location = this.event.getLocation(timeStamp);
        return this.location;
    };
    Locus.prototype.setEvent = function (event) {
        if (this.event != null) {
            this.location = this.event.getEndLocation(Date.now());
        }
        event.setFrom(this.location);
        this.event = event;
        event.start(Date.now());
    };
    return Locus;
}());
exports["default"] = Locus;

},{"./event/event_keep":5}],9:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var node_1 = require("./node");
var LinkedList = /** @class */ (function () {
    function LinkedList() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }
    LinkedList.prototype.get = function (index) {
        var now = this.head;
        var indexNow = 0;
        while (now != null) {
            if (index == indexNow) {
                return now.data;
            }
            now = now.next;
            indexNow++;
        }
        return null;
    };
    LinkedList.prototype.iterate = function (onElement) {
        var now = this.head;
        var indexNow = 0;
        while (now != null) {
            onElement(indexNow, now.data);
            now = now.next;
            indexNow++;
        }
    };
    LinkedList.prototype.iterateInterruptible = function (onElement) {
        var now = this.head;
        var indexNow = 0;
        var keep = true;
        while (keep && now != null) {
            keep = onElement(indexNow, now.data);
            now = now.next;
            indexNow++;
        }
    };
    LinkedList.prototype.isEmpty = function () {
        return this.length == 0;
    };
    LinkedList.prototype.size = function () {
        return this.length;
    };
    LinkedList.prototype.append = function (element) {
        var newNode = new node_1["default"]();
        newNode.data = element;
        if (this.isEmpty()) {
            this.head = newNode;
            this.tail = newNode;
            this.length++;
            return;
        }
        this.tail.next = newNode;
        this.tail = newNode;
        this.length++;
    };
    LinkedList.prototype.deduct = function () {
        if (this.length == 0) {
            return null;
        }
        var data = this.tail.data;
        if (this.tail == this.head) {
            this.head = null;
            this.tail = null;
            this.length--;
            return data;
        }
        var previous = this.getNodePrevious(this.length - LinkedList.IndexStep);
        previous.next = null;
        this.tail = previous;
        this.length--;
        return data;
    };
    LinkedList.prototype.shift = function (element) {
        var newNode = new node_1["default"]();
        newNode.data = element;
        if (this.isEmpty()) {
            this.head = newNode;
            this.tail = newNode;
            this.length++;
            return;
        }
        newNode.next = this.head;
        this.head = newNode;
        this.length++;
    };
    LinkedList.prototype.unshift = function () {
        if (this.length == 0) {
            return null;
        }
        var data = this.head.data;
        if (this.head == this.tail) {
            this.tail = null;
            this.head = null;
            this.length--;
            return data;
        }
        this.head = this.head.next;
        this.length--;
        return data;
    };
    LinkedList.prototype.insert = function (element, position) {
        if (position <= 0) {
            this.shift(element);
            return;
        }
        if (position >= this.length) {
            this.append(element);
            return;
        }
        this.length++;
        var insertNode = new node_1["default"]();
        insertNode.data = element;
        var previous = this.getNodePrevious(position);
        insertNode.next = previous.next;
        previous.next = insertNode;
    };
    LinkedList.prototype.insertBy = function (element, isLater) {
        var current = this.head;
        var index = 0;
        while (current != null) {
            if (isLater(current.data)) {
                var now = new node_1["default"]();
                now.data = element;
                now.next = current.next;
                current.next = now;
                this.length++;
                return index + LinkedList.IndexStep;
            }
            current = current.next;
            index++;
        }
        this.append(element);
        return index;
    };
    LinkedList.prototype.removeAt = function (position) {
        if (position < 0 || position >= this.length) {
            return null;
        }
        if (position == 0) {
            return this.unshift();
        }
        if (position == this.length - LinkedList.IndexStep) {
            return this.deduct();
        }
        var previous = this.getNodePrevious(position);
        var data = previous.next.data;
        previous.next = previous.next.next;
        this.length--;
        return data;
    };
    LinkedList.prototype.removeBy = function (equal) {
        if (this.length == 0) {
            return null;
        }
        if (equal(this.head.data)) {
            var headData = this.head.data;
            this.head = this.head.next;
            this.length--;
            if ((this.length = 0)) {
                this.tail = null;
            }
            return headData;
        }
        var previous = null;
        var current = this.head;
        while (current != null) {
            if (equal(current.data)) {
                break;
            }
            previous = current;
            current = current.next;
        }
        if (current == null) {
            return null;
        }
        previous.next = current.next;
        this.length--;
        if (current == this.tail) {
            this.tail = previous;
        }
        return current.data;
    };
    LinkedList.prototype.indexBy = function (equal) {
        var current = this.head;
        var index = 0;
        while (current != null) {
            if (equal(current.data)) {
                return index;
            }
            index++;
            current = current.next;
        }
        return -1;
    };
    LinkedList.prototype.clear = function () {
        this.length = 0;
        this.head = null;
        this.tail = null;
    };
    LinkedList.prototype.getNodePrevious = function (position) {
        if (position <= 0 || position > this.length) {
            return null;
        }
        var index = 1;
        var previous = this.head;
        while (index < position) {
            previous = previous.next;
            index++;
        }
        return previous;
    };
    LinkedList.IndexStep = 1;
    return LinkedList;
}());
exports["default"] = LinkedList;

},{"./node":10}],10:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var Node = /** @class */ (function () {
    function Node() {
        this.data = null;
        this.next = null;
    }
    return Node;
}());
exports["default"] = Node;

},{}],11:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var linked_list_1 = require("../linked_list/linked_list");
var ListenerAdapter = /** @class */ (function () {
    function ListenerAdapter() {
        this.listeners = new linked_list_1["default"]();
    }
    ListenerAdapter.prototype.on = function (listener) {
        if (listener == null) {
            return;
        }
        this.listeners.append(listener);
    };
    ListenerAdapter.prototype.cut = function (listener) {
        this.listeners.removeBy(function (now) { return now == listener; });
    };
    ListenerAdapter.prototype.clear = function () {
        this.listeners.clear();
    };
    return ListenerAdapter;
}());
exports["default"] = ListenerAdapter;

},{"../linked_list/linked_list":9}],12:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var listener_adapter_1 = require("./listener_adapter");
var ListenerDiffusion = /** @class */ (function (_super) {
    __extends(ListenerDiffusion, _super);
    function ListenerDiffusion() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ListenerDiffusion.prototype.trigger = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.listeners.iterate(function (_, now) {
            now.apply(void 0, args);
        });
        return null;
    };
    return ListenerDiffusion;
}(listener_adapter_1["default"]));
exports["default"] = ListenerDiffusion;

},{"./listener_adapter":11}],13:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var OnceAdapter = /** @class */ (function () {
    function OnceAdapter() {
    }
    OnceAdapter.prototype.setCallback = function (callback) {
        this.callback = callback;
        return this;
    };
    OnceAdapter.delay = function (called) {
        return function () {
            setTimeout(called, 0);
        };
    };
    OnceAdapter.prototype.call = function () {
        if (this.callback != null) {
            this.callback();
        }
    };
    return OnceAdapter;
}());
exports["default"] = OnceAdapter;

},{}],14:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var once_adapter_1 = require("./once_adapter");
var OnceFirst = /** @class */ (function (_super) {
    __extends(OnceFirst, _super);
    function OnceFirst() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hasCalled = false;
        return _this;
    }
    OnceFirst.prototype.getCallback = function () {
        var _this = this;
        return once_adapter_1["default"].delay(function () {
            if (!_this.hasCalled) {
                _this.hasCalled = true;
                _this.call();
            }
        });
    };
    return OnceFirst;
}(once_adapter_1["default"]));
exports["default"] = OnceFirst;

},{"./once_adapter":13}],15:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var once_adapter_1 = require("./once_adapter");
var OnceLast = /** @class */ (function (_super) {
    __extends(OnceLast, _super);
    function OnceLast() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.counter = 0;
        return _this;
    }
    OnceLast.prototype.getCallback = function () {
        var _this = this;
        this.counter++;
        return once_adapter_1["default"].delay(function () {
            _this.counter--;
            if (_this.counter == 0) {
                _this.call();
            }
        });
    };
    return OnceLast;
}(once_adapter_1["default"]));
exports["default"] = OnceLast;

},{"./once_adapter":13}],16:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var RandomWeight = /** @class */ (function () {
    function RandomWeight() {
        this.factors = [];
        this.weights = [];
        this.totalWeight = 0;
    }
    RandomWeight.prototype.addFactor = function (factor, weight) {
        if (weight === void 0) { weight = RandomWeight.DEFAULT_WEIGHT; }
        if (weight < 0) {
            weight = 0;
        }
        this.factors.push(factor);
        this.totalWeight += weight;
        this.weights.push(this.totalWeight);
        return this;
    };
    RandomWeight.prototype.getFactor = function () {
        if (this.factors.length == 0) {
            return null;
        }
        var seed = Math.random() * this.totalWeight;
        for (var i = 0; i < this.weights.length; i++) {
            if (seed < this.weights[i]) {
                return this.factors[i];
            }
        }
        return null;
    };
    RandomWeight.DEFAULT_WEIGHT = 1;
    return RandomWeight;
}());
exports["default"] = RandomWeight;

},{}],17:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var Color = /** @class */ (function () {
    function Color(r, g, b, a) {
        if (a === void 0) { a = Color.DEFAULT_ALPHA; }
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
    Color.prototype.toRGB = function () {
        return "rgb(" + this.r + "," + this.g + "," + this.b + ")";
    };
    Color.prototype.toRGBA = function () {
        return "rgba(" + this.r + "," + this.g + "," + this.b + "," + this.a + ")";
    };
    Color.prototype.toHex = function () {
        return "#" + Color.toHex(this.r) + Color.toHex(this.g) + Color.toHex(this.b);
    };
    Color.toHex = function (value) {
        var hex = value.toString(Color.HEX_RADIX);
        if (value < Color.HEX_RADIX) {
            hex = "0" + hex;
        }
        return hex;
    };
    Color.HEX_RADIX = 16;
    Color.DEFAULT_ALPHA = 1;
    return Color;
}());
exports["default"] = Color;

},{}],18:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var Font = /** @class */ (function () {
    function Font() {
        this.family = Font.DEFAULT_FAMILY;
        this.size = Font.DEFAULT_SIZE;
        this.align = Font.DEFAULT_ALIGN;
        this.baseline = Font.DEFAULT_BASELINE;
    }
    Font.prototype.setSize = function (size) {
        this.size = size;
        return this;
    };
    Font.prototype.setFamily = function (family) {
        this.family = family;
        return this;
    };
    Font.prototype.setAlign = function (align) {
        this.align = align;
        return this;
    };
    Font.prototype.setBaseline = function (baseline) {
        this.baseline = baseline;
        return this;
    };
    Font.ALIGN_START = "start";
    Font.ALIGN_END = "end";
    Font.ALIGN_LEFT = "left";
    Font.ALIGN_RIGHT = "right";
    Font.ALIGN_CENTER = "center";
    Font.BASELINE_TOP = "top";
    Font.BASELINE_HANGING = "hanging";
    Font.BASELINE_MIDDLE = "middle";
    Font.BASELINE_ALPHABETIC = "alphabetic";
    Font.BASELINE_IDEOGRAPHIC = "ideographic";
    Font.BASELINE_BOTTOM = "bottom";
    Font.DEFAULT_SIZE = 1;
    Font.DEFAULT_FAMILY = "sans-serif";
    Font.DEFAULT_ALIGN = Font.ALIGN_START;
    Font.DEFAULT_BASELINE = Font.BASELINE_ALPHABETIC;
    return Font;
}());
exports["default"] = Font;

},{}],19:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var BirthAdapter = /** @class */ (function () {
    function BirthAdapter() {
    }
    return BirthAdapter;
}());
exports["default"] = BirthAdapter;

},{}],20:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var birth_weight_1 = require("./birth_weight");
var birth_item_1 = require("./birth_item");
var birth_adapter_1 = require("./birth_adapter");
var item_creator_1 = require("../item/item_creator");
var BirthEliminate = /** @class */ (function (_super) {
    __extends(BirthEliminate, _super);
    function BirthEliminate(outter) {
        if (outter === void 0) { outter = []; }
        var _this = _super.call(this) || this;
        _this.birth = new birth_weight_1["default"]();
        for (var i = 0; i < BirthEliminate.Eliminates.length; i++) {
            var active = true;
            for (var j = 0; j < outter.length; j++) {
                if (BirthEliminate.Eliminates[i] == outter[j]) {
                    active = false;
                }
            }
            if (active) {
                _this.birth.addBirthWeight(new birth_item_1["default"](BirthEliminate.Eliminates[i]));
            }
        }
        return _this;
    }
    BirthEliminate.prototype.getItem = function () {
        return this.birth.getItem();
    };
    BirthEliminate.prototype.popItem = function () {
        return this.getItem();
    };
    BirthEliminate.Eliminates = [
        item_creator_1["default"].APPLE,
        item_creator_1["default"].BLUEBERRY,
        item_creator_1["default"].FLOWER,
        item_creator_1["default"].LEAF,
        item_creator_1["default"].PEAR,
        item_creator_1["default"].WATER,
    ];
    return BirthEliminate;
}(birth_adapter_1["default"]));
exports["default"] = BirthEliminate;

},{"../item/item_creator":61,"./birth_adapter":19,"./birth_item":22,"./birth_weight":23}],21:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var item_empty_1 = require("../item/prop/item_empty");
var birth_adapter_1 = require("./birth_adapter");
var BirthEmpty = /** @class */ (function (_super) {
    __extends(BirthEmpty, _super);
    function BirthEmpty() {
        return _super.call(this) || this;
    }
    BirthEmpty.prototype.getItem = function () {
        return item_empty_1["default"].getEmpty();
    };
    BirthEmpty.prototype.popItem = function () {
        return item_empty_1["default"].getEmpty();
    };
    BirthEmpty.getEmpty = function () {
        return BirthEmpty.instance;
    };
    BirthEmpty.instance = new BirthEmpty();
    return BirthEmpty;
}(birth_adapter_1["default"]));
exports["default"] = BirthEmpty;

},{"../item/prop/item_empty":63,"./birth_adapter":19}],22:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var item_creator_1 = require("../item/item_creator");
var birth_adapter_1 = require("./birth_adapter");
var BirthItem = /** @class */ (function (_super) {
    __extends(BirthItem, _super);
    function BirthItem(itemCreatorId) {
        var _this = _super.call(this) || this;
        _this.itemCreatorId = itemCreatorId;
        return _this;
    }
    BirthItem.prototype.getItem = function () {
        return item_creator_1["default"].createItem(this.itemCreatorId);
    };
    BirthItem.prototype.popItem = function () {
        return this.getItem();
    };
    return BirthItem;
}(birth_adapter_1["default"]));
exports["default"] = BirthItem;

},{"../item/item_creator":61,"./birth_adapter":19}],23:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var birth_empty_1 = require("./birth_empty");
var birth_adapter_1 = require("./birth_adapter");
var random_weight_1 = require("../../concept/random_weight");
var BirthWeight = /** @class */ (function (_super) {
    __extends(BirthWeight, _super);
    function BirthWeight() {
        var _this = _super.call(this) || this;
        _this.random = new random_weight_1["default"]();
        return _this;
    }
    BirthWeight.prototype.addBirthWeight = function (birth, weight) {
        this.random.addFactor(birth, weight);
        return this;
    };
    BirthWeight.prototype.getBirth = function () {
        var birth = this.random.getFactor();
        if (birth == null) {
            return birth_empty_1["default"].getEmpty();
        }
        return birth;
    };
    BirthWeight.prototype.getItem = function () {
        return this.getBirth().getItem();
    };
    BirthWeight.prototype.popItem = function () {
        return this.getBirth().popItem();
    };
    return BirthWeight;
}(birth_adapter_1["default"]));
exports["default"] = BirthWeight;

},{"../../concept/random_weight":16,"./birth_adapter":19,"./birth_empty":21}],24:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var cell_adapter_1 = require("../cell/cell_adapter");
var click_1 = require("../sacrifice/click");
var exchange_1 = require("../sacrifice/exchange");
var coordinate_value_1 = require("../../concept/coordinate/coordinate_value");
var locus_1 = require("../../concept/coordinate/locus");
var board_puzzle_1 = require("./board_puzzle");
var board_check_1 = require("./board_check");
var board_explode_1 = require("./board_explode");
var board_scrape_1 = require("./board_scrape");
var board_polymerize_1 = require("./board_polymerize");
var board_arrivable_1 = require("./board_arrivable");
var board_fall_1 = require("./board_fall");
var board_exchange_1 = require("./board_exchange");
var board_click_1 = require("./board_click");
var board_on_1 = require("./board_on");
var Board = /** @class */ (function () {
    function Board() {
        var _this = this;
        this.active = false;
        this.puzzle = new board_puzzle_1["default"]();
        this.puzzle.onBoardClick.on(function (location) {
            if (!_this.active) {
                return;
            }
            _this.click.click(new click_1["default"](location));
        });
        this.puzzle.onBoardExchange.on(function (from, to) {
            if (!_this.active) {
                return;
            }
            _this.exchange.exchange(new exchange_1["default"](from, to));
        });
    }
    Board.prototype.setCells = function (cells, births, exits) {
        var _this = this;
        this.births = births;
        this.exits = exits;
        this.cells = cells;
        this.explode = new board_explode_1["default"](this.cells);
        this.scrape = new board_scrape_1["default"](this.cells);
        this.arrivable = new board_arrivable_1["default"](this.cells, this.births);
        this.fall = new board_fall_1["default"](this.cells, this.births, this.exits, this.arrivable);
        this.check = new board_check_1["default"](this.cells);
        this.polymerize = new board_polymerize_1["default"](this.cells, this.scrape, this.fall, this.check);
        this.exchange = new board_exchange_1["default"](this.cells, this.fall, this.polymerize, this.check);
        this.click = new board_click_1["default"](this.cells, this.fall);
        this.on = new board_on_1["default"](this.cells, this.exits, this.click, this.exchange, this.fall);
        this.cells.iterate(function (location, cell) {
            _this.getPuzzle().addChild(cell.getPuzzle(), new locus_1["default"](location), Board.PUZZLE_CELL_Z_INDEX);
            return true;
        });
        this.exits.iterate(function (exit) {
            _this.getPuzzle().addChild(exit.getPuzzle(), new locus_1["default"](exit.getLocation()), Board.PUZZLE_EXIT_Z_INDEX);
        });
        this.puzzle.setSize(this.cells.size().swell(cell_adapter_1["default"].RENDER_SIZE));
    };
    Board.prototype.getOn = function () {
        return this.on;
    };
    Board.prototype.start = function () {
        this.active = true;
        this.fall.start();
    };
    Board.prototype.close = function () {
        this.active = false;
    };
    Board.prototype.size = function () {
        if (this.cells == null) {
            return coordinate_value_1["default"].ORIGIN;
        }
        return this.cells.size();
    };
    Board.prototype.resizePuzzle = function (size) { };
    Board.prototype.getPuzzle = function () {
        return this.puzzle;
    };
    Board.LoadStaticResource = function (render, onSuccess, onError) {
        onSuccess();
    };
    Board.PUZZLE_CELL_Z_INDEX = 10;
    Board.PUZZLE_EXIT_Z_INDEX = 11;
    return Board;
}());
exports["default"] = Board;

},{"../../concept/coordinate/coordinate_value":3,"../../concept/coordinate/locus":8,"../cell/cell_adapter":39,"../sacrifice/click":65,"../sacrifice/exchange":66,"./board_arrivable":25,"./board_check":28,"./board_click":29,"./board_exchange":30,"./board_explode":32,"./board_fall":33,"./board_on":34,"./board_polymerize":35,"./board_puzzle":37,"./board_scrape":38}],25:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var coordinate_value_1 = require("../../concept/coordinate/coordinate_value");
var BoardArrivable = /** @class */ (function () {
    function BoardArrivable(cells, births) {
        this.cells = cells;
        this.births = births;
        this.arrivable = [];
    }
    BoardArrivable.prototype.isArrivable = function (location) {
        if (location.getRow() < 0 || location.getRow() >= this.arrivable.length) {
            return false;
        }
        var row = this.arrivable[location.getRow()];
        if (location.getCol() < 0 || location.getCol() >= row.length) {
            return false;
        }
        return this.arrivable[location.getRow()][location.getCol()];
    };
    BoardArrivable.prototype.update = function () {
        var _this = this;
        this.arrivable = [];
        for (var i = 0; i < this.cells.size().getRow(); i++) {
            this.arrivable.push([]);
            for (var j = 0; j < this.cells.size().getCol(); j++) {
                this.arrivable[i].push(false);
            }
        }
        this.births.iterate(function (birth) {
            _this.updateLocation(birth.getLocation());
        });
    };
    BoardArrivable.prototype.updateLocation = function (location) {
        var cell = this.cells.getCellByLocation(location);
        if (!cell.canRobbed()) {
            return;
        }
        this.arrivable[location.getRow()][location.getCol()] = true;
        this.updateLocation(location.offset(coordinate_value_1["default"].LEFTDOWN));
        this.updateLocation(location.offset(coordinate_value_1["default"].DOWN));
        this.updateLocation(location.offset(coordinate_value_1["default"].RIGHTDOWN));
    };
    return BoardArrivable;
}());
exports["default"] = BoardArrivable;

},{"../../concept/coordinate/coordinate_value":3}],26:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var BoardBirths = /** @class */ (function () {
    function BoardBirths(birth) {
        if (birth === void 0) { birth = []; }
        this.birth = birth;
    }
    BoardBirths.prototype.getBirth = function (location) {
        for (var i = 0; i < this.birth.length; i++) {
            var cellBirth = this.birth[i];
            if (location.equal(cellBirth.getLocation())) {
                return cellBirth;
            }
        }
        return null;
    };
    BoardBirths.prototype.iterate = function (onBirth) {
        for (var i = 0; i < this.birth.length; i++) {
            onBirth(this.birth[i]);
        }
    };
    return BoardBirths;
}());
exports["default"] = BoardBirths;

},{}],27:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var coordinate_value_1 = require("../../concept/coordinate/coordinate_value");
var cell_empty_1 = require("../cell/cell_empty");
var once_last_1 = require("../../concept/once/once_last");
var listener_diffusion_1 = require("../../concept/listener/listener_diffusion");
var BoardCells = /** @class */ (function () {
    function BoardCells() {
        this.cellsSize = coordinate_value_1["default"].ORIGIN;
        this.onItemClear = new listener_diffusion_1["default"]();
        this.explodedListener = [];
    }
    BoardCells.prototype.itemCleared = function (item) {
        this.onItemClear.trigger(item);
    };
    BoardCells.prototype.exploded = function (cell, size, onEnd) {
        var end = new once_last_1["default"]().setCallback(onEnd);
        for (var i = 0; i < this.explodedListener.length; i++) {
            this.explodedListener[i](cell, size, end.getCallback());
        }
    };
    BoardCells.prototype.onExplode = function (listener) {
        this.explodedListener.push(listener);
    };
    BoardCells.prototype.getCells = function () {
        return this.cells;
    };
    BoardCells.prototype.setCells = function (cells) {
        var _this = this;
        if (cells == null) {
            cells = [];
        }
        this.cellsSize = BoardCells.formatCells(cells);
        this.cells = cells;
        this.iterate(function (_, cell) {
            cell.setOwner(_this);
            return true;
        });
    };
    BoardCells.prototype.iterate = function (onElement) {
        full: for (var i = 0; i < this.cellsSize.getRow(); i++) {
            for (var j = 0; j < this.cellsSize.getCol(); j++) {
                if (!onElement(new coordinate_value_1["default"](i, j), this.cells[i][j])) {
                    break full;
                }
            }
        }
    };
    BoardCells.prototype.size = function () {
        return this.cellsSize;
    };
    BoardCells.prototype.getCellByLocation = function (location) {
        if (location.getRow() >= this.cellsSize.getRow() ||
            location.getRow() < 0 ||
            location.getCol() >= this.cellsSize.getCol() ||
            location.getCol() < 0) {
            return cell_empty_1["default"].getEmpty();
        }
        return this.cells[location.getRow()][location.getCol()];
    };
    BoardCells.prototype.getLocationOfCell = function (cell) {
        for (var i = 0; i < this.cells.length; ++i) {
            for (var j = 0; j < this.cells[i].length; ++j) {
                if (this.cells[i][j] == cell) {
                    return new coordinate_value_1["default"](i, j);
                }
            }
        }
        return new coordinate_value_1["default"](0, 0);
    };
    BoardCells.formatCells = function (cells, size) {
        if (size == null) {
            var rowSize = cells.length;
            var colSize = 0;
            for (var i = 0; i < rowSize; i++) {
                var row = cells[i];
                if (row != null && row.length > colSize) {
                    colSize = row.length;
                }
            }
            size = new coordinate_value_1["default"](rowSize, colSize);
        }
        for (var i = 0; i < size.getRow(); i++) {
            var row = cells[i];
            if (row == null) {
                row = [];
                cells[i] = row;
            }
            for (var j = 0; j < size.getCol(); j++) {
                var col = row[j];
                if (col == null) {
                    row[j] = cell_empty_1["default"].getEmpty();
                }
            }
        }
        return size;
    };
    BoardCells.CHECK_NUMBER_SELF = 1;
    BoardCells.CHECK_NUMBER_OK_MINIZE = 3;
    return BoardCells;
}());
exports["default"] = BoardCells;

},{"../../concept/coordinate/coordinate_value":3,"../../concept/listener/listener_diffusion":12,"../../concept/once/once_last":15,"../cell/cell_empty":42}],28:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var board_cells_1 = require("./board_cells");
var polymerize_1 = require("../sacrifice/polymerize");
var coordinate_value_1 = require("../../concept/coordinate/coordinate_value");
var BoardCheck = /** @class */ (function () {
    function BoardCheck(cells) {
        this.cells = cells;
    }
    BoardCheck.prototype.check = function () {
        var _this = this;
        var max = null;
        var lastCellUpdateTime = 0;
        this.cells.iterate(function (location, cell) {
            var now = _this.checkPosition(location);
            if (now == null) {
                return true;
            }
            if (max == null ||
                max.getGuests().length < now.getGuests().length ||
                (max.getGuests().length == now.getGuests().length && lastCellUpdateTime < cell.getUpdateTime())) {
                max = now;
                lastCellUpdateTime = cell.getUpdateTime();
            }
            return true;
        });
        return max;
    };
    BoardCheck.prototype.checkPosition = function (location) {
        var direction = 0;
        if (!this.cells.getCellByLocation(location).getItem().canPolymerize()) {
            return null;
        }
        var guests = [];
        var vertical = this.checkPositionDirection(location, coordinate_value_1["default"].UP).concat(this.checkPositionDirection(location, coordinate_value_1["default"].DOWN));
        var horizontal = this.checkPositionDirection(location, coordinate_value_1["default"].LEFT).concat(this.checkPositionDirection(location, coordinate_value_1["default"].RIGHT));
        if (vertical.length + board_cells_1["default"].CHECK_NUMBER_SELF >= board_cells_1["default"].CHECK_NUMBER_OK_MINIZE) {
            guests = guests.concat(vertical);
            direction++;
        }
        if (horizontal.length + board_cells_1["default"].CHECK_NUMBER_SELF >= board_cells_1["default"].CHECK_NUMBER_OK_MINIZE) {
            guests = guests.concat(horizontal);
            direction++;
        }
        if (direction == 0) {
            return null;
        }
        return new polymerize_1["default"](location, guests);
    };
    BoardCheck.prototype.checkPositionDirection = function (location, direction) {
        var total = [];
        var item = this.cells.getCellByLocation(location).getItem();
        while (true) {
            var directLocation = location.offset(direction);
            if (!item.equals(this.cells.getCellByLocation(directLocation).getItem())) {
                break;
            }
            total.push(directLocation);
            location = directLocation;
        }
        return total;
    };
    return BoardCheck;
}());
exports["default"] = BoardCheck;

},{"../../concept/coordinate/coordinate_value":3,"../sacrifice/polymerize":68,"./board_cells":27}],29:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var once_first_1 = require("../../concept/once/once_first");
var listener_diffusion_1 = require("../../concept/listener/listener_diffusion");
var BoardClick = /** @class */ (function () {
    function BoardClick(cells, fall) {
        this.cells = cells;
        this.fall = fall;
        this.onClick = new listener_diffusion_1["default"]();
    }
    BoardClick.prototype.click = function (area) {
        var _this = this;
        var location = this.cells.getCellByLocation(area.getLocation());
        var success = location.beClicked(new once_first_1["default"]()
            .setCallback(function () {
            _this.onClick.trigger(success);
            _this.fall.start();
        })
            .getCallback());
    };
    return BoardClick;
}());
exports["default"] = BoardClick;

},{"../../concept/listener/listener_diffusion":12,"../../concept/once/once_first":14}],30:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var once_last_1 = require("../../concept/once/once_last");
var listener_diffusion_1 = require("../../concept/listener/listener_diffusion");
var BoardExchange = /** @class */ (function () {
    function BoardExchange(cells, fall, polymerize, check) {
        this.cells = cells;
        this.fall = fall;
        this.polymerize = polymerize;
        this.check = check;
        this.onExchange = new listener_diffusion_1["default"]();
    }
    BoardExchange.prototype.exchange = function (area) {
        var _this = this;
        var exchangeEnd = new once_last_1["default"]().setCallback(function () {
            _this.fall.start();
        });
        if (area == null || !area.isNeighbor()) {
            exchangeEnd.getCallback()();
            return;
        }
        var fromCell = this.cells.getCellByLocation(area.getFrom());
        var toCell = this.cells.getCellByLocation(area.getTo());
        var success = fromCell.exchange(toCell, area.getTo().offset(area.getFrom().negative()), function () {
            if (!success) {
                _this.onExchange.trigger(false);
                exchangeEnd.getCallback()();
                return;
            }
            var polymerize = _this.check.check();
            if (polymerize != null) {
                _this.polymerize.polymerize(polymerize, exchangeEnd.getCallback());
            }
            var fromBlock = fromCell.beExchanged(exchangeEnd.getCallback());
            var toBlock = toCell.beExchanged(exchangeEnd.getCallback());
            if (polymerize == null && !fromBlock && !toBlock) {
                _this.onExchange.trigger(false);
                fromCell.exchange(toCell, area.getTo().offset(area.getFrom().negative()), exchangeEnd.getCallback());
            }
            else {
                _this.onExchange.trigger(true);
            }
        });
    };
    return BoardExchange;
}());
exports["default"] = BoardExchange;

},{"../../concept/listener/listener_diffusion":12,"../../concept/once/once_last":15}],31:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var listener_diffusion_1 = require("../../concept/listener/listener_diffusion");
var BoardExits = /** @class */ (function () {
    function BoardExits(exit) {
        if (exit === void 0) { exit = []; }
        var _this = this;
        this.exit = exit;
        this.onItemClear = new listener_diffusion_1["default"]();
        this.iterate(function (cell) {
            cell.setOwner(_this);
            return true;
        });
    }
    BoardExits.prototype.itemCleared = function (item) {
        this.onItemClear.trigger(item);
    };
    BoardExits.prototype.getExit = function (location) {
        for (var i = 0; i < this.exit.length; i++) {
            var cellExit = this.exit[i];
            if (location.equal(cellExit.getLocation())) {
                return cellExit;
            }
        }
        return null;
    };
    BoardExits.prototype.iterate = function (onExit) {
        for (var i = 0; i < this.exit.length; i++) {
            onExit(this.exit[i]);
        }
    };
    BoardExits.prototype.exploded = function (cell, size, onEnd) {
        onEnd();
    };
    return BoardExits;
}());
exports["default"] = BoardExits;

},{"../../concept/listener/listener_diffusion":12}],32:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var explode_1 = require("../sacrifice/explode");
var once_last_1 = require("../../concept/once/once_last");
var BoardExplode = /** @class */ (function () {
    function BoardExplode(cells) {
        var _this = this;
        this.cells = cells;
        this.cells.onExplode(function (cell, size, onEnd) {
            _this.explode(cell, size, onEnd);
        });
    }
    BoardExplode.prototype.explode = function (cell, size, onEnd) {
        var point = this.cells.getLocationOfCell(cell);
        var area = new explode_1["default"](point, size);
        var guests = area.getGuests();
        var end = new once_last_1["default"]().setCallback(onEnd);
        for (var i = 0; i < guests.length; ++i) {
            this.cells.getCellByLocation(guests[i]).beExploded(end.getCallback());
        }
        this.cells.getCellByLocation(area.getOwner()).beExploded(end.getCallback());
    };
    return BoardExplode;
}());
exports["default"] = BoardExplode;

},{"../../concept/once/once_last":15,"../sacrifice/explode":67}],33:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var once_last_1 = require("../../concept/once/once_last");
var coordinate_value_1 = require("../../concept/coordinate/coordinate_value");
var listener_diffusion_1 = require("../../concept/listener/listener_diffusion");
var random_weight_1 = require("../../concept/random_weight");
var BoardFall = /** @class */ (function () {
    function BoardFall(cells, births, exits, arrivable) {
        this.cells = cells;
        this.births = births;
        this.exits = exits;
        this.arrivable = arrivable;
        this.onFallEnd = new listener_diffusion_1["default"]();
        this.onNextFallEnd = new listener_diffusion_1["default"]();
        this.plugins = [];
        this.isFalling = false;
        this.chooser = new random_weight_1["default"]().addFactor(false).addFactor(true);
    }
    BoardFall.prototype.start = function (onNextFallEnd) {
        var _this = this;
        this.onNextFallEnd.on(onNextFallEnd);
        if (this.isFalling) {
            return;
        }
        this.isFalling = true;
        this.fall(function (_) {
            _this.onNextFallEnd.trigger();
            _this.onNextFallEnd.clear();
            _this.onFallEnd.trigger();
            _this.isFalling = false;
        });
    };
    BoardFall.prototype.beforeFallEnd = function (plugin) {
        if (plugin != null) {
            this.plugins.push(plugin);
        }
    };
    BoardFall.prototype.plugin = function (onEnd) {
        var end = new once_last_1["default"]().setCallback(onEnd);
        if (this.plugins.length == 0) {
            end.getCallback()();
            return false;
        }
        for (var i = 0; i < this.plugins.length; i++) {
            if (this.plugins[i](end.getCallback())) {
                return true;
            }
        }
        return false;
    };
    BoardFall.prototype.fall = function (onEnd) {
        var _this = this;
        var isActive = false;
        var robEnd = new once_last_1["default"]();
        robEnd.setCallback(function () {
            if (isActive) {
                _this.fall(function (isChanged) {
                    isChanged = isActive || isChanged;
                    onEnd(isChanged);
                });
                return;
            }
            var pluginActive = _this.plugin(function () {
                if (pluginActive) {
                    _this.fall(onEnd);
                    return;
                }
                if (onEnd != null) {
                    onEnd(isActive);
                }
            });
        });
        this.arrivable.update();
        this.exits.iterate(function (exit) {
            var location = exit.getLocation();
            var victims = [];
            var victimLocations = [];
            _this.getVictimsByExit(location, victims, victimLocations);
            isActive = exit.rob(victims, victimLocations, robEnd.getCallback()) || isActive;
        });
        for (var i = this.cells.size().getRow() - 1; i >= 0; i--) {
            for (var j = 0; j < this.cells.size().getCol(); j++) {
                var location_1 = new coordinate_value_1["default"](i, j);
                var cell = this.cells.getCellByLocation(location_1);
                if (cell.isEmpty()) {
                    continue;
                }
                var victims = [];
                var victimLocations = [];
                this.getVictimsByLocation(location_1, victims, victimLocations);
                isActive =
                    this.cells.getCellByLocation(location_1).rob(victims, victimLocations, robEnd.getCallback()) ||
                        isActive;
            }
        }
    };
    BoardFall.prototype.getVictimsByExit = function (exitLocation, victims, victimLocations) {
        var cell = this.cells.getCellByLocation(exitLocation);
        if (this.arrivable.isArrivable(exitLocation) || (cell.canRobbed() && !cell.getItem().isEmpty())) {
            victims.push(cell);
            victimLocations.push(coordinate_value_1["default"].ORIGIN);
        }
    };
    BoardFall.prototype.getVictimsByLocation = function (location, victims, victimLocations) {
        var birth = this.births.getBirth(location);
        if (birth != null) {
            victims.push(birth);
            victimLocations.push(coordinate_value_1["default"].UP);
            return;
        }
        var seeds = [];
        seeds.push(coordinate_value_1["default"].UP);
        if (this.chooser.getFactor()) {
            seeds.push(coordinate_value_1["default"].LEFTUP);
            seeds.push(coordinate_value_1["default"].RIGHTUP);
        }
        else {
            seeds.push(coordinate_value_1["default"].RIGHTUP);
            seeds.push(coordinate_value_1["default"].LEFTUP);
        }
        var branchs = location.offsets(seeds);
        for (var i = 0; i < seeds.length; i++) {
            var branch = branchs[i];
            var cell = this.cells.getCellByLocation(branch);
            if (this.arrivable.isArrivable(branch) || (cell.canRobbed() && !cell.getItem().isEmpty())) {
                victims.push(cell);
                victimLocations.push(seeds[i]);
                break;
            }
        }
    };
    return BoardFall;
}());
exports["default"] = BoardFall;

},{"../../concept/coordinate/coordinate_value":3,"../../concept/listener/listener_diffusion":12,"../../concept/once/once_last":15,"../../concept/random_weight":16}],34:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var listener_diffusion_1 = require("../../concept/listener/listener_diffusion");
var BoardOn = /** @class */ (function () {
    function BoardOn(cells, exits, click, exchange, fall) {
        var _this = this;
        this.cells = cells;
        this.exits = exits;
        this.click = click;
        this.exchange = exchange;
        this.fall = fall;
        this.onStep = new listener_diffusion_1["default"]();
        this.onFallEnd = new listener_diffusion_1["default"]();
        this.onItemClear = new listener_diffusion_1["default"]();
        this.click.onClick.on(function (isSuccess) {
            if (isSuccess) {
                _this.onStep.trigger();
            }
        });
        this.exchange.onExchange.on(function (isSuccess) {
            if (isSuccess) {
                _this.onStep.trigger();
            }
        });
        this.fall.onFallEnd.on(function () { return _this.onFallEnd.trigger(); });
        this.cells.onItemClear.on(function (item) { return _this.onItemClear.trigger(item); });
        this.exits.onItemClear.on(function (item) { return _this.onItemClear.trigger(item); });
    }
    return BoardOn;
}());
exports["default"] = BoardOn;

},{"../../concept/listener/listener_diffusion":12}],35:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var once_last_1 = require("../../concept/once/once_last");
var BoardPolymerize = /** @class */ (function () {
    function BoardPolymerize(cells, scrape, fall, check) {
        var _this = this;
        this.cells = cells;
        this.scrape = scrape;
        this.fall = fall;
        this.check = check;
        this.fall.beforeFallEnd(function (onEnd) {
            var area = _this.check.check();
            if (area == null) {
                onEnd();
                return false;
            }
            _this.polymerize(area, onEnd);
            return true;
        });
    }
    BoardPolymerize.prototype.polymerize = function (area, onEnd) {
        if (area.getGuests().length == 0) {
            onEnd();
            return;
        }
        var end = new once_last_1["default"]();
        end.setCallback(onEnd);
        var guests = area.getGuests();
        for (var i = 0; i < guests.length; ++i) {
            this.cells.getCellByLocation(guests[i]).bePolymerizedAsGuest(end.getCallback());
        }
        this.cells.getCellByLocation(area.getOwner()).bePolymerizedAsOwner(guests.length + 1, end.getCallback());
        this.scrape.scrape(area.getScrape(), end.getCallback());
    };
    return BoardPolymerize;
}());
exports["default"] = BoardPolymerize;

},{"../../concept/once/once_last":15}],36:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var board_cells_1 = require("./board_cells");
var exchange_1 = require("../sacrifice/exchange");
var coordinate_value_1 = require("../../concept/coordinate/coordinate_value");
var BoardPrecheck = /** @class */ (function () {
    function BoardPrecheck(cells) {
        this.cells = cells;
    }
    BoardPrecheck.prototype.precheck = function () {
        var _this = this;
        var exchange;
        this.cells.iterate(function (location, _) {
            exchange = _this.precheckPositon(location);
            if (exchange != null) {
                return false;
            }
            return true;
        });
        return exchange;
    };
    BoardPrecheck.prototype.precheckPositon = function (location) {
        var cell = this.cells.getCellByLocation(location);
        if (!cell.canExchange()) {
            return null;
        }
        var item = cell.getItem();
        if (!item.canPolymerize()) {
            return null;
        }
        var cross = location.offsets(coordinate_value_1["default"].crossSeed());
        for (var i = 0; i < cross.length; i++) {
            if (this.precheckPositonCross(item, cross[i], location)) {
                return new exchange_1["default"](location, cross[i]);
            }
        }
        return null;
    };
    BoardPrecheck.prototype.precheckPositonCross = function (item, location, ignore) {
        var vertical = []
            .concat(this.precheckPositionDirection(item, location, ignore, coordinate_value_1["default"].UP))
            .concat(this.precheckPositionDirection(item, location, ignore, coordinate_value_1["default"].DOWN));
        var horizontal = []
            .concat(this.precheckPositionDirection(item, location, ignore, coordinate_value_1["default"].LEFT))
            .concat(this.precheckPositionDirection(item, location, ignore, coordinate_value_1["default"].RIGHT));
        return (vertical.length + board_cells_1["default"].CHECK_NUMBER_SELF >= board_cells_1["default"].CHECK_NUMBER_OK_MINIZE ||
            horizontal.length + board_cells_1["default"].CHECK_NUMBER_SELF >= board_cells_1["default"].CHECK_NUMBER_OK_MINIZE);
    };
    BoardPrecheck.prototype.precheckPositionDirection = function (item, location, ignore, direction) {
        var total = [];
        while (true) {
            var directLocation = location.offset(direction);
            if (directLocation.equal(ignore)) {
                break;
            }
            if (!item.equals(this.cells.getCellByLocation(directLocation).getItem())) {
                break;
            }
            total.push(directLocation);
            location = directLocation;
        }
        return total;
    };
    return BoardPrecheck;
}());
exports["default"] = BoardPrecheck;

},{"../../concept/coordinate/coordinate_value":3,"../sacrifice/exchange":66,"./board_cells":27}],37:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var coordinate_value_1 = require("../../concept/coordinate/coordinate_value");
var puzzle_1 = require("../../render/puzzle");
var listener_diffusion_1 = require("../../concept/listener/listener_diffusion");
var BoardPuzzle = /** @class */ (function (_super) {
    __extends(BoardPuzzle, _super);
    function BoardPuzzle() {
        var _this = _super.call(this) || this;
        _this.isHold = false;
        _this.isHoldActive = false;
        _this.lastClickTimeStamp = 0;
        _this.onBoardExchange = new listener_diffusion_1["default"]();
        _this.onBoardClick = new listener_diffusion_1["default"]();
        _this.onMouseDown(function (location) {
            location = location.floor();
            _this.startLocation = location;
            _this.isHold = true;
            _this.isHoldActive = true;
            return false;
        });
        _this.onMouseUp(function (location) {
            location = location.floor();
            var now = Date.now();
            if (_this.isHold && _this.isHoldActive && _this.startLocation.equal(location)) {
                if (_this.lastClickLocation != null &&
                    _this.lastClickLocation.equal(location) &&
                    _this.lastClickTimeStamp + BoardPuzzle.MaxClickTimeout > now) {
                    _this.onBoardClick.trigger(location);
                    _this.lastClickLocation = null;
                    _this.lastClickTimeStamp = 0;
                }
                else {
                    _this.lastClickLocation = location;
                    _this.lastClickTimeStamp = now;
                }
            }
            _this.isHoldActive = false;
            _this.isHold = false;
            _this.startLocation = null;
            return false;
        });
        _this.onMouseMove(function (location) {
            location = location.floor();
            if (_this.isHold && _this.isHoldActive && !_this.startLocation.equal(location)) {
                _this.onBoardExchange.trigger(_this.startLocation, BoardPuzzle.getNeighbor(_this.startLocation, location));
                _this.isHoldActive = false;
            }
            return false;
        });
        return _this;
    }
    BoardPuzzle.getNeighbor = function (origin, direct) {
        if (origin.isNeighbor(direct)) {
            return direct;
        }
        var neighbors = [
            origin.offset(coordinate_value_1["default"].LEFT),
            origin.offset(coordinate_value_1["default"].RIGHT),
            origin.offset(coordinate_value_1["default"].UP),
            origin.offset(coordinate_value_1["default"].DOWN),
        ];
        var minDistance = Number.MAX_VALUE;
        var minNeighbor;
        for (var i = 0; i < neighbors.length; i++) {
            var neighbor = neighbors[i];
            var distance = neighbor.distance(direct);
            if (distance < minDistance) {
                minDistance = distance;
                minNeighbor = neighbor;
            }
        }
        return minNeighbor;
    };
    BoardPuzzle.MaxClickTimeout = 1000;
    return BoardPuzzle;
}(puzzle_1["default"]));
exports["default"] = BoardPuzzle;

},{"../../concept/coordinate/coordinate_value":3,"../../concept/listener/listener_diffusion":12,"../../render/puzzle":85}],38:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var once_last_1 = require("../../concept/once/once_last");
var BoardScrape = /** @class */ (function () {
    function BoardScrape(cells) {
        this.cells = cells;
    }
    BoardScrape.prototype.scrape = function (area, onEnd) {
        var end = new once_last_1["default"]();
        end.setCallback(onEnd);
        var goals = area.getGoals();
        for (var i = 0; i < goals.length; ++i) {
            this.cells.getCellByLocation(goals[i]).beScraped(end.getCallback());
        }
    };
    return BoardScrape;
}());
exports["default"] = BoardScrape;

},{"../../concept/once/once_last":15}],39:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var cell_empty_1 = require("./cell_empty");
var puzzle_1 = require("../../render/puzzle");
var atom_image_1 = require("../../render/atom/atom_image");
var coordinate_value_1 = require("../../concept/coordinate/coordinate_value");
var locus_1 = require("../../concept/coordinate/locus");
var event_move_1 = require("../../concept/coordinate/event/event_move");
var event_location_setter_1 = require("../../concept/coordinate/event/event_location_setter");
var item_empty_1 = require("../item/prop/item_empty");
var CellAdapter = /** @class */ (function () {
    function CellAdapter() {
        this.updateTime = 0;
        this.puzzle = new puzzle_1["default"]();
        this.puzzle.setSize(CellAdapter.RENDER_SIZE);
        this.atom = new atom_image_1["default"](new locus_1["default"](this.getBackgroundImageId()), new locus_1["default"](CellAdapter.RENDER_SIZE));
        this.puzzle.addAtom(this.atom, new locus_1["default"](coordinate_value_1["default"].ORIGIN), 0);
    }
    CellAdapter.prototype.isEmpty = function () {
        return false;
    };
    CellAdapter.prototype.setOwner = function (owner) {
        this.owner = owner;
    };
    CellAdapter.prototype.renderSaveBack = function (where, when) {
        var fromSetter = new event_location_setter_1["default"](where);
        this.itemLocus.setEvent(fromSetter);
        var move = new event_move_1["default"](coordinate_value_1["default"].ORIGIN, when, false, function (from, to, timeCost, relativeTime) { return from.offsetTo(to, relativeTime / timeCost); });
        this.itemLocus.setEvent(move);
    };
    CellAdapter.prototype.getItem = function () {
        if (this.item == null) {
            return item_empty_1["default"].getEmpty();
        }
        return this.item;
    };
    CellAdapter.prototype.popItem = function () {
        this.timeUpdate();
        if (this.item == null) {
            return item_empty_1["default"].getEmpty();
        }
        var item = this.item;
        this.puzzle.removeChild(item.getPuzzle());
        this.item.setOwner(null);
        this.item = null;
        this.itemLocus = null;
        return item;
    };
    CellAdapter.prototype.setItem = function (item) {
        this.timeUpdate();
        this.itemLocus = new locus_1["default"](coordinate_value_1["default"].ORIGIN);
        this.getPuzzle().addChild(item.getPuzzle(), this.itemLocus, CellAdapter.PUZZLE_ITEM_Z_INDEX);
        this.item = item;
        if (item != null) {
            this.item.setOwner(this);
        }
    };
    CellAdapter.prototype.itemCleared = function (item) {
        if (item == this.item) {
            this.timeUpdate();
            this.item = null;
            this.itemLocus = null;
            if (this.owner != null) {
                this.owner.itemCleared(item);
            }
        }
    };
    CellAdapter.prototype.itemClearedAnimationEnd = function (item) {
        this.puzzle.removeChild(item.getPuzzle());
    };
    CellAdapter.prototype.itemCreated = function (item) { };
    CellAdapter.prototype.itemCreatedAnimationEnd = function (item) { };
    CellAdapter.prototype.bePolymerizedAsOwner = function (size, onEnd) {
        this.getItem().bePolymerizedAsOwner(size, onEnd);
    };
    CellAdapter.prototype.bePolymerizedAsGuest = function (onEnd) {
        this.getItem().bePolymerizedAsGuest(onEnd);
    };
    CellAdapter.prototype.beExploded = function (onEnd) {
        this.getItem().beExploded(onEnd);
    };
    CellAdapter.prototype.beScraped = function (onEnd) {
        this.getItem().beScraped(onEnd);
    };
    CellAdapter.prototype.beClicked = function (onEnd) {
        return this.getItem().beClicked(onEnd);
    };
    CellAdapter.prototype.beExchanged = function (onEnd) {
        return this.getItem().beExchanged(onEnd);
    };
    CellAdapter.prototype.rob = function (victims, victimLocations, onEnd) {
        if (!this.getItem().isEmpty()) {
            onEnd();
            return false;
        }
        var validVictim = cell_empty_1["default"].getEmpty();
        var validVictimLocation;
        for (var i = 0; i < victims.length; i++) {
            var victim = victims[i];
            if (victim.canRobbed() && !victim.getItem().isEmpty()) {
                validVictim = victim;
                validVictimLocation = victimLocations[i];
                break;
            }
        }
        if (validVictim.isEmpty()) {
            onEnd();
            return false;
        }
        var victimItem = validVictim.popItem();
        if (victimItem.isEmpty()) {
            onEnd();
            return false;
        }
        this.setItem(victimItem);
        this.renderSaveBack(validVictimLocation, CellAdapter.ROB_SAVE_BACK_TIME_COST);
        setTimeout(function () {
            onEnd();
        }, CellAdapter.ROB_SAVE_BACK_TIME_COST);
        return true;
    };
    CellAdapter.prototype.exchange = function (to, offset, onEnd) {
        if (!this.canExchange() || !to.canExchange()) {
            onEnd();
            return false;
        }
        var from = this;
        var fromItem = from.popItem();
        var toItem = to.popItem();
        from.setItem(toItem);
        to.setItem(fromItem);
        from.renderSaveBack(offset, CellAdapter.EXCHANGE_SAVE_BACK_TIME_COST);
        to.renderSaveBack(offset.negative(), CellAdapter.EXCHANGE_SAVE_BACK_TIME_COST);
        setTimeout(onEnd, CellAdapter.EXCHANGE_SAVE_BACK_TIME_COST);
        return true;
    };
    CellAdapter.prototype.exploded = function (size, onEnd) {
        if (this.owner != null) {
            this.owner.exploded(this, size, onEnd);
        }
        else {
            onEnd();
        }
    };
    CellAdapter.prototype.getUpdateTime = function () {
        return this.updateTime;
    };
    CellAdapter.prototype.timeUpdate = function () {
        this.updateTime = Date.now();
    };
    CellAdapter.prototype.resizePuzzle = function (size) { };
    CellAdapter.prototype.getPuzzle = function () {
        return this.puzzle;
    };
    CellAdapter.RENDER_SIZE = coordinate_value_1["default"].UNIT;
    CellAdapter.PUZZLE_ITEM_Z_INDEX = 10;
    CellAdapter.ROB_SAVE_BACK_TIME_COST = 120;
    CellAdapter.EXCHANGE_SAVE_BACK_TIME_COST = 200;
    return CellAdapter;
}());
exports["default"] = CellAdapter;

},{"../../concept/coordinate/coordinate_value":3,"../../concept/coordinate/event/event_location_setter":6,"../../concept/coordinate/event/event_move":7,"../../concept/coordinate/locus":8,"../../render/atom/atom_image":83,"../../render/puzzle":85,"../item/prop/item_empty":63,"./cell_empty":42}],40:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var CellBirth = /** @class */ (function () {
    function CellBirth() {
    }
    CellBirth.prototype.isEmpty = function () {
        return false;
    };
    CellBirth.prototype.setOwner = function (owner) { };
    CellBirth.prototype.setBirth = function (birth, location) {
        this.birth = birth;
        this.location = location;
    };
    CellBirth.prototype.getLocation = function () {
        return this.location;
    };
    CellBirth.prototype.getItem = function () {
        return this.birth.getItem();
    };
    CellBirth.prototype.popItem = function () {
        return this.birth.popItem();
    };
    CellBirth.prototype.setItem = function (item) { };
    CellBirth.prototype.canRobbed = function () {
        return true;
    };
    CellBirth.prototype.canExchange = function () {
        return false;
    };
    CellBirth.prototype.bePolymerizedAsOwner = function (size, onEnd) {
        onEnd();
    };
    CellBirth.prototype.bePolymerizedAsGuest = function (onEnd) {
        onEnd();
    };
    CellBirth.prototype.beExploded = function (onEnd) {
        onEnd();
    };
    CellBirth.prototype.beScraped = function (onEnd) {
        onEnd();
    };
    CellBirth.prototype.beClicked = function (onEnd) {
        onEnd();
        return false;
    };
    CellBirth.prototype.beExchanged = function (onEnd) {
        onEnd();
        return false;
    };
    CellBirth.prototype.rob = function (victims, offsets, onEnd) {
        onEnd();
        return false;
    };
    CellBirth.prototype.exchange = function (to, offset, onEnd) {
        onEnd();
        return false;
    };
    CellBirth.prototype.exploded = function (size, onEnd) {
        onEnd();
    };
    CellBirth.prototype.itemCleared = function (item) { };
    CellBirth.prototype.itemClearedAnimationEnd = function (item) { };
    CellBirth.prototype.itemCreated = function (item) { };
    CellBirth.prototype.itemCreatedAnimationEnd = function (item) { };
    CellBirth.prototype.resizePuzzle = function (size) { };
    CellBirth.prototype.getPuzzle = function () {
        return null;
    };
    CellBirth.prototype.renderSaveBack = function (where, when) { };
    CellBirth.prototype.getUpdateTime = function () {
        return 0;
    };
    return CellBirth;
}());
exports["default"] = CellBirth;

},{}],41:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var cell_land_1 = require("./cell_land");
var cell_water_1 = require("./cell_water");
var once_last_1 = require("../../concept/once/once_last");
var CellCreator = /** @class */ (function () {
    function CellCreator() {
    }
    CellCreator.LoadStaticResource = function (render, onSuccess, onError) {
        var success = new once_last_1["default"]();
        success.setCallback(onSuccess);
        cell_land_1["default"].LoadStaticResource(render, success.getCallback(), onError);
        cell_water_1["default"].LoadStaticResource(render, success.getCallback(), onError);
    };
    return CellCreator;
}());
exports["default"] = CellCreator;

},{"../../concept/once/once_last":15,"./cell_land":43,"./cell_water":44}],42:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var item_empty_1 = require("../item/prop/item_empty");
var CellEmpty = /** @class */ (function () {
    function CellEmpty() {
    }
    CellEmpty.prototype.isEmpty = function () {
        return true;
    };
    CellEmpty.prototype.getItem = function () {
        return item_empty_1["default"].getEmpty();
    };
    CellEmpty.prototype.popItem = function () {
        return item_empty_1["default"].getEmpty();
    };
    CellEmpty.prototype.setItem = function (item) { };
    CellEmpty.prototype.setOwner = function (owner) { };
    CellEmpty.getEmpty = function () {
        return CellEmpty.instance;
    };
    CellEmpty.prototype.canRobbed = function () {
        return false;
    };
    CellEmpty.prototype.canExchange = function () {
        return false;
    };
    CellEmpty.prototype.exchange = function (to, offset, onEnd) {
        onEnd();
        return false;
    };
    CellEmpty.prototype.rob = function (victims, offsets, onEnd) {
        onEnd();
        return false;
    };
    CellEmpty.prototype.exploded = function (size, onEnd) {
        onEnd();
    };
    CellEmpty.prototype.bePolymerizedAsOwner = function (size, onEnd) {
        onEnd();
    };
    CellEmpty.prototype.bePolymerizedAsGuest = function (onEnd) {
        onEnd();
    };
    CellEmpty.prototype.beExploded = function (onEnd) {
        onEnd();
    };
    CellEmpty.prototype.beScraped = function (onEnd) {
        onEnd();
    };
    CellEmpty.prototype.beClicked = function (onEnd) {
        onEnd();
        return false;
    };
    CellEmpty.prototype.beExchanged = function (onEnd) {
        onEnd();
        return false;
    };
    CellEmpty.prototype.itemCleared = function (item) { };
    CellEmpty.prototype.itemClearedAnimationEnd = function (item) { };
    CellEmpty.prototype.itemCreated = function (item) { };
    CellEmpty.prototype.itemCreatedAnimationEnd = function (item) { };
    CellEmpty.prototype.resizePuzzle = function (size) { };
    CellEmpty.prototype.getPuzzle = function () {
        return null;
    };
    CellEmpty.prototype.renderSaveBack = function (where, when) { };
    CellEmpty.prototype.getUpdateTime = function () {
        return 0;
    };
    CellEmpty.instance = new CellEmpty();
    return CellEmpty;
}());
exports["default"] = CellEmpty;

},{"../item/prop/item_empty":63}],43:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var cell_adapter_1 = require("./cell_adapter");
var CellLand = /** @class */ (function (_super) {
    __extends(CellLand, _super);
    function CellLand() {
        return _super.call(this) || this;
    }
    CellLand.prototype.canRobbed = function () {
        return true;
    };
    CellLand.prototype.canExchange = function () {
        return true;
    };
    CellLand.LoadStaticResource = function (render, onSuccess, onError) {
        CellLand.backgroundImageId = render.registeredImage(CellLand.backgroundImagePath, onSuccess, onError);
    };
    CellLand.prototype.getBackgroundImageId = function () {
        return CellLand.backgroundImageId;
    };
    CellLand.backgroundImagePath = "/cell_land.png";
    return CellLand;
}(cell_adapter_1["default"]));
exports["default"] = CellLand;

},{"./cell_adapter":39}],44:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var cell_adapter_1 = require("./cell_adapter");
var CellWater = /** @class */ (function (_super) {
    __extends(CellWater, _super);
    function CellWater() {
        return _super.call(this) || this;
    }
    CellWater.prototype.canRobbed = function () {
        return false;
    };
    CellWater.prototype.canExchange = function () {
        return false;
    };
    CellWater.LoadStaticResource = function (render, onSuccess, onError) {
        CellWater.backgroundImageId = render.registeredImage(CellWater.backgroundImagePath, onSuccess, onError);
    };
    CellWater.prototype.getBackgroundImageId = function () {
        return CellWater.backgroundImageId;
    };
    CellWater.backgroundImagePath = "/cell_water.png";
    return CellWater;
}(cell_adapter_1["default"]));
exports["default"] = CellWater;

},{"./cell_adapter":39}],45:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var locus_1 = require("../../concept/coordinate/locus");
var coordinate_value_1 = require("../../concept/coordinate/coordinate_value");
var color_1 = require("../../concept/style/color");
var font_1 = require("../../concept/style/font");
var listener_diffusion_1 = require("../../concept/listener/listener_diffusion");
var atom_string_1 = require("../../render/atom/atom_string");
var puzzle_1 = require("../../render/puzzle");
var GoalAdapter = /** @class */ (function () {
    function GoalAdapter() {
        this.color = new color_1["default"](0, 0, 0);
        this.font = new font_1["default"]().setSize(0.3).setAlign(font_1["default"].ALIGN_CENTER);
        this.onSuccess = new listener_diffusion_1["default"]();
        this.puzzle = new puzzle_1["default"]();
        this.puzzle.setSize(coordinate_value_1["default"].UNIT);
    }
    GoalAdapter.prototype.initImage = function (image) {
        this.puzzle.addChild(image.getPuzzle(), new locus_1["default"](GoalAdapter.PUZZLE_IMAGE_ID_LOCATION), GoalAdapter.PUZZLE_IMAGE_ID_Z_INDEX);
    };
    GoalAdapter.prototype.initStep = function (steps) {
        this.stepLocus = new locus_1["default"](steps);
        this.puzzle.addAtom(new atom_string_1["default"](this.stepLocus, new locus_1["default"](this.color), new locus_1["default"](this.font)), new locus_1["default"](GoalAdapter.PUZZLE_STEPS_LOCATION), GoalAdapter.PUZZLE_STEPS_Z_INDEX);
    };
    GoalAdapter.prototype.resizePuzzle = function (size) { };
    GoalAdapter.prototype.getPuzzle = function () {
        return this.puzzle;
    };
    GoalAdapter.PUZZLE_IMAGE_ID_Z_INDEX = 1;
    GoalAdapter.PUZZLE_STEPS_Z_INDEX = 2;
    GoalAdapter.PUZZLE_IMAGE_ID_LOCATION = coordinate_value_1["default"].ORIGIN;
    GoalAdapter.PUZZLE_STEPS_LOCATION = new coordinate_value_1["default"](0.8, 0.8);
    return GoalAdapter;
}());
exports["default"] = GoalAdapter;

},{"../../concept/coordinate/coordinate_value":3,"../../concept/coordinate/locus":8,"../../concept/listener/listener_diffusion":12,"../../concept/style/color":17,"../../concept/style/font":18,"../../render/atom/atom_string":84,"../../render/puzzle":85}],46:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var goal_adapter_1 = require("./goal_adapter");
var GoalBoardOn = /** @class */ (function (_super) {
    __extends(GoalBoardOn, _super);
    function GoalBoardOn(on) {
        var _this = _super.call(this) || this;
        _this.on = on;
        return _this;
    }
    return GoalBoardOn;
}(goal_adapter_1["default"]));
exports["default"] = GoalBoardOn;

},{"./goal_adapter":45}],47:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var goal_board_on_1 = require("./goal_board_on");
var event_move_1 = require("../../concept/coordinate/event/event_move");
var GoalItemCleared = /** @class */ (function (_super) {
    __extends(GoalItemCleared, _super);
    function GoalItemCleared(on, item, steps) {
        var _this = _super.call(this, on) || this;
        _this.item = item;
        _this.steps = steps;
        _this.initImage(_this.item);
        _this.initStep(steps);
        _this.on.onItemClear.on(function (cleared) {
            if (_this.item.equals(cleared)) {
                _this.stepsMinus();
            }
        });
        return _this;
    }
    GoalItemCleared.prototype.getSteps = function () {
        return this.steps;
    };
    GoalItemCleared.prototype.stepsMinus = function () {
        if (this.steps == 0) {
            return;
        }
        this.steps--;
        this.stepLocus.setEvent(new event_move_1["default"](this.steps, GoalItemCleared.STEP_MINUS_TIME_COST, false, function (from, to, timeCost, relativeTime) { return Math.floor(((to - from) * relativeTime) / timeCost + from); }));
        if (this.isSuccess()) {
            this.onSuccess.trigger();
        }
    };
    GoalItemCleared.prototype.isSuccess = function () {
        return this.steps == 0;
    };
    GoalItemCleared.STEP_MINUS_TIME_COST = 300;
    return GoalItemCleared;
}(goal_board_on_1["default"]));
exports["default"] = GoalItemCleared;

},{"../../concept/coordinate/event/event_move":7,"./goal_board_on":46}],48:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var item_adapter_1 = require("../item_adapter");
var ItemBoom = /** @class */ (function (_super) {
    __extends(ItemBoom, _super);
    function ItemBoom() {
        return _super.call(this) || this;
    }
    ItemBoom.prototype.canPolymerize = function () {
        return false;
    };
    ItemBoom.prototype.bePolymerizedAsOwner = function (_, onEnd) {
        onEnd();
    };
    ItemBoom.prototype.bePolymerizedAsGuest = function (onEnd) {
        onEnd();
    };
    ItemBoom.prototype.beExploded = function (onEnd) {
        this.boom(onEnd);
    };
    ItemBoom.prototype.beScraped = function (onEnd) {
        onEnd();
    };
    ItemBoom.prototype.beClicked = function (onEnd) {
        this.boom(onEnd);
        return true;
    };
    ItemBoom.prototype.beExchanged = function (onEnd) {
        this.boom(onEnd);
        return true;
    };
    ItemBoom.prototype.boom = function (onEnd) {
        var _this = this;
        var owner = this.owner;
        this.cleared(function () {
            owner.exploded(_this.getExplodeSize(), onEnd);
        });
    };
    return ItemBoom;
}(item_adapter_1["default"]));
exports["default"] = ItemBoom;

},{"../item_adapter":60}],49:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var item_boom_1 = require("./item_boom");
var ItemDynamite = /** @class */ (function (_super) {
    __extends(ItemDynamite, _super);
    function ItemDynamite() {
        return _super.call(this) || this;
    }
    ItemDynamite.prototype.getImageId = function () {
        return ItemDynamite.imageId;
    };
    ItemDynamite.LoadStaticResource = function (render, onSuccess, onError) {
        ItemDynamite.imageId = render.registeredImage(ItemDynamite.imagePath, onSuccess, onError);
    };
    ItemDynamite.prototype.equals = function (item) {
        return item instanceof ItemDynamite;
    };
    ItemDynamite.prototype.getExplodeSize = function () {
        return ItemDynamite.EXPLODE_SIZE;
    };
    ItemDynamite.imagePath = "/boom_dynamite.png";
    ItemDynamite.POLYMERIZE_SIZE = 6;
    ItemDynamite.EXPLODE_SIZE = 3.2;
    return ItemDynamite;
}(item_boom_1["default"]));
exports["default"] = ItemDynamite;

},{"./item_boom":48}],50:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var item_boom_1 = require("./item_boom");
var ItemFireCracker = /** @class */ (function (_super) {
    __extends(ItemFireCracker, _super);
    function ItemFireCracker() {
        return _super.call(this) || this;
    }
    ItemFireCracker.prototype.getImageId = function () {
        return ItemFireCracker.imageId;
    };
    ItemFireCracker.LoadStaticResource = function (render, onSuccess, onError) {
        ItemFireCracker.imageId = render.registeredImage(ItemFireCracker.imagePath, onSuccess, onError);
    };
    ItemFireCracker.prototype.equals = function (item) {
        return item instanceof ItemFireCracker;
    };
    ItemFireCracker.prototype.getExplodeSize = function () {
        return ItemFireCracker.EXPLODE_SIZE;
    };
    ItemFireCracker.imagePath = "/boom_firecracker.png";
    ItemFireCracker.POLYMERIZE_SIZE = 4;
    ItemFireCracker.EXPLODE_SIZE = 1;
    return ItemFireCracker;
}(item_boom_1["default"]));
exports["default"] = ItemFireCracker;

},{"./item_boom":48}],51:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var item_boom_1 = require("./item_boom");
var ItemGrenade = /** @class */ (function (_super) {
    __extends(ItemGrenade, _super);
    function ItemGrenade() {
        return _super.call(this) || this;
    }
    ItemGrenade.prototype.getImageId = function () {
        return ItemGrenade.imageId;
    };
    ItemGrenade.LoadStaticResource = function (render, onSuccess, onError) {
        ItemGrenade.imageId = render.registeredImage(ItemGrenade.imagePath, onSuccess, onError);
    };
    ItemGrenade.prototype.equals = function (item) {
        return item instanceof ItemGrenade;
    };
    ItemGrenade.prototype.getExplodeSize = function () {
        return ItemGrenade.EXPLODE_SIZE;
    };
    ItemGrenade.imagePath = "/boom_grenade.png";
    ItemGrenade.POLYMERIZE_SIZE = 5;
    ItemGrenade.EXPLODE_SIZE = 2.5;
    return ItemGrenade;
}(item_boom_1["default"]));
exports["default"] = ItemGrenade;

},{"./item_boom":48}],52:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var item_boom_1 = require("./item_boom");
var ItemTrotyl = /** @class */ (function (_super) {
    __extends(ItemTrotyl, _super);
    function ItemTrotyl() {
        return _super.call(this) || this;
    }
    ItemTrotyl.prototype.getImageId = function () {
        return ItemTrotyl.imageId;
    };
    ItemTrotyl.LoadStaticResource = function (render, onSuccess, onError) {
        ItemTrotyl.imageId = render.registeredImage(ItemTrotyl.imagePath, onSuccess, onError);
    };
    ItemTrotyl.prototype.equals = function (item) {
        return item instanceof ItemTrotyl;
    };
    ItemTrotyl.prototype.getExplodeSize = function () {
        return ItemTrotyl.EXPLODE_SIZE;
    };
    ItemTrotyl.imagePath = "/boom_trotyl.png";
    ItemTrotyl.POLYMERIZE_SIZE = 7;
    ItemTrotyl.EXPLODE_SIZE = 4.2;
    return ItemTrotyl;
}(item_boom_1["default"]));
exports["default"] = ItemTrotyl;

},{"./item_boom":48}],53:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var item_eliminate_1 = require("./item_eliminate");
var ItemApple = /** @class */ (function (_super) {
    __extends(ItemApple, _super);
    function ItemApple() {
        return _super.call(this) || this;
    }
    ItemApple.prototype.getImageId = function () {
        return ItemApple.imageId;
    };
    ItemApple.LoadStaticResource = function (render, onSuccess, onError) {
        ItemApple.imageId = render.registeredImage(ItemApple.imagePath, onSuccess, onError);
    };
    ItemApple.prototype.equals = function (item) {
        return item instanceof ItemApple;
    };
    ItemApple.imagePath = "/apple.png";
    return ItemApple;
}(item_eliminate_1["default"]));
exports["default"] = ItemApple;

},{"./item_eliminate":55}],54:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var item_eliminate_1 = require("./item_eliminate");
var ItemBlueBerry = /** @class */ (function (_super) {
    __extends(ItemBlueBerry, _super);
    function ItemBlueBerry() {
        return _super.call(this) || this;
    }
    ItemBlueBerry.prototype.getImageId = function () {
        return ItemBlueBerry.imageId;
    };
    ItemBlueBerry.LoadStaticResource = function (render, onSuccess, onError) {
        ItemBlueBerry.imageId = render.registeredImage(ItemBlueBerry.imagePath, onSuccess, onError);
    };
    ItemBlueBerry.prototype.equals = function (item) {
        return item instanceof ItemBlueBerry;
    };
    ItemBlueBerry.imagePath = "/blueberry.png";
    return ItemBlueBerry;
}(item_eliminate_1["default"]));
exports["default"] = ItemBlueBerry;

},{"./item_eliminate":55}],55:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var item_adapter_1 = require("../item_adapter");
var item_creator_1 = require("../item_creator");
var ItemEliminate = /** @class */ (function (_super) {
    __extends(ItemEliminate, _super);
    function ItemEliminate() {
        return _super.call(this) || this;
    }
    ItemEliminate.prototype.canPolymerize = function () {
        return true;
    };
    ItemEliminate.prototype.bePolymerizedAsOwner = function (size, onEnd) {
        var owner = this.owner;
        this.cleared(function () {
            var boom = item_creator_1["default"].createBoom(size);
            if (boom != null) {
                boom.created(function () { });
                owner.setItem(boom);
            }
            onEnd();
        });
    };
    ItemEliminate.prototype.bePolymerizedAsGuest = function (onEnd) {
        this.cleared(onEnd);
    };
    ItemEliminate.prototype.beExploded = function (onEnd) {
        this.cleared(onEnd);
    };
    ItemEliminate.prototype.beScraped = function (onEnd) {
        onEnd();
    };
    ItemEliminate.prototype.beClicked = function (onEnd) {
        onEnd();
        return false;
    };
    ItemEliminate.prototype.beExchanged = function (onEnd) {
        onEnd();
        return false;
    };
    ItemEliminate.BOOM_GENERATE_RADIX = 3;
    return ItemEliminate;
}(item_adapter_1["default"]));
exports["default"] = ItemEliminate;

},{"../item_adapter":60,"../item_creator":61}],56:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var item_eliminate_1 = require("./item_eliminate");
var ItemFlower = /** @class */ (function (_super) {
    __extends(ItemFlower, _super);
    function ItemFlower() {
        return _super.call(this) || this;
    }
    ItemFlower.prototype.getImageId = function () {
        return ItemFlower.imageId;
    };
    ItemFlower.LoadStaticResource = function (render, onSuccess, onError) {
        ItemFlower.imageId = render.registeredImage(ItemFlower.imagePath, onSuccess, onError);
    };
    ItemFlower.prototype.equals = function (item) {
        return item instanceof ItemFlower;
    };
    ItemFlower.imagePath = "/flower.png";
    return ItemFlower;
}(item_eliminate_1["default"]));
exports["default"] = ItemFlower;

},{"./item_eliminate":55}],57:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var item_eliminate_1 = require("./item_eliminate");
var ItemLeaf = /** @class */ (function (_super) {
    __extends(ItemLeaf, _super);
    function ItemLeaf() {
        return _super.call(this) || this;
    }
    ItemLeaf.prototype.getImageId = function () {
        return ItemLeaf.imageId;
    };
    ItemLeaf.LoadStaticResource = function (render, onSuccess, onError) {
        ItemLeaf.imageId = render.registeredImage(ItemLeaf.imagePath, onSuccess, onError);
    };
    ItemLeaf.prototype.equals = function (item) {
        return item instanceof ItemLeaf;
    };
    ItemLeaf.imagePath = "/leaf.png";
    return ItemLeaf;
}(item_eliminate_1["default"]));
exports["default"] = ItemLeaf;

},{"./item_eliminate":55}],58:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var item_eliminate_1 = require("./item_eliminate");
var ItemPear = /** @class */ (function (_super) {
    __extends(ItemPear, _super);
    function ItemPear() {
        return _super.call(this) || this;
    }
    ItemPear.prototype.getImageId = function () {
        return ItemPear.imageId;
    };
    ItemPear.LoadStaticResource = function (render, onSuccess, onError) {
        ItemPear.imageId = render.registeredImage(ItemPear.imagePath, onSuccess, onError);
    };
    ItemPear.prototype.equals = function (item) {
        return item instanceof ItemPear;
    };
    ItemPear.imagePath = "/pear.png";
    return ItemPear;
}(item_eliminate_1["default"]));
exports["default"] = ItemPear;

},{"./item_eliminate":55}],59:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var item_eliminate_1 = require("./item_eliminate");
var ItemWater = /** @class */ (function (_super) {
    __extends(ItemWater, _super);
    function ItemWater() {
        return _super.call(this) || this;
    }
    ItemWater.prototype.getImageId = function () {
        return ItemWater.imageId;
    };
    ItemWater.LoadStaticResource = function (render, onSuccess, onError) {
        ItemWater.imageId = render.registeredImage(ItemWater.imagePath, onSuccess, onError);
    };
    ItemWater.prototype.equals = function (item) {
        return item instanceof ItemWater;
    };
    ItemWater.imagePath = "/water.png";
    return ItemWater;
}(item_eliminate_1["default"]));
exports["default"] = ItemWater;

},{"./item_eliminate":55}],60:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var puzzle_1 = require("../../render/puzzle");
var atom_image_1 = require("../../render/atom/atom_image");
var coordinate_value_1 = require("../../concept/coordinate/coordinate_value");
var locus_1 = require("../../concept/coordinate/locus");
var event_move_1 = require("../../concept/coordinate/event/event_move");
var event_location_setter_1 = require("../../concept/coordinate/event/event_location_setter");
var ItemAdapter = /** @class */ (function () {
    function ItemAdapter() {
        this.atomImageSize = new locus_1["default"](ItemAdapter.DrawImageSize);
        this.atomImageLocation = new locus_1["default"](ItemAdapter.DrawStart);
        this.puzzle = new puzzle_1["default"]();
        this.puzzle.setSize(coordinate_value_1["default"].UNIT);
        this.atom = new atom_image_1["default"](new locus_1["default"](this.getImageId()), this.atomImageSize);
        this.puzzle.addAtom(this.atom, this.atomImageLocation, 0);
    }
    ItemAdapter.prototype.setOwner = function (owner) {
        this.owner = owner;
    };
    ItemAdapter.prototype.cleared = function (onEnd) {
        var _this = this;
        this.atomImageSize.setEvent(new event_move_1["default"](coordinate_value_1["default"].ORIGIN, ItemAdapter.ClearedTimeCost, false, function (from, to, timeCost, relativeTime) { return from.offsetTo(to, relativeTime / timeCost); }));
        this.atomImageLocation.setEvent(new event_move_1["default"](coordinate_value_1["default"].HALF, ItemAdapter.ClearedTimeCost, false, function (from, to, timeCost, relativeTime) { return from.offsetTo(to, relativeTime / timeCost); }));
        if (this.owner != null) {
            this.owner.itemCleared(this);
        }
        setTimeout(function () {
            if (_this.owner != null) {
                _this.owner.itemClearedAnimationEnd(_this);
            }
            onEnd();
        }, ItemAdapter.ClearedTimeCost);
    };
    ItemAdapter.prototype.created = function (onEnd) {
        var _this = this;
        this.atomImageSize.setEvent(new event_location_setter_1["default"](coordinate_value_1["default"].ORIGIN));
        this.atomImageLocation.setEvent(new event_location_setter_1["default"](coordinate_value_1["default"].HALF));
        this.atomImageSize.setEvent(new event_move_1["default"](ItemAdapter.DrawImageSize, ItemAdapter.CreatedTimeCost, false, function (from, to, timeCost, relativeTime) { return from.offsetTo(to, relativeTime / timeCost); }));
        this.atomImageLocation.setEvent(new event_move_1["default"](ItemAdapter.DrawStart, ItemAdapter.CreatedTimeCost, false, function (from, to, timeCost, relativeTime) { return from.offsetTo(to, relativeTime / timeCost); }));
        if (this.owner != null) {
            this.owner.itemCreated(this);
        }
        setTimeout(function () {
            if (_this.owner != null) {
                _this.owner.itemCreatedAnimationEnd(_this);
            }
            onEnd();
        }, ItemAdapter.CreatedTimeCost);
    };
    ItemAdapter.prototype.resizePuzzle = function (size) { };
    ItemAdapter.prototype.getPuzzle = function () {
        return this.puzzle;
    };
    ItemAdapter.prototype.isEmpty = function () {
        return false;
    };
    ItemAdapter.DrawCoefficient = new coordinate_value_1["default"](0.85, 0.7);
    ItemAdapter.DrawStart = coordinate_value_1["default"].UNIT.offset(ItemAdapter.DrawCoefficient.negative()).swell(coordinate_value_1["default"].HALF);
    ItemAdapter.DrawImageSize = coordinate_value_1["default"].UNIT.swell(ItemAdapter.DrawCoefficient);
    ItemAdapter.CreatedTimeCost = 150;
    ItemAdapter.ClearedTimeCost = 150;
    return ItemAdapter;
}());
exports["default"] = ItemAdapter;

},{"../../concept/coordinate/coordinate_value":3,"../../concept/coordinate/event/event_location_setter":6,"../../concept/coordinate/event/event_move":7,"../../concept/coordinate/locus":8,"../../render/atom/atom_image":83,"../../render/puzzle":85}],61:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var once_last_1 = require("../../concept/once/once_last");
var item_empty_1 = require("./prop/item_empty");
var item_drink_1 = require("./prop/item_drink");
var item_pinecone_1 = require("./prop/item_pinecone");
var item_apple_1 = require("./eliminate/item_apple");
var item_blueberry_1 = require("./eliminate/item_blueberry");
var item_flower_1 = require("./eliminate/item_flower");
var item_leaf_1 = require("./eliminate/item_leaf");
var item_pear_1 = require("./eliminate/item_pear");
var item_water_1 = require("./eliminate/item_water");
var item_dynamite_1 = require("./boom/item_dynamite");
var item_firecracker_1 = require("./boom/item_firecracker");
var item_grenade_1 = require("./boom/item_grenade");
var item_trotyl_1 = require("./boom/item_trotyl");
var ItemCreator = /** @class */ (function () {
    function ItemCreator() {
    }
    ItemCreator.createBoom = function (polymerizeSize) {
        if (polymerizeSize <= ItemCreator.BOOM_GENERATE_RADIX) {
            return null;
        }
        switch (polymerizeSize) {
            case item_firecracker_1["default"].POLYMERIZE_SIZE:
                return ItemCreator.createItem(ItemCreator.FIRECRACKER);
            case item_grenade_1["default"].POLYMERIZE_SIZE:
                return ItemCreator.createItem(ItemCreator.GRENADE);
            case item_dynamite_1["default"].POLYMERIZE_SIZE:
                return ItemCreator.createItem(ItemCreator.DYNAMITE);
            case item_trotyl_1["default"].POLYMERIZE_SIZE:
                return ItemCreator.createItem(ItemCreator.TROTYL);
            default:
                return ItemCreator.createItem(ItemCreator.TROTYL);
        }
    };
    ItemCreator.createItem = function (type) {
        switch (type) {
            case ItemCreator.EMPTY:
                return item_empty_1["default"].getEmpty();
            case ItemCreator.APPLE:
                return new item_apple_1["default"]();
            case ItemCreator.DRINK:
                return new item_drink_1["default"]();
            case ItemCreator.PINECONE:
                return new item_pinecone_1["default"]();
            case ItemCreator.BLUEBERRY:
                return new item_blueberry_1["default"]();
            case ItemCreator.FLOWER:
                return new item_flower_1["default"]();
            case ItemCreator.LEAF:
                return new item_leaf_1["default"]();
            case ItemCreator.PEAR:
                return new item_pear_1["default"]();
            case ItemCreator.WATER:
                return new item_water_1["default"]();
            case ItemCreator.DYNAMITE:
                return new item_dynamite_1["default"]();
            case ItemCreator.FIRECRACKER:
                return new item_firecracker_1["default"]();
            case ItemCreator.GRENADE:
                return new item_grenade_1["default"]();
            case ItemCreator.TROTYL:
                return new item_trotyl_1["default"]();
            default:
                return item_empty_1["default"].getEmpty();
        }
    };
    ItemCreator.LoadStaticResource = function (render, onSuccess, onError) {
        var success = new once_last_1["default"]();
        success.setCallback(onSuccess);
        item_apple_1["default"].LoadStaticResource(render, success.getCallback(), onError);
        item_drink_1["default"].LoadStaticResource(render, success.getCallback(), onError);
        item_pinecone_1["default"].LoadStaticResource(render, success.getCallback(), onError);
        item_blueberry_1["default"].LoadStaticResource(render, success.getCallback(), onError);
        item_flower_1["default"].LoadStaticResource(render, success.getCallback(), onError);
        item_leaf_1["default"].LoadStaticResource(render, success.getCallback(), onError);
        item_pear_1["default"].LoadStaticResource(render, success.getCallback(), onError);
        item_water_1["default"].LoadStaticResource(render, success.getCallback(), onError);
        item_dynamite_1["default"].LoadStaticResource(render, success.getCallback(), onError);
        item_firecracker_1["default"].LoadStaticResource(render, success.getCallback(), onError);
        item_grenade_1["default"].LoadStaticResource(render, success.getCallback(), onError);
        item_trotyl_1["default"].LoadStaticResource(render, success.getCallback(), onError);
    };
    ItemCreator.EMPTY = 0;
    ItemCreator.DRINK = 1;
    ItemCreator.PINECONE = 2;
    ItemCreator.APPLE = 100;
    ItemCreator.BLUEBERRY = 101;
    ItemCreator.FLOWER = 102;
    ItemCreator.LEAF = 103;
    ItemCreator.PEAR = 104;
    ItemCreator.WATER = 105;
    ItemCreator.DYNAMITE = 200;
    ItemCreator.FIRECRACKER = 201;
    ItemCreator.GRENADE = 202;
    ItemCreator.TROTYL = 203;
    ItemCreator.BOOM_GENERATE_RADIX = 3;
    return ItemCreator;
}());
exports["default"] = ItemCreator;

},{"../../concept/once/once_last":15,"./boom/item_dynamite":49,"./boom/item_firecracker":50,"./boom/item_grenade":51,"./boom/item_trotyl":52,"./eliminate/item_apple":53,"./eliminate/item_blueberry":54,"./eliminate/item_flower":56,"./eliminate/item_leaf":57,"./eliminate/item_pear":58,"./eliminate/item_water":59,"./prop/item_drink":62,"./prop/item_empty":63,"./prop/item_pinecone":64}],62:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var item_adapter_1 = require("../item_adapter");
var ItemDrink = /** @class */ (function (_super) {
    __extends(ItemDrink, _super);
    function ItemDrink() {
        return _super.call(this) || this;
    }
    ItemDrink.prototype.getImageId = function () {
        return ItemDrink.imageId;
    };
    ItemDrink.LoadStaticResource = function (render, onSuccess, onError) {
        ItemDrink.imageId = render.registeredImage(ItemDrink.imagePath, onSuccess, onError);
    };
    ItemDrink.prototype.equals = function (item) {
        return item instanceof ItemDrink;
    };
    ItemDrink.prototype.canPolymerize = function () {
        return false;
    };
    ItemDrink.prototype.bePolymerizedAsOwner = function (size, onEnd) {
        onEnd();
    };
    ItemDrink.prototype.bePolymerizedAsGuest = function (onEnd) {
        onEnd();
    };
    ItemDrink.prototype.beExploded = function (onEnd) {
        onEnd();
    };
    ItemDrink.prototype.beScraped = function (onEnd) {
        onEnd();
    };
    ItemDrink.prototype.beClicked = function (onEnd) {
        onEnd();
        return false;
    };
    ItemDrink.prototype.beExchanged = function (onEnd) {
        onEnd();
        return false;
    };
    ItemDrink.imagePath = "/drink.png";
    return ItemDrink;
}(item_adapter_1["default"]));
exports["default"] = ItemDrink;

},{"../item_adapter":60}],63:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var render_adapter_1 = require("../../../render/render_adapter");
var ItemEmpty = /** @class */ (function () {
    function ItemEmpty() {
    }
    ItemEmpty.prototype.equals = function (item) {
        return false;
    };
    ItemEmpty.getEmpty = function () {
        return ItemEmpty.instance;
    };
    ItemEmpty.prototype.canPolymerize = function () {
        return false;
    };
    ItemEmpty.prototype.moved = function (offset, timeCost) { };
    ItemEmpty.prototype.bePolymerizedAsOwner = function (size, onEnd) {
        onEnd();
    };
    ItemEmpty.prototype.bePolymerizedAsGuest = function (onEnd) {
        onEnd();
    };
    ItemEmpty.prototype.beExploded = function (onEnd) {
        onEnd();
    };
    ItemEmpty.prototype.beScraped = function (onEnd) {
        onEnd();
    };
    ItemEmpty.prototype.beClicked = function (onEnd) {
        onEnd();
        return false;
    };
    ItemEmpty.prototype.beExchanged = function (onEnd) {
        onEnd();
        return false;
    };
    ItemEmpty.prototype.cleared = function (onEnd) {
        onEnd();
    };
    ItemEmpty.prototype.created = function (onEnd) {
        onEnd();
    };
    ItemEmpty.prototype.resizePuzzle = function (size) { };
    ItemEmpty.prototype.getPuzzle = function () {
        return null;
    };
    ItemEmpty.prototype.setOwner = function (owner) { };
    ItemEmpty.prototype.isEmpty = function () {
        return true;
    };
    ItemEmpty.prototype.getImageId = function () {
        return render_adapter_1["default"].IMAGE_ID_EMPTY;
    };
    ItemEmpty.instance = new ItemEmpty();
    return ItemEmpty;
}());
exports["default"] = ItemEmpty;

},{"../../../render/render_adapter":86}],64:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var item_adapter_1 = require("../item_adapter");
var ItemPinecone = /** @class */ (function (_super) {
    __extends(ItemPinecone, _super);
    function ItemPinecone() {
        return _super.call(this) || this;
    }
    ItemPinecone.prototype.getImageId = function () {
        return ItemPinecone.imageId;
    };
    ItemPinecone.LoadStaticResource = function (render, onSuccess, onError) {
        ItemPinecone.imageId = render.registeredImage(ItemPinecone.imagePath, onSuccess, onError);
    };
    ItemPinecone.prototype.equals = function (item) {
        return item instanceof ItemPinecone;
    };
    ItemPinecone.prototype.canPolymerize = function () {
        return false;
    };
    ItemPinecone.prototype.bePolymerizedAsOwner = function (size, onEnd) {
        onEnd();
    };
    ItemPinecone.prototype.bePolymerizedAsGuest = function (onEnd) {
        onEnd();
    };
    ItemPinecone.prototype.beExploded = function (onEnd) {
        this.cleared(onEnd);
    };
    ItemPinecone.prototype.beScraped = function (onEnd) {
        this.cleared(onEnd);
    };
    ItemPinecone.prototype.beClicked = function (onEnd) {
        onEnd();
        return false;
    };
    ItemPinecone.prototype.beExchanged = function (onEnd) {
        onEnd();
        return false;
    };
    ItemPinecone.imagePath = "/pinecone.png";
    return ItemPinecone;
}(item_adapter_1["default"]));
exports["default"] = ItemPinecone;

},{"../item_adapter":60}],65:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var sacrifice_adapter_1 = require("./sacrifice_adapter");
var Click = /** @class */ (function (_super) {
    __extends(Click, _super);
    function Click(location) {
        var _this = _super.call(this) || this;
        _this.location = location;
        return _this;
    }
    Click.prototype.getLocation = function () {
        return this.location;
    };
    return Click;
}(sacrifice_adapter_1["default"]));
exports["default"] = Click;

},{"./sacrifice_adapter":69}],66:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var sacrifice_adapter_1 = require("./sacrifice_adapter");
var Exchange = /** @class */ (function (_super) {
    __extends(Exchange, _super);
    function Exchange(from, to) {
        var _this = _super.call(this) || this;
        _this.from = from;
        _this.to = to;
        return _this;
    }
    Exchange.prototype.getFrom = function () {
        return this.from;
    };
    Exchange.prototype.getTo = function () {
        return this.to;
    };
    Exchange.prototype.isNeighbor = function () {
        return this.from.isNeighbor(this.to);
    };
    return Exchange;
}(sacrifice_adapter_1["default"]));
exports["default"] = Exchange;

},{"./sacrifice_adapter":69}],67:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var sacrifice_adapter_1 = require("./sacrifice_adapter");
var Explode = /** @class */ (function (_super) {
    __extends(Explode, _super);
    function Explode(owner, size) {
        var _this = _super.call(this) || this;
        _this.owner = owner;
        _this.guests = [];
        _this.guests = _this.owner.radiation(size);
        return _this;
    }
    Explode.prototype.getOwner = function () {
        return this.owner;
    };
    Explode.prototype.getGuests = function () {
        return this.guests;
    };
    return Explode;
}(sacrifice_adapter_1["default"]));
exports["default"] = Explode;

},{"./sacrifice_adapter":69}],68:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var scrape_1 = require("./scrape");
var sacrifice_adapter_1 = require("./sacrifice_adapter");
var Polymerize = /** @class */ (function (_super) {
    __extends(Polymerize, _super);
    function Polymerize(owner, guests) {
        var _this = _super.call(this) || this;
        _this.owner = owner;
        _this.guests = guests;
        return _this;
    }
    Polymerize.prototype.getScrape = function () {
        return new scrape_1["default"](this.guests.concat(this.owner));
    };
    Polymerize.prototype.getOwner = function () {
        return this.owner;
    };
    Polymerize.prototype.getGuests = function () {
        return this.guests;
    };
    return Polymerize;
}(sacrifice_adapter_1["default"]));
exports["default"] = Polymerize;

},{"./sacrifice_adapter":69,"./scrape":70}],69:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var SacrificeAdapter = /** @class */ (function () {
    function SacrificeAdapter() {
    }
    return SacrificeAdapter;
}());
exports["default"] = SacrificeAdapter;

},{}],70:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var coordinate_value_1 = require("../../concept/coordinate/coordinate_value");
var sacrifice_adapter_1 = require("./sacrifice_adapter");
var Scrape = /** @class */ (function (_super) {
    __extends(Scrape, _super);
    function Scrape(source) {
        var _this = _super.call(this) || this;
        _this.source = source;
        _this.goals = [];
        for (var i = 0; i < _this.source.length; ++i) {
            _this.addGoal(_this.source[i].offset(coordinate_value_1["default"].UP));
            _this.addGoal(_this.source[i].offset(coordinate_value_1["default"].DOWN));
            _this.addGoal(_this.source[i].offset(coordinate_value_1["default"].LEFT));
            _this.addGoal(_this.source[i].offset(coordinate_value_1["default"].RIGHT));
        }
        return _this;
    }
    Scrape.prototype.addGoal = function (goal) {
        if (goal.isIncluded(this.source) || goal.isIncluded(this.goals)) {
            return;
        }
        this.goals.push(goal);
    };
    Scrape.prototype.getGoals = function () {
        return this.goals;
    };
    return Scrape;
}(sacrifice_adapter_1["default"]));
exports["default"] = Scrape;

},{"../../concept/coordinate/coordinate_value":3,"./sacrifice_adapter":69}],71:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var coordinate_value_1 = require("../concept/coordinate/coordinate_value");
var locus_1 = require("../concept/coordinate/locus");
var font_1 = require("../concept/style/font");
var color_1 = require("../concept/style/color");
var once_last_1 = require("../concept/once/once_last");
var event_location_setter_1 = require("../concept/coordinate/event/event_location_setter");
var event_move_1 = require("../concept/coordinate/event/event_move");
var listener_diffusion_1 = require("../concept/listener/listener_diffusion");
var atom_string_1 = require("../render/atom/atom_string");
var puzzle_1 = require("../render/puzzle");
var Score = /** @class */ (function () {
    function Score() {
        this.color = new color_1["default"](0, 0, 0);
        this.font = new font_1["default"]().setSize(0.5).setAlign(font_1["default"].ALIGN_CENTER);
        this.step = 1;
        this.stepRender = new locus_1["default"](this.step);
        this.level = "unknown";
        this.levelRender = new locus_1["default"](this.level.toString());
        this.puzzle = new puzzle_1["default"]();
        this.goals = [];
        this.isEnd = false;
        this.onEnd = new listener_diffusion_1["default"]();
        this.onStepEnd = new listener_diffusion_1["default"]();
        this.puzzle.setSize(Score.SIZE);
        this.puzzle.addAtom(new atom_string_1["default"](this.stepRender, new locus_1["default"](this.color), new locus_1["default"](this.font)), new locus_1["default"](Score.STEP_LOCATION), Score.STEP_Z_INDEX);
        this.puzzle.addAtom(new atom_string_1["default"](this.levelRender, new locus_1["default"](this.color), new locus_1["default"](this.font)), new locus_1["default"](Score.LEVEL_LOCATION), Score.LEVEL_Z_INDEX);
    }
    Score.prototype.addGoal = function (goals) {
        var _this = this;
        this.goals = goals;
        var successEnd = new once_last_1["default"]().setCallback(function () {
            _this.end(true);
        });
        this.goals.map(function (goal, index) {
            var puzzle = goal.getPuzzle();
            _this.puzzle.addChild(puzzle, new locus_1["default"](new coordinate_value_1["default"](((Score.GOAL_LOCATION_END.getRow() - Score.GOAL_LOCATION.getRow()) / (_this.goals.length + 1)) *
                (index + 1) +
                Score.GOAL_LOCATION.getRow() -
                puzzle.size().getRow() / 2, Score.GOAL_LOCATION.getCol())), Score.GOAL_Z_INDEX);
            goal.onSuccess.on(successEnd.getCallback());
        });
    };
    Score.prototype.setOn = function (on) {
        var _this = this;
        this.on = on;
        this.on.onStep.on(function () {
            _this.stepMinus();
        });
        this.on.onFallEnd.on(function () {
            if (_this.step == 0) {
                _this.end(false);
            }
        });
    };
    Score.prototype.setLevel = function (level) {
        this.level = level;
        this.levelRender.setEvent(new event_location_setter_1["default"](this.level));
    };
    Score.prototype.setStep = function (step) {
        this.step = step;
        this.stepRender.setEvent(new event_location_setter_1["default"](this.step));
    };
    Score.prototype.stepMinus = function () {
        if (this.step == 0) {
            return;
        }
        this.step--;
        this.stepRender.setEvent(new event_location_setter_1["default"](this.step));
        if (this.step == 0) {
            this.onStepEnd.trigger();
        }
    };
    Score.prototype.stepAdd = function (newStep) {
        var _this = this;
        var finalStep = this.step + newStep;
        this.stepRender.setEvent(new event_move_1["default"](finalStep, newStep * Score.STEP_ADD_TIME_COST_PER_STEP, true, function (from, to, timecost, relativeTime) { return Math.floor(_this.step + (newStep * relativeTime) / timecost); }));
        this.step = finalStep;
    };
    Score.prototype.end = function (success) {
        if (this.isEnd) {
            return;
        }
        this.isEnd = true;
        this.onEnd.trigger(success);
    };
    Score.prototype.resizePuzzle = function (size) { };
    Score.prototype.getPuzzle = function () {
        return this.puzzle;
    };
    Score.LoadStaticResource = function (render, onSuccess, onError) {
        onSuccess();
    };
    Score.SIZE = new coordinate_value_1["default"](5, 1.5);
    Score.STEP_ADD_TIME_COST_PER_STEP = 200;
    Score.LEVEL_Z_INDEX = 1;
    Score.GOAL_Z_INDEX = 2;
    Score.STEP_Z_INDEX = 1;
    Score.LEVEL_LOCATION = new coordinate_value_1["default"](0.75, 0.75);
    Score.GOAL_LOCATION = new coordinate_value_1["default"](1, 0.25);
    Score.GOAL_LOCATION_END = new coordinate_value_1["default"](4, 0.25);
    Score.STEP_LOCATION = new coordinate_value_1["default"](4.25, 0.75);
    return Score;
}());
exports["default"] = Score;

},{"../concept/coordinate/coordinate_value":3,"../concept/coordinate/event/event_location_setter":6,"../concept/coordinate/event/event_move":7,"../concept/coordinate/locus":8,"../concept/listener/listener_diffusion":12,"../concept/once/once_last":15,"../concept/style/color":17,"../concept/style/font":18,"../render/atom/atom_string":84,"../render/puzzle":85}],72:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var message_1 = require("./message");
var level_1 = require("./level");
var level_creator_1 = require("./level_creator");
var coordinate_value_1 = require("../concept/coordinate/coordinate_value");
var locus_1 = require("../concept/coordinate/locus");
var once_last_1 = require("../concept/once/once_last");
var Game = /** @class */ (function () {
    function Game(render) {
        var _this = this;
        this.render = render;
        this.levelIndex = 1;
        this.message = new message_1["default"](this.render.getSize());
        this.render
            .getRootPuzzle()
            .addChild(this.message.getPuzzle(), new locus_1["default"](coordinate_value_1["default"].ORIGIN), Game.PUZZLE_MESSAGE_Z_INDEX);
        this.render.onResize.on(function () {
            _this.message.resizePuzzle(_this.render.getSize());
            if (_this.level != null) {
                _this.level.resizePuzzle(_this.render.getSize());
            }
        });
    }
    Game.prototype.startLevel = function (type, index, onEnd) {
        this.render.clear();
        this.level = new level_1["default"](index, this.render.getSize(), level_creator_1["default"].getLevel(type, index));
        this.render
            .getRootPuzzle()
            .addChild(this.level.getPuzzle(), new locus_1["default"](coordinate_value_1["default"].ORIGIN), Game.PUZZLE_LEVEL_Z_INDEX);
        this.level.onEnd.on(onEnd);
    };
    Game.prototype.closeLevel = function () {
        if (this.level != null) {
            this.render.getRootPuzzle().removeChild(this.level.getPuzzle());
            this.level = null;
        }
    };
    Game.prototype.start = function (onError) {
        var _this = this;
        Game.LoadStaticResource(this.render, function () {
            _this.message.init();
            _this.render.start();
            var levelEnd = function (success) {
                _this.message.setText(success ? "Congratulations!" : "Sorry!");
                _this.message.show(function () {
                    setTimeout(function () {
                        _this.message.hide(function () {
                            _this.closeLevel();
                            if (success && _this.levelIndex + 1 <= level_creator_1["default"].size()) {
                                _this.levelIndex = _this.levelIndex + 1;
                            }
                            else {
                                _this.levelIndex = 1;
                            }
                            _this.startLevel(level_creator_1["default"].TypeCommon, String(_this.levelIndex), levelEnd);
                        });
                    }, 2000);
                });
            };
            _this.startLevel(level_creator_1["default"].TypeCommon, _this.levelIndex.toString(), levelEnd);
        }, function (error) {
            onError(error);
        });
    };
    Game.prototype.close = function () {
        this.closeLevel();
        this.render.close();
    };
    Game.LoadStaticResource = function (render, onSuccess, onError) {
        var success = new once_last_1["default"]().setCallback(onSuccess);
        level_creator_1["default"].LoadStaticResource(render, success.getCallback(), onError);
        message_1["default"].LoadStaticResource(render, success.getCallback(), onError);
    };
    Game.MIN_RENDER_SIZE = new coordinate_value_1["default"](10, 16);
    Game.PUZZLE_LEVEL_Z_INDEX = 1;
    Game.PUZZLE_MESSAGE_Z_INDEX = 1000;
    return Game;
}());
exports["default"] = Game;

},{"../concept/coordinate/coordinate_value":3,"../concept/coordinate/locus":8,"../concept/once/once_last":15,"./level":73,"./level_creator":74,"./message":75}],73:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var board_1 = require("../engine/board/board");
var score_1 = require("../engine/score");
var coordinate_dynamic_1 = require("../concept/coordinate/coordinate_dynamic");
var coordinate_value_1 = require("../concept/coordinate/coordinate_value");
var locus_1 = require("../concept/coordinate/locus");
var listener_diffusion_1 = require("../concept/listener/listener_diffusion");
var puzzle_1 = require("../render/puzzle");
var atom_image_1 = require("../render/atom/atom_image");
var Level = /** @class */ (function () {
    function Level(name, size, data) {
        var _this = this;
        this.name = name;
        this.size = size;
        this.data = data;
        this.onEnd = new listener_diffusion_1["default"]();
        this.board = new board_1["default"]();
        this.board.setCells(this.data.getCells(), this.data.getBirths(), this.data.getExits());
        this.score = new score_1["default"]();
        this.score.setOn(this.board.getOn());
        this.score.setStep(this.data.getStep());
        this.score.addGoal(this.data.getGoals(this.board.getOn()));
        this.score.setLevel(this.name);
        this.score.onStepEnd.on(function () {
            _this.board.close();
        });
        this.score.onEnd.on(function (success) {
            _this.board.close();
            _this.onEnd.trigger(success);
        });
        var dynamicSize = new coordinate_dynamic_1["default"](function () { return _this.size.getRow(); }, function () { return _this.size.getCol(); });
        this.puzzle = new puzzle_1["default"]();
        this.puzzle.setSize(dynamicSize);
        this.boardLocation = new locus_1["default"](dynamicSize.offset(this.board.size().negative()).split(Level.SPLIT_HALF));
        this.scoreLocation = new locus_1["default"](new coordinate_dynamic_1["default"](function () { return (dynamicSize.getRow() - _this.score.getPuzzle().size().getRow()) / 2; }, function () { return 0; }));
        this.backgroundSize = new locus_1["default"](dynamicSize);
        this.puzzle.addAtom(new atom_image_1["default"](new locus_1["default"](Level.backgroundImageId), this.backgroundSize), new locus_1["default"](coordinate_value_1["default"].ORIGIN), Level.PUZZLE_BACKGROUND_IMAGE_Z_INDEX);
        this.puzzle.addChild(this.board.getPuzzle(), this.boardLocation, Level.PUZZLE_BOARD_Z_INDEX);
        this.puzzle.addChild(this.score.getPuzzle(), this.scoreLocation, Level.PUZZLE_SCORE_Z_INDEX);
        this.board.start();
    }
    Level.prototype.resizePuzzle = function (size) {
        this.size = size;
    };
    Level.prototype.getPuzzle = function () {
        return this.puzzle;
    };
    Level.prototype.getName = function () {
        return this.name;
    };
    Level.LoadStaticResource = function (render, onSuccess, onError) {
        Level.backgroundImageId = render.registeredImage(Level.backgroundImagePath, onSuccess, onError);
    };
    Level.PUZZLE_BOARD_Z_INDEX = 1;
    Level.PUZZLE_SCORE_Z_INDEX = 1;
    Level.PUZZLE_BACKGROUND_IMAGE_Z_INDEX = 0;
    Level.ENGINE_SIZE = new coordinate_value_1["default"](9, 12);
    Level.SPLIT_HALF = new coordinate_value_1["default"](2, 2);
    Level.backgroundImagePath = "/level_background.jpg";
    return Level;
}());
exports["default"] = Level;

},{"../concept/coordinate/coordinate_dynamic":2,"../concept/coordinate/coordinate_value":3,"../concept/coordinate/locus":8,"../concept/listener/listener_diffusion":12,"../engine/board/board":24,"../engine/score":71,"../render/atom/atom_image":83,"../render/puzzle":85}],74:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var once_last_1 = require("../concept/once/once_last");
var score_1 = require("../engine/score");
var board_1 = require("../engine/board/board");
var item_creator_1 = require("../engine/item/item_creator");
var cell_creator_1 = require("../engine/cell/cell_creator");
var level_1 = require("./level");
var level_2 = require("../level/1/level");
var level_3 = require("../level/2/level");
var level_4 = require("../level/3/level");
var level_5 = require("../level/4/level");
var LevelCreator = /** @class */ (function () {
    function LevelCreator() {
    }
    LevelCreator.LoadStaticResource = function (render, onSuccess, onError) {
        var success = new once_last_1["default"]().setCallback(onSuccess);
        item_creator_1["default"].LoadStaticResource(render, success.getCallback(), onError);
        cell_creator_1["default"].LoadStaticResource(render, success.getCallback(), onError);
        board_1["default"].LoadStaticResource(render, success.getCallback(), onError);
        score_1["default"].LoadStaticResource(render, success.getCallback(), onError);
        level_1["default"].LoadStaticResource(render, success.getCallback(), onError);
    };
    LevelCreator.size = function () {
        return LevelCreator.LevelSize;
    };
    LevelCreator.getLevel = function (type, name) {
        var level;
        switch (type) {
            case LevelCreator.TypeCommon:
                level = LevelCreator.getCommonLevel(name);
                break;
        }
        return level;
    };
    LevelCreator.getCommonLevel = function (index) {
        switch (index) {
            case "1":
                return new level_2["default"]();
            case "2":
                return new level_3["default"]();
            case "3":
                return new level_4["default"]();
            case "4":
                return new level_5["default"]();
            default:
                return null;
        }
    };
    LevelCreator.LevelSize = 4;
    LevelCreator.TypeCommon = "common";
    return LevelCreator;
}());
exports["default"] = LevelCreator;

},{"../concept/once/once_last":15,"../engine/board/board":24,"../engine/cell/cell_creator":41,"../engine/item/item_creator":61,"../engine/score":71,"../level/1/level":76,"../level/2/level":77,"../level/3/level":78,"../level/4/level":79,"./level":73}],75:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var puzzle_1 = require("../render/puzzle");
var atom_image_1 = require("../render/atom/atom_image");
var atom_string_1 = require("../render/atom/atom_string");
var font_1 = require("../concept/style/font");
var color_1 = require("../concept/style/color");
var coordinate_value_1 = require("../concept/coordinate/coordinate_value");
var coordinate_dynamic_1 = require("../concept/coordinate/coordinate_dynamic");
var locus_1 = require("../concept/coordinate/locus");
var event_move_1 = require("../concept/coordinate/event/event_move");
var event_location_setter_1 = require("../concept/coordinate/event/event_location_setter");
var Message = /** @class */ (function () {
    function Message(size) {
        var _this = this;
        this.size = size;
        this.color = new color_1["default"](255, 255, 255);
        this.font = new font_1["default"]().setSize(0.5).setAlign(font_1["default"].ALIGN_CENTER);
        this.text = "";
        this.textLocus = new locus_1["default"](this.text);
        this.puzzle = new puzzle_1["default"]();
        this.puzzle.hide();
        this.boxPuzzle = new puzzle_1["default"]();
        var dynamicSize = new coordinate_dynamic_1["default"](function () { return _this.size.getRow(); }, function () { return _this.size.getCol(); });
        this.boxSize = dynamicSize.swell(Message.ACTIVE_SIZE_COEFFICIENT);
        this.boxLocation = new coordinate_dynamic_1["default"](function () { return -_this.boxSize.getRow(); }, function () { return 0; });
        this.boxActiveLocation = new coordinate_dynamic_1["default"](function () { return (_this.size.getRow() - _this.boxSize.getRow()) / 2; }, function () { return 0; });
        this.puzzle.setSize(dynamicSize);
        this.boxPuzzle.setSize(this.boxSize);
        this.boxLocationLocus = new locus_1["default"](this.boxLocation);
        this.puzzle.addChild(this.boxPuzzle, this.boxLocationLocus, Message.BOX_Z_INDEX);
    }
    Message.prototype.resizePuzzle = function (size) {
        this.size = size;
    };
    Message.prototype.init = function () {
        this.boxPuzzle.addAtom(new atom_image_1["default"](new locus_1["default"](Message.backgroundImageId), new locus_1["default"](this.boxSize)), new locus_1["default"](coordinate_value_1["default"].ORIGIN), Message.BACKGROUND_IMAGE_Z_INDEX);
        this.boxPuzzle.addAtom(new atom_string_1["default"](this.textLocus, new locus_1["default"](this.color), new locus_1["default"](this.font)), new locus_1["default"](this.boxSize.swell(coordinate_value_1["default"].HALF)), Message.TEXT_Z_INDEX);
    };
    Message.prototype.setText = function (text) {
        this.text = text;
        this.textLocus.setEvent(new event_location_setter_1["default"](this.text));
        return this;
    };
    Message.prototype.show = function (onEnd) {
        this.boxLocationLocus.setEvent(new event_location_setter_1["default"](this.boxLocation));
        this.puzzle.show();
        this.boxLocationLocus.setEvent(new event_move_1["default"](this.boxActiveLocation, Message.SHOW_TIME_COST, false, function (from, to, timeCost, relativeTime) { return from.offsetTo(to, relativeTime / timeCost); }));
        setTimeout(function () {
            onEnd();
        }, Message.SHOW_TIME_COST);
    };
    Message.prototype.hide = function (onEnd) {
        var _this = this;
        this.boxLocationLocus.setEvent(new event_move_1["default"](this.boxLocation, Message.SHOW_TIME_COST, false, function (from, to, timeCost, relativeTime) { return from.offsetTo(to, relativeTime / timeCost); }));
        setTimeout(function () {
            _this.puzzle.hide();
            onEnd();
        }, Message.SHOW_TIME_COST);
    };
    Message.prototype.getPuzzle = function () {
        return this.puzzle;
    };
    Message.LoadStaticResource = function (render, onSuccess, onError) {
        Message.backgroundImageId = render.registeredImage(Message.backgroundImagePath, onSuccess, onError);
    };
    Message.BOX_Z_INDEX = 0;
    Message.BACKGROUND_IMAGE_Z_INDEX = 1;
    Message.TEXT_Z_INDEX = 2;
    Message.SHOW_TIME_COST = 200;
    Message.ACTIVE_SIZE_COEFFICIENT = new coordinate_value_1["default"](0.6, 1);
    Message.backgroundImagePath = "/message_background.jpg";
    return Message;
}());
exports["default"] = Message;

},{"../concept/coordinate/coordinate_dynamic":2,"../concept/coordinate/coordinate_value":3,"../concept/coordinate/event/event_location_setter":6,"../concept/coordinate/event/event_move":7,"../concept/coordinate/locus":8,"../concept/style/color":17,"../concept/style/font":18,"../render/atom/atom_image":83,"../render/atom/atom_string":84,"../render/puzzle":85}],76:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var coordinate_value_1 = require("../../concept/coordinate/coordinate_value");
var board_cells_1 = require("../../engine/board/board_cells");
var board_births_1 = require("../../engine/board/board_births");
var board_exits_1 = require("../../engine/board/board_exits");
var board_check_1 = require("../../engine/board/board_check");
var board_precheck_1 = require("../../engine/board/board_precheck");
var goal_item_cleared_1 = require("../../engine/goal/goal_item_cleared");
var birth_eliminate_1 = require("../../engine/birth/birth_eliminate");
var cell_land_1 = require("../../engine/cell/cell_land");
var cell_birth_1 = require("../../engine/cell/cell_birth");
var cell_empty_1 = require("../../engine/cell/cell_empty");
var item_creator_1 = require("../../engine/item/item_creator");
var Level = /** @class */ (function () {
    function Level() {
    }
    Level.prototype.getStep = function () {
        return Level.STEPS;
    };
    Level.prototype.getExits = function () {
        this.initExits();
        return this.exits;
    };
    Level.prototype.getBirths = function () {
        this.initBirths();
        return this.births;
    };
    Level.prototype.getCells = function () {
        this.initCells();
        return this.cells;
    };
    Level.prototype.getGoals = function (on) {
        this.initGoals(on);
        return [this.goalApple];
    };
    Level.prototype.initExits = function () {
        if (this.exits != null) {
            return;
        }
        var exitPlace = [];
        this.exits = new board_exits_1["default"](exitPlace);
    };
    Level.prototype.createBirth = function () {
        if (this.birth != null) {
            return;
        }
        this.birth = new birth_eliminate_1["default"]([item_creator_1["default"].WATER]);
    };
    Level.prototype.initBirths = function () {
        if (this.births != null) {
            return;
        }
        this.createBirth();
        var birthPlace = [];
        for (var i = 0; i < Level.Size.getCol(); i++) {
            var place = new cell_birth_1["default"]();
            place.setBirth(this.birth, new coordinate_value_1["default"](0, i));
            birthPlace.push(place);
        }
        this.births = new board_births_1["default"](birthPlace);
    };
    Level.prototype.getCellArray = function () {
        this.createBirth();
        var cells = [];
        for (var i = 0; i < Level.Size.getRow(); i++) {
            cells.push([]);
            for (var j = 0; j < Level.Size.getCol(); j++) {
                var cell = void 0;
                if ((i == 0 && j == 0) ||
                    (i == 0 && j == Level.Size.getCol() - 1) ||
                    (i == Level.Size.getRow() - 1 && j == 0) ||
                    (i == Level.Size.getRow() - 1 && j == Level.Size.getCol() - 1)) {
                    cell = cell_empty_1["default"].getEmpty();
                }
                else {
                    cell = new cell_land_1["default"]();
                    cell.setItem(this.birth.popItem());
                }
                cells[i].push(cell);
            }
        }
        return cells;
    };
    Level.prototype.initCells = function () {
        if (this.cells != null) {
            return;
        }
        var cells = new board_cells_1["default"]();
        var check = new board_check_1["default"](cells);
        var precheck = new board_precheck_1["default"](cells);
        do {
            cells.setCells(this.getCellArray());
        } while (check.check() != null || precheck.precheck() == null);
        this.cells = cells;
    };
    Level.prototype.initGoals = function (on) {
        if (this.goalApple != null) {
            return;
        }
        this.goalApple = new goal_item_cleared_1["default"](on, item_creator_1["default"].createItem(item_creator_1["default"].APPLE), Level.GOAL_APPLE_SIZE);
    };
    Level.Size = new coordinate_value_1["default"](7, 7);
    Level.STEPS = 23;
    Level.GOAL_APPLE_SIZE = 16;
    return Level;
}());
exports["default"] = Level;

},{"../../concept/coordinate/coordinate_value":3,"../../engine/birth/birth_eliminate":20,"../../engine/board/board_births":26,"../../engine/board/board_cells":27,"../../engine/board/board_check":28,"../../engine/board/board_exits":31,"../../engine/board/board_precheck":36,"../../engine/cell/cell_birth":40,"../../engine/cell/cell_empty":42,"../../engine/cell/cell_land":43,"../../engine/goal/goal_item_cleared":47,"../../engine/item/item_creator":61}],77:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var coordinate_value_1 = require("../../concept/coordinate/coordinate_value");
var board_cells_1 = require("../../engine/board/board_cells");
var board_births_1 = require("../../engine/board/board_births");
var board_exits_1 = require("../../engine/board/board_exits");
var board_check_1 = require("../../engine/board/board_check");
var board_precheck_1 = require("../../engine/board/board_precheck");
var goal_item_cleared_1 = require("../../engine/goal/goal_item_cleared");
var birth_eliminate_1 = require("../../engine/birth/birth_eliminate");
var cell_land_1 = require("../../engine/cell/cell_land");
var cell_birth_1 = require("../../engine/cell/cell_birth");
var cell_empty_1 = require("../../engine/cell/cell_empty");
var item_creator_1 = require("../../engine/item/item_creator");
var Level = /** @class */ (function () {
    function Level() {
    }
    Level.prototype.getStep = function () {
        return Level.STEPS;
    };
    Level.prototype.getExits = function () {
        this.initExits();
        return this.exits;
    };
    Level.prototype.getBirths = function () {
        this.initBirths();
        return this.births;
    };
    Level.prototype.getCells = function () {
        this.initCells();
        return this.cells;
    };
    Level.prototype.getGoals = function (on) {
        this.initGoals(on);
        return [this.goalBlueBerry];
    };
    Level.prototype.initExits = function () {
        if (this.exits != null) {
            return;
        }
        var exitPlace = [];
        this.exits = new board_exits_1["default"](exitPlace);
    };
    Level.prototype.createBirth = function () {
        if (this.birth != null) {
            return;
        }
        this.birth = new birth_eliminate_1["default"]([item_creator_1["default"].WATER]);
    };
    Level.prototype.initBirths = function () {
        if (this.births != null) {
            return;
        }
        this.createBirth();
        var birthPlace = [];
        for (var i = 0; i < Level.Size.getCol(); i++) {
            var place = new cell_birth_1["default"]();
            place.setBirth(this.birth, new coordinate_value_1["default"](0, i));
            birthPlace.push(place);
        }
        this.births = new board_births_1["default"](birthPlace);
    };
    Level.prototype.getCellArray = function () {
        this.createBirth();
        var cells = [];
        for (var i = 0; i < Level.Size.getRow(); i++) {
            cells.push([]);
            for (var j = 0; j < Level.Size.getCol(); j++) {
                var cell = void 0;
                if ((i == 0 && j == 0) ||
                    (i == 0 && j == 1) ||
                    (i == 0 && j == Level.Size.getCol() - 2) ||
                    (i == 0 && j == Level.Size.getCol() - 1) ||
                    (i == 1 && j == 0) ||
                    (i == 1 && j == Level.Size.getCol() - 1) ||
                    (i == Level.Size.getRow() - 2 && j == 0) ||
                    (i == Level.Size.getRow() - 2 && j == Level.Size.getCol() - 1) ||
                    (i == Level.Size.getRow() - 1 && j == 0) ||
                    (i == Level.Size.getRow() - 1 && j == 1) ||
                    (i == Level.Size.getRow() - 1 && j == Level.Size.getCol() - 2) ||
                    (i == Level.Size.getRow() - 1 && j == Level.Size.getCol() - 1)) {
                    cell = cell_empty_1["default"].getEmpty();
                }
                else {
                    cell = new cell_land_1["default"]();
                    cell.setItem(this.birth.popItem());
                }
                cells[i].push(cell);
            }
        }
        return cells;
    };
    Level.prototype.initCells = function () {
        if (this.cells != null) {
            return;
        }
        var cells = new board_cells_1["default"]();
        var check = new board_check_1["default"](cells);
        var precheck = new board_precheck_1["default"](cells);
        do {
            cells.setCells(this.getCellArray());
        } while (check.check() != null || precheck.precheck() == null);
        this.cells = cells;
    };
    Level.prototype.initGoals = function (on) {
        if (this.goalBlueBerry != null) {
            return;
        }
        this.goalBlueBerry = new goal_item_cleared_1["default"](on, item_creator_1["default"].createItem(item_creator_1["default"].BLUEBERRY), Level.GOAL_BLUEBERRY_SIZE);
    };
    Level.Size = new coordinate_value_1["default"](9, 9);
    Level.STEPS = 27;
    Level.GOAL_BLUEBERRY_SIZE = 27;
    return Level;
}());
exports["default"] = Level;

},{"../../concept/coordinate/coordinate_value":3,"../../engine/birth/birth_eliminate":20,"../../engine/board/board_births":26,"../../engine/board/board_cells":27,"../../engine/board/board_check":28,"../../engine/board/board_exits":31,"../../engine/board/board_precheck":36,"../../engine/cell/cell_birth":40,"../../engine/cell/cell_empty":42,"../../engine/cell/cell_land":43,"../../engine/goal/goal_item_cleared":47,"../../engine/item/item_creator":61}],78:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var coordinate_value_1 = require("../../concept/coordinate/coordinate_value");
var board_cells_1 = require("../../engine/board/board_cells");
var board_births_1 = require("../../engine/board/board_births");
var board_exits_1 = require("../../engine/board/board_exits");
var board_check_1 = require("../../engine/board/board_check");
var board_precheck_1 = require("../../engine/board/board_precheck");
var goal_item_cleared_1 = require("../../engine/goal/goal_item_cleared");
var birth_eliminate_1 = require("../../engine/birth/birth_eliminate");
var cell_land_1 = require("../../engine/cell/cell_land");
var cell_birth_1 = require("../../engine/cell/cell_birth");
var cell_empty_1 = require("../../engine/cell/cell_empty");
var item_creator_1 = require("../../engine/item/item_creator");
var Level = /** @class */ (function () {
    function Level() {
    }
    Level.prototype.getStep = function () {
        return Level.STEPS;
    };
    Level.prototype.getExits = function () {
        this.initExits();
        return this.exits;
    };
    Level.prototype.getBirths = function () {
        this.initBirths();
        return this.births;
    };
    Level.prototype.getCells = function () {
        this.initCells();
        return this.cells;
    };
    Level.prototype.getGoals = function (on) {
        this.initGoals(on);
        return [this.goalApple, this.goalLeaf];
    };
    Level.prototype.initExits = function () {
        if (this.exits != null) {
            return;
        }
        var exitPlace = [];
        this.exits = new board_exits_1["default"](exitPlace);
    };
    Level.prototype.createBirth = function () {
        if (this.birth != null) {
            return;
        }
        this.birth = new birth_eliminate_1["default"]();
    };
    Level.prototype.initBirths = function () {
        if (this.births != null) {
            return;
        }
        this.createBirth();
        var birthPlace = [];
        for (var i = 0; i < Level.Size.getCol(); i++) {
            var place = new cell_birth_1["default"]();
            if (i > 3 && i < 8) {
                place.setBirth(this.birth, new coordinate_value_1["default"](1, i));
            }
            else {
                place.setBirth(this.birth, new coordinate_value_1["default"](0, i));
            }
            birthPlace.push(place);
        }
        this.births = new board_births_1["default"](birthPlace);
    };
    Level.prototype.getCellArray = function () {
        this.createBirth();
        var cells = [];
        for (var i = 0; i < Level.Size.getRow(); i++) {
            cells.push([]);
            for (var j = 0; j < Level.Size.getCol(); j++) {
                var cell = void 0;
                if ((i == 0 && [4, 5, 6, 7].indexOf(j) >= 0) ||
                    (i == Level.Size.getRow() - 1 && [4, 5, 6, 7].indexOf(j) >= 0) ||
                    (j == 0 && [3, 4, 5].indexOf(i) >= 0) ||
                    (j == Level.Size.getCol() - 1 && [3, 4, 5].indexOf(i) >= 0)) {
                    cell = cell_empty_1["default"].getEmpty();
                }
                else {
                    cell = new cell_land_1["default"]();
                    cell.setItem(this.birth.popItem());
                }
                cells[i].push(cell);
            }
        }
        return cells;
    };
    Level.prototype.initCells = function () {
        if (this.cells != null) {
            return;
        }
        var cells = new board_cells_1["default"]();
        var check = new board_check_1["default"](cells);
        var precheck = new board_precheck_1["default"](cells);
        do {
            cells.setCells(this.getCellArray());
        } while (check.check() != null || precheck.precheck() == null);
        this.cells = cells;
    };
    Level.prototype.initGoals = function (on) {
        if (this.goalApple == null) {
            this.goalApple = new goal_item_cleared_1["default"](on, item_creator_1["default"].createItem(item_creator_1["default"].APPLE), Level.GOAL_APPLE_SIZE);
        }
        if (this.goalLeaf == null) {
            this.goalLeaf = new goal_item_cleared_1["default"](on, item_creator_1["default"].createItem(item_creator_1["default"].LEAF), Level.GOAL_LEAF_SIZE);
        }
    };
    Level.Size = new coordinate_value_1["default"](9, 12);
    Level.STEPS = 28;
    Level.GOAL_APPLE_SIZE = 30;
    Level.GOAL_LEAF_SIZE = 30;
    return Level;
}());
exports["default"] = Level;

},{"../../concept/coordinate/coordinate_value":3,"../../engine/birth/birth_eliminate":20,"../../engine/board/board_births":26,"../../engine/board/board_cells":27,"../../engine/board/board_check":28,"../../engine/board/board_exits":31,"../../engine/board/board_precheck":36,"../../engine/cell/cell_birth":40,"../../engine/cell/cell_empty":42,"../../engine/cell/cell_land":43,"../../engine/goal/goal_item_cleared":47,"../../engine/item/item_creator":61}],79:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var coordinate_value_1 = require("../../concept/coordinate/coordinate_value");
var board_cells_1 = require("../../engine/board/board_cells");
var board_births_1 = require("../../engine/board/board_births");
var board_exits_1 = require("../../engine/board/board_exits");
var board_check_1 = require("../../engine/board/board_check");
var board_precheck_1 = require("../../engine/board/board_precheck");
var goal_item_cleared_1 = require("../../engine/goal/goal_item_cleared");
var birth_eliminate_1 = require("../../engine/birth/birth_eliminate");
var cell_land_1 = require("../../engine/cell/cell_land");
var cell_birth_1 = require("../../engine/cell/cell_birth");
var cell_empty_1 = require("../../engine/cell/cell_empty");
var item_creator_1 = require("../../engine/item/item_creator");
var Level = /** @class */ (function () {
    function Level() {
    }
    Level.prototype.getStep = function () {
        return Level.STEPS;
    };
    Level.prototype.getExits = function () {
        this.initExits();
        return this.exits;
    };
    Level.prototype.getBirths = function () {
        this.initBirths();
        return this.births;
    };
    Level.prototype.getCells = function () {
        this.initCells();
        return this.cells;
    };
    Level.prototype.getGoals = function (on) {
        this.initGoals(on);
        return [this.goalBuleberry, this.goalFlower];
    };
    Level.prototype.initExits = function () {
        if (this.exits != null) {
            return;
        }
        var exitPlace = [];
        this.exits = new board_exits_1["default"](exitPlace);
    };
    Level.prototype.createBirth = function () {
        if (this.birth != null) {
            return;
        }
        this.birth = new birth_eliminate_1["default"]([item_creator_1["default"].PEAR]);
    };
    Level.prototype.initBirths = function () {
        if (this.births != null) {
            return;
        }
        this.createBirth();
        var birthPlace = [];
        for (var i = 2; i < Level.Size.getCol() - 2; i++) {
            if (i == 5 || i == 6) {
                continue;
            }
            var place = new cell_birth_1["default"]();
            place.setBirth(this.birth, new coordinate_value_1["default"](0, i));
            birthPlace.push(place);
        }
        this.births = new board_births_1["default"](birthPlace);
    };
    Level.prototype.getCellArray = function () {
        this.createBirth();
        var cells = [];
        for (var i = 0; i < Level.Size.getRow(); i++) {
            cells.push([]);
            for (var j = 0; j < Level.Size.getCol(); j++) {
                var cell = void 0;
                if (i + j < 2 || i + j > 15 || j - i > 9 || j - i < -4 || (i == 0 && (j == 5 || j == 6))) {
                    cell = cell_empty_1["default"].getEmpty();
                }
                else {
                    cell = new cell_land_1["default"]();
                    cell.setItem(this.birth.popItem());
                }
                cells[i].push(cell);
            }
        }
        return cells;
    };
    Level.prototype.initCells = function () {
        if (this.cells != null) {
            return;
        }
        var cells = new board_cells_1["default"]();
        var check = new board_check_1["default"](cells);
        var precheck = new board_precheck_1["default"](cells);
        do {
            cells.setCells(this.getCellArray());
        } while (check.check() != null || precheck.precheck() == null);
        this.cells = cells;
    };
    Level.prototype.initGoals = function (on) {
        if (this.goalBuleberry == null) {
            this.goalBuleberry = new goal_item_cleared_1["default"](on, item_creator_1["default"].createItem(item_creator_1["default"].BLUEBERRY), Level.GOAL_BLUEBERRY_SIZE);
        }
        if (this.goalFlower == null) {
            this.goalFlower = new goal_item_cleared_1["default"](on, item_creator_1["default"].createItem(item_creator_1["default"].FLOWER), Level.GOAL_FLOWER_SIZE);
        }
    };
    Level.Size = new coordinate_value_1["default"](8, 12);
    Level.STEPS = 25;
    Level.GOAL_BLUEBERRY_SIZE = 50;
    Level.GOAL_FLOWER_SIZE = 50;
    return Level;
}());
exports["default"] = Level;

},{"../../concept/coordinate/coordinate_value":3,"../../engine/birth/birth_eliminate":20,"../../engine/board/board_births":26,"../../engine/board/board_cells":27,"../../engine/board/board_check":28,"../../engine/board/board_exits":31,"../../engine/board/board_precheck":36,"../../engine/cell/cell_birth":40,"../../engine/cell/cell_empty":42,"../../engine/cell/cell_land":43,"../../engine/goal/goal_item_cleared":47,"../../engine/item/item_creator":61}],80:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var render_canvas_1 = require("../platform/canvas/render_canvas");
var game_1 = require("../game/game");
var MatchThreeGame = /** @class */ (function () {
    function MatchThreeGame() {
        var container = document.getElementById(MatchThreeGame.ContainerId);
        var render = new render_canvas_1["default"](container, game_1["default"].MIN_RENDER_SIZE, MatchThreeGame.StaticResourcePrefix);
        var main = new game_1["default"](render);
        main.start(function (error) {
            console.log(error);
        });
    }
    MatchThreeGame.ContainerId = "match_three_game";
    MatchThreeGame.StaticResourcePrefix = "./resource";
    return MatchThreeGame;
}());
exports["default"] = MatchThreeGame;
new MatchThreeGame();

},{"../game/game":72,"../platform/canvas/render_canvas":81}],81:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var coordinate_value_1 = require("../../concept/coordinate/coordinate_value");
var render_adapter_1 = require("../../render/render_adapter");
var RenderCanvas = /** @class */ (function (_super) {
    __extends(RenderCanvas, _super);
    function RenderCanvas(container, minSize, imagePrefix) {
        var _this = _super.call(this, RenderCanvas.getRenderSize(minSize, new coordinate_value_1["default"](container.clientHeight, container.clientWidth))) || this;
        _this.container = container;
        _this.minSize = minSize;
        _this.imagePrefix = imagePrefix;
        _this.listenerOn = false;
        _this.HTMLImages = [];
        _this.pixel = new coordinate_value_1["default"](container.clientHeight, container.clientWidth);
        _this.unitPixel = _this.pixel.split(_this.getSize());
        _this.canvas = document.createElement("canvas");
        _this.canvas.width = container.clientWidth;
        _this.canvas.height = container.clientHeight;
        _this.canvas.style.position = "absolute";
        _this.canvas.style.width = "100%";
        _this.canvas.style.height = "100%";
        _this.canvas.style.top = "0px";
        _this.canvas.style.left = "0px";
        _this.pen = _this.canvas.getContext("2d");
        _this.initListener();
        container.appendChild(_this.canvas);
        window.onresize = function (event) {
            _this.pixel = new coordinate_value_1["default"](container.clientHeight, container.clientWidth);
            _this.setSize(RenderCanvas.getRenderSize(minSize, _this.pixel));
            _this.unitPixel = _this.pixel.split(_this.getSize());
            _this.canvas.width = container.clientWidth;
            _this.canvas.height = container.clientHeight;
            _this.onResize.trigger();
        };
        return _this;
    }
    RenderCanvas.prototype.initListener = function () {
        var _this = this;
        var root = this.getRootPuzzle();
        var triggerMouseDown = function (location) {
            if (_this.listenerOn) {
                root.triggerMouseDown(_this.getLocationByPixelLocation(location), Date.now());
            }
        };
        var triggerMouseUp = function (location) {
            if (_this.listenerOn) {
                root.triggerMouseUp(_this.getLocationByPixelLocation(location), Date.now());
            }
        };
        var triggerMouseMove = function (location) {
            if (_this.listenerOn) {
                root.triggerMouseMove(_this.getLocationByPixelLocation(location), Date.now());
            }
        };
        this.canvas.ontouchstart = function (event) {
            triggerMouseDown(new coordinate_value_1["default"](event.changedTouches[0].pageY, event.changedTouches[0].pageX));
        };
        this.canvas.ontouchend = function (event) {
            triggerMouseUp(new coordinate_value_1["default"](event.changedTouches[0].pageY, event.changedTouches[0].pageX));
        };
        this.canvas.ontouchmove = function (event) {
            triggerMouseMove(new coordinate_value_1["default"](event.changedTouches[0].pageY, event.changedTouches[0].pageX));
        };
        this.canvas.onmousedown = function (event) {
            triggerMouseDown(new coordinate_value_1["default"](event.offsetY, event.offsetX));
        };
        this.canvas.onmouseup = function (event) {
            triggerMouseUp(new coordinate_value_1["default"](event.offsetY, event.offsetX));
        };
        this.canvas.onmousemove = function (event) {
            triggerMouseMove(new coordinate_value_1["default"](event.offsetY, event.offsetX));
        };
    };
    RenderCanvas.prototype.getLocationByPixelLocation = function (pixelLocation) {
        return pixelLocation.split(this.unitPixel);
    };
    RenderCanvas.prototype.getCanvasElement = function () {
        return this.canvas;
    };
    RenderCanvas.prototype.getImage = function (imageID) {
        return this.HTMLImages[imageID];
    };
    RenderCanvas.prototype.registeredImage = function (image, onEnd, onError) {
        var _this = this;
        var imageId = _super.prototype.registeredImage.call(this, image, function () {
            var imageElement = document.createElement("img");
            _this.HTMLImages[imageId] = imageElement;
            imageElement.onload = function () { return onEnd(); };
            imageElement.onerror = function (event) { return onError(event.error); };
            imageElement.src = _this.imagePrefix + image;
        }, onError);
        return imageId;
    };
    RenderCanvas.prototype.start = function () {
        var _this = this;
        _super.prototype.start.call(this);
        var renderCallback = function (_) {
            //This timestamp starts when the page loads, but we want it to start on January 1, 1970.
            _this.clear();
            _this.draw(Date.now());
            _this.renderRequestId = requestAnimationFrame(renderCallback);
        };
        this.renderRequestId = requestAnimationFrame(renderCallback);
        this.listenerOn = true;
    };
    RenderCanvas.prototype.close = function () {
        this.listenerOn = false;
        cancelAnimationFrame(this.renderRequestId);
        _super.prototype.close.call(this);
    };
    RenderCanvas.prototype.clear = function () {
        _super.prototype.clear.call(this);
        this.pen.clearRect(coordinate_value_1["default"].ORIGIN.getCol(), coordinate_value_1["default"].ORIGIN.getRow(), this.pixel.getCol(), this.pixel.getRow());
    };
    RenderCanvas.prototype.drawImage = function (imageId, location, size) {
        if (imageId == render_adapter_1["default"].IMAGE_ID_EMPTY) {
            return;
        }
        var locationPixel = location.swell(this.unitPixel);
        var sizePixel = size.swell(this.unitPixel);
        this.pen.drawImage(this.getImage(imageId), locationPixel.getCol(), locationPixel.getRow(), sizePixel.getCol(), sizePixel.getRow());
    };
    RenderCanvas.prototype.drawString = function (text, location, font, color) {
        var locationPixel = location.swell(this.unitPixel);
        this.pen.fillStyle = color.toRGBA();
        this.pen.font = font.size * this.unitPixel.getRow() + "px " + font.family;
        this.pen.textAlign = font.align;
        this.pen.textBaseline = font.baseline;
        this.pen.fillText(text, locationPixel.getCol(), locationPixel.getRow());
    };
    RenderCanvas.getRenderSize = function (minSize, physicalSize) {
        var ratio = physicalSize.getCol() / physicalSize.getRow() / (minSize.getCol() / minSize.getRow());
        if (ratio > 1) {
            return new coordinate_value_1["default"](minSize.getRow(), (physicalSize.getCol() / physicalSize.getRow()) * minSize.getRow());
        }
        else {
            return new coordinate_value_1["default"]((physicalSize.getRow() / physicalSize.getCol()) * minSize.getCol(), minSize.getCol());
        }
    };
    return RenderCanvas;
}(render_adapter_1["default"]));
exports["default"] = RenderCanvas;

},{"../../concept/coordinate/coordinate_value":3,"../../render/render_adapter":86}],82:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var AtomAdapter = /** @class */ (function () {
    function AtomAdapter() {
    }
    return AtomAdapter;
}());
exports["default"] = AtomAdapter;

},{}],83:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var atom_adapter_1 = require("./atom_adapter");
var AtomImage = /** @class */ (function (_super) {
    __extends(AtomImage, _super);
    function AtomImage(imageId, imageSize) {
        var _this = _super.call(this) || this;
        _this.imageId = imageId;
        _this.imageSize = imageSize;
        return _this;
    }
    AtomImage.prototype.draw = function (render, location, timeStamp) {
        render.drawImage(this.imageId.getLocation(timeStamp), location, this.imageSize.getLocation(timeStamp));
    };
    return AtomImage;
}(atom_adapter_1["default"]));
exports["default"] = AtomImage;

},{"./atom_adapter":82}],84:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var atom_adapter_1 = require("./atom_adapter");
var AtomString = /** @class */ (function (_super) {
    __extends(AtomString, _super);
    function AtomString(text, color, font) {
        var _this = _super.call(this) || this;
        _this.text = text;
        _this.color = color;
        _this.font = font;
        return _this;
    }
    AtomString.prototype.draw = function (render, location, timeStamp) {
        render.drawString(this.text.getLocation(timeStamp).toString(), location, this.font.getLocation(timeStamp), this.color.getLocation(timeStamp));
    };
    return AtomString;
}(atom_adapter_1["default"]));
exports["default"] = AtomString;

},{"./atom_adapter":82}],85:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var coordinate_value_1 = require("../concept/coordinate/coordinate_value");
var linked_list_1 = require("../concept/linked_list/linked_list");
var render_locus_1 = require("./render_locus");
var Puzzle = /** @class */ (function () {
    function Puzzle() {
        this.locationEventListener = {};
        this.atoms = new linked_list_1["default"]();
        this.puzzles = new linked_list_1["default"]();
        this.renderSize = coordinate_value_1["default"].ORIGIN;
        this.showState = true;
    }
    Puzzle.prototype.triggerLocationEvent = function (eventName, location, timeStamp) {
        var listener = this.locationEventListener[eventName];
        var isContinue = true;
        if (listener != null) {
            isContinue = listener(location);
        }
        if (!isContinue) {
            return;
        }
        var child = this.triggerChild(location, timeStamp);
        if (child == null) {
            return;
        }
        child.data.triggerLocationEvent(eventName, location.offset(child.location.negative()), timeStamp);
    };
    Puzzle.prototype.onLocationEvent = function (eventName, clickListener) {
        this.locationEventListener[eventName] = clickListener;
    };
    Puzzle.prototype.triggerMouseDown = function (location, timeStamp) {
        this.triggerLocationEvent(Puzzle.MouseDown, location, timeStamp);
    };
    Puzzle.prototype.onMouseDown = function (clickListener) {
        this.onLocationEvent(Puzzle.MouseDown, clickListener);
    };
    Puzzle.prototype.triggerMouseUp = function (location, timeStamp) {
        this.triggerLocationEvent(Puzzle.MouseUp, location, timeStamp);
    };
    Puzzle.prototype.onMouseUp = function (clickListener) {
        this.onLocationEvent(Puzzle.MouseUp, clickListener);
    };
    Puzzle.prototype.triggerMouseMove = function (location, timeStamp) {
        this.triggerLocationEvent(Puzzle.MouseMove, location, timeStamp);
    };
    Puzzle.prototype.onMouseMove = function (clickListener) {
        this.onLocationEvent(Puzzle.MouseMove, clickListener);
    };
    Puzzle.prototype.children = function () {
        return this.puzzles;
    };
    Puzzle.prototype.allAtoms = function () {
        return this.atoms;
    };
    Puzzle.prototype.addAtom = function (atom, locus, zIndex) {
        if (atom == null) {
            return;
        }
        this.atoms.insertBy(new render_locus_1["default"](atom, locus, zIndex), function (now) { return zIndex < now.zIndex; });
    };
    Puzzle.prototype.removeAtom = function (atom) {
        if (atom == null) {
            return;
        }
        this.atoms.removeBy(function (now) { return atom == now.data; });
    };
    Puzzle.prototype.triggerChild = function (location, timestamp) {
        var active = null;
        this.puzzles.iterate(function (_, now) {
            var postion = now.getPostion(timestamp);
            if (location.isIn(postion.location, postion.location.offset(now.data.size()))) {
                active = postion;
            }
        });
        return active;
    };
    Puzzle.prototype.addChild = function (puzzle, locus, zIndex) {
        if (puzzle == null) {
            return;
        }
        this.puzzles.insertBy(new render_locus_1["default"](puzzle, locus, zIndex), function (now) { return zIndex < now.zIndex; });
    };
    Puzzle.prototype.removeChild = function (puzzle) {
        if (puzzle == null) {
            return;
        }
        this.puzzles.removeBy(function (now) { return puzzle == now.data; });
    };
    Puzzle.prototype.setSize = function (size) {
        this.renderSize = size;
    };
    Puzzle.prototype.size = function () {
        return this.renderSize;
    };
    Puzzle.prototype.hide = function () {
        this.showState = false;
    };
    Puzzle.prototype.show = function () {
        this.showState = true;
    };
    Puzzle.prototype.isShow = function () {
        return this.showState;
    };
    Puzzle.prototype.payAtoms = function (timeStamp, baseIndex, baseLocation, atoms) {
        if (!this.isShow()) {
            return;
        }
        this.atoms.iterate(function (_, now) {
            var postion = now
                .getPostion(timeStamp)
                .offsetLocation(baseLocation)
                .offsetZIndex(baseIndex);
            atoms.push(postion);
        });
        this.puzzles.iterate(function (_, now) {
            var postion = now
                .getPostion(timeStamp)
                .offsetLocation(baseLocation)
                .offsetZIndex(baseIndex);
            now.data.payAtoms(timeStamp, postion.zIndex, postion.location, atoms);
        });
    };
    Puzzle.MouseDown = 1;
    Puzzle.MouseUp = 2;
    Puzzle.MouseMove = 3;
    return Puzzle;
}());
exports["default"] = Puzzle;

},{"../concept/coordinate/coordinate_value":3,"../concept/linked_list/linked_list":9,"./render_locus":87}],86:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var coordinate_value_1 = require("../concept/coordinate/coordinate_value");
var puzzle_1 = require("./puzzle");
var once_adapter_1 = require("../concept/once/once_adapter");
var listener_diffusion_1 = require("../concept/listener/listener_diffusion");
var RenderAdapter = /** @class */ (function () {
    function RenderAdapter(size) {
        this.onResize = new listener_diffusion_1["default"]();
        this.images = [];
        this.rootPuzzle = new puzzle_1["default"]();
        this.setSize(size);
    }
    RenderAdapter.prototype.setSize = function (size) {
        this.size = size;
    };
    RenderAdapter.prototype.getSize = function () {
        return this.size;
    };
    RenderAdapter.prototype.registeredImage = function (image, onEnd, _) {
        var imageId = this.images.length;
        this.images.push(image);
        once_adapter_1["default"].delay(onEnd)();
        return imageId;
    };
    RenderAdapter.prototype.getRootPuzzle = function () {
        return this.rootPuzzle;
    };
    RenderAdapter.prototype.start = function () { };
    RenderAdapter.prototype.clear = function () { };
    RenderAdapter.prototype.close = function () {
        this.images = [];
        this.rootPuzzle = new puzzle_1["default"]();
    };
    RenderAdapter.prototype.draw = function (timeStamp) {
        var atoms = [];
        this.getRootPuzzle().payAtoms(timeStamp, 0, coordinate_value_1["default"].ORIGIN, atoms);
        atoms.sort(function (left, right) { return left.zIndex - right.zIndex; });
        for (var i = 0; i < atoms.length; i++) {
            var atom = atoms[i];
            atom.data.draw(this, atom.location, timeStamp);
        }
    };
    RenderAdapter.IMAGE_ID_EMPTY = -1;
    return RenderAdapter;
}());
exports["default"] = RenderAdapter;

},{"../concept/coordinate/coordinate_value":3,"../concept/listener/listener_diffusion":12,"../concept/once/once_adapter":13,"./puzzle":85}],87:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var render_position_1 = require("./render_position");
var RenderLocus = /** @class */ (function () {
    function RenderLocus(data, locus, zIndex) {
        this.data = data;
        this.locus = locus;
        this.zIndex = zIndex;
    }
    RenderLocus.prototype.getPostion = function (timeStamp) {
        return new render_position_1["default"](this.data, this.locus.getLocation(timeStamp), this.zIndex);
    };
    return RenderLocus;
}());
exports["default"] = RenderLocus;

},{"./render_position":88}],88:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var RenderPosition = /** @class */ (function () {
    function RenderPosition(data, location, zIndex) {
        this.data = data;
        this.location = location;
        this.zIndex = zIndex;
    }
    RenderPosition.prototype.offsetLocation = function (location) {
        this.location = this.location.offset(location);
        return this;
    };
    RenderPosition.prototype.offsetZIndex = function (zIndex) {
        this.zIndex = this.zIndex + zIndex;
        return this;
    };
    return RenderPosition;
}());
exports["default"] = RenderPosition;

},{}]},{},[80])