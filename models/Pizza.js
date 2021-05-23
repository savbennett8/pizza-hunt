//only need Schema constructor & model function
const { Schema, model } = require('mongoose');

const dateFormat = require('../utils/dateFormat');

//expects: {pizzaName: 'Triple Threat', createdBy: "<username>", size: 'Medium', toppings: <select from list>}

const PizzaSchema = new Schema({
    pizzaName: {
        type: String
    },
    createdBy: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    },
    size: {
        type: String,
        default: 'Large'
    },
    toppings: [],
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
},
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        //id is a virtual that Mongoose auto returns & I don't need it
        id: false
    }
);

//get total count of comments and replies on retrieval
PizzaSchema.virtual('commentCount').get(function () {
    return this.comments.length;
});

//create the Pizza model
const Pizza = model('Pizza', PizzaSchema);

module.exports = Pizza;