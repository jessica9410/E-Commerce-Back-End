const router = require('express').Router();
const { Tag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
     const tagData = await Tag.findAll({
       include: [{modelName: Tag}],
     });
     res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});


  // find a single tag by its `id`
  // be sure to include its associated Product data
  router.get('/:id', async (req, res) => {
    try {
      const tagData = await Tag.findOne(req.params.id, {
        include: [{modelName: Tag}]
      });
      if (!tagData) {
        res.status(404).json({ message: 'No tag found with this id!'});
        return;
      }
      res.status(200).json(tagData);
    } catch (err) {
      res.status(500).json(err);
    }
});

router.post('/', (req, res) => {
  // create a new tag
  try {
    const tagData = await Tag.create({
      tag_id: req.body.tag_id,
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagData = await Tag.update(req.body, {
    where: {id : req.params.id }
  });
  if(!tagData) {
    res.status(400).json({message: 'No tag found with this id!'});
    return;
  }
} catch (err) {
  res.status(500).json(err);
}
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  const tagData = await Tag.destroy({
    where: {
      tag_id: req.params.id,
    },
  });
  return res.json(tagData)
});

module.exports = router;