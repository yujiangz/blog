- [nodejs 中文网](https://nodejs.cn/api/)



## [Buffer](https://nodejs.org/dist/latest-v20.x/docs/api/buffer.html)

## [File system](https://nodejs.org/dist/latest-v20.x/docs/api/fs.html)

|               |                                  | 同步                          |      |
| ------------- | -------------------------------- | ----------------------------- | ---- |
|               | fs.writeFile()                   |                               |      |
|               | fs.appendFile(data, [, options]) |                               |      |
|               | fs.readFile()                    | fs.readFileSync()             |      |
| 重命名 / 移动 | fs.rename()                      | fs.renameSync()               |      |
|               | fs.unlink() / fs.rm()            | fs.unlinkSync() / fs.rmSync() |      |
|               | fs.mkdir()                       |                               |      |
|               | fs.readdir()                     |                               |      |
|               | fs.rmdir()                       |                               |      |
|               | fs.stat()                        | fs.statSync()                 |      |
|               |                                  |                               |      |





文件流式操作

- fs.createWriteStrem()
- fs.createReadStrem()
- fs.close()

```js
const fs = require("fs");

const rs = fs.createReadStream("/test.txt");

rs.on("data", (chunk) => {
  console.log(chunk); // 65536 字节，64KB
});

// 可选
rs.on('end', ()=>{
    // ...
})

```



## [Path](https://nodejs.org/dist/latest-v20.x/docs/api/path.html)

- path.resolve()

- path.sep

- path.pase()

- path.basename()

- path.dirname()

- path.extname()


```js
const path = require('path');

console.log(path.resolve(__dirname, "test.txt"));
console.log(__filename)
```



## [http 协议](https://nodejs.org/dist/latest-v20.x/docs/api/http.html)

- [fiddler](https://www.telerik.com/fiddler)

```js
const http = require("http");
const server = http.createServer((req, res) => {
  /* =============  requestion ============== */
  //   console.log(req.url);
  //   console.log(req.method);
  //   console.log(req.headers);
  //   console.log(req.httpVersion);

  let body = "";
  req.on("data", (chunk) => {
    body += chunk;
  });
  req.on("end", () => {
    console.log(body);
    res.end("ok");
  });

  /* =============  response ============== */
  // 响应头
  res.setHeader("Content-Type", "text/html;chartset=utf-8");
  // 响应体
  res.end("Hello World");
});

// 监听端口，开启服务
// http 默认端口 80，https 默认端口 443
server.listen(3000, () => {
  console.log("listening on port 3000");
});
```



## [URL](https://nodejs.org/dist/latest-v20.x/docs/api/url.html)

```js
const http = require("http");
const url = require("url");

const server = http.createServer((req, res) => {
  const url = new URL(req.url, "http://localhost:3000");
  console.log(url);

  res.end("Hello World");
});

server.listen(3000, () => {
  console.log("Server listening on port 3000");
});
```



