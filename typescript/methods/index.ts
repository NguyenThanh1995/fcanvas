import DOMMatrix from "../classes/DOMMatrix";
import Vector from "../classes/Vector";
import { Object } from "../types";

interface Circle extends Object {
  x: number;
  y: number;
  radius: number;
}
interface Rect extends Object {
  x: number;
  y: number;
  width: number;
  height: number;
}
/**
 * @param {Circle} circle1
 * @param {Circle} circle2
 * @return {boolean}
 */

export function CircleImpact(circle1: Circle, circle2: Circle): boolean {
  return (
    (circle1.x - circle2.x) ** 2 + (circle1.y - circle2.y) ** 2 <
    (circle1.radius + circle2.radius) ** 2
  );
}

/**
 * @param {Circle} circle
 * @param {number} x
 * @param {number} y
 * @return {boolean}
 */
export function CircleImpactPoint(
  circle: Circle,
  x: number,
  y: number
): boolean {
  return (x - circle.x) ** 2 + (y - circle.y) ** 2 < circle.radius ** 2;
}

/**
 * @param {Circle} circle
 * @param {Rect} rect
 * @return {boolean}
 */
export function CircleImpactRect(circle: Circle, rect: Rect): boolean {
  const x = Math.max(rect.x, Math.min(circle.x, rect.x + rect.width));
  const y = Math.max(rect.y, Math.min(circle.y, rect.y + rect.height));

  const distance =
    (x - circle.x) * (x - circle.x) + (y - circle.y) * (y - circle.y);

  return distance < circle.radius ** 2;
}

/**
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @return {number}
 */
export function constrain(value: number, min: number, max: number): number {
  return Math.min(Math.max(min, value), max);
}

/**
 * @param {string} src
 * @return {Promise<HTMLImageElement>}
 */
export function loadImage(src: string): Promise<HTMLImageElement> {
  const img = new Image();
  img.src = src;
  return new Promise((resolve, reject) => {
    function loaded() {
      resolve(img);
      img.removeEventListener("load", loaded);
    }

    function error(err: any) {
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
export function map(
  value: number,
  start: number,
  stop: number,
  min: number,
  max: number
): number {
  return ((value - start) * (max - min)) / (stop - start) + min;
}

/**
 * @param {any[]} ...args
 * @return {any}
 */
function random(value: number): number;
function random<T>(array: T[]): T;
function random(start: number, stop: number): number;
function random(...args: any[]): any {
  if (args.length === 1) {
    if (
      args[0] !== null &&
      typeof args[0] === "object" &&
      "length" in args[0]
    ) {
      return args[0][Math.floor(Math.random() * args[0].length)];
    }

    return Math.random() * args[0];
  }
  if (args.length === 2) {
    return args[0] + Math.random() * (args[1] - args[0]);
  }
}

function range(start: number, stop: number, step: number): number;
function range(start: string, stop: string, step: number): string;
/**
 * @param {any} start
 * @param {any} stop
 * @param {number} step
 * @return {any}
 */
function range(start: any, stop: any, step: number): any {
  step = step || 1;
  const arr = [];
  let isChar = false;

  if (stop === undefined) (stop = start), (start = 1);

  if (typeof start === "string") {
    start = start.charCodeAt(0);
    stop = stop.charCodeAt(0);
    isChar = true;
  }

  if (start !== stop && Math.abs(stop - start) < Math.abs(step))
    throw new Error("range(): step exceeds the specified range.");

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

export { random, range };

/**
 * @param {Rect} rect1
 * @param {Rect} rect2
 * @return {boolean}
 */
export function RectImpact(rect1: Rect, rect2: Rect): boolean {
  return (
    rect1.x <= rect2.x + rect2.width &&
    rect1.x + rect1.width >= rect2.x &&
    rect1.y <= rect2.y + rect2.height &&
    rect1.y + rect1.height >= rect2.y
  );
}

/**
 * @param {Rect} rect
 * @param {number} x
 * @param {number} y
 * @return {boolean}
 */
export function RectImpactPoint(rect: Rect, x: number, y: number): boolean {
  return (
    rect.x < x &&
    rect.x + rect.width > x &&
    rect.y < y &&
    rect.y + rect.height > y
  );
}

/**
 * @param {number} start
 * @param {number} stop
 * @param {number} amt
 * @return {number}
 */
export function lerp(start: number, stop: number, amt: number): number {
  return amt * (stop - start) + start;
}

/**
 * @param {number[]} ...args
 * @return {number}
 */
export const hypot =
  typeof Math.hypot === "function"
    ? Math.hypot
    : (...args: number[]): number => {
        const len = args.length;
        let i = 0,
          result = 0;
        while (i < len) result += Math.pow(args[i++], 2);
        return Math.sqrt(result);
      };