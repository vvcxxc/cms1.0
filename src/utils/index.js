/* 公共函数/工具函数存放处 */

// 树结构扁平化
export function flatTree(tree, config) {
  const { children = 'children', id = 'id' } = config || {}
  const toFlatArray = (tree, parentId) => {
    return tree.reduce((t, _) => {
      const child = _[children]
      return [
        ...t,
        parentId ? { ..._, parentId } : _,
        ...(child && child.length ? toFlatArray(child, _[id]) : []),
      ]
    }, [])
  }

  return toFlatArray(tree, null)
}

export function createRandomId() {
  return (
    (Math.random() * 10000000).toString(16).substr(0, 4) +
    new Date().getTime() +
    Math.random().toString().substr(2, 5)
  )
}

// 获取节点node
export function getNodeById(tree, nodeId, config) {
  const { children = 'children', id = 'id' } = config || {}
  let arr = Array.isArray(tree) ? tree : [tree]
  let result = null
  while (arr.length) {
    let item = arr.pop()
    if (item && item[id] === nodeId) {
      result = item
      break
    } else if (item && item[children] && item[children].length) {
      arr.push(...item[children])
    }
  }
  return result
}

// 查找树内容（用来获取权限）
export function findPathByLeafId(id, node, path) {
  if (!path) {
    path = [];
  }
  for (let i = 0; i < node.length; i++) {
    var temPath = path.concat();
    if (id == node[i].RightID) {
      temPath.push(node[i]);
      return temPath;
    }
    if (node[i].Children) {
      var findResult = findPathByLeafId(
        id,
        node[i].Children,
        temPath
      );
      if (findResult) {
        return findResult;
      }
    }
  }
}

// 根据传参获取地址栏参数的值
export function getUrlParam(paraName) {
  let url = document.location.toString();
  let arrObj = url.split('?');
  if (arrObj.length > 1) {
    let arrPara = arrObj[1].split('&');
    let arr;
    for (let i = 0; i < arrPara.length; i++) {
        arr = arrPara[i].split('=');
        if (arr && arr[0] == paraName) {
            return arr[1];
        }
    }
    return '';
  } else {
    return '';
  }
}