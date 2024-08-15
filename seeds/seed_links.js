/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("links").del();
  await knex("links").insert([
    {
      id: 1,
      group_name: "Organizations",
      href: "http://aibc.ca/",
      title: "Architectural Institute of British Columbia",
    },
    {
      id: 2,
      group_name: "Organizations",
      href: "http://raic.org/bc",
      title: "Royal Architectural Institute of Canada – BC Chapter",
    },
    { id: 3, group_name: "Organizations", href: "https://wcevancouver.com/", title: "Women in Consulting Engineering" },
    { id: 4, group_name: "Organizations", href: "https://sala.ubc.ca/", title: "UBC SALA" },
    { id: 5, group_name: "Organizations", href: "https://www.linkbcit.ca/", title: "BCIT LINK" },
    { id: 6, group_name: "Organizations", href: "http://constructionwomen.org/", title: "Canadian Construction Women" },
    { id: 7, group_name: "Organizations", href: "http://wievr.ca/", title: "Women in Engineering (Vancouver Region)" },
    {
      id: 8,
      group_name: "Organizations",
      href: "http://idibc.org/",
      title: "Interior Design Institute of British Columbia",
    },
    {
      id: 9,
      group_name: "Organizations",
      href: "http://lohavancouver.org/",
      title: "Laboratory of Housing Alternatives",
    },
    { id: 10, group_name: "Organizations", href: "http://passivehouse.ca/", title: "Canadian Passive House Institute" },
    {
      id: 11,
      group_name: "Organizations",
      href: "http://architecturefoundationbc.ca/",
      title: "Architecture Foundation of British Columbia",
    },
    {
      id: 12,
      group_name: "Organizations",
      href: "http://vancouverheritagefoundation.org/",
      title: "Vancouver Heritage Foundation",
    },
    { id: 13, group_name: "Organizations", href: "http://heritagevancouver.or/", title: "Heritage Vancouver Society" },
    { id: 14, group_name: "Organizations", href: "http://www.beatoronto.com/", title: "BEA Toronto" },
    {
      id: 15,
      group_name: "Organizations",
      href: "http://idibc.org",
      title: "Interior Design Institute of British Columbia",
    },
    {
      id: 16,
      group_name: "Diversity and Inclusivity in Architecture",
      href: "http://raicep.ca/en/research",
      title: "RAICEP",
    },
    {
      id: 17,
      group_name: "Diversity and Inclusivity in Architecture",
      href: "https://www.casa-acea.org/blog-1/2020/6/4/diversity-resources",
      title: "CASA Diversity Resources",
    },
    {
      id: 18,
      group_name: "News in Architecture",
      href: "https://www.linkbcit.ca/magazine/",
      title:
        "“Get out there” article by Merceditas Muñoz and Catherine Sohit on the November 2021 issue of BCIT’ LINK Magazine (page 16 – 17)",
    },
    {
      id: 19,
      group_name: "News in Architecture",
      href: "https://www.linkbcit.ca/magazine/",
      title: "“Summer days in the city” by Catherine Sohit, on BCIT LINK Magazine (page 27-32)",
    },
  ]);
};
