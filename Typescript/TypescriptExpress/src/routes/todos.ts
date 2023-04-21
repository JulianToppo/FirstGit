import { Router, Response, Request, NextFunction } from 'express';
import { Todo } from '../models/todos'

//alias naming 
type RequestBody = {text: string}
type RequestParam = {todoID: string}

var todos: Todo[] = [];

const router = Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
        Todos: todos
    })
});

router.post('/todo', (req: Request, res: Response, next: NextFunction) => {
    const body= req.body as RequestBody;
    const newTodo: Todo = {
        id: new Date().toISOString(),
        text: body.text
    }

    todos.push(newTodo);
    res.status(201).json({ Todos: todos })
})

router.put('/todo/:todoID', (req: Request, res: Response, next: NextFunction) => {
    const params= req.params as RequestParam;
    const body= req.body as RequestBody;
    const tid = params.todoID;
    const todoIndex = todos.findIndex((todoItem) => todoItem.id == tid);
    if (todoIndex >= 0) {
        todos[todoIndex] = {
            id: todos[todoIndex].id,
            text: body.text
        }
        res.status(200).json({ message: 'Updated todo', Todos: todos });
    }
else{
    res.status(404).json({ message: 'Could not find todo for this id' })
}
})

router.delete('/todo/:todoID', (req: Request, res: Response, next: NextFunction) => {
    const params= req.params as RequestParam;
    let size = todos.length;
    console.log(params.todoID)
    todos = todos.filter(todoItems => {
        if(todoItems.id != params.todoID){
            return todoItems
        }
    })
    if (size == todos.length) {
        res.status(404).json({ message: "Id not found" })
    }
    res.status(200).json({ message: "The id has been deleted" })
})

export default router;