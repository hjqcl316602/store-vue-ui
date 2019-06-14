
import Vue from 'vue';
import Toast from './toast.vue';

let Instance, toastBox, timers = [];

let toast = function (type, content, duration) {
  if (!Instance) {
    Instance = Vue.extend(Toast)
  }
  if (!toastBox) {
    toastBox = document.createElement('div')
    toastBox.classList.add('jq-toast--outer')
  }

  let defaultConfigs = {
    type, content, duration
  }
  let component = new Instance({ propsData: defaultConfigs })
  let toastVueEle = component.$mount().$el
  toastBox.appendChild(toastVueEle)
  document.body.appendChild(toastBox)

  let componentStatus = true

  setTimeout(() => {
    component.changeVisible(componentStatus = true)
  }, 20)

  toastVueEle.addEventListener('transitionend', function (e) {
    if (!componentStatus && toastVueEle) {
      toastBox.removeChild(toastVueEle)
      toastVueEle = null
    }
  })

  let timer = setTimeout(() => {
    component.changeVisible(componentStatus = false)
  }, defaultConfigs.duration)
  timers.push(timer)

}

const clear = function () {
  if (toastBox) {
    document.body.removeChild(toastBox)
    toastBox = null
  }
  Instance = null
  // 清除定时器，否则会报错 node节点不存在
  timers.forEach(time => {
    clearTimeout(time)
  })
  timers = []
}

export default {
  warning(content, duration) { return toast('warning', content, duration = 3000) },
  success(content, duration) { return toast('success', content, duration = 3000) },
  error(content, duration) { return toast('error', content, duration = 3000) },
  info(content, duration) { return toast('info', content, duration = 3000) },
  clear
}