/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
var _ = require('lodash');
var User = require('../api/user/user.model');
var Project = require('../api/project/project.model');
var ProductGroup = require('../api/productGroup/productGroup.model');
var Product = require('../api/product/product.model');
var async = require('async');

// User.find({}).remove(function() {
//   User.create({
//     provider: 'local',
//     name: 'Test User',
//     email: 'test@test.com',
//     password: 'test'
//   }, {
//     provider: 'local',
//     role: 'admin',
//     name: 'Admin',
//     email: 'admin@admin.com',
//     password: 'admin'
//   }, {
//     provider: 'local',
//     role: 'admin',
//     name: 'Vinesh',
//     email: 'vinesh@admin.com',
//     password: '123123'
//   }, function() {
//       console.log('finished populating users');
//     }
//   );
// });

/* async.waterfall([
    function (callback) {
        // remove all product, product groups and projects
        Product.find({}).remove(function(err){
          console.log('1');
          if(err) {
            console.log('err in deleting Products');
            return callback(err);
          }
          ProductGroup.find({}).remove(function(err) {
            if(err) {
              console.log('err in deleting ProductGroups');
              return callback(err);
            }
            Project.find({}).remove(function(err){
              if(err) {
                console.log('err in deleting Projects');
                return callback(err);
              }
              callback(null, 'success')
            })
          });
        });
    }, function(result, callback) {
      console.log('2');
      Product.create([{
        name: "Swim suit top",
        subtitle: "A glamorous swim suit top",
        makeThisYourLookURL: "http://www.amazon.com/Luli-Fama-Womens-Caracol-Triangle/dp/B00GG7T8CW/ref=cts_ap_4_cts",
        description: "Bring a little glamour to the deck or the dock. Our Beach Club collection is sure to turn heads with rich colors and chic details. Bikini Top has a flattering sweetheart neckline with removable straps to create a different look (and to prevent tan lines). 74% nylon/26% spandex. Hand wash. Imported.",
        price: 39.95,
        sizes: [ "XS", "S", "M",  "L" ],
        colors: [],
        reviews: [
          {
            title: "Excellent",
            rating: 5,
            text: "Excellent."
          },
          {
            title: "Great...",
            rating: 4,
            text: "Great."
          },
          {
            title: "Good...",
            rating: 3,
            text: "Good."
          },
          {
            title: "Blah...",
            rating: 2,
            text: "Blah."
          }
        ]
      },
      {
        name: "Swim suit bottom",
        subtitle: "The perfect swim suit bottom",
        makeThisYourLookURL: "http://www.amazon.com/Luli-Fama-Womens-Caracol-Triangle/dp/B00GG7T8CW/ref=cts_ap_4_cts",
        description: "A cheeky bikini bottom featuring a vibrant floral print and ruffle trim. Elasticized trim. Fully lined. Minimal coverage. Knit. Machine wash cold, dry flat. Imported.",
        price: 49.95,
        sizes: [ "XS", "S", "M", "L" ],
        colors: [],
        reviews: [
          {
            rating: 5,
            text: "Excellent."
          },
          {
            rating: 4,
            text: "Great."
          },
          {
            rating: 3,
            text: "Good."
          },
          {
            rating: 2,
            text: "Meh."
          }
        ]
      },
      {
        name: "High heel shoes",
        subtitle: "A great pair of shoes",
        makeThisYourLookURL: "http://www.amazon.com/Luli-Fama-Womens-Caracol-Triangle/dp/B00GG7T8CW/ref=cts_ap_4_cts",
        description: "Reach new heights of style in Rachel Zoe's skyscraper platform sandals, with retro-now styling that will work with all your day and night faves. Imported.",
        price: 99.95,
        sizes: [ "7", "8", "9", "10" ],
        colors: [ "#c45b27", "#000000" ],
        reviews: [
          {
            title: "Excellent",
            rating: 5,
            text: "Excellent."
          },
          {
            title: "Great...",
            rating: 4,
            text: "Great."
          },
          {
            title: "Good...",
            rating: 3,
            text: "Good."
          },
          {
            title: "Meh...",
            rating: 2,
            text: "Meh."
          }
        ]
      },
      {
        name: "Green beads necklace",
        subtitle: "The necklace that goes with everything",
        description: "Green bead necklace. 10 stranded pearl necklace with silver colour decorative bead detail. Add a bit of colour to any outfit with this necklace.",
        price: 9.95,
        sizes: [],
        colors: [ "#70a700", "#008aa7" ],
        reviews: [
          {
            rating: 5,
            text: "Excellent."
          },
          {
            rating: 4,
            text: "Great."
          },
          {
            rating: 3,
            text: "Good."
          },
          {
            rating: 2,
            text: "Meh."
          }
        ]
      },
      {
        name: "Blue stone necklace",
        subtitle: "The necklace that goes with everything",
        description: "Ever so elegant and feminine, this double strand of fine emerald beads with diamond clasp is amazing. Over 190 carats of fine bright faceted emerald green beads strung beautifully with an exquisite ‘bow’ style 18k white gold clasp with over a third of a carat of diamonds.",
        price: 19.95,
        sizes: [],
        colors: [ "#7ce9fa", "#fa7c7c" ],
        reviews: [
          {
            rating: 5,
            text: "Excellent."
          },
          {
            
            rating: 4,
            text: "Great."
          },
          {
            rating: 3,
            text: "Good."
          },
          {
            rating: 2,
            text: "Meh."
          }
        ]
      },
      {
        name: "Red beads necklace",
        subtitle: "The necklace that goes with everything",
        description: "Give your style a personality and attitude with this exotic tropical surfer necklace. Hand-crafted white puka shell chip beads, barrel style clasp.",
        price: 14.95,
        sizes: [],
        colors: [ "#f20810", "#08f23f", "#f29208" ],
        reviews: [
          {

            rating: 5,
            text: "Excellent."
          },
          {
            rating: 4,
            text: "Great."
          },
          {
            rating: 3,
            text: "Good."
          },
          {
            rating: 2,
            text: "Meh."
          }
        ]
      }], function(err, products){
        console.log('products: ', err, products);
        var productIds = _.map(products, function(product) { return product._id });
        console.log('productIds', productIds);
        var productGroupIds = [];
        ProductGroup.create({
          time: 11,
          makeThisYourLookURL: "http://www.amazon.com/Luli-Fama-Womens-Caracol-Triangle/dp/B00GG7T8CW/ref=cts_ap_4_cts",
          title: "Product Group 1",
          subtitle: "A glamorous swimsuit set",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas venenatis sollicitudin nisl, eu aliquam ligula pellentesque ut. Sed in odio justo. Proin nec massa at tellus ullamcorper vestibulum. Proin ac lacus in nisi consequat tempor ac et nisl. Donec purus eros, porttitor eget lectus sed, convallis malesuada velit.",
        }, function(err, productGroup){
          console.log('productGroup', productGroup._id);
          productGroup.products = productIds;
          productGroup.save(function(err, updatedProductGroup) {
            console.log('updatedProductGroup.products._id', _.map(updatedProductGroup.products, function(product) { return product._id }));
            productGroupIds.push(updatedProductGroup._id);
            callback(null, productGroupIds);
          });
        })
      });
    }, 
    // ################### New Product Group
    function(productGroupIds, callback) {
      console.log('2');
      Product.create([{
        name: "Swim suit top",
        subtitle: "A glamorous swim suit top",
        makeThisYourLookURL: "http://www.amazon.com/Luli-Fama-Womens-Caracol-Triangle/dp/B00GG7T8CW/ref=cts_ap_4_cts",
        description: "A double-tiered bandeau bikini top featuring a vibrant floral print. Elasticized trim. Removable bra cups. Optional neck strap. Partially lined. Knit.",
        price:  39.95,
        sizes: [ "XS", "S", "M", "L" ],
        colors: [],
        reviews: []
      },
      {
        name: "Swim suit bottom",
        subtitle: "The perfect swim suit bottom",
        makeThisYourLookURL: "http://www.amazon.com/Luli-Fama-Womens-Caracol-Triangle/dp/B00GG7T8CW/ref=cts_ap_4_cts",
        description: "A low rise bikini bottom featuring ruched sides. Elasticized trim. Fully lined. Moderate coverage. Knit.",
        price:  49.95,
        sizes: [ "XS", "S", "M", "L" ],
        colors: [],
        reviews: []
      },
      {
        name: "High heel shoes",
        subtitle: "A great pair of shoes",
        makeThisYourLookURL: "http://www.amazon.com/Luli-Fama-Womens-Caracol-Triangle/dp/B00GG7T8CW/ref=cts_ap_4_cts",
        description: "Take a walk on the wild side with these daring platform sandals Peep toe front, T-strap construction, gold accents platform and wrapped heel Finished with padded insole and adjustable ankle strap with buckle.",
        price:  99.95,
        sizes: [ "7", "8", "9", "10" ],
        colors: ["#c45b27", "#000000" ],
        reviews: []
      },
      {
        name: "Orange dangle earrings",
        subtitle: "The ear rings that go with everything",
        makeThisYourLookURL: "http://www.amazon.com/Luli-Fama-Womens-Caracol-Triangle/dp/B00GG7T8CW/ref=cts_ap_4_cts",
        description: "Lightweight and feminine, the bold orange shells on these dangle earrings move with noticeable grace as you work the crowd!",
        price:  24.95,
        sizes: [],
        colors: ["#f29208", "#7ce9fa", "#f20810" ],
        reviews: []
      }], function(err, products){
        var productIds = _.map(products, function(product) { return product._id });
        ProductGroup.create({
          time: 32,
          makeThisYourLookURL: "http://www.amazon.com/Luli-Fama-Womens-Caracol-Triangle/dp/B00GG7T8CW/ref=cts_ap_4_cts",
          title: "Product Group 2",
          "thumbnail": "assets/content/products/group_02.png",
          subtitle: "A glamorous swimsuit set",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas venenatis sollicitudin nisl, eu aliquam ligula pellentesque ut. Sed in odio justo. Proin nec massa at tellus ullamcorper vestibulum. Proin ac lacus in nisi consequat tempor ac et nisl. Donec purus eros, porttitor eget lectus sed, convallis malesuada velit.",
        }, function(err, productGroup){
          productGroup.products = productIds;
          productGroup.save(function(err, updatedProductGroup) {
            console.log('updatedProductGroup._id', updatedProductGroup._id);
            productGroupIds.push(updatedProductGroup._id);
            callback(null, productGroupIds);
          });
        })
      });
    },
    // ################### New Product Group
    function(productGroupIds, callback) {
      console.log('3');
      Product.create([
        {
          name: "Swim suit top",
          subtitle: "A glamorous swim suit top",
          makeThisYourLookURL: "http://www.amazon.com/Luli-Fama-Womens-Caracol-Triangle/dp/B00GG7T8CW/ref=cts_ap_4_cts",
          description: "A bandeau bikini top featuring a banded front. Removable padding. Side boning. Optional adjustable straps. Adjustable back closure. Fully lined. Knit. Lightweight.",
          price:  59.95,
          sizes: [ "XS", "S", "M", "L" ],
          colors: [ "#0c53cf", "#cf910c", "#cf0c0c", "#000000" ],
          reviews: []
        },
        {
          name: "Swim suit bottom",
          subtitle: "The perfect swim suit bottom",
          makeThisYourLookURL: "http://www.amazon.com/Luli-Fama-Womens-Caracol-Triangle/dp/B00GG7T8CW/ref=cts_ap_4_cts",
          description: "A cheeky bikini bottom featuring a vibrant floral print and ruffle trim. Elasticized trim. Fully lined. Minimal coverage. Knit. Machine wash cold, dry flat. Imported.",
          price:  55.95,
          sizes: [ "XS", "S", "M", "L" ],
          colors: [ "#0c53cf", "#cf910c", "#cf0c0c", "#000000" ],
          reviews: []
        },
        {
          name: "Blouse",
          subtitle: "A chic blouse",
          makeThisYourLookURL: "http://www.amazon.com/Luli-Fama-Womens-Caracol-Triangle/dp/B00GG7T8CW/ref=cts_ap_4_cts",
          description: "An open-knit pocket poncho featuring a fringed hem. Round neckline, unlined and lightweight. Hand wash. Imported.",
          price:  79.95,
          sizes: [ "XS", "S", "M", "L" ],
          colors: [ "#0c53cf", "#cf910c", "#cf0c0c", "#000000" ],
          reviews: []
        },
        {
          name: "High heel shoes",
          subtitle: "A great pair of shoes",
          makeThisYourLookURL: "http://www.amazon.com/Luli-Fama-Womens-Caracol-Triangle/dp/B00GG7T8CW/ref=cts_ap_4_cts",
          description: "Simple and sweet yet bold and daring heels from the Shiekh collection. The 060 pairs well with a pink hair bow and a solid print mini skirt.",
          price:  199.95,
          sizes: [ "7", "8", "9", "10" ],
          colors: [ "#845142", "#000000" ],
          reviews: []
        },
        {
          name: "Bracelet",
          subtitle: "A great little bracelet",
          makeThisYourLookURL: "http://www.amazon.com/Luli-Fama-Womens-Caracol-Triangle/dp/B00GG7T8CW/ref=cts_ap_4_cts",
          description: "Silk-wrapped bangle set with intricate detailing and Austrian crystals. These bangles are made with real silk and the threaded bangles are very delicate. Due to the fragile nature of silk thread, threaded bangles should be worn with extra care.",
          price:  9.95,
          sizes: [],
          colors: [],
          reviews: []
        },
        {
          name: "Hair flower",
          subtitle: "A chic accessory",
          makeThisYourLookURL: "http://www.amazon.com/Luli-Fama-Womens-Caracol-Triangle/dp/B00GG7T8CW/ref=cts_ap_4_cts",
          description: "This vibrant artificial dahlia hair flower, of the genuine grade 6 real touch quality can be a perfect companion for your tropical destination. It complements many of the bright colors seen on the high fashion runway for dresses, swimwear and evening wear.",
          price: 12.95,
          sizes: [],
          colors: [],
          reviews: []
        }
        ], function(err, products){
        var productIds = _.map(products, function(product) { return product._id });
        ProductGroup.create({
          time: 50,
          makeThisYourLookURL: "http://www.amazon.com/Luli-Fama-Womens-Caracol-Triangle/dp/B00GG7T8CW/ref=cts_ap_4_cts",
          title: "Product Group 3",
          subtitle: "A glamorous swimsuit set",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas venenatis sollicitudin nisl, eu aliquam ligula pellentesque ut. Sed in odio justo. Proin nec massa at tellus ullamcorper vestibulum. Proin ac lacus in nisi consequat tempor ac et nisl. Donec purus eros, porttitor eget lectus sed, convallis malesuada velit.",
        }, function(err, productGroup){
          productGroup.products = productIds;
          productGroup.save(function(err, updatedProductGroup) {
            console.log('updatedProductGroup._id', updatedProductGroup._id);
            productGroupIds.push(updatedProductGroup._id);
            callback(null, productGroupIds);
          });
        })
      });
    }
], function(err, productGroupIds) {
  console.log('err', err);
  console.log('result', productGroupIds);
  Project.create({
    name: "Luli Fama 2014 Swimwear Collection",
    description: "Video showcasing the 2014 Luli Fama Swimwear Collection Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas venenatis sollicitudin nisl, eu aliquam ligula pellentesque ut. Sed in odio justo.",
    productGroupTimeLine: productGroupIds
  }, function(err, project){
    console.log('project created', project._id);
  });
}); */
