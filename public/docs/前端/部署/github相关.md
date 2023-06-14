## github 不读取 `_` 开头的文件

如 `next` 打包为静态页面，将产生会生成文件夹 `_next`，github 由于是 `jekyll` 构建的，会忽略 `_` 开头的文件夹，需要在根目录创建文件 `.nojekyll`