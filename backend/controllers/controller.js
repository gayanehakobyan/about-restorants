const RestorantsList = require('../models/restorantsList');
const RestorantsDetails = require('../models/restorantDetails');


const list_data_get = (req, res) => {
  
      RestorantsList.find()
      .then(list => res.json({data: list}))
      .catch(err => {
        res.status(404).res.json({errors: {message: "Not found"}})
      });
}

const item_details_data_get = (req, res) => {

    const query = {_id: req.params.id}

    const id = req.params.id;

    // console.log("item_details_data_get", req.params);

    RestorantsDetails.findById(id)
    .then(result => {
        // console.log("resulr", result)
        res.json({data: result});
      })
      .catch(err => {
        res.status(404).res.json({errors: {message: "Not found"}})
      });
}


const item_details_data_update = (req, res) => {

  const query = {_id: req.params.id}

  const id = req.params.id;
  const data = req.body

  console.log("update iitem in back", req.params, req.body);

   RestorantsDetails.findByIdAndUpdate(id, data)
   .then(result => {

      if(data.hasOwnProperty("rate"))
      {
        RestorantsList.findByIdAndUpdate(id, data)
        .then( _ => {
          res.json({data: {success: true}})
        })
        .catch(err => {
          res.status(404).res.json({errors: {message: "Something went wrong with updating data"}})
        });
      } else
      {
        res.json({data: {success: true}});
      }
    })
    .catch(err => {
      res.status(404).res.json({errors: {message: "Something went wrong with updating data"}})
    });

}


module.exports = {
    list_data_get,
    item_details_data_get,
    item_details_data_update
}