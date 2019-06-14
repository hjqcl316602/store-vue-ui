/**
 * @name: 获取滚动目标元素
 * @msg:
 */
function getScrollEventTarget(element, rootParent = window) {
  let node = element;
  while (
    node &&
    node.tagName !== "HTML" &&
    node.tagName !== "BODY" &&
    node.nodeType === 1 &&
    node !== rootParent
  ) {
    const { overflowY } = window.getComputedStyle(node);
    if (overflowY === "scroll" || overflowY === "auto") {
      return node;
    }
    node = node.parentNode;
  }
  return rootParent;
}
/**
 * @name: 获取元素的滚动距离
 * @msg:
 */
function getScrollTop(element) {
  return "scrollTop" in element ? element.scrollTop : element.pageYOffset;
}
/**
 * @name: 获取当前滚动条的位置
 * @msg:
 */
function getBodyScrollTop() {
  var scrollTop = 0;
  if (document.documentElement && document.documentElement.scrollTop) {
    scrollTop = document.documentElement.scrollTop;
  } else if (document.body) {
    scrollTop = document.body.scrollTop;
  }
  return scrollTop;
}
/**
 * @name: 获取当前可视范围的高度
 * @msg:
 */
function getClientHeight() {
  var clientHeight = 0;
  if (document.body.clientHeight && document.documentElement.clientHeight) {
    clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
  }
  else {
    clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
  }
  return clientHeight;
}
/**
 * @name: 获取文档完整的高度
 * @msg:
 */
function getScrollHeight() {
  return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
}
/**
 * @name: 节流函数
 * @msg:
 */
function throttle(method, context){
  clearTimeout(method.tId);
  method.tId = setTimeout(function(){
    method.call(context);
  }, 300);
}

export {
  getScrollEventTarget,
  getScrollTop,
  getBodyScrollTop,
  getClientHeight,
  getScrollHeight,
  throttle
}