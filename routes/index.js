// TODO: implement HTTPS
const express = require("express");
const mcache = require("memory-cache");
const router = express.Router();
const indexController = require("../controllers/indexController");
const questionCategoryController = require("../controllers/questionController");

// TODO: does this caching works?
// Input from: https://medium.com/the-node-js-collection/simple-server-side-cache-for-express-js-with-node-js-45ff296ca0f0
const cache = duration => {
  return (req, res, next) => {
    let key = "__express__" + req.originalUrl || req.url;
    let cachedBody = mcache.get(key);
    if (cachedBody) {
      res.send(cachedBody);
      return;
    } else {
      res.sendResponse = res.send;
      res.send = body => {
        mcache.put(key, body, duration * 1000);
        res.sendResponse(body);
      };
      next();
    }
  };
};

//all routes
router.get("/", indexController.getIndex);
router.get("/category", cache(10), questionCategoryController.getIndex);
router.get("/category/:id", cache(10), questionCategoryController.getQuestions);
router.get("/category/:id/questions", cache(10), questionCategoryController.getQuestions);
router.get("/category/:id/questions/:id", cache(10), questionCategoryController.getQuestions);

module.exports = router;
