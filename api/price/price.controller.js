const {
  createPrice,
  getPrice,
  // get,
  // update,
  // delete: deleteHero
} = require("./price.dao");

exports.createProductPrice = (req, res, next) => {
  const { name, description } = req.body;
  const productPrice = {
    name,
    description
  };
  createPrice(productPrice, (err, hero) => {
    if (err) {
      res.json({
        error: err
      });
    }
    res.json({
      message: "Product price created successfully"
    });
  });
};

exports.getProductPrice = async function(req, res, next) {
  const name = req.params.name;
 
  await getPrice({ name }, function(err, heros) {
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

// exports.getHeros = async function(req, res, next) {
//   await get({}, function(err, heros) {
//     if (err) {
//       res.json({
//         error: err
//       });
//     }
//     res.json({
//       heros
//     });
//   });
// };

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
