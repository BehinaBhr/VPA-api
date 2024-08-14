
// helper function to extract the File ID from the sharable Google Drive link.
const FormatImg = (image) => {
  const regex = /\/d\/(.*?)\/view/;
  const matches = image.match(regex);
  return matches ? matches[1] : null;
};

module.exports = {
  FormatImg,
};
