// 设置购物车数量
const setGoodsNum = function (store, data) {
  store.commit("SET_GOODS_NUM", data);
};

// 判断是否还是一个对象
const isObject = function (obj) {
  return Object.prototype.toString.call(obj) === "[object Object]";
};

// 扁平化对象
const getObjKeys = function (obj) {
  let result = {}; // 用于保存扁平化后的对象
  const helpLoop = function (obj) {
    const objKeys = Object.keys(obj);
    for (let i = 0; i < objKeys.length; i++) {
      if (typeof obj[objKeys[i]] == "object") {
        helpLoop(obj[objKeys[i]]);
      } else {
        result[objKeys[i]] = obj[objKeys[i]];
      }
    }
  };
  helpLoop(obj);

  return result;
};

// 比较两个对象差异
const comparisonObject = function (objPre, objNext) {
  if (Object.keys(objPre).length == 0 || !objPre || !objNext) return false;
  const tempPre = getObjKeys(objPre);
  const tempNext = getObjKeys(objNext);
  // 数组去重
  let keys = [];
  keys.push(...Object.keys(tempPre));
  keys.push(...Object.keys(tempNext));
  keys = [...new Set(keys)];
  for (let i = 0; i < keys.length; i++) {
    if (tempPre[keys[i]] != tempNext[keys[i]]) {
      return keys[i];
    }
  }
  return false;
};

// 文本超出N行隐藏判断
const isElementHidden = (
  ele = "",
  rowCount = 1,
  cssStyles = "",
  isRemove = true
) => {
  if (!ele) {
    return false;
  }

  const clonedNode = ele.cloneNode(true);
  clonedNode.style.overflow = "visible";
  clonedNode.style.display = "inline-block";
  clonedNode.style.width = "auto";
  clonedNode.style.whiteSpace = "nowrap";
  clonedNode.style.visibility = "hidden";
  if (cssStyles) {
    Object.keys(cssStyles).forEach((item) => {
      clonedNode.style[item] = cssStyles[item];
    });
  }
  const containerId = "ellipt_hidden__node___id";
  clonedNode.setAttribute("id", containerId);
  const tempNode = document.getElementById(containerId);
  let domNode = clonedNode;
  if (tempNode) {
    document.body.replaceChild(clonedNode, tempNode);
  } else {
    domNode = document.body.appendChild(clonedNode);
  }
  const differ = domNode.offsetWidth - ele.offsetWidth * rowCount;
  if (isRemove) {
    document.body.removeChild(domNode);
  }
  return differ > 0;
};

export { setGoodsNum, isObject, comparisonObject, isElementHidden };
