// helper function to extract the File ID from the sharable Google Drive link
const FormatImg = (image) => {
  const regex = /\/d\/(.*?)\/view/;
  const matches = image.match(regex);
  return matches ? matches[1] : null;
};

// helper function to extract the folder ID from the sharable Google Drive link
const FormatSrc = (src) => {
  const regex = /\/folders\/([^?]+)/;
  const matches = src.match(regex);
  return matches ? matches[1] : null;
};

// helper function to validate the links href as a vilid url
const ValidateHref = (href) => {
  const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
  return urlPattern.test(href);
};

module.exports = {
  FormatImg,
  FormatSrc,
  ValidateHref,
};
