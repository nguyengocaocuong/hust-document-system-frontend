import pdf from "../assets/images/icon/pdf.png";
import ppt from "../assets/images/icon/ppt.png";
import azure from "../assets/images/icon/azure.png";
import csv from "../assets/images/icon/csv.png";
import doc from "../assets/images/icon/doc.png";
import docx from "../assets/images/icon/doc.png";
import drive from "../assets/images/icon/drive.png";
import folder from "../assets/images/icon/folder.png";
import image from "../assets/images/icon/image.png";
import link from "../assets/images/icon/link.png";
import github from "../assets/images/icon/github.png";
import html from "../assets/images/icon/html.png";
import xlsx from "../assets/images/icon/xlsx.png";
import office from "../assets/images/icon/office.png";
import xls from "../assets/images/icon/xls.png";
import unknown from "../assets/images/icon/unknown.png";
const ICON = {
  pdf,
  ppt,
  azure,
  csv,
  doc,
  docx,
  drive,
  folder,
  link,
  github,
  html,
  xlsx,
  office,
  xls,
  png: image,
  jpg: image,
  jpeg: image,
  pptx: ppt,
  unknown,
};
export const getIconForDocByFileName = (fileName) =>
  ICON[fileName.substring(fileName.lastIndexOf(".") + 1)];
export const getIconForDocByLink = (link = "link") => ICON[link];
