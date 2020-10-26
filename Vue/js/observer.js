class Observer {
  constructor(data) {
    this.walk(data);
  }

  walk(data) {
    if (!data || typeof data !== 'object')
      return;

    Object.keys(data).forEach(k => {
      this.defineReactive(data, k, data[k]);
    })
  }
  defineReactive(o, k, v) {
    const _this = this
    // 负责收集依赖,并发送通知
    let dep = new Dep()
    this.walk(v);
    Object.defineProperty(o, k, {
      enumerable: true,
      configurable: false,
      get: () => {
        // 收集依赖
        Dep.target && dep.addSub(Dep.target)
        return v;
      },
      set: newVal => {
        if (v !== newVal) {
          console.log(v + '--->' + newVal);
          v = newVal;
          _this.walk(newVal)
          // 发送通知
          dep.notify()
        }
      }
    })
  }
}