
const express= require('express');
import todosRoutes from './routes/todos'
import bodyParser from 'body-parser'

const app=express();

app.use(bodyParser.json());

app.use(todosRoutes);
app.listen(3000,()=>{
    console.log('server is running');
});