/**
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @return {number}
 */
export declare function constrain(value: number, min: number, max: number): number;
/**
 * @param {string} src
 * @return {Promise<HTMLImageElement>}
 */
export declare function loadImage(src: string): Promise<HTMLImageElement>;
/**
 *
 * @param {string} src
 * @return {Promise<HTMLAudioElement>}
 */
export declare function loadAudio(src: string): Promise<HTMLAudioElement>;
/**
 * @param {number} value
 * @param {number} start
 * @param {number} stop
 * @param {number} min
 * @param {number} max
 * @return {number}
 */
export declare function map(value: number, start: number, stop: number, min: number, max: number): number;
/**
 * @export
 * @param {number} ratio
 * @param {number} width
 * @param {number} height
 * @return {*}  {[number, number]}
 */
export declare function aspectRatio(ratio: number, width: number, height: number): [number, number];
declare function random(value: number): number;
declare function random<T>(array: T[]): T;
declare function random(start: number, stop: number): number;
declare function randomInt(value: number): number;
declare function randomInt(start: number, stop: number): number;
declare function range(start: number, stop: number, step: number): number;
declare function range(start: string, stop: string, step: number): string;
export { random, randomInt, range };
/**
 * @param {number} start
 * @param {number} stop
 * @param {number} amt
 * @return {number}
 */
export declare function lerp(start: number, stop: number, amt: number): number;
/**
 * @param {number[]} ...args
 * @return {number}
 */
export declare const hypot: (...values: number[]) => number;
/**
 * @param {number} value
 * @param {number} max
 * @param {number} prevent
 * @return {number}
 */
export declare function odd(value: number, prevent: number, max: number): number;
/**
 * @param {number} value
 * @param {number} min
 * @param {number} prevent
 * @return {number}
 */
export declare function even(value: number, min: number, prevent: number): number;
export declare function cutImage(image: CanvasImageSource, x?: number, y?: number, width?: number, height?: number, rotate?: number): HTMLImageElement;
/**
 * @export
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @return {*}  {boolean}
 */
export declare function unlimited(value: number, min: number, max: number): boolean;
