const {
  Model,
  DataTypes
} = require('sequelize');


class ProductTag extends Model {}

ProductTag.init({
  // define columns
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  product_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'product',
      key: 'id',
      unique: false
    }
  },
  tag_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'tag',
      key: 'id',
      unique: false
    }
  }
}, {
  sequelize,
  timestamps: false,
  freezeTableName: true,
  uderscored: true,
  modelName: 'product_tag',
});

module.exports = ProductTag;