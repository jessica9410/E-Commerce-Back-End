const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');
const sequelize = require('../../config/connection');
// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  // find all products
  // be sure to include its associated Category and Tag data
  try {
    const productData = await Product.findAll({
      include: [{model: Category}],
    });
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get one product
// find a single product by its `id`
// be sure to include its associated Category and Tag data
  router.get('/:id', async (req, res) => {
    try {
      const productData = await Product.findByPk(req.params.id, {
        include: [{model: Category}],
      });
      if (!productData) {
        res.status(404).json({ message: 'No product found with this id!'});
        return;
      }
      res.status(200).json(productData);
    } catch (err) {
      res.status(500).json(err);
    }
});

// create new product
router.post('/', async (req, res) => {
  try {
    const newProductData = await Product.create(req.body);
    res.status(200).json(newProductData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE a reader
router.delete('/:id', async (req, res) => {
  // delete one product by its `id` value
  try{
  const productData = await Product.destroy({
    where: {
     id: req.params.id,
    },
  });
if(!productData) {
  res.status(400).json({message:'No product found witht that id'});
  return;
}
res.status(200).json(productData);
} catch (err){
  res.status(500).json(err);
}
});

module.exports = router;