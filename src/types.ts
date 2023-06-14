
// ？？？？？？？？？？？？？
// AppHeader 的状态类型，待修改

export interface AppHeaderState {
  title: string;
  show: boolean;
}

// 文件未处理过的标准类型
// 理论上，不应该被导入。每当 /assets/data/ 下的数据被重新生成时，应当及时修正

interface File {
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

// 搜索功能搜索到的文件类型

export interface SearchDoc extends Doc {
  keywordIndex: { start: number; end: number };
}

// 文章类型

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
