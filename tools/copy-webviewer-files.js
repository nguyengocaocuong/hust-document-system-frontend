const fs = require('fs-extra');

const copyFiles = async () => {
  try {
    await fs.copy('./app/node_modules/@pdftron/webviewer/public', './public/lib');
  } catch (err) {
    console.error(err);
  }
};

copyFiles();