const { FormatImg } = require("../utils/utils");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("events")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("events").insert([
        {
          image: FormatImg("https://drive.google.com/file/d/1BXSDkTHinUPh8UvzF6im15jEX35QELjK/view?usp=sharing"),
          title: "Celebration of the Persian New Year",
          date: "2016-04-10",
          time: "6-9 pm",
          location: "Coalharbour CC at 480 Broughton St.Vancouver V6G 3H",
          topic: "Contemporary Applications of Persian Architectural Values.",
          host: "Babak Naderi Azad",
          additional_info: "",
          fee: 15.0,
        },
        {
          image: FormatImg("https://drive.google.com/file/d/1d6NjH4hx7nJKtnpmaHP1k6a7V85jZfa4/view?usp=sharing"),
          title: "The Role of An Architect in Green Buildings",
          date: "2016-11-17",
          time: "6:30-9:30 pm",
          location: "Kabuni Studio at 1378 W Pender, Vancouver",
          topic: "Contemporary Applications of Persian Architectural Values.",
          host: "Dr Homayoon Arbabain",
          additional_info: "",
          fee: 5.0,
        },
        {
          image: FormatImg("https://drive.google.com/file/d/1xIjxBMc3f1gvWfXMCMObSvfL8M12PfWK/view?usp=sharing"),
          title: "Word of The Day: Carbon Footprint",
          date: "2017-06-20",
          time: "6-8 pm",
          location: "Tractor Everyday Healthy Foods at 335 Burrard St, Vancouver",
          topic: "Contemporary Applications of Persian Architectural Values.",
          host: "",
          additional_info: "",
          fee: 7.5,
        },
        {
          image: FormatImg("https://drive.google.com/file/d/1kMvSK-nN5zhQxkqcw5t7TehQE8jW5pX8/view?usp=sharing"),
          title: "Summer Social Walk & Talk On Gastown",
          date: "2017-08-10",
          time: "6-8 pm",
          location: "10 Water St, Vancouver",
          topic: "",
          host: "",
          additional_info: "Meetup point at 6pm. Walking tour starts at 6:30pm",
          fee: 0.0,
        },
        {
          image: FormatImg("https://drive.google.com/file/d/12v40CVjnW1NqQJ74T6W2q6HFYgsfThIk/view?usp=sharing"),
          title: "Celebration of Yalda 2017",
          date: "2017-12-11",
          time: "6-8:30 pm",
          location: "Brooks Corning Office at #200, 380 W 2nd Ave, Vancouver",
          topic: "Storytelling Night about your experience at work",
          host: "",
          additional_info: "",
          fee: 10.0,
        },
        {
          image: FormatImg("https://drive.google.com/file/d/1xQVY9uBabbTFdGnApFOySvie9jko7Ns5/view?usp=sharing"),
          title: "Spring Social Night",
          date: "2018-04-23",
          time: "6-8:30 pm",
          location: "ALMA ROOM at VANCOUVER PUBLIC LIBRARY",
          topic: "Question & Answer Session",
          host: "Mojan Nozari",
          additional_info: "",
          fee: 10.0,
        }
      ]);
    });
};
