class Compiler {
  constructor(vm) {
    this.el = vm.$el
    this.vm = vm
    this.compile(this.el)
  }

  // 编译模板，处理文本节点和元素节点
  compile (el) {
    let childNodes = el.childNodes
    Array.from(childNodes).forEach(node => {
      // 处理文本节点
      if(this.isTextNode(node)) 
        this.compileText(node)
        // 处理元素节点
      else if (this.isElementNode(node))
        this.compileElement(node)

      // 递归子节点
      if(node.childNodes && node.childNodes.length) 
        this.compile(node)
    })
  }
  // 编译元素节点，处理指令
  compileElement (node) {

  }
  // 编译文本节点，处理差值表达式
  compileText (node) {
    let reg = /\{\{(.+?)\}\}/
    let value = node.textContent
    if(reg.test(value)) {
      let key = RegExp.$1.trim()
      node.textContent = value.replace(reg, this.vm[key])
    }
  }
  // 判断元素属性是否是指令
  isDirective (attrName) {
    return attrName.startWith('v-')
  }
  // 判断节点是否文本节点
  isTextNode (node) {
    return node.nodeType === 3
  }
  // 判断节点是否是元素节点
  isElementNode (node) {
    return node.nodeType === 1
  }
}