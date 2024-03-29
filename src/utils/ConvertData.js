export const convertJsonToFormData = (data) => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => {
    if (data[key] !== null && data[key] !== undefined)
      formData.append(key, data[key]);
  });
  return formData;
};

export const removeVietnameseTones = (str) => {
  // eslint-disable-next-line
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  // eslint-disable-next-line
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  // eslint-disable-next-line
  // eslint-disable-next-line
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  // eslint-disable-next-line
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  // eslint-disable-next-line
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  // eslint-disable-next-line
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  // eslint-disable-next-line
  str = str.replace(/đ/g, "d");
  // eslint-disable-next-line
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  // eslint-disable-next-line
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  // eslint-disable-next-line
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  // eslint-disable-next-line
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  // eslint-disable-next-line
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  // eslint-disable-next-line
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  // eslint-disable-next-line
  str = str.replace(/Đ/g, "D");
  // eslint-disable-next-line
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, "");
  // eslint-disable-next-line
  str = str.replace(/\u02C6|\u0306|\u031B/g, "");
  // eslint-disable-next-line
  str = str.replace(/ + /g, " ");
  str = str.trim();
  str = str.replace(
  // eslint-disable-next-line
    /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
    " "
  );
  return str;
};
export const generateSemesters = () => {
  const currentYear = new Date().getFullYear();
  const semesters = [];

  for (let year = currentYear - 10 + 1; year <= currentYear; year++) {
    for (let semester = 1; semester <= 3; semester++) {
      semesters.push(`${year}.${semester}`);
    }
  }
  return semesters.reverse();
};
