export interface CallbackEvent {
  (...args: any[]): void;
}

export default class Emitter {
  private __events: {
    [name: string]: Array<CallbackEvent>;
  } = Object.create(null);
  /**
   * @param {any} typeofcallback==="function"
   * @return {any}
   */
  on(
    name: string,
    callback: { (): void }
  ): {
    (): void;
  } {
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
  off(name: string, callback?: CallbackEvent): void {
    if (typeof callback === "function") {
      this.__events[name] = this.__events[name].filter(
        (item) => item !== callback
      );

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
  emit(name: string, ...payload: any[]): void {
    if (name in this.__events) {
      for (
        let index: number = 0, length: number = this.__events[name].length;
        index < length;
        index++
      ) {
        this.__events[name][index](...payload);
      }
    }
  }
  /**
   * @param {string} name
   * @param {CallbackEvent} callback
   * @return {void}
   */
  once(name: string, callback: CallbackEvent): void {
    const handler = (...args: any[]) => {
      callback(...args);
      this.off(name, handler);
    };

    this.on(name, handler);
  }
}