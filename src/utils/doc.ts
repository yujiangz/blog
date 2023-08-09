/**
 * 去掉锚点，并加入后缀 .md
 * @param {string}path 不含 .md
 * @returns 含有 .md 的路径
 */
export function getDocPath(path: string) {
  const index = path.lastIndexOf("#");
  return index !== -1 ? path.slice(0, index) + ".md" : path + ".md";
}
