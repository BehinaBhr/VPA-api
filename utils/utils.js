// helper function to extract the File ID from the sharable Google Drive link.
const FormatImg = (image) => {
  const regex = /\/d\/(.*?)\/view/;
  const matches = image.match(regex);
  return matches ? matches[1] : null;
};

// helper function to extract the folder ID from the sharable Google Drive link.
const FormatSrc = (src) => {
  const match = src.match(/\/folders\/([^?]+)/);
  return match ? match[1] : null;
};

module.exports = {
  FormatImg,
  FormatSrc,
};
