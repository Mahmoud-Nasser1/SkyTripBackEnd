const { featuredDestinations } = require("../../model/featuredData.js");

// GET Featured
const getFeatured = (req, res) => {
  res.json({ featured: featuredDestinations });
};

// PUT Featured
const updateFeatured = (req, res) => {
  const { featured } = req.body;
  if (!Array.isArray(featured)) {
    return res.status(400).json({ message: "Invalid data" });
  }

  featuredDestinations.length = 0;
  featured.forEach(id => featuredDestinations.push(id));

  res.json({ message: "Featured updated successfully" });
};

module.exports = { getFeatured, updateFeatured };
