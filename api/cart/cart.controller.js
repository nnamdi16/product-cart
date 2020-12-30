const {
  addToCart,
  getCart,
  // get,
  // update,
  // delete: deleteHero
} = require("./cart.dao");
const {getProductById} = require('../products/products.dao')

exports.addToCart = async  (req, res, next) => {
  const { productId, quantity, productType, price } = req.body;
  console.log(productId);
  let check;
   await getProductById(productId, (err, productDetail) => {
     check = productDetail;
    if (!productDetail) {
      return res.json({
        error:true,
        message:'Product does not exist'
      })
    }

  });
  console.log(check);
  return check;
  
  // addToCart(productId, (err, productCart) => {
  //   if (err) {
  //     res.json({
  //       error: err
  //     });
  //   }
  //   res.json({
  //     message: "Product added to cart successfully"
  //   });
  // });
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

exports.updateCart = function(req, res, next) {
  const { name, description } = req.body;
  update({ _id: req.params.id }, { name, description }, function(err, hero) {
    if (err) {
      res.json({
        error: err
      });
    }
    res.json({
      message: "Hero updated successfully"
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
