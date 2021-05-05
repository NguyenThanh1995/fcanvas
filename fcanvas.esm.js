/**
 * @param {any} e
 * @return {any}
 */
const requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || function (e) {
  return setTimeout(e, 100 / 6);
};
let supportPassive = false;

try {
  let opts = Object.defineProperty({}, "passive", {
    get: function () {
      supportPassive = true;
    }
  });

  function noop() {}

  window.addEventListener("testPassive", noop, opts);
  window.removeEventListener("testPassive", noop, opts);
} catch (e) {}
const windowSize = {
  windowWidth: {
    get: () => window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
  },
  windowHeight: {
    get: () => window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
  }
};
/**
 * @param {string|null} string
 * @return {string}
 */

function trim(string) {
  if (string == null) {
    return "null";
  } else {
    return string.replace(/^\s+|\s+$/g, "");
  }
}
/**
 * @param {string} font
 * @return {InfoFont}
 */

function fontToArray(font) {
  const _font = font.split(" ");

  if (_font.length === 2) {
    return {
      size: parseFloat(_font[0]),
      family: trim(_font[1]),
      weight: "normal"
    };
  }

  return {
    size: parseFloat(_font[1]),
    family: trim(_font[2]),
    weight: trim(_font[0])
  };
}
/**
 * @param {string|number} string
 * @param {number} fi
 * @param {number} fontSize?
 * @return {number}
 */

function AutoToPx(string, fi, fontSize) {
  if (typeof string === "string") {
    string = trim(string);
    const number = parseFloat(string);
    const dp = (string.match(/[a-z%]+$/i) || [, "px"])[1];

    switch (dp) {
      case "px":
        return number;

      case "em":
        return (fontSize || 0) * number;

      case "rem":
        return (fontSize || 0) * 16;

      case "vw":
        return windowSize.windowWidth.get() * number / 100;

      case "vh":
        return windowSize.windowHeight.get() * number / 100;

      case "vmin":
        return Math.min(windowSize.windowWidth.get(), windowSize.windowHeight.get()) * number / 100;

      case "vmax":
        return Math.max(windowSize.windowWidth.get(), windowSize.windowHeight.get()) * number / 100;

      case "%":
        return fi / 100 * number;

      default:
        return +number;
    }
  } else {
    return parseFloat(string + "");
  }
}
/**
 * @param {HTMLCanvasElement} element
 * @param {any[]} touches
 * @return {InfoTouch[]}
 */

function getTouchInfo(element, touches) {
  const rect = element.getBoundingClientRect();
  const sx = element.scrollWidth / element.width || 1;
  const sy = element.scrollHeight / element.height || 1;
  const _touches = [],
        length = touches.length;
  let i = 0,
      touch;

  while (i < length) {
    touch = touches[i++];

    _touches.push({
      x: (touch.clientX - rect.left) / sx,
      y: (touch.clientY - rect.top) / sy,
      winX: touch.clientX,
      winY: touch.clientY,
      id: touch.identifier
    });
  }

  return _touches;
}
/**
 * @return {boolean}
 */

function isMobile() {
  /// code from https://stackoverflow.com/questions/11381673/detecting-a-mobile-browser
  let check = false;

  (function (a) {
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
  })(navigator.userAgent || navigator.vendor);

  return check;
}

class Emitter {
  constructor() {
    this.__events = {};
  }
  /**
   * @param {any} typeofcallback==="function"
   * @return {any}
   */


  on(name, callback) {
    if (typeof callback === "function") {
      if (name in this.__events) {
        this.__events[name].push(callback);
      } else {
        this.__events[name] = [callback];
      }
    }

    return () => {
      this.off(name, callback);
    };
  }
  /**
   * @param {string} name
   * @param {CallbackEvent} callback?
   * @return {void}
   */


  off(name, callback) {
    if (typeof callback === "function") {
      this.__events[name] = this.__events[name].filter(item => item !== callback);

      if (this.__events[name].length === 0) {
        delete this.__events[name];
      }
    } else {
      delete this.__events[name];
    }
    /**
     * @param {string} name
     * @param {any[]} ...payload
     * @return {void}
     */

    /**
     * @param {string} name
     * @param {any[]} ...payload
     * @return {void}
     */

  }
  /**
   * @param {string} name
   * @param {any[]} ...payload
   * @return {void}
   */


  emit(name, ...payload) {
    if (name in this.__events) {
      for (let index = this.__events[name].length - 1; index > -1; index--) {
        this.__events[name][index](...payload);
      }
    }
  }
  /**
   * @param {string} name
   * @param {CallbackEvent} callback
   * @return {void}
   */


  once(name, callback) {
    const handler = (...args) => {
      callback(...args);
      this.off(name, handler);
    };

    this.on(name, handler);
  }

}

function reactiveDefine(value, callback, parent = []) {
  if (value !== null && typeof value === "object") {
    /// reactive children
    if (Array.isArray(value)) {
      /// bind to propertyes
      /// reactive method array
      if (!value.__reactive) {
        ["push", "pop", "shift", "unshift", "splice"].forEach(name => {
          const proto = value[name];
          Object.defineProperty(value, name, {
            writable: false,
            enumerable: false,
            configurable: true,

            value() {
              const newValue = proto.apply(this, arguments);
              callback([...parent], this, newValue);
              return newValue;
            }

          });
        });
        Object.defineProperty(value, "__reactive", {
          writable: false,
          enumerable: false,
          configurable: true,
          value: true
        });
      } ////


      value.forEach((item, index) => {
        if (item !== null && typeof item === "object") {
          reactiveDefine(item, callback, [...parent, index + ""]);
        }
      });
    } else {
      //// if object ===> reactive attribute
      /// create __store if not exists
      /// reactive social
      if (!value.__reactive) {
        Object.defineProperty(value, "__store", {
          writable: true,
          enumerable: false,
          configurable: true,
          value: { ...value
          }
        });
        Object.defineProperty(value, "__reactive", {
          writable: false,
          enumerable: false,
          configurable: true,
          value: true
        });
      } else {
        value.__store = { ...value
        };
      }

      for (const key in value) {
        Object.defineProperty(value, key, {
          get() {
            var _value$__store;

            return (_value$__store = value.__store) === null || _value$__store === void 0 ? void 0 : _value$__store[key];
          },

          enumerable: true,

          set(newValue) {
            var _value$__store2;

            const old = (_value$__store2 = value.__store) === null || _value$__store2 === void 0 ? void 0 : _value$__store2[key];

            if (value.__store) {
              value.__store[key] = newValue;
            }

            reactiveDefine(newValue, callback, [...parent, key]);
            callback([...parent, key], old, newValue);
          }

        });
        reactiveDefine(value[key], callback, [...parent, key]);
      }
    }
  }
}

class Store {
  /**
   * @param {Object} store?
   * @return {any}
   */
  constructor(store) {
    this.__emitter = new Emitter();

    for (const key in store) {
      this[key] = store[key];
    }

    reactiveDefine(this, (paths, oldVal, newVal) => {
      this.__emitter.emit(paths.join("."), oldVal, newVal);
    });
  }
  /**
   * @param {Store|Object} object
   * @param {string} key
   * @param {any} value
   * @return {void}
   */


  $set(object, key, value) {
    object[key] = value;
    reactiveDefine(object, (paths, oldVal, newVal) => {
      this.__emitter.emit(paths.join("."), oldVal, newVal);
    });
    object[key] = value;
  }
  /**
   * @param {string} key
   * @param {CallbackEvent} callback
   * @return {any}
   */


  $watch(key, callback) {
    return this.__emitter.on(key, callback);
  }

}

class Stament {
  constructor() {
    this.__store = new Store();
  }
  /**
   * @param {string} name
   * @param {CallbackEvent} callback
   * @return {void}
   */


  on(name, callback) {
    if (this.__store[name]) {
      callback();
    } else {
      const watcher = this.__store.$watch(name, () => {
        callback();
        watcher();
      });
    }
  }
  /**
   * @param {string} name
   * @return {void}
   */


  emit(name) {
    this.__store.$set(this.__store, name, true);
  }

}

function calculateRemainder2D(vector, xComponent, yComponent) {
  if (xComponent !== 0) {
    vector.x = vector.x % xComponent;
  }

  if (yComponent !== 0) {
    vector.y = vector.y % yComponent;
  }

  return vector;
}

