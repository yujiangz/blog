import docs from "@/assets/data/docs.json";
import { Doc, Dir, SearchDoc } from "@/types.ts";

// 增加 url 字段，并去除后缀
const addUrl = (docs: (Dir | Doc)[], prefix: string = "/docs") => {
  docs.forEach((doc: Doc | Dir) => {
    const url = prefix + "/" + doc.name;
    if (doc.type === "dir") {
      doc.children && addUrl(doc.children, url);
    } else {
      doc.url = url;
      doc.name = doc.name.replace(/\.md$/, "");
      doc.url = doc.url.replace(/\.md$/, "");
    }
  });
};

addUrl(docs.children as (Dir | Doc)[]);

export const data: Dir = docs as Dir;

// 搜索标记关键字
function markKeyword(
  str: string,
  keyword: string
): { start: number; end: number } {
  const reg = new RegExp(keyword, "gi");
  const start = str.search(reg);
  const end = start + keyword.length;
  return {
    start,
    end,
  };
}

export function searchDoc(
  keyword: string,
  Docs: (Dir | Doc)[] = docs.children as (Dir | Doc)[]
): SearchDoc[] {
  const res: SearchDoc[] = [];
  const search = (Docs: (Dir | Doc)[], keyword: string) => {
    Docs.forEach((doc: Dir | Doc) => {
      if ((doc as Doc).url && doc.name.includes(keyword)) {
        res.push({
          ...(doc as Doc),
          keywordIndex: markKeyword(doc.name, keyword),
        });
      }
      (doc as Dir).children && search((doc as Dir).children, keyword);
    });
  };
  search(Docs, keyword);
  return res;
}

// 根据 url 得到所在对象的对象

export function getParentByUrl(url: string, dir: Dir = docs as Dir): Dir {
  const paths = url.split("/").slice(1, -1);
  return paths.reduce((pre: Dir, cur: string) => {
    const res = pre.children?.find((doc) => doc.name === cur);
    if (res && res.type === "dir") {
      return res as Dir;
    } else {
      return pre;
    }
  }, dir);
}
