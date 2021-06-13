import {
  requestAnimationFrame,
  cancelAnimationFrame,
  isMobile,
  isTouch,
  passive,
} from "./utils/index";
import Emitter from "./classes/Emitter";
import Store from "./classes/Store";
import Vector from "./classes/Vector";
import Animate from "./classes/Animate";
import Camera from "./classes/Camera";
import Stament from "./classes/Stament";
import loadResourceImage from "./addons/loadResourceImage";
import fCanvas from "./core/fCanvas";

export default fCanvas;
export { Emitter, Stament, Store, Vector, Animate, Camera, loadResourceImage };
export {
  requestAnimationFrame,
  cancelAnimationFrame,
  isMobile,
  isTouch,
  passive,
};
export * from "./functions/index";
export * from "./core/SystemEvents";
export { createElement } from "./core/MyElement";