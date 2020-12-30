const {
  createProductCategory,
  getProductCategory,
  getProductCategoryByName,
  // update,
  // delete: deleteHero
} = require("./productCategory.dao");

exports.createProductCategory = function(req, res, next) {
  const { name, description } = req.body;
  const productCategory = {
    name,
    description
  };
  createProductCategory(productCategory, function(err, hero) {
    if (err) {
      res.json({
        error: err
      });
    }
    res.json({
      message: "Hero created successfully"
    });
  });
};

exports.getProductCategoryByName = async function(req, res, next) {
  const name = req.params.name;
 
  await getProductCategoryByName({ name }, function(err, heros) {
    if (err) {
      res.json({
        error: err
      });
    }
    res.json({
      heros
    });
  });
};

exports.getProductCategory = async function(req, res, next) {
  await getProductCategory({}, function(err, heros) {
    if (err) {
      res.json({
        error: err
      });
    }
    res.json({
      heros
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
