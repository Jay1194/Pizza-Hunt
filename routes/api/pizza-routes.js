// Implement Controller Methods

const router = require('express').Router();

const { // destructure the method names out of the imported object and use those names directly.
    getAllPizza,
    getPizzaById,
    createPizza,
    updatePizza,
    deletePizza
} = require('../../controllers/pizza-controller');

// Set up GET all and POST at /api/pizzas
router
.route('/')
.get(getAllPizza)
.post(createPizza);

// Set up GET one, PUT, and DELETE at /api/pizzas/:id
router
.route('/:id')
.get(getPizzaById)
.put(updatePizza)
.delete(deletePizza);

module.exports = router;