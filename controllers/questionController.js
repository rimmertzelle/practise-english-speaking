//import Airtable from "airtable";
const Airtable = require("airtable");
require('dotenv').config({ path: 'variables.env' });
const airtableKey = process.env.AIRTABLE_API;
const airtableBase = process.env.AIRTABLE_BASE;

const base = new Airtable({ apiKey: airtableKey }).base(
  airtableBase
);

exports.getQuestions = (req, res) => {
  console.log("req id", req.params.id);
  Promise.all([
    getAllImagesFromCategory(req.params.id),
    getAllCategories(),
    getAllQuestionsFromCategory(req.params.id)
  ]).then(([images, categories, questions]) => {
    res.render("questions", { images, categories, questions });
  });
};

exports.getIndex = (req, res) => {
  //   let images = getAllImagesFromCategory().then(function(result) {
  //     console.log("Result", result);
  //   });
  // first get all images
  // than get all
  // Promise.resolve(getAllImagesFromCategory("nerd")).then(function(data) {
  //   console.log('data', data);
  //   res.render("questions", { data });
  // });
  Promise.all([getAllCategories()]).then(([categories]) => {
    res.render("categories", { categories });
  });
};

const getAllImagesFromCategory = category => {
  return new Promise((resolve, reject) => {
    let questions = [];
    base("images")
      .select({
        // Selecting the first 3 records in Grid view:
        filterByFormula: `{Category} = "${category}"`,
        view: "Grid view"
      })
      .eachPage(
        function page(records, fetchNextPage) {
          records.forEach(function(record) {
            console.log("Retrieved", record.get("Number", "Attachments"));
            questions.push({
              id: record.get("Number"),
              questionNumber: record.get("Question"),
              url: record.get("Attachments")[0].url,
              cat: record.get("Category")
            });
          });
          fetchNextPage();
        },
        function done(err) {
          if (err) {
            console.error(err);
            return;
          }
          resolve(questions);
        }
      );
  });
};

const getAllCategories = () => {
  return new Promise((resolve, reject) => {
    let categories = [];
    base("categories")
      .select({
        // Selecting the first 3 records in Grid view:
        view: "Grid view"
      })
      .eachPage(
        function page(records, fetchNextPage) {
          records.forEach(function(record) {
            categories.push({
              id: record.get("Number"),
              description: record.get("Description")
            });
          });
          fetchNextPage();
        },
        function done(err) {
          if (err) {
            console.error(err);
            return;
          }
          resolve(categories);
        }
      );
  });
};

const getAllQuestionsFromCategory = (category) => {
  return new Promise((resolve, reject) => {
    let questions = [];
    base("questions")
      .select({
        // Selecting the first 3 records in Grid view:
        filterByFormula: `{Category} = "${category}"`,
        view: "Grid view"
      })
      .eachPage(
        function page(records, fetchNextPage) {
          records.forEach(function(record) {
            questions.push({
              id: record.get("Number"),
              description: record.get("Description"),
              category: record.get("Category"),
              duration: record.get("Duration")
            });
          });
          fetchNextPage();
        },
        function done(err) {
          if (err) {
            console.error(err);
            return;
          }
          console.log(questions);
          resolve(questions);
        }
      );
  });
};