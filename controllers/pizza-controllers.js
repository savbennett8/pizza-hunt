const { Pizza } = require('../models');

const pizzaController = {
    //get all pizzas
    getAllPizza(req, res) {
        Pizza.find({})
            .populate({
                path: 'comments',
                //minus sign indicates we do not want this field returned from the comment's populated data
                select: '-__v'
            })
            //exclude this field from the pizza data as well
            .select('-__v')
            //sort in DESC order by _id value
            .sort({ _id: -1 })
            .then(dbPizzaData => res.json(dbPizzaData))
            .catch(e => {
                console.log(e);
                res.status(400).json(e);
            });
    },

    //get one pizza by id
    //restructure 'req' to only use params from it since that's all we need
    getPizzaById({ params }, res) {
        Pizza.findOne({ _id: params.id })
            .populate({
                path: 'comments',
                select: '-__v'
            })
            .select('-__v')
            .then(dbPizzaData => {
                if (!dbPizzaData) {
                    res.status(404).json({ message: 'No pizza found with this id!' });
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch(e => {
                console.log(e);
                res.status(400).json(e);
            });
    },

    //create pizza
    createPizza({ body }, res) {
        Pizza.create(body)
            .then(dbPizzaData => res.json(dbPizzaData))
            .catch(e => res.status(400).json(e));
    },

    //update pizza by id
    updatePizza({ params, body }, res) {
        //set {new: true} property or it will return the original doc instead of updated one
        Pizza.findOneAndUpdate({ _id: params.id }, body, { new: true })
            .then(dbPizzaData => {
                if (!dbPizzaData) {
                    res.status(404).json({ message: 'No pizza found with this id!' });
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch(e => res.status(400).json(e));
    },

    //delete pizza
    deletePizza({ params }, res) {
        Pizza.findOneAndDelete({ _id: params.id })
            .then(dbPizzaData => {
                if (!dbPizzaData) {
                    res.status(404).json({ message: 'No pizza found with this id!' });
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch(e => res.status(400).json(e));
    }
};

module.exports = pizzaController;