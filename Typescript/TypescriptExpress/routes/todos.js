"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
var todos = [];
const router = (0, express_1.Router)();
router.get('/', (req, res, next) => {
    res.status(200).json({
        Todos: todos
    });
});
router.post('/todo', (req, res, next) => {
    const newTodo = {
        id: req.body.id,
        text: req.body.text
    };
    todos.push(newTodo);
    res.status(201).json({ Todos: todos });
});
router.put('/todo/:todoID', (req, res, next) => {
    const tid = req.params.todoID;
    const todoIndex = todos.findIndex((todoItem) => todoItem.id == tid);
    if (todoIndex >= 0) {
        todos[todoIndex] = {
            id: todos[todoIndex].id,
            text: req.body.text
        };
        res.status(200).json({ message: 'Updated todo', Todos: todos });
    }
    else {
        res.status(404).json({ message: 'Could not find todo for this id' });
    }
});
router.delete('/todo/:todoId', (req, res, next) => {
    let size = todos.length;
    console.log(req.params.todoId);
    todos = todos.filter(todoItems => {
        if (todoItems.id != req.params.todoId) {
            return todoItems;
        }
    });
    if (size == todos.length) {
        res.status(404).json({ message: "Id not found" });
    }
    res.status(200).json({ message: "The id has been deleted" });
});
exports.default = router;
