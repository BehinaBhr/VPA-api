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

// helper function to group the links by `group_name`.
const GroupedLinks = (links) => {
  const groupedLinks = {};

  links.forEach((link) => {
    const { group_name } = link;
    // Create a new group if it doesn't exist
    if (!groupedLinks[group_name]) {
      groupedLinks[group_name] = [];
    }
    // Add the link to the corresponding group
    groupedLinks[group_name].push(link);
  });

  return groupedLinks;
};

module.exports = {
  FormatImg,
  FormatSrc,
  GroupedLinks,
};
