const fs = require("fs");
const path = require("path");
let jsonMap = {};
function getLangJson(filePath) {
  let files = fs.readdirSync(filePath);
  files.forEach(async (item) => {
    const folderName = item;
    const folderPath = `${filePath}/${folderName}`;
    let folderKey = {
      zh: [],
      en: [],
    };
    const data = fs.statSync(folderPath);
    if (!data.isFile()) {
      jsonMap[folderName] = {
        zh: {},
        en: {},
      };
      childFiles = fs.readdirSync(folderPath);
      childFiles.forEach((file) => {
        if (path.extname(file) == ".json") {
          let data = JSON.parse(
            fs.readFileSync(`${folderPath}/${file}`, "utf-8")
          );
          Object.keys(data).forEach((it) => {
            Object.keys(data[it]).forEach((i) => {
              if (folderKey[it].includes(i)) {
                console.error(`文件夹${folderName}的${it}对象里的${i}存在重复`);
              }

              if (["zh"].includes(it)) {
                folderKey[it].push(i);
              }

              if (["en"].includes(it)) {
                folderKey[it].push(i);
              }
            });
            Object.assign(jsonMap[folderName][it], data[it]); 
          });
        }
      });
    }
  });
  process.env.VUE_APP_LOCALMODELJSON = JSON.stringify(jsonMap);
}
module.exports = {
  getLangJson,
};
