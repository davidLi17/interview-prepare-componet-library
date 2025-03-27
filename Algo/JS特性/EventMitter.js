class EventMitter {
    constructor() {
        this.events = new Map();
    }
    /**
     * 注册event对应的函数
     * @param {string} eventName 
     * @param {Function} callBack 
     */
    on(eventName, callBack) {
        if (!this.events.has(eventName)) {
            this.events.set(eventName, []);
        }
        this.events.get(eventName).push(callBack);
    }

    /**
     * 注册仅触发一次的监听器
     * @param {string} eventName 
     * @param {Function} callBack 
     */
    once(eventName, callBack) {
        const onceWrapper = (...args) => {
            callBack(...args);
            this.remove(eventName, onceWrapper);
        }
        this.on(eventName, onceWrapper);
    }

    /**
     * 触发事件，调用所有监听器
     * @param {string} eventName - 事件名称
     * @param {...any} args - 传入监听器的参数
     */
    trigger(eventName, ...args) {
        if (!this.events.has(eventName)) {
            return; // 静默失败而不是抛出错误，更符合事件系统的使用习惯
        }
        const callBackArrs = this.events.get(eventName);
        callBackArrs.slice().forEach(callBack => {
            callBack(...args);
        });
    }

    /**
    * 移除特定事件监听器
    * @param {string} eventName 
    * @param {function} [callBack] - 可选，移除特定监听器；如果不传则移除所有
    */
    remove(eventName, callBack) {
        if (!this.events.has(eventName)) {
            return; // 如果事件不存在，直接返回
        }

        if (!callBack) {
            this.events.delete(eventName); // 使用 Map 的 delete 方法而不是 delete 操作符
        } else {
            const filterCallbacks = this.events.get(eventName).filter(cb => cb !== callBack);
            this.events.set(eventName, filterCallbacks);
        }
    }
}
// 创建一个事件总线实例
const emitter = new EventMitter();

// 监听一个普通事件
emitter.on("message", (msg) => {
    console.log("接收到消息:", msg);
});

// 监听一个只触发一次的事件
emitter.once("greet", (name) => {
    console.log("你好，" + name + "，只会触发一次");
});

// 触发事件
emitter.trigger("message", "Hello, world!");  // 输出: 接收到消息: Hello, world!
emitter.trigger("greet", "Alice");            // 输出: 你好，Alice，只会触发一次
emitter.trigger("greet", "Bob");              // 不输出

// 移除事件
emitter.remove("message");

// 再次触发
emitter.trigger("message", "Hi again!");      // 不输出