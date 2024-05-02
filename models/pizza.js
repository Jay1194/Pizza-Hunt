// create the Pizza model using the PizzaSchema
const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

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
    comments: [ // tell Mongoose to expect an ObjectId and to tell it that its data comes from the Comment model
        { 
            type: Schema.Types.ObjectID,
            ref: 'Comment'
        }
    ]
  },
  { //tell the schema that it can use virtuals
    toJSON: {
      virtuals: true,
      getters: true // tell the Mongoose model that it should use any getter function we've specified.
    },
    id: false // We set id to false because this is a virtual that Mongoose returns, and we don’t need it.
  }
);

const Pizza = model('Pizza', PizzaSchema);

// get total count of comments and replies on retrieval
PizzaSchema.virtual('commentCount').get(function() {
    return this.comments.length;
});

// export the pizza model
module.exports = Pizza;