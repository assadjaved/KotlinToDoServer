const express = require('express');
const router = express.Router();

const createTodo = require('../sql/todo-list-sql/create-todo');
const readTodo = require('../sql/todo-list-sql/read-todo');
const deleteTodo = require('../sql/todo-list-sql/delete-todo');
const updateTodo = require('../sql/todo-list-sql/update-todo');

// Get todo items
router.get('/', async (req, res) => {
    try {
        const todoItems = await readTodo();
        res.json(todoItems);
    } catch (err) {
        console.error(`Error reading todo items: ${err}`);
        res.status(500).send('Error reading todo items');
    }
});

// Create a new todo item
router.post('/', async (req, res) => {
    try {
        const { title, description, priority } = req.body;
        const todoItem = await createTodo(title, description, priority);
        res.status(201).json(todoItem);
    } catch (err) {
        console.error(`Error creating a todo item: ${err}`);
        res.status(500).send('Error creating a todo item');
    }
});

// Delete a todo item
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const todoItem = await deleteTodo(id);
        res.status(200).json(todoItem);
    } catch (err) {
        console.error(`Error deleting a todo item: ${err}`);
        res.status(500).send('Error deleting a todo item');
    }
});

// Update a todo item
router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { title, description, priority, completed_at } = req.body;
        const todoItem = await updateTodo(id, title, description, priority, completed_at);
        res.status(200).json(todoItem);
    } catch (err) {
        console.error(`Error updating a todo item: ${err}`);
        res.status(500).send('Error updating a todo item');
    }
});

module.exports = router;