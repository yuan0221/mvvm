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
    this.walk(v);
    Object.defineProperty(o, k, {
      enumerable: true,
      configurable: false,
      get: () => {
        return v;
      },
      set: newVal => {
        if (v !== newVal) {
          console.log(v + '--->' + newVal);
          v = newVal;
          _this.walk(newVal)
        }
      }
    })
  }
}