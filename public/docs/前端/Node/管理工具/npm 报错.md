## 安装后

### `Use --location=global instead`

```
npm WARN config global `--global`, `--local` are deprecated. Use `--location=global` instead.
```

在 node 的安装路径内修改以下文件：

**npm 文件**：需要修改第 23 行： `prefix -g` 为 `prefix --location=global`

```
NPM_PREFIX=`"$NODE_EXE" "$NPM_CLI_JS" prefix --location=global` 
```

**npm.cmd 文件**：需要修改第 12 行： `prefix -g` 为 `prefix --location=global`

```
FOR /F "delims=" %%F IN ('CALL "%NODE_EXE%" "%NPM_CLI_JS%" prefix --location=global') DO (
  SET "NPM_PREFIX_NPM_CLI_JS=%%F\node_modules\npm\bin\npm-cli.js"
)
```