function calculateRemainder3D(vector, xComponent, yComponent, zComponent) {
  if (xComponent !== 0) {
    vector.x = vector.x % xComponent;
  }

  if (yComponent !== 0) {
    vector.y = vector.y % yComponent;
  }

  if (zComponent !== 0) {
    vector.z = vector.z % zComponent;
  }

  return vector;
}

class Vector {
  /**
   * @param {number=0} x
   * @param {number=0} y
   * @param {number=0} z
   * @return {any}
   */
  constructor(x = 0, y = 0, z = 0) {
    [this.x, this.y, this.z] = [x, y, z];
  }
  /**
   * @param {Vector|[number?} x?
   * @param {any} number?
   * @param {any} number?]|number
   * @param {number} y?
   * @param {number} z?
   * @return {this}
   */


  set(x, y, z) {
    if (x instanceof Vector) {
      this.x = x.x || 0;
      this.y = x.y || 0;
      this.z = x.z || 0;
      return this;
    }

    if (x instanceof Array) {
      this.x = x[0] || 0;
      this.y = x[1] || 0;
      this.z = x[2] || 0;
      return this;
    }

    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
    return this;
  }
  /**
   * @return {Vector}
   */


  copy() {
    return new Vector(this.x, this.y, this.z);
  }
  /**
   * @param {Vector|[number?} x?
   * @param {any} number?
   * @param {any} number?]|number
   * @param {number} y?
   * @param {number} z?
   * @return {this}
   */


  add(x, y, z) {
    if (x instanceof Vector) {
      this.x += x.x || 0;
      this.y += x.y || 0;
      this.z += x.z || 0;
      return this;
    }

    if (x instanceof Array) {
      this.x += x[0] || 0;
      this.y += x[1] || 0;
      this.z += x[2] || 0;
      return this;
    }

    this.x += x || 0;
    this.y += y || 0;
    this.z += z || 0;
    return this;
  }
  /**
   * @param {Vector|[number} x?
   * @param {any} number
   * @param {any} number?]|number
   * @param {number} y?
   * @param {number} z?
   * @return {any}
   */


  rem(x, y, z) {
    if (x instanceof Vector) {
      if (Number.isFinite(x.x) && Number.isFinite(x.y) && Number.isFinite(x.z)) {
        var xComponent = parseFloat(x.x + "");
        var yComponent = parseFloat(x.y + "");
        var zComponent = parseFloat(x.z + "");
        calculateRemainder3D(this, xComponent, yComponent, zComponent);
      }
    } else if (x instanceof Array) {
      if (x.every(function (element) {
        return Number.isFinite(element);
      })) {
        if (x.length === 2) {
          calculateRemainder2D(this, x[0], x[1]);
        }

        if (x.length === 3) {
          calculateRemainder3D(this, x[0], x[1], x[2] || 0);
        }
      }
    } else if (arguments.length === 1) {
      if (Number.isFinite(arguments[0]) && arguments[0] !== 0) {
        this.x = this.x % arguments[0];
        this.y = this.y % arguments[0];
        this.z = this.z % arguments[0];
        return this;
      }
    } else if (arguments.length === 2) {
      var vectorComponents = [].slice.call(arguments);

      if (vectorComponents.every(function (element) {
        return Number.isFinite(element);
      })) {
        if (vectorComponents.length === 2) {
          calculateRemainder2D(this, vectorComponents[0], vectorComponents[1]);
        }
      }
    } else if (arguments.length === 3) {
      var _vectorComponents = [].slice.call(arguments);

      if (_vectorComponents.every(function (element) {
        return Number.isFinite(element);
      })) {
        if (_vectorComponents.length === 3) {
          calculateRemainder3D(this, _vectorComponents[0], _vectorComponents[1], _vectorComponents[2]);
        }
      }
    }
  }
  /**
   * @param {Vector|[number?} x?
   * @param {any} number?
   * @param {any} number?]|number
   * @param {number} y?
   * @param {number} z?
   * @return {this}
   */


  sub(x, y, z) {
    if (x instanceof Vector) {
      this.x -= x.x || 0;
      this.y -= x.y || 0;
      this.z -= x.z || 0;
      return this;
    }

    if (x instanceof Array) {
      this.x -= x[0] || 0;
      this.y -= x[1] || 0;
      this.z -= x[2] || 0;
      return this;
    }

    this.x -= x || 0;
    this.y -= y || 0;
    this.z -= z || 0;
    return this;
  }
  /**
   * @param {number} n
   * @return {this}
   */


  mult(n) {
    this.x *= n;
    this.y *= n;
    this.z *= n;
    return this;
  }
  /**
   * @param {number} n
   * @return {this}
   */


  div(n) {
    if (n === 0) {
      console.warn("div:", "divide by 0");
      return this;
    }

    this.x /= n;
    this.y /= n;
    this.z /= n;
    return this;
  }
  /**
   * @return {number}
   */


  mag() {
    return Math.sqrt(this.magSq());
  }
  /**
   * @return {number}
   */


  magSq() {
    const {
      x,
      y,
      z
    } = this;
    return x * x + y * y + z * z;
  }
  /**
   * @param {Vector|number} x?
   * @param {number} y?
   * @param {number} z?
   * @return {number}
   */


  dot(x, y, z) {
    if (x instanceof Vector) {
      return this.dot(x.x, x.y, x.z);
    }

    return this.x * (x || 0) + this.y * (y || 0) + this.z * (z || 0);
  }
  /**
   * @param {Vector|{x:number;y:number;z:number}} v
   * @return {Vector}
   */


  cross(v) {
    var x = this.y * v.z - this.z * v.y;
    var y = this.z * v.x - this.x * v.z;
    var z = this.x * v.y - this.y * v.x;
    return new Vector(x, y, z);
  }
  /**
   * @return {this}
   */


  normalize() {
    const len = this.mag();
    if (len !== 0) this.mult(1 / len);
    return this;
  }
  /**
   * @param {number} max
   * @return {this}
   */


  limit(max) {
    const mSq = this.magSq();

    if (mSq > max * max) {
      this.div(Math.sqrt(mSq)) //normalize it
      .mult(max);
    }

    return this;
  }
  /**
   * @param {number} n
   * @return {this}
   */


  setMag(n) {
    return this.normalize().mult(n);
  }
  /**
   * @return {number}
   */


  heading() {
    return Math.atan2(this.y, this.x);
  }
  /**
   * @param {number} a
   * @return {this}
   */


  rotate(a) {
    var newHeading = this.heading() + a;
    var mag = this.mag();
    this.x = Math.cos(newHeading) * mag;
    this.y = Math.sin(newHeading) * mag;
    return this;
  }
  /**
   * @param {Vector} v
   * @return {number}
   */


  angleBetween(v) {
    var dotmagmag = this.dot(v) / (this.mag() * v.mag());
    var angle;
    angle = Math.acos(Math.min(1, Math.max(-1, dotmagmag)));
    angle = angle * Math.sign(this.cross(v).z || 1);
    return angle;
  }
  /**
   * @param {Vector|number} x
   * @param {number} y?
   * @param {number} z?
   * @param {number=1} amt
   * @return {this}
   */


  lerp(x, y, z, amt = 1) {
    if (x instanceof Vector) {
      return this.lerp(x.x, x.y, x.z, y || 0);
    }

    this.x += (x - this.x) * amt || 0;
    this.y += (y || 0 - this.y) * amt || 0;
    this.z += (z || 0 - this.z) * amt || 0;
    return this;
  }
  /**
   * @param {Vector} surfaceNormal
   * @return {this}
   */


  reflect(surfaceNormal) {
    surfaceNormal.normalize();
    return this.sub(surfaceNormal.mult(2 * this.dot(surfaceNormal)));
  }
  /**
   * @return {[number, number, number]}
   */


  array() {
    return [this.x || 0, this.y || 0, this.z || 0];
  }
  /**
   * @param {Vector|[number} x
   * @param {any} number
   * @param {any} number]|number
   * @param {number} y?
   * @param {number} z?
   * @return {boolean}
   */


  equals(x, y, z) {
    var a, b, c;

    if (x instanceof Vector) {
      a = x.x || 0;
      b = x.y || 0;
      c = x.z || 0;
    } else if (x instanceof Array) {
      a = x[0] || 0;
      b = x[1] || 0;
      c = x[2] || 0;
    } else {
      a = x || 0;
      b = y || 0;
      c = z || 0;
    }

    return this.x === a && this.y === b && this.z === c;
  }
  /**
   * @return {string}
   */


  toString() {
    return "Vector: [" + this.array().join(", ") + "]";
  }

}

/**
 * @param {Circle} circle1
 * @param {Circle} circle2
 * @return {boolean}
 */
function CircleImpact(circle1, circle2) {
  return (circle1.x - circle2.x) ** 2 + (circle1.y - circle2.y) ** 2 < (circle1.radius + circle2.radius) ** 2;
}
/**
 * @param {Circle} circle
 * @param {number} x
 * @param {number} y
 * @return {boolean}
 */

function CircleImpactPoint(circle, x, y) {
  if (x == null || y == null) {
    return false;
  }

  return (x - circle.x) ** 2 + (y - circle.y) ** 2 < circle.radius ** 2;
}
/**
 * @param {Circle} circle
 * @param {Rect} rect
 * @return {boolean}
 */

function CircleImpactRect(circle, rect) {
  const x = Math.max(rect.x, Math.min(circle.x, rect.x + rect.width));
  const y = Math.max(rect.y, Math.min(circle.y, rect.y + rect.height));
  const distance = (x - circle.x) * (x - circle.x) + (y - circle.y) * (y - circle.y);
  return distance < circle.radius ** 2;
}
/**
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @return {number}
 */

function constrain(value, min, max) {
  return Math.min(Math.max(min, value), max);
}
/**
 * @param {string} src
 * @return {Promise<HTMLImageElement>}
 */

function loadImage(src) {
  const img = new Image();
  img.src = src;
  return new Promise((resolve, reject) => {
    function loaded() {
      resolve(img);
      img.removeEventListener("load", loaded);
    }

    function error(err) {
      reject(err);
      img.removeEventListener("error", error);
    }

    img.addEventListener("load", loaded);
    img.addEventListener("error", error);
  });
}
/**
 * @param {number} value
 * @param {number} start
 * @param {number} stop
 * @param {number} min
 * @param {number} max
 * @return {number}
 */

function map(value, start, stop, min, max) {
  return (value - start) * (max - min) / (stop - start) + min;
}

function random(...args) {
  if (args.length === 1) {
    if (args[0] !== null && typeof args[0] === "object" && "length" in args[0]) {
      return args[0][Math.floor(Math.random() * args[0].length)];
    }

    return Math.random() * args[0];
  }

  if (args.length === 2) {
    return args[0] + Math.random() * (args[1] - args[0]);
  }
}
/**
 * @param {any} start
 * @param {any} stop
 * @param {number} step
 * @return {any}
 */


function range(start, stop, step) {
  step = step || 1;
  const arr = [];
  let isChar = false;
  if (stop === undefined) stop = start, start = 1;

  if (typeof start === "string") {
    start = start.charCodeAt(0);
    stop = stop.charCodeAt(0);
    isChar = true;
  }

  if (start !== stop && Math.abs(stop - start) < Math.abs(step)) throw new Error("range(): step exceeds the specified range.");

  if (stop > start) {
    step < 0 && (step *= -1);

    while (start <= stop) {
      arr.push(isChar ? String.fromCharCode(start) : start);
      start += step;
    }
  } else {
    step > 0 && (step *= -1);

    while (start >= stop) {
      arr.push(isChar ? String.fromCharCode(start) : start);
      start += step;
    }
  }

  return arr;
}
/**
 * @param {Rect} rect1
 * @param {Rect} rect2
 * @return {boolean}
 */

function RectImpact(rect1, rect2) {
  return rect1.x <= rect2.x + rect2.width && rect1.x + rect1.width >= rect2.x && rect1.y <= rect2.y + rect2.height && rect1.y + rect1.height >= rect2.y;
}
/**
 * @param {Rect} rect
 * @param {number} x
 * @param {number} y
 * @return {boolean}
 */

function RectImpactPoint(rect, x, y) {
  if (x == null || y == null) {
    return false;
  }

  return rect.x < x && rect.x + rect.width > x && rect.y < y && rect.y + rect.height > y;
}
/**
 * @param {number} start
 * @param {number} stop
 * @param {number} amt
 * @return {number}
 */

function lerp(start, stop, amt) {
  return amt * (stop - start) + start;
}
/**
 * @param {number[]} ...args
 * @return {number}
 */

const hypot = typeof Math.hypot === "function" ? Math.hypot : (...args) => {
  const len = args.length;
  let i = 0,
      result = 0;

  while (i < len) result += Math.pow(args[i++], 2);

  return Math.sqrt(result);
};

function getAnimate(type, currentProgress, start, distance, steps, power) {
  switch (type) {
    case "ease":
      currentProgress /= steps / 2;

      if (currentProgress < 1) {
        return distance / 2 * Math.pow(currentProgress, power) + start;
      }

      currentProgress -= 2;
      return distance / 2 * (Math.pow(currentProgress, power) + 2) + start;

    case "quadratic":
      currentProgress /= steps / 2;

      if (currentProgress <= 1) {
        return distance / 2 * currentProgress * currentProgress + start;
      }

      currentProgress--;
      return -1 * (distance / 2) * (currentProgress * (currentProgress - 2) - 1) + start;

    case "sine-ease-in-out":
      return -distance / 2 * (Math.cos(Math.PI * currentProgress / steps) - 1) + start;

    case "quintic-ease":
      currentProgress /= steps / 2;

      if (currentProgress < 1) {
        return distance / 2 * Math.pow(currentProgress, 5) + start;
      }

      currentProgress -= 2;
      return distance / 2 * (Math.pow(currentProgress, 5) + 2) + start;

    case "exp-ease-in-out":
      currentProgress /= steps / 2;
      if (currentProgress < 1) return distance / 2 * Math.pow(2, 10 * (currentProgress - 1)) + start;
      currentProgress--;
      return distance / 2 * (-Math.pow(2, -10 * currentProgress) + 2) + start;

    case "linear":
      return start + distance / steps * currentProgress;
  }
}
/**
 * @param {AnimateType} type
 * @param {number} start
 * @param {number} stop
 * @param {number} frame
 * @param {number} frames
 * @param {number=3} power
 * @return {number}
 */


function getValueInFrame(type, start, stop, frame, frames, power = 3) {
  const distance = stop - start;
  return getAnimate(type, frame, start, distance, frames, power);
}

class Animate {
  /**
   * @param {AnimateConfig={time:0}} config
   * @return {any}
   */
  constructor(config = {
    time: 0
  }) {
    this.$ = new Emitter();
    this._frame = 1;
    this.type = "linear";
    this.time = 0;
    this.fps = 1000 / 60;
    this.xFrom = 0;
    this.xTo = 0;
    this.yFrom = 0;
    this.yTo = 0;
    this.zFrom = 0;
    this.zTo = 0;
    this.config(config);
  }
  /**
   * Get frames from time
   * @param {number} time
   * @param {number=1000/60} fps
   * @return {number}
   */


  static getFrames(time, fps = 1000 / 60) {
    return time / fps; /// time * 1 / fps
  }
  /**
   * @return {number}
   */


  get x() {
    return getValueInFrame(this.type, this.xFrom, this.xTo, this.frame, this.frames);
  }
  /**
   * @return {number}
   */


  get y() {
    return getValueInFrame(this.type, this.yFrom, this.yTo, this.frame, this.frames);
  }
  /**
   * @return {number}
   */


  get z() {
    return getValueInFrame(this.type, this.zFrom, this.zTo, this.frame, this.frames);
  }
  /**
   * @return {number}
   */


  get frames() {
    return Animate.getFrames(this.time, this.fps);
  }
  /**
   * @return {number}
   */


  get frame() {
    return this._frame;
  }
  /**
   * @param {number} value
   * @return {any}
   */


  set frame(value) {
    this._frame = constrain(value, 0, this.frames);

    if (this._frame === this.frames) {
      this.$.emit("done");
    }
  }
  /**
   * @return {boolean}
   */


  get running() {
    return this.frame < this.frames;
  }
  /**
   * @return {boolean}
   */


  get done() {
    return this.frame === this.frames;
  }
  /**
   * @param {any} {xFrom=0
   * @param {any} xTo=0
   * @param {any} yFrom=0
   * @param {any} yTo=0
   * @param {any} zFrom=0
   * @param {any} zTo=0
   * @param {any} type="linear"
   * @param {any} time
   * @param {any} fps=1000/60
   * @param {AnimateConfig} }
   * @return {void}
   */


