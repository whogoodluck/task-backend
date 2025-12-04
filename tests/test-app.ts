import express from 'express'
import taskController from '../src/controllers/task.controller'

const app = express()
app.use(express.json())

app.post('/api/tasks', taskController.createNew)
app.get('/api/tasks', taskController.getAll)
app.get('/api/tasks/:id', taskController.getOne)
app.delete('/api/tasks/:id', taskController.deleteOne)
app.put('/api/tasks/:id', taskController.updateOne)

export default app
