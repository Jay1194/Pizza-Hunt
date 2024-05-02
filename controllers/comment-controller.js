const { Comment, Pizza } = require('../models');

const commentController = {
    //add comment to pizza
    addComment({ params, body }, res) {
        console.log(body);
        Comment.create(body)
        .then(({ _id }) => {
            return Pizza.findOneAndUpdate(
                {_id: params.pizzaId },
                { $push: {comments: _id } },
                { new: true }
            );
        })
        .then(dbPizzaData => {
            if (!dbPizzaData) {
                res.status(404).json({ message: 'No pizza found with this id!' });
                return;
            }
            res.json(dbPizzaData);
        })
        .catch(err => res.json(err));
    },

    //remove comment
    removeComment({ params }, res) {
        Comment.findOneAndDelete({ _id: params.commentId }) //he first method used here, .findOneAndDelete(), works a lot like .findOneAndUpdate(), as it deletes the document while also returning its data. 
        .then(deletedComment => {
            if (!deletedComment) {
                return res.status(404).json({ message: 'No comment with this id!' });
            }
            return Pizza.findOneAndUpdate( 
                { _id: params.pizzaId }, //we return the updated pizza data, now without the _id of the comment in the comments array, and return it to the user.
                { $pull: { comments: params.commentId } }, // take that data and use it to identify and remove it from the associated pizza using the Mongo $pull operation
                { new: true }
            );
        })
        .then(dbPizzaData => {
            if (!dbPizzaData) {
                res.status(404).json({ message: 'No pizza found wkth this id!' });
                return;
            }
            res.json(dbPizzaData);
        })
        .catch(err => res.json(err));

    }
};

module.exports = commentController;