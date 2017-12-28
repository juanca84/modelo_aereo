const fs = require('fs');
const path = require('path');
const consign = require('consign');

console.log("Cargando archivos BLS");
const bls = {};
module.exports = app => {
  const dirBls = path.join(__dirname, "bls");
  consign({verbose:false});
  fs.readdirSync(dirBls).forEach(dir => {
    if (fs.statSync(`${dirBls}/${dir}`).isDirectory()) {
      const subDirModels = path.join(dirBls, dir);
      fs.readdirSync(subDirModels).forEach(file => {
        const pathFile = path.join(subDirModels, file);
        const result = file.replace(/\.[^/.]+$/, "");
        bls[result] = require(pathFile);
      });
    }
  });

  return bls;
};