  config({
    xFrom = 0,
    xTo = 0,
    yFrom = 0,
    yTo = 0,
    zFrom = 0,
    zTo = 0,
    type = "linear",
    time,
    fps = 1000 / 60
  }) {
    [this.xFrom, this.xTo, this.yFrom, this.yTo, this.zFrom, this.zTo] = [xFrom, xTo, yFrom, yTo, zFrom, zTo];
    this.type = type;
    this.time = time;
    this.fps = fps;
  }
  /**
   * @param {number} x?
   * @param {number} y?
   * @param {number} z?
   * @return {void}
   */


  set(x, y, z) {
    [this.xFrom, this.yFrom, this.zFrom] = [x || 0, y || 0, z || 0];
  }
  /**
   * @param {number} x?
   * @param {number} y?
   * @param {number} z?
   * @return {void}
   */


  move(x, y, z) {
    this.frame = 1;
    [this.xTo, this.yTo, this.zTo] = [x || 0, y || 0, z || 0];
  }
  /**
   * @param {number} x?
   * @param {number} y?
   * @param {number} z?
   * @return {Promise<void>}
   */


  moveAsync(x, y, z) {
    this.move(x, y, z);
    return new Promise(resolve => {
      this.$.once("done", () => resolve());
    });
  }
  /**
   * @returns void
   */


  addFrame() {
    this.frame++;
  }
  /**
   * @param  {AnimateType} type
   * @returns void
   */


  setType(type) {
    this.type = type;
  }
  /**
   * @returns AnimateType
   */


  getType() {
    return this.type;
  }
  /**
   * @param  {number} time
   * @returns void
   */


  setTime(time) {
    this.time = time;
  }
  /**
   * @returns number
   */


  getTime() {
    return this.time;
  }
  /**
   * @param {number} x?
   * @param {number} y?
   * @param {number} z?
   * @return {void}
   */


  moveImmediate(x, y, z) {
    [this.xFrom, this.yFrom, this.zFrom] = [this.x, this.y, this.z];
    this.move(x, y, z);
  }

}

Animate.getValueInFrame = getValueInFrame;

class MyElement {
  /**
   * @param {fCanvas} canvas?
   * @return {any}
   */
  constructor(canvas) {
    this._els = [];
    this._idActiveNow = -1;
    this._queue = [];

    if ((canvas === null || canvas === void 0 ? void 0 : canvas.constructor) === fCanvas) {
      this._els.push(canvas);
    } else {
      this._els.push(noopFCanvas);
    }
  }
  /**
   * @return {HTMLCanvasElement}
   */


  get $el() {
    return this.$parent.$el;
  }

  _run(canvas) {
    this.bind(canvas);
    this._idActiveNow = canvas.id;

    if (typeof this.update === "function") {
      this.update();
    } else if (typeof this.draw === "function") {
      this.draw();
    }

    if (this._queue.length > 0) {
      for (let index = 0, length = this._queue.length; index < length; index++) {
        this.run(this._queue[index]);
      }
    }

    this._idActiveNow = -1;
  }
  /**
   * @param {MyElement} element
   * @return {void}
   */


  addQueue(element) {
    if (element instanceof MyElement) {
      this._queue.push(element);
    } else {
      console.error(`fCanvas: the parameter passed to MyElement.addQueue() must be a fCanvas object.`);
    }
  }
  /**
   * @param {number} index
   * @return {MyElement | undefined}
   */


  getQueue(index) {
    if (index < 0) {
      index += this._queue.length;
    }

    return this._queue[index];
  }
  /**
   * @param {MyElement} element
   * @return {void}
   */


  run(element) {
    this.$parent.run(element);
  }
  /**
   * @param {number} id
   * @return {boolean}
   */


  has(id) {
    return this._els.some(item => item.id === id);
  }
  /**
   * @return {fCanvas}
   */


  get $parent() {
    const canvas = this._idActiveNow === null ? this._els[this._els.length - 1] : this._els.find(item => item.id === this._idActiveNow);

    if (canvas instanceof fCanvas) {
      return canvas;
    } else {
      console.warn("fCanvas: The current referenced version of the fCanvas.run function is incorrect.");
      return this._els[0];
    }
  }
  /**
   * @param {fCanvas} canvas
   * @return {void}
   */


  bind(canvas) {
    if (canvas instanceof fCanvas) {
      if (this.has(canvas.id) === false) {
        this._els.push(canvas);
      }
    } else {
      console.error("fCanvas: the parameter passed to MyElement.bind() must be a fCanvas object.");
    }
  }
  /**
   * @return {CanvasRenderingContext2D}
   */


  get $context2d() {
    return this.$parent.$context2d;
  }

  _toRadius(value) {
    return this.$parent._toRadius(value);
  }

  _toDegress(value) {
    return this.$parent._toDegress(value);
  }

  _toRgb(...params) {
    return this.$parent._toRgb(params);
  }

  _figureOffset(x, y, width, height) {
    return this.$parent._figureOffset(x, y, width, height);
  }
  /**
   * @param {number} angle
   * @return {number}
   */


  sin(angle) {
    return this.$parent.sin(angle);
  }
  /**
   * @param {number} sin
   * @return {number}
   */


  asin(sin) {
    return this.$parent.asin(sin);
  }
  /**
   * @param {number} angle
   * @return {number}
   */


  cos(angle) {
    return this.$parent.cos(angle);
  }
  /**
   * @param {number} cos
   * @return {number}
   */


  acos(cos) {
    return this.$parent.asin(cos);
  }
  /**
   * @param {number} angle
   * @return {number}
   */


  tan(angle) {
    return this.$parent.tan(angle);
  }
  /**
   * @param {number} tan
   * @return {number}
   */


  atan(tan) {
    return this.$parent.atan(tan);
  }
  /**
   * @param {number} y
   * @param {number} x
   * @return {number}
   */


  atan2(y, x) {
    return this.$parent.atan2(y, x);
  }
  /**
   * @return {number | null}
   */


  get mouseX() {
    return this.$parent.mouseX;
  }
  /**
   * @return {number | null}
   */


  get mouseY() {
    return this.$parent.mouseY;
  }
  /**
   * @return {number}
   */


  get windowWidth() {
    return this.$parent.windowWidth;
  }
  /**
   * @return {number}
   */


  get windowHeight() {
    return this.$parent.windowHeight;
  }

  fill(...args) {
    this.$context2d.fillStyle = this._toRgb(args);
    this.$context2d.fill();
  }
  /**
   * @param  {number} red
   * @param  {number} green
   * @param  {number} blue
   * @param  {number} alpha
   * @returns void
   */


  stroke(...args) {
    this.$context2d.strokeStyle = this._toRgb(args);
    this.$context2d.stroke();
  }
  /**
   * @return {void}
   */


  noFill() {
    this.fill(0, 0, 0, 0);
  }
  /**
   * @param {number} value?
   * @return {number|void}
   */


  lineWidth(value) {
    if (value === undefined) {
      return this.$context2d.lineWidth;
    } else {
      this.$context2d.lineWidth = value;
    }
  }
  /**
   * @param {number} value?
   * @return {number|void}
   */


  miterLimit(value) {
    if (value === undefined) {
      return this.$context2d.miterLimit;
    } else {
      if (this.lineJoin() !== "miter") {
        this.lineJoin("miter");
      }

      this.$context2d.miterLimit = value;
    }
  }
  /**
   * @param {number} x?
   * @param {number} y?
   * @return {void|{ x: number, y: number }}
   */


  shadowOffset(x, y) {
    if (arguments.length === 0) {
      return {
        x: this.$context2d.shadowOffsetX,
        y: this.$context2d.shadowOffsetY
      };
    } else {
      [this.$context2d.shadowOffsetX, this.$context2d.shadowOffsetY] = [x || 0, y || 0];
    }
  }
  /**
   * @param {string} text
   * @return {number}
   */


  measureText(text) {
    return this.$context2d.measureText(text).width;
  }
  /**
   * @return {void}
   */


  begin() {
    this.$context2d.beginPath();
  }
  /**
   * @return {void}
   */


  close() {
    this.$context2d.closePath();
  }
  /**
   * @return {void}
   */


  save() {
    this.$parent.save();
  }
  /**
   * @return {void}
   */


  restore() {
    this.$parent.restore();
  }
  /**
   * @param  {number} x
   * @param  {number} y
   * @param  {number} radius
   * @param  {number} astart
   * @param  {number} astop
   * @param  {boolean} reverse?
   * @returns void
   */


  arc(x, y, radius, astart, astop, reverse) {
    this.begin();
    this.$context2d.arc(x, y, radius, this._toRadius(astart) - Math.PI / 2, this._toRadius(astop) - Math.PI / 2, reverse);
    this.close();
  }
  /**
   * @param  {number} x
   * @param  {number} y
   * @param  {number} radius
   * @param  {number} astart
   * @param  {number} astop
   * @param  {boolean} reverse?
   */


  pie(x, y, radius, astart, astop, reverse) {
    this.begin();
    this.move(x, y);
    this.arc(x, y, radius, astart, astop, reverse);
    this.to(x, y);
    this.close();
  }
  /**
   * @param  {number} x1
   * @param  {number} y1
   * @param  {number} x2
   * @param  {number} y2
   * @returns void
   */


  line(x1, y1, x2, y2) {
    this.move(x1, y1);
    this.to(x2, y2);
  }
  /**
   * @param  {number} x
   * @param  {number} y
   * @param  {number} radius1
   * @param  {number} radius2
   * @param  {number} astart
   * @param  {number} astop
   * @param  {number} reverse
   * @returns void
   */


  ellipse(x, y, radius1, radius2, astart, astop, reverse) {
    this.begin();
    this.$context2d.ellipse(x, y, radius1, radius2, this._toRadius(astart) - Math.PI / 2, this._toRadius(astop), reverse);
    this.close();
  }
  /**
   * @param  {number} x
   * @param  {number} y
   * @param  {number} radius
   * @returns void
   */


  circle(x, y, radius) {
    this.arc(x, y, radius, 0, this.$parent.angleMode() === "degress" ? 360 : Math.PI * 2);
  }
  /**
   * @param  {number} x
   * @param  {number} y
   * @returns void
   */


  point(x, y) {
    this.circle(x, y, 1);
  }
  /**
   * @param  {number} x1
   * @param  {number} y1
   * @param  {number} x2
   * @param  {number} y2
   * @param  {number} x3
   * @param  {number} y3
   * @returns void
   */


  triange(x1, y1, x2, y2, x3, y3) {
    this.begin();
    this.move(x1, y1);
    this.to(x2, y2);
    this.to(x3, y3);
    this.close();
  }
  /**
   * @param  {CanvasImageSource} image
   * @param  {number} sx?
   * @param  {number} sy?
   * @param  {number} swidth?
   * @param  {number} sheight?
   * @param  {number} x
   * @param  {number} y
   * @param  {number} width
   * @param  {number} height
   * @returns void
   */


  drawImage(image, ...args) {
    // @ts-expect-error
    this.$context2d.drawImage(image, ...args);
  }

  rect(x, y, w, h, $1, $2, $3, $4) {
    this.begin();
    [x, y] = this._figureOffset(x, y, w, h);

    if (arguments.length < 5) {
      this.$context2d.rect(x, y, w, h);
    } else {
      const fontSize = this.$parent.fontSize();
      const arc = [AutoToPx($1, w, fontSize), AutoToPx($2, h, fontSize), AutoToPx($3, w, fontSize), AutoToPx($4, h, fontSize)];
      this.move(x, y);
      this.arcTo(x + w, y, x + w, y + h - arc[1], arc[1]);
      this.arcTo(x + w, y + h, x + w - arc[2], y + h, arc[2]);
      this.arcTo(x, y + h, x, y + h - arc[3], arc[3]);
      this.arcTo(x, y, x + w - arc[0], y, arc[0]);
    }

    this.close();
  }
  /**
   * @param  {number} cpx
   * @param  {number} cpy
   * @param  {number} x
   * @param  {number} y
   */


  quadratic(cpx, cpy, x, y) {
    this.$context2d.quadraticCurveTo(cpx, cpy, x, y);
  }
  /**
   * @param {number} cp1x
   * @param {number} cp1y
   * @param {number} cp2x
   * @param {number} cp2y
   * @param {number} x
   * @param {number} y
   * @return {void}
   */


  bezier(cp1x, cp1y, cp2x, cp2y, x, y) {
    this.$context2d.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
  }
  /**
   * @param {number} x
   * @param {number} y
   * @return {void}
   */


  move(x, y) {
    this.$context2d.moveTo(x, y);
  }
  /**
   * @param {number} x
   * @param {number} y
   * @return {void}
   */


  to(x, y) {
    this.$context2d.lineTo(x, y);
  }
  /**
   * @param {string} text
   * @param {number} x
   * @param {number} y
   * @param {number} maxWidth?
   * @return {void}
   */


  fillText(text, x, y, maxWidth) {
    this.$context2d.fillText(text, x, y, maxWidth);
  }
  /**
   * @param {string} text
   * @param {number} x
   * @param {number} y
   * @param {number} maxWidth?
   * @return {void}
   */


  strokeText(text, x, y, maxWidth) {
    this.$context2d.strokeText(text, x, y, maxWidth);
  }
  /**
   * @param {number} x
   * @param {number} y
   * @param {number} width
   * @param {number} height
   * @return {void}
   */


  fillRect(x, y, width, height) {
    this.$context2d.fillRect(x, y, width, height);
  }
  /**
   * @param {number} x
   * @param {number} y
   * @param {number} width
   * @param {number} height
   * @return {void}
   */


  strokeRect(x, y, width, height) {
    this.$context2d.strokeRect(x, y, width, height);
  }
  /**
   * @param {number} value?
   * @return {any}
   */


  lineDash(value) {
    if (value === undefined) {
      return this.$context2d.lineDashOffset;
    }

    this.$context2d.lineDashOffset = value;
  }
  /**
   * @param {number} x1
   * @param {number} y1
   * @param {number} x2
   * @param {number} y2
   * @param {number} radius
   * @return {void}
   */


  arcTo(x1, y1, x2, y2, radius) {
    this.$context2d.arcTo(x1, y1, x2, y2, radius);
  }
  /**
   * @param {number} x
   * @param {number} y
   * @return {boolean}
   */


  isPoint(x, y) {
    return this.$context2d.isPointInPath(x, y);
  }

  createImageData(width, height) {
    return height ? this.$context2d.createImageData(width, height) : this.$context2d.createImageData(width);
  }
  /**
   * @param {number} x
   * @param {number} y
   * @param {number} width
   * @param {number} height
   * @return {ImageData}
   */


  getImageData(x, y, width, height) {
    return this.$context2d.getImageData(x, y, width, height);
  }
  /**
   * @param {ImageData} imageData
   * @param {number} x
   * @param {number} y
   * @param {number} xs?
   * @param {number} ys?
   * @param {number} width?
   * @param {number} height?
   * @return {void}
   */


  putImageData(imageData, x, y, xs, ys, width, height) {
    if (arguments.length === 7) {
      this.$context2d.putImageData(imageData, x, y, xs, ys, width, height);
    } else {
      this.$context2d.putImageData(imageData, x, y);
    }
  }
  /**
   * @param {CanvasImageSource} image
   * @param {"repeat"|"repeat-x"|"repeat-y"|"no-repeat"} direction
   * @return {CanvasPattern | null}
   */


  createPattern(image, direction) {
    return this.$context2d.createPattern(image, direction);
  }
  /**
   * @param {number} x1
   * @param {number} y1
   * @param {number} r1
   * @param {number} x2
   * @param {number} y2
   * @param {number} r2
   * @return {CanvasGradient}
   */


  createRadialGradient(x1, y1, r1, x2, y2, r2) {
    return this.$context2d.createRadialGradient(x1, y1, r1, x2, y2, r2);
  }
  /**
   * @param {number} x
   * @param {number} y
   * @param {number} width
   * @param {number} height
   * @return {CanvasGradient}
   */


  createLinearGradient(x, y, width, height) {
    return this.$context2d.createLinearGradient(x, y, width, height);
  }
  /**
   * @param {"bevel"|"round"|"miter"} type?
   * @return {any}
   */


  lineJoin(type) {
    if (type !== undefined) {
      this.$context2d.lineJoin = type;
    } else {
      return this.$context2d.lineJoin;
    }
  }
  /**
   * @param {"butt"|"round"|"square"} value?
   * @return {any}
   */


  lineCap(value) {
    if (value !== undefined) {
      this.$context2d.lineCap = value;
    } else {
      return this.$context2d.lineCap;
    }
  }
  /**
   * @param {number} opacity?
   * @return {any}
   */


  shadowBlur(opacity) {
    if (opacity === undefined) {
      return this.$context2d.shadowBlur;
    }

    this.$context2d.shadowBlur = opacity;
  }
  /**
   * @param {ParamsToRgb} ...args
   * @return {void}
   */


  shadowColor(...args) {
    this.$context2d.shadowColor = this._toRgb(args);
  }

}

class EAnimate extends MyElement {
  /**
   * @param {AnimateConfig} animate?
   * @return {any}
   */
  constructor(animate) {
    super();
    this.__animate = new Animate();

    if (animate) {
      this.__animate.config(animate);
    }
  }
  /**
   * @return {Animate}
   */


  get animate() {
    return this.__animate;
  }
  /**
   * @return {Emitter}
   */


  get $() {
    return this.animate.$;
  }
  /**
   * @return {boolean}
   */


  get running() {
    return this.animate.running;
  }
  /**
   * @return {boolean}
   */


  get done() {
    return this.animate.done;
  }
  /**
   * @return {number}
   */


  get xFrom() {
    return this.animate.xFrom;
  }
  /**
   * @return {number}
   */


  get yFrom() {
    return this.animate.yFrom;
  }
  /**
   * @return {number}
   */


  get zFrom() {
    return this.animate.zFrom;
  }
  /**
   * @return {number}
   */


  get xTo() {
    return this.animate.xTo;
  }
  /**
   * @return {number}
   */


  get yTo() {
    return this.animate.yTo;
  }
  /**
   * @return {number}
   */


  get zTo() {
    return this.animate.zTo;
  }
  /**
   * @return {number}
   */


  get x() {
    return this.animate.x;
  }
  /**
   * @return {number}
   */


  get y() {
    return this.animate.y;
  }
  /**
   * @return {number}
   */


  get z() {
    return this.animate.z;
  }
  /**
   * @return {number}
   */


  get frames() {
    return this.animate.frames;
  }
  /**
   * @return {number}
   */


  get frame() {
    return this.animate.frame;
  }
  /**
   * @param {number} value
   * @return {any}
   */


  set frame(value) {
    this.animate.frame = value;
  }
  /**
   * @param {AnimateConfig} animate
   * @return {void}
   */


  config(animate) {
    this.animate.config(animate);
  }
  /**
   * @param {number} x?
   * @param {number} y?
   * @param {number} z?
   * @return {void}
   */


  set(x, y, z) {
    this.animate.set(x, y, z);
  }
  /**
   * @param {number} x?
   * @param {number} y?
   * @param {number} z?
   * @return {void}
   */


  moveTo(x, y, z) {
    this.animate.move(x, y, z);
  }
  /**
   * @param {number} x?
   * @param {number} y?
   * @param {number} z?
   * @return {Promise<void>}
   */


  moveAsync(x, y, z) {
    return this.animate.moveAsync(x, y, z);
  }
  /**
   * @param {number} x?
   * @param {number} y?
   * @param {number} z?
   * @return {void}
   */


  moveImmediate(x, y, z) {
    this.animate.moveImmediate(x, y, z);
  }
  /**
   * @return {void}
   */


  addFrame() {
    this.animate.addFrame();
  }
  /**
   * @param {AnimateType} type
   * @return {void}
   */


  setType(type) {
    this.animate.setType(type);
  }
  /**
   * @param {number} time
   * @return {void}
   */


  setTime(time) {
    this.animate.setTime(time);
  }

}

class RectElement extends MyElement {
  /**
   * @param {number} x
   * @param {number} y
   * @param {number} width
   * @param {number} height
   * @return {any}
   */
  constructor(x, y, width, height) {
    super();
    this.type = "rect";
    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;
    [this.x, this.y, this.width, this.height] = [x || 0, y || 0, width || 0, height || 0];
  }
  /**
   * @return {boolean}
   */


  get interact() {
    return RectImpactPoint(this, this.mouseX, this.mouseY);
  }

}

class CircleElement extends MyElement {
  /**
   * Describe your function
   * @param {number} x
   * @param {number} y
   * @param {number} radius
   * @return {any}
   */
  constructor(x, y, radius) {
    super();
    this.type = "circle";
    this.x = 0;
    this.y = 0;
    this.radius = 0;
    [this.x, this.y, this.radius] = [x || 0, y || 0, radius || 0];
  }
  /**
   * @return {boolean}
   */


  get interact() {
    return CircleImpactPoint(this, this.mouseX, this.mouseY);
  }

}

class fCanvas {
  /**
   * @param {HTMLCanvasElement} element?
   * @return {any}
   */
  constructor(element) {
    this._ENV = {
      angleMode: "degress",
      rectAlign: "left",
      rectBaseline: "top",
      colorMode: "rgb",
      rotate: 0,
      clear: true,
      loop: true
    };
    this._id = fCanvas.count++;
    this._el = document.createElement("canvas");
    this._context2dCaching = null;
    this._stamentReady = new Stament();
    this._existsPreload = false;
    this.__translate = {
      x: 0,
      y: 0,
      sumX: 0,
      sumY: 0
    };
    this.__scale = {
      x: 0,
      y: 0,
      sumX: 0,
      sumY: 0
    };
    this.__idFrame = null;
    this.preventTouch = false;
    this.stopTouch = false;
    this.touches = [];
    this.changedTouches = [];

    const handlerEvent = event => {
      try {
        if (event.type !== "mouseout") {
          this.touches = getTouchInfo(this.$el, event.touches || [event]);
          this.changedTouches = getTouchInfo(this.$el, event.changedTouches || [event]);
        } else {
          this.touches = [];
        }

        this.preventTouch && event.preventDefault();
        this.stopTouch && event.stopPropagation();
      } catch (e) {// throw e;
      }
    };

    if (element instanceof HTMLCanvasElement) {
      this._el = element;
    }

    this.$el.addEventListener(isMobile() ? "touchstart" : "mouseover", handlerEvent);
    this.$el.addEventListener(isMobile() ? "touchmove" : "mousemove", handlerEvent);
    this.$el.addEventListener(isMobile() ? "touchend" : "mouseout", handlerEvent);
  }
  /**
   * @return {number | null}
   */


  get mouseX() {
    var _this$touches$;

    return ((_this$touches$ = this.touches[0]) === null || _this$touches$ === void 0 ? void 0 : _this$touches$.x) || null;
  }
  /**
   * @return {number | null}
   */


  get mouseY() {
    var _this$touches$2;

    return ((_this$touches$2 = this.touches[0]) === null || _this$touches$2 === void 0 ? void 0 : _this$touches$2.y) || null;
  }
  /**
   * @return {boolean}
   */


  get interact() {
    return this.touches.length > 0;
  }
  /**
   * @return {number}
   */


  get id() {
    return this._id;
  }
  /**
   * @return {HTMLCanvasElement}
   */


  get $el() {
    return this._el;
  }
  /**
   * @return {CanvasRenderingContext2D}
   */


  get $context2d() {
    if (this._context2dCaching === null) {
      this._context2dCaching = this.$el.getContext("2d");
    }

    return this._context2dCaching;
  }
  /**
   * @param {HTMLElement=document.body} parent
   * @return {any}
   */


  append(parent = document.body) {
    if (parent.contains(this.$el) === false) {
      parent.appendChild(this.$el);
    }
  }
  /**
   * @return {void}
   */


  noClear() {
    this._ENV.clear = false;
  }
  /**
   * @return {boolean}
   */


  get acceptClear() {
    return this._ENV.clear;
  }
  /**
   * @param {MyElement} element
   * @return {void}
   */


  run(element) {
    element._run(this);
  }
  /**
   * @return {number}
   */


  get width() {
    return this.$el.width;
  }
  /**
   * @param {number} value
   * @return {any}
   */


  set width(value) {
    this.$el.width = value;
  }
  /**
   * @return {number}
   */


  get height() {
    return this.$el.height;
  }
  /**
   * @param {number} value
   * @return {any}
   */


  set height(value) {
    this.$el.height = value;
  }
  /**
   * @return {number}
   */


  get windowWidth() {
    return windowSize.windowWidth.get();
  }
  /**
   * @return {number}
   */


  get windowHeight() {
    return windowSize.windowHeight.get();
  }
  /**
   * @return {void}
   */


  save() {
    this.$context2d.save();
  }
  /**
   * @return {void}
   */


  restore() {
    this.$context2d.restore();
  }

  _toRadius(value) {
    return this._ENV.angleMode === "radial" ? value * Math.PI / 180 : value;
  }

  _toDegress(value) {
    return this._ENV.angleMode === "degress" ? value * 180 / Math.PI : value;
  }

  _toRgb([red = 0, green = red, blue = green, alpha = 1]) {
    if (Array.isArray(red)) {
      return this._toRgb(red);
    } else {
      if (typeof red === "string") {
        return red;
      } else {
        const after = this._ENV.colorMode.match(/hsl|hsb/i) ? "%" : "";
        return `${this._ENV.colorMode}a(${[red, green + after, blue + after, alpha].join(",")})`;
      }
    }
  }

  _figureOffset(x, y, width, height) {
    switch (this._ENV.rectAlign) {
      case "center":
        x -= width / 2;
        break;

      case "right":
        x -= width;
        break;
    }

    switch (this._ENV.rectBaseline) {
      case "middle":
        y -= height / 2;
        break;

      case "bottom":
        y -= height;
        break;
    }

    return [x, y];
  }
  /**
   * @param {AngleType} value?
   * @return {any}
   */


  angleMode(value) {
    if (value === undefined) {
      return this._ENV.angleMode;
    }

    this._ENV.angleMode = value;
  }
  /**
   * @param {AlignType} value?
   * @return {any}
   */


  rectAlign(value) {
    if (value === undefined) {
      return this._ENV.rectAlign;
    }

    this._ENV.rectAlign = value;
  }
  /**
   * @param {ColorType} value?
   * @return {any}
   */


  colorMode(value) {
    if (value === undefined) {
      return this._ENV.colorMode;
    }

    this._ENV.colorMode = value;
  }
  /**
   * @param {BaselineType} value?
   * @return {any}
   */


  rectBaseline(value) {
    if (value === undefined) {
      return this._ENV.rectBaseline;
    }

    this._ENV.rectBaseline = value;
  }
  /**
   * @param {number} value?
   * @return {any}
   */


  fontSize(value) {
    const {
      size,
      weight,
      family
    } = fontToArray(this.font());

    if (value === undefined) {
      return size;
    } else {
      value = AutoToPx(value, size, size);
      this.font([weight, `${value}px`, family].join(" "));
    }
  }
  /**
   * @param {string} value?
   * @return {any}
   */


  fontFamily(value) {
    const {
      size,
      weight,
      family
    } = fontToArray(this.font());

    if (value === undefined) {
      return family;
    } else {
      this.font([weight, `${size}px`, value].join(" "));
    }
  }
  /**
   * @param {string} value?
   * @return {any}
   */


  fontWeight(value) {
    const {
      size,
      weight,
      family
    } = fontToArray(this.font());

    if (value === undefined) {
      return weight;
    } else {
      this.font([value, `${size}px`, family].join(" "));
    }
  }
  /**
   * @param {number=0} x
   * @param {number=0} y
   * @param {number=this.width} w
   * @param {number=this.height} h
   * @return {void}
   */


  clear(x = 0, y = 0, w = this.width, h = this.height) {
    this.$context2d.clearRect(x, y, w, h);
  }
  /**
   * @param {ParamsToRgb} ...params
   * @return {void}
   */


  background(...params) {
    if (typeof params[0] === "object") {
      this.$context2d.drawImage(params[0], 0, 0, this.width, this.height);
    } else {
      this.$context2d.fillStyle = this._toRgb(params);
      this.$context2d.fill();
      this.$context2d.fillRect(0, 0, this.width, this.height);
    }
  }
  /**
   * @param {any} type="image/png"
   * @param {number} scale?
   * @return {string}
   */


  toDataURL(type = "image/png", scale) {
    return this.$el.toDataURL(type, scale);
  }
  /**
   * @param {number} value?
   * @return {any}
   */


  rotate(value) {
    if (value === undefined) {
      return this._ENV.rotate;
    } else {
      this.$context2d.rotate(this._ENV.rotate = this._toRadius(value));
    }
  }
  /**
   * @return {void}
   */


  resetTransform() {
    this.setTransform(1, 0, 0, 1, 0, 0);
  }
  /**
   * @param {Function} callback
   * @return {Promise<void>}
   */


  async preload(callback) {
    this._existsPreload = true;
    await callback();

    this._stamentReady.emit("preloaded");
  }
  /**
   * @param {Function} callback
   * @return {Promise<void>}
   */


  async setup(callback) {
    if (this._existsPreload) {
      this._stamentReady.on("preloaded", async () => {
        await setup(callback);

        this._stamentReady.emit("setuped");
      });
    } else {
      await setup(callback);

      this._stamentReady.emit("setuped");
    }
  }
  /**
   * @param {Function} callback
   * @return {void}
   */


  draw(callback) {
    this._stamentReady.on("setuped", () => {
      draw(callback, this);
    });
  }
  /**
   * @param {string} value?
   * @return {any}
   */


  font(value) {
    if (value === undefined) {
      return this.$context2d.font;
    }

    this.$context2d.font = value;
  }
  /**
   * @param {TextAlignType} value?
   * @return {any}
   */


  textAlign(value) {
    if (value === undefined) {
      return this.$context2d.textAlign;
    }

    this.$context2d.textAlign = value;
  }
  /**
   * @param {TextBaselineType} value?
   * @return {any}
   */


  textBaseline(value) {
    if (value === undefined) {
      return this.$context2d.textBaseline;
    }

    this.$context2d.textBaseline = value;
  }
  /**
   * @param {GlobalCompositeOperationType} value?
   * @return {any}
   */


  globalOperation(value) {
    if (value === undefined) {
      return this.$context2d.globalCompositeOperation;
    }

    this.$context2d.globalCompositeOperation = value;
  }
  /**
   * @param {number} x?
   * @param {number} y?
   * @return {any}
   */


  translate(x, y) {
    if (arguments.length === 0) {
      return {
        x: this.__translate.x,
        y: this.__translate.y
      };
    }

    this.$context2d.translate(x, y);
    this.__translate.sumX += x || 0;
    this.__translate.sumY += y || 0;
  }
  /**
   * @return {void}
   */


  resetTranslate() {
    this.$context2d.translate(-this.__translate.sumX, -this.__translate.sumY);
  }
  /**
   * @param {number} x?
   * @param {number} y?
   * @return {any}
   */


  scale(x, y) {
    if (arguments.length === 0) {
      return {
        x: this.__scale.x,
        y: this.__scale.y
      };
    }

    this.$context2d.scale(x, y);
    this.__scale.sumX += x || 0;
    this.__scale.sumY += y || 0;
  }
  /**
   * @return {void}
   */


  resetScale() {
    this.$context2d.translate(-this.__translate.sumX, -this.__translate.sumY);
  }
  /**
   * @param {any} fillRule?
   * @param {any} path?
   * @return {void}
   */


  clip(fillRule, path) {
    if (path === undefined) {
      this.$context2d.clip(fillRule);
    }

    this.$context2d.clip(path, fillRule);
  }
  /**
   * @param {number|DOMMatrix} m11?
   * @param {number} m12?
   * @param {number} m21?
   * @param {number} m22?
   * @param {number} dx?
   * @param {number} dy?
   * @return {any}
   */


  transform(m11, m12, m21, m22, dx, dy) {
    if (arguments.length === 0) {
      return this.$context2d.getTransform();
    }

    if (m11 instanceof DOMMatrix) {
      const {
        a = 1,
        b = 0,
        c = 0,
        d = 1,
        e = 0,
        f = 0
      } = m11;
      this.$context2d.transform(a, b, c, d, e, f);
    } else {
      this.$context2d.transform(m11, m12, m21, m22, dx, dy);
    }
  }
  /**
   * @param {number|DOMMatrix} m11
   * @param {number} m12?
   * @param {number} m21?
   * @param {number} m22?
   * @param {number} dx?
   * @param {number} dy?
   * @return {void}
   */


  setTransform(m11, m12, m21, m22, dx, dy) {
    if (m11 instanceof DOMMatrix) {
      const {
        a = 1,
        b = 0,
        c = 0,
        d = 1,
        e = 0,
        f = 0
      } = m11;
      this.$context2d.setTransform(a, b, c, d, e, f);
    } else {
      this.$context2d.setTransform(m11, m12, m21, m22, dx, dy);
    }
  }
  /**
   * @param {number} angle
   * @return {number}
   */


  sin(angle) {
    return Math.sin(this._toRadius(angle));
  }
  /**
   * @param {number} sin
   * @return {number}
   */


  asin(sin) {
    return this._toDegress(Math.asin(sin));
  }
  /**
   * @param {number} angle
   * @return {number}
   */


  cos(angle) {
    return Math.cos(this._toRadius(angle));
  }
  /**
   * @param {number} cos
   * @return {number}
   */


  acos(cos) {
    return this._toDegress(Math.acos(cos));
  }
  /**
   * @param {number} angle
   * @return {number}
   */


  tan(angle) {
    return Math.tan(this._toRadius(angle));
  }
  /**
   * @param {number} tan
   * @return {number}
   */


  atan(tan) {
    return this._toDegress(Math.atan(tan));
  }
  /**
   * @param {number} y
   * @param {number} x
   * @return {number}
   */


  atan2(y, x) {
    return this._toDegress(Math.atan2(y, x));
  }
  /**
   * @return {void}
   */


  cursor() {
    this.$el.style.cursor = "auto";
  }
  /**
   * @return {void}
   */


  noCursor() {
    this.$el.style.cursor = "none";
  }
  /**
   * @return {void}
   */


  loop() {
    this._ENV.loop = true;

    this._stamentReady.emit("setuped");
  }
  /**
   * @return {void}
   */


  noLoop() {
    this._ENV.loop = false;

    if (this.__idFrame) {
      (cancelAnimationFrame || webkitCancelAnimationFrame || clearTimeout)(this.__idFrame);
    }
  }
  /**
   * @return {boolean}
   */


  get acceptLoop() {
    return this._ENV.loop;
  }
  /**
   * @param {CallbackEvent} callback
   * @return {noop}
   */


  keyPressed(callback) {
    this.$el.addEventListener("keypress", callback);
    return () => {
      this.$el.removeEventListener("keypress", callback);
    };
  }
  /**
   * @param {CallbackEvent} callback
   * @return {noop}
   */


  mouseIn(callback) {
    this.$el.addEventListener("mouseover", callback);
    return () => {
      this.$el.removeEventListener("mouseover", callback);
    };
  }
  /**
   * @param {CallbackEvent} callback
   * @return {noop}
   */


  mouseOut(callback) {
    this.$el.addEventListener("mouseout", callback);
    return () => {
      this.$el.removeEventListener("mouseout", callback);
    };
  }
  /**
   * @param {CallbackEvent} callback
   * @return {noop}
   */


  mouseDowned(callback) {
    this.$el.addEventListener("mousedown", callback);
    return () => {
      this.$el.removeEventListener("mousedown", callback);
    };
  }
  /**
   * @param {CallbackEvent} callback
   * @return {noop}
   */


  touchStarted(callback) {
    this.$el.addEventListener("touchstart", callback);
    return () => {
      this.$el.removeEventListener("touchstart", callback);
    };
  }
  /**
   * @param {CallbackEvent} callback
   * @return {noop}
   */


  touchMoved(callback) {
    this.$el.addEventListener("touchmove", callback);
    return () => {
      this.$el.removeEventListener("touchmove", callback);
    };
  }
  /**
   * @param {CallbackEvent} callback
   * @return {noop}
   */


  touchEned(callback) {
    this.$el.addEventListener("touchend", callback);
    return () => {
      this.$el.removeEventListener("touchend", callback);
    };
  }
  /**
   * @param {CallbackEvent} callback
   * @return {noop}
   */


  mouseMoved(callback) {
    this.$el.addEventListener("mousemove", callback);
    return () => {
      this.$el.removeEventListener("mousemove", callback);
    };
  }
  /**
   * @param {CallbackEvent} callback
   * @return {noop}
   */


  mouseUped(callback) {
    this.$el.addEventListener("mouseup", callback);
    return () => {
      this.$el.removeEventListener("mouseup", callback);
    };
  }
  /**
   * @param {CallbackEvent} callback
   * @return {noop}
   */


  mouseClicked(callback) {
    this.$el.addEventListener("click", callback);
    return () => {
      this.$el.removeEventListener("click", callback);
    };
  }

}

fCanvas.Element = MyElement;
fCanvas.EAnimate = EAnimate;
fCanvas.RectElement = RectElement;
fCanvas.CircleElement = CircleElement;
fCanvas.count = 0;
const noopFCanvas = new fCanvas();

function bindEvent(name, callback, element) {
  element.addEventListener(name, callback);
  return () => {
    element.removeEventListener(name, callback);
  };
}
let inited = false;
const emitter = new Emitter();
/**
 * @param {any} document.readyState==="complete"
 * @return {any}
 */

async function setup(callback) {
  if (document.readyState === "complete") {
    //// readyState === "complete"
    inited = true;
    emitter.emit("load");
    const ret = callback();

    if (ret && "length" in ret) {
      await ret;
    }
  } else {
    await new Promise((resolve, reject) => {
      function load() {
        document.removeEventListener("DOMContentLoaded", load);
        window.removeEventListener("load", load);
        inited = true;
        emitter.emit("load");
        callback();
        resolve();
      }

      document.addEventListener("DOMContentLoaded", load);
      window.addEventListener("load", load);
    });
  }
}
/**
 * @param {Function} callback
 * @param {fCanvas} canvas?
 * @return {void}
 */

function draw(callback, canvas) {
  if (inited) {
    if (canvas && canvas.acceptClear === true) {
      canvas.clear();
    }

    callback();

    if (!canvas || canvas.acceptLoop === true) {
      requestAnimationFrame(() => draw(callback, canvas));
    }
  } else {
    emitter.once("load", () => {
      draw(callback, canvas);
    });
  }
}
/**
 * @param {CallbackEvent} callback
 * @param {Window|HTMLElement=window} element
 * @return {{ (): void }}
 */

function keyPressed(callback, element = window) {
  return bindEvent("keypress", callback, element);
}
/**
 * @param {CallbackEvent} callback
 * @param {Window|HTMLElement=window} element
 * @return {{ (): void }}
 */

function changeSize(callback, element = window) {
  return bindEvent("resize", callback, element);
}
/**
 * @param {CallbackEvent} callback
 * @param {Window|HTMLElement=window} element
 * @return {{ (): void }}
 */

function mouseWheel(callback, element = window) {
  return bindEvent("wheel", callback, element);
}
/**
 * @param {CallbackEvent} callback
 * @param {Window|HTMLElement=window} element
 * @return {{ (): void }}
 */

function mousePressed(callback, element = window) {
  return bindEvent("mousedown", callback, element);
}
/**
 * @param {CallbackEvent} callback
 * @param {Window|HTMLElement=window} element
 * @return {{ (): void }}
 */

function mouseClicked(callback, element = window) {
  return bindEvent("click", callback, element);
}
/**
 * @param {CallbackEvent} callback
 * @param {Window|HTMLElement=window} element
 * @return {{ (): void }}
 */

function mouseMoved(callback, element = window) {
  return bindEvent("mousemove", callback, element);
}
/**
 * @param {CallbackEvent} callback
 * @param {Window|HTMLElement=window} element
 * @return {{ (): void }}
 */

function touchStarted(callback, element = window) {
  return bindEvent("touchstart", callback, element);
}
/**
 * @param {CallbackEvent} callback
 * @param {Window|HTMLElement=window} element
 * @return {{ (): void }}
 */

function touchMoved(callback, element = window) {
  return bindEvent("touchmove", callback, element);
}
/**
 * @param {CallbackEvent} callback
 * @param {Window|HTMLElement=window} element
 * @return {{ (): void }}
 */

function touchEnded(callback, element = window) {
  return bindEvent("touchend", callback, element);
}

export default fCanvas;
export { Animate, CircleImpact, CircleImpactPoint, CircleImpactRect, Emitter, RectImpact, RectImpactPoint, Stament, Store, Vector, changeSize, constrain, draw, hypot, keyPressed, lerp, loadImage, map, mouseClicked, mouseMoved, mousePressed, mouseWheel, random, range, setup, touchEnded, touchMoved, touchStarted };
