# perf-test

## 简介

性能测试，控制台查看测试结果。

## 下载

```bash
npm install perf-test -D
```

## 使用

```js
import perfTest from "perf-test";

function exec(label) {
  perfTest.start(label);
  // 某些操作
  perfTest.end(label);
}

// 测试10次
perfTest(10, (i) => {
  exec(`测试${i + 1}`);
});
```
