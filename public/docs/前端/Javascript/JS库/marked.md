## 地址

- [marked 官网](https://marked.js.org/)



## 安装

```shell
$ npm install marked
$ npm install @types/marked # For TypeScript projects
```



## 使用

### 命令行

常用： **Example with file input**

```shell
$ marked -i readme.md -o readme.html
```

例子：

```shell
echo "**bold text example**" > readme.md

$ marked -i readme.md -o readme.html

$ cat readme.html
<p><strong>bold text example</strong></p>xxxxxxxxxx5 1echo "**bold text example**" > readme.md23$ marked -i readme.md -o readme.html4$ cat readme.html5<p><strong>bold text example</strong></p>
```



**Example with stdin input**

```shell
$ marked -o hello.html
hello world
^D

# 可以查看输出
$ cat hello.html
<p>hello world</p>
```



**Example with string input**

```shell
$ marked -s "*hello world*"

# 输出如下
<p><em>hello world</em></p>
```



**Print all options**

```shell
$ marked --help
```



### 浏览器

```html
<!doctype html>
<html>
<head>
  <meta charset="utf-8"/>
  <title>Marked in the browser</title>
</head>
<body>
  <div id="content"></div>
    
  <!-- 引入 -->
  <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
    
  <script>
    // ======================
    document.getElementById('content').innerHTML =
      marked.parse('# Marked in browser\n\nRendered by **marked**.');
    // ======================
  </script>
</body>
</html>
```



### Node.js

```javascript
import { marked } from 'marked';
// or const { marked } = require('marked');

const html = marked.parse('# Marked in Node.js\n\nRendered by **marked**.');
```



## 配置

### 参考配置

```javascript
// Create reference instance
import { marked } from 'marked';

// Set options
// `highlight` example uses https://highlightjs.org
marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: function(code, lang) {
    const hljs = require('highlight.js');
    const language = hljs.getLanguage(lang) ? lang : 'plaintext';
    return hljs.highlight(code, { language }).value;
  },
  langPrefix: 'hljs language-', // highlight.js css expects a top-level 'hljs' class.
  pedantic: false,
  gfm: true,
  breaks: false,
  baseUrl: null,
  sanitize: false,
  smartypants: false,
  xhtml: false
});

// Compile
console.log(marked.parse(markdownString));
```



### 配置项

| Member       | Type       | Default           | Notes                                                        |
| ------------ | ---------- | ----------------- | ------------------------------------------------------------ |
| async        | `boolean`  | `false`           | If true, `walkTokens` functions can be async and `marked.parse` will return a promise that resolves when all walk tokens functions resolve. |
| baseUrl      | `string`   | `null`            | A prefix url for any relative link.                          |
| breaks       | `boolean`  | `false`           | If true, add `<br>` on a single line break (copies GitHub behavior on comments, but not on rendered markdown files). Requires `gfm` be `true`. |
| gfm          | `boolean`  | `true`            | If true, use approved [GitHub Flavored Markdown (GFM) specification](https://github.github.com/gfm/). |
| headerIds    | `boolean`  | `true`            | If true, include an `id` attribute when emitting headings (h1, h2, h3, etc). |
| headerPrefix | `string`   | `''`              | A string to prefix the `id` attribute when emitting headings (h1, h2, h3, etc). |
| highlight    | `function` | `null`            | A function to highlight code blocks, see [Asynchronous highlighting](https://marked.js.org/using_advanced#highlight). |
| langPrefix   | `string`   | `'language-'`     | A string to prefix the className in a `<code>` block. Useful for syntax highlighting. |
| mangle       | `boolean`  | `true`            | If true, autolinked email address is escaped with HTML character references. |
| pedantic     | `boolean`  | `false`           | If true, conform to the original `markdown.pl` as much as possible. Don't fix original markdown bugs or behavior. Turns off and overrides `gfm`. |
| renderer     | `object`   | `new Renderer()`  | An object containing functions to render tokens to HTML. See [extensibility](https://marked.js.org/using_pro) for more details. |
| sanitize     | `boolean`  | `false`           | If true, sanitize the HTML passed into `markdownString` with the `sanitizer` function. **Warning**: This feature is deprecated and it should NOT be used as it cannot be considered secure. Instead use a sanitize library, like [DOMPurify](https://github.com/cure53/DOMPurify) (recommended), [sanitize-html](https://github.com/apostrophecms/sanitize-html) or [insane](https://github.com/bevacqua/insane) on the output HTML! |
| sanitizer    | `function` | `null`            | A function to sanitize the HTML passed into `markdownString`. |
| silent       | `boolean`  | `false`           | If true, the parser does not throw any exception.            |
| smartypants  | `boolean`  | `false`           | If true, use "smart" typographic punctuation for things like quotes and dashes. |
| tokenizer    | `object`   | `new Tokenizer()` | An object containing functions to create tokens from markdown. See [extensibility](https://marked.js.org/using_pro) for more details. |
| walkTokens   | `function` | `null`            | A function which is called for every token. See [extensibility](https://marked.js.org/using_pro) for more details. |
| xhtml        | `boolean`  | `false`           | If true, emit self-closing HTML tags for void elements (`<br/>`, `<img/>`, etc.) with a "/" as required by XHTML. |



### 扩展

```javascript
marked.use(扩展)
```

| Name                                                         | Package Name                                                 | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| [Admonition](https://www.npmjs.com/package/marked-admonition-extension) | [`marked-admonition-extension`](https://www.npmjs.com/package/marked-admonition-extension) | Admonition extension                                         |
| [Bidi](https://github.com/markedjs/marked-bidi)              | [`marked-bidi`](https://www.npmjs.com/package/marked-bidi)   | Add Bidirectional text support to the HTML                   |
| [Custom Heading ID](https://github.com/markedjs/marked-custom-heading-id) | [`marked-custom-heading-id`](https://www.npmjs.com/package/marked-custom-heading-id) | Specify a custom heading id in headings with the [Markdown Extended Syntax](https://www.markdownguide.org/extended-syntax/#heading-ids) `# heading {#custom-id}` |
| [Emoji](https://github.com/UziTech/marked-emoji)             | [`marked-emoji`](https://www.npmjs.com/package/marked-emoji) | Add emoji support like on GitHub                             |
| [Extended Tables](https://github.com/calculuschild/marked-extended-tables) | [`marked-extended-tables`](https://www.npmjs.com/package/marked-extended-tables) | Extends the standard Github-Flavored tables to support advanced features: Column Spanning, Row Spanning, Multi-row headers |
| [GFM Heading ID](https://github.com/markedjs/marked-gfm-heading-id) | [`marked-gfm-heading-id`](https://www.npmjs.com/package/marked-gfm-heading-id) | Use [`github-slugger`](https://github.com/Flet/github-slugger) to create the heading IDs and allow a custom prefix. |
| [Katex Code](https://github.com/UziTech/marked-katex-extension) | [`marked-katex-extension`](https://www.npmjs.com/package/marked-katex-extension) | Render [katex](https://katex.org/) code                      |
| [LinkifyIt](https://github.com/UziTech/marked-linkify-it)    | [`marked-linkify-it`](https://www.npmjs.com/package/marked-linkify-it) | Use [linkify-it](https://github.com/markdown-it/linkify-it) for urls |
| [Misskey-flavored Markdown](https://akkoma.dev/sfr/marked-mfm) | [`marked-mfm`](https://www.npmjs.com/package/marked-mfm)     | Custom extension for [Misskey-flavored Markdown](https://github.com/misskey-dev/mfm.js/blob/develop/docs/syntax.md). |



## 更多请访问官网文档