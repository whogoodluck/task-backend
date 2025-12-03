import { Status } from '@prisma/client'
import { prisma } from '../lib/prisma'

export interface TaskData {
  title: string
  description?: string
  status?: Status
}

async function createTask(task: TaskData) {
  return prisma.task.create({
    data: {
      title: task.title,
      description: task.description,
      status: task.status ?? Status.PENDING,
    },
  })
}

async function getTasks(status?: Status) {
  const whereClause = status
    ? {
        status,
      }
    : {}

  return prisma.task.findMany({
    where: whereClause,
    orderBy: {
      createdAt: 'desc',
    },
  })
}

async function getTaskById(id: string) {
  return prisma.task.findUnique({
    where: { id },
  })
}

async function deleteTaskById(id: string) {
  return prisma.task.delete({
    where: { id },
  })
}

async function updateTaskById(id: string, task: TaskData) {
  return prisma.task.update({
    where: { id },
    data: {
      title: task.title,
      description: task.description,
      status: task.status,
    },
  })
}

export default {
  createTask,
  getTasks,
  getTaskById,
  deleteTaskById,
  updateTaskById,
}
