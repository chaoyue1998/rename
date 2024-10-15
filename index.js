// 查找examle 目录下所有.nfo文件
const path = require("path");
const fs = require("fs");
const glob = require("glob");
const config = require("./config");

const targetDir = config.targetDir;
console.log(`targetDir: ${targetDir}`);

const nfoFiles = glob.sync("*.nfo", { cwd: targetDir, nodir: true });

nfoFiles.forEach((nfoFile) => {
  // 新建nfoFile的前缀名称的文件夹
  const nfoFileDir = path.dirname(nfoFile);
  const nfoFileName = nfoFile.replace(/\.nfo$/, "");
  const newDir = path.join(targetDir, nfoFileDir, nfoFileName);
  fs.mkdirSync(newDir, { recursive: true });
  console.log(`mkdir ${newDir}`);

  // 匹配文件名以nfoFileName开头的任意文件，不递归文件夹
  const otherFiles = glob.sync(`${nfoFileName}*`, {
    cwd: targetDir,
    nodir: true,
  });
  otherFiles.forEach((otherFile) => {
    const otherFilePath = path.join(targetDir, otherFile);
    const newFilePath = path.join(newDir, path.basename(otherFile));
    // 剪切
    fs.renameSync(otherFilePath, newFilePath);
  });
});
