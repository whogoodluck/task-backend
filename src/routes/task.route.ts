import { Router } from 'express'
import taskController from '../controllers/task.controller'

const taskRoute = Router()

taskRoute.post('/', taskController.createNew)
taskRoute.get('/', taskController.getAll)
taskRoute.get('/:id', taskController.getOne)
taskRoute.put('/:id', taskController.updateOne)
taskRoute.delete('/:id', taskController.deleteOne)

export default taskRoute
