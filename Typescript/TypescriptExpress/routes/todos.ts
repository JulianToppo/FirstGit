import { Router, Response, Request, NextFunction } from 'express';
import { Todo } from '../models/todos'

var todos: Todo[] = [];

const router = Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
        Todos: todos
    })
});

router.post('/todo', (req: Request, res: Response, next: NextFunction) => {
    const newTodo: Todo = {
        id: req.body.id,
        text: req.body.text
    }

    todos.push(newTodo);
    res.status(201).json({ Todos: todos })
})

router.put('/todo/:todoID', (req: Request, res: Response, next: NextFunction) => {
    const tid = req.params.todoID;
    const todoIndex = todos.findIndex((todoItem) => todoItem.id == tid);
    if (todoIndex >= 0) {
        todos[todoIndex] = {
            id: todos[todoIndex].id,
            text: req.body.text
        }
        res.status(200).json({ message: 'Updated todo', Todos: todos });
    }
else{
    res.status(404).json({ message: 'Could not find todo for this id' })
}
})

router.delete('/todo/:todoId', (req: Request, res: Response, next: NextFunction) => {
    let size = todos.length;
    console.log(req.params.todoId)
    todos = todos.filter(todoItems => {
        if(todoItems.id != req.params.todoId){
            return todoItems
        }
    })
    if (size == todos.length) {
        res.status(404).json({ message: "Id not found" })
    }
    res.status(200).json({ message: "The id has been deleted" })
})

export default router;