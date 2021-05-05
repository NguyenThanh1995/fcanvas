/// <reference types="node" />
/**
 * @param {any} e
 * @return {any}
 */
export declare const requestAnimationFrame: (((callback: FrameRequestCallback) => number) & typeof globalThis.requestAnimationFrame) | typeof globalThis.setTimeout;
export declare const isTouch: boolean;
export declare const passive: boolean;
/**
 * @param {string} str
 * @return {string}
 */
export declare function camelCase(str: string): string;
export declare const windowSize: {
    windowWidth: {
        get(): number;
    };
    windowHeight: {
        get(): number;
    };
};
/**
 * @param {string|number} string
 * @return {string}
 */
export declare function convertToPx(string: string | number): string;
/**
 * @param {string|null} string
 * @return {string}
 */
export declare function trim(string: string | null): string;
interface InfoFont {
    size: number;
    family: string;
    weight: string;
}
/**
 * @param {string} font
 * @return {InfoFont}
 */
export declare function fontToArray(font: string): InfoFont;
/**
 * @param {string|number} string
 * @param {number} fi
 * @param {number} fontSize?
 * @return {number}
 */
export declare function AutoToPx(string: string | number, fi: number, fontSize?: number): number;
export interface InfoTouch {
    x: number;
    y: number;
    winX: number;
    winY: number;
    id: any;
}
/**
 * @param {HTMLCanvasElement} element
 * @param {any[]} touches
 * @return {InfoTouch[]}
 */
export declare function getTouchInfo(element: HTMLCanvasElement, touches: any[]): InfoTouch[];
/**
 * @return {boolean}
 */
export declare function isMobile(): boolean;
export {};