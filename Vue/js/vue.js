class Vue {
  constructor (options) {
    this.$options = options || {}
    this.$data = options.data || {}
    this.$el = typeof options.el === 'string' ? document.querySelector(options.el) : options.el

    this._proxyData(this.$data)

    // 调用observer，监听数据变化
    new Observer(this.$data)

    // 调用compiler，解析指令和差值表达式
    new Compiler(this)
  }

  _proxyData(data) {
    Object.keys(data).forEach(key => {
      Object.defineProperty(this, key, {
        enumerable: true,
        configurable: true,
        get () {
          return data[key]
        },
        set(newVal) {
          if(newVal === data[key])
            return 
          data[key] = newVal
        }
      })
    })
  }
}