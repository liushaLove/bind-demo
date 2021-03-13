//老语法实现的bind
var slice = Array.prototype.slice;
function bind(asThis){
  //this就是函数
  var args = slice.call(arguments,1);
  var fn = this;
  if(typeof fn !== 'function'){
    throw new Error('bind 必须调用在函数身上');
  }
  function resultFn(){
    var args2 = slice.call(arguments,0);
    return fn.apply(
      resultFn.prototype.isPrototypeOf(this) ? this : asThis,
      args.concat(args2)
    );
  }
  resultFn.prototype = fn.prototype;
  return resultFn;
}

//用新语法实现的bind，简洁明了
function _bind(asThis,...args){
  //this 就是函数
  const fn = this;
  function resultFn(...args2){
    return fn.call(this instanceof resultFn? this : asThis,...args,...args2);
  }
  resultFn.prototype = fn.prototype;
  return resultFn;
}
if(!Function.prototype.bind){
  Function.prototype.bind = _bind;
}
module.exports = _bind;