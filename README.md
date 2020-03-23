# Lab-Monitor

## 執行方法

本機端如果有 node 環境的話可以直接開啟 dev server，然後透過 local port fowarding 連到遠端 Server：

```sh
# 啟用 dev server
npm run serve

# ssh port fowarding
# 遠端 Server ip 跟 user 跟 port 要修改成最終版本
ssh -NL 9000:localhost:9000 -p 5502 retro9@140.114.91.173
```

