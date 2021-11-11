const router = require('express').Router();
const { Tag, Product, ProductTag} = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  let result = await Tag.findAll({
    include: [{model:Product}]
  })

  res.json(result)
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  let result = await Tag.findOne({
    where: {id: req.params.id},
    include: [{model:Product}]
  })

  res.json(result)
});

router.post('/', async (req, res) => {
  // create a new tag
  let result = await Tag.create(req.body)
  res.json(result)
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  let [result] = await Tag.update(req.body, {
    where: {id: req.params.id}
  })
  res.send(`${result} Tag(s) updated`)
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  let links = await ProductTag.findAll({
    where: {    tagId: req.params.id
  }})
  
  let numberDestroyed = await Tag.destroy({
    where: {id: req.params.id}
  })

  if (numberDestroyed) {
    res.send(`Tag ${req.params.id} deleted. ${links.length} Links deleted.`)
  } else {
    res.send('Could not find tag with that ID')
  }
});

module.exports = router;