//only need Schema constructor & model function
const { Schema, model } = require('mongoose');

//expects: {pizzaName: 'Triple Threat', createdBy: "<username>", size_suggestion: 'Medium', toppings: <select from list>}

const PizzaSchema = new Schema({
    pizzaName: {
        type: String
    },
    createdBy: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    size_suggestion: {
        type: String,
        default: 'Large'
    },
    toppings: []
});

//create the Pizza model
const Pizza = model('Pizza', PizzaSchema);

module.exports = Pizza;