npm run build

cd dist

echo "yustudy.cn" > CNAME

echo "" > .nojekyll

# 不能直接 commit -a，否则 CNAME 与 .nojekyll 文件会被忽略
# 待补充
 git add -A

git commit -m "deploy"

git push -f
