class Vue {
  constructor (options) {
    this.$options = options || {}
    this.$data = options.data || {}
    this.$el = typeof options.el === 'string' ? document.querySelector(options.el) : options.el

    this._proxyData(this.$data)
    new Observer(this.$data)
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