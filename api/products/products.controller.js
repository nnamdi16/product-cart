const {
  createProduct,
  getProducts,
  getProductByName,
} = require("./products.dao");

exports.createProduct = (req, res, next) => {
  const { name, description, productPictureUrl, productTypes, quantityInStock, ratings, price, productCategoryId} = req.body;
  const productDetails = {
    name,
    description,
    productPictureUrl,
    productTypes,
    quantityInStock,
    productCategoryId,
    ratings,
    price
  };

  createProduct(productDetails, (err, products) => {
    if (err) {
      res.json({
        error: err
      });
    }
    res.json({
      message: "Product created successfully"
    });
  });
};

exports.getProductByName = async function(req, res, next) {
  const name = req.params.name;
 
  await getProductByName({ name }, (err, products) => {
    if (err) {
      res.json({
        error: err
      });
    }
    res.json({
      products
    });
  });
};

exports.getProducts = async function(req, res, next) {
  await getProducts({}, function(err, products) {
    if (err) {
      res.json({
        error: err
      });
    }
    res.json({
      products
    });
  });
};

// exports.updateHero = function(req, res, next) {
//   const { name, description } = req.body;
//   update({ _id: req.params.id }, { name, description }, function(err, hero) {
//     if (err) {
//       res.json({
//         error: err
//       });
//     }
//     res.json({
//       message: "Hero updated successfully"
//     });
//   });
// };

// exports.removeHero = function(req, res, next) {
//   deleteHero({ _id: req.params.id }, function(err, hero) {
//     if (err) {
//       res.json({
//         error: err
//       });
//     }

//     res.json({
//       message: "Hero deleted successfully"
//     });
//   });
// };
