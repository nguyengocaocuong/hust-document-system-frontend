import fs from "fs-extra";

const copyFiles = async () => {
  try {
    await fs.copy("./node_modules/@pdftron/webviewer/public", "./public/lib");
  } catch (err) {
    console.error(err);
  }
};

copyFiles();
