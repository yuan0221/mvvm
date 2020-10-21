1. 发布订阅模式：
  订阅者
  发布者
  信号中心
2. 观察者模式
  1） 观察者（Watcher，相当于订阅者 ）
    a: update 方法 
  2） 目标（Dep， 相当于发布者）
    a: subs 数组, 存储所有观察者
    b: addSub 方法，添加观察者
    c: notify 方法，调用所有观察者的 update 方法

 