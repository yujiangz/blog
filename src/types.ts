
// ？？？？？？？？？？？？？
// AppHeader 的状态类型，待修改

export interface AppHeaderState {
  title: string;
  show: boolean;
}

// 每当 /assets/data/ 下的数据被重新生成时，及时修正
// 使用 Doc 和 Dir 替代

export interface File {
  name: string;
  mtime: string | number;
  birthtime: string | number;
  type: string;
  url?: string;
  children?: File[];
}

// Doc 和 Dir 为标准的文件类型

export interface Doc extends File {
  type: "md";
  url: string;
}

export interface Dir extends File {
  type: "dir";
  children: (Dir | Doc)[];
}

// 搜索到的 DOC 返回的类型
export interface SearchDoc extends Doc {
  keywordIndex: { start: number; end: number };
}

export interface Article {
  title: string;
  content: string;
  folder: Dir | null;
}

export interface ArticleCatalogItem {
  title: string;
  level: number;
  id?: string;
  children?: ArticleCatalogItem[];
}

export type ArticleCatalog = ArticleCatalogItem[];
