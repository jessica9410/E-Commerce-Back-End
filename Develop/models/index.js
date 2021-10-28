// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsToCategory(Category,{
  foreignKey:'category_id'
});
 
// Categories have many Products
Category.hasManyProducts(Product,{
  foreignKey:'category_id'
});
// Products belongToMany Tags (through ProductTag)
Product.belongToManyTags(Tags, {
  through:'ProductTag',
  foreignKey:'product_id'

});
// Tags belongToMany Products (through ProductTag)
Tag.belongToManyProducts(Product, {
  through:'ProductTag',
  foreignKey:'tag_id'
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
