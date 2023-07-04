## 国际化配置

```
├─src
    ├─locales
    |       ├─modules  // 模块文件夹(业务模块文件夹)
    |       |
    |       ├─ test  // test模块
    |       |     └─ test.json
    |       |
    |       └─ test.json  // test模块集合，会合并test文件夹下的json文件，所以这个（test.json）名称要与test）文件夹一致
    |       ├─ ZH-CN // 项目中文公共国际化配合配置文件
    |       └─ US-EN // 项目英文公共国际化配合配置文件
    └─index.js // 加载国际化入口

1. modules 文件夹下（一级目录）分两种: 一种是文件夹，一种是json文件。
2. modules 文件夹下（一级目录）的json文件作为模块，会以json文件名找到相同名称的文件夹，对文件夹下的json文件进行合并操作。
3. 文件夹内的合并机制是对象合并原理，在一级目录的json和处理后的文件夹下的json集合进行合并时，以一级目录的json为主。
4. 建立新模块时，modules下建一个json文件名称要与文件夹名称相同才能达到合并效果
5. 使用规则: US-EN、ZH-CN 文件夹下 $t('国际化key'),modules文件夹下，json文件->$t('json文件名.定义key')，文件夹内json->$('文件夹名.定义key')
6. 注意：本地调试，在modules文件夹内下的子文件夹内的json改动或新增时，必须要重新启动前端项目。

以上的json文件必须使用以下格式（例如：user.json）：
{
  zh:{},
  en:{}
}

```
