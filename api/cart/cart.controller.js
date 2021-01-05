const {
  addToCart,
  getCart,
  // get,
  updateCart,
  // delete: deleteHero
} = require("./cart.dao");
const {getPriceById} = require('../price/price.dao');

exports.addToCart = async  (req, res, next) => {
  try {
    addToCart(req.body, (err,cart) => {
      console.log(err);
      if (err) {
       return  res.json({
          error:err
        })
      }
     return  res.json({
        message:'Product successfully added to cart'
      })
    })
 
  } catch (error) {
    return res.status(500).json({error:error.toString()});
  }
};

// exports.getCartDetails = async (req, res, next) => {
//   const name = req.params.name;
 
//   await getPrice({ name }, function(err, heros) {
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

exports.getCartDetails = async function(req, res, next) {
  await getCart({}, function(err, cartDetails) {
    if (err) {
      res.json({
        error: err
      });
    }
    res.json({
      cartDetails
    });
  });
};

exports.updateCart = (req, res, next) => {
  const { quantity, reduce } = req.body;
  updateCart({ _id: req.params.id }, { quantity }, reduce ,  function(err, cart) {
    if (err) {
      res.json({
        error: err
      });
    }
    res.json({
      message: "Cart updated successfully"
    });
  });
};

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
