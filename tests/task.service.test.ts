import { Status } from '@prisma/client'
import { prisma } from '../src/lib/prisma'
import taskService from '../src/services/task.service'

jest.mock('../src/lib/prisma', () => ({
  prisma: {
    task: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      delete: jest.fn(),
      update: jest.fn(),
    },
  },
}))

const mockTask = {
  id: '1',
  title: 'Test Task',
  description: null,
  status: Status.PENDING,
  createdAt: new Date(),
}

describe('Task Service', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('createTask should create a new task', async () => {
    jest.mocked(prisma.task.create).mockResolvedValue(mockTask)

    const result = await taskService.createTask({ title: 'Test Task' })

    expect(result).toEqual(mockTask)
    expect(prisma.task.create).toHaveBeenCalledWith({
      data: {
        title: 'Test Task',
        description: undefined,
        status: Status.PENDING,
      },
    })
  })

  test('getTasks should return tasks', async () => {
    jest.mocked(prisma.task.findMany).mockResolvedValue([mockTask])

    const result = await taskService.getTasks()

    expect(result).toEqual([mockTask])
  })

  test('getTaskById should return a task', async () => {
    jest.mocked(prisma.task.findUnique).mockResolvedValue(mockTask)

    const result = await taskService.getTaskById('1')

    expect(result).toEqual(mockTask)
  })

  test('deleteTaskById should delete a task', async () => {
    jest.mocked(prisma.task.delete).mockResolvedValue(mockTask)

    const result = await taskService.deleteTaskById('1')

    expect(result).toEqual(mockTask)
  })

  test('updateTaskById should update a task', async () => {
    const updatedTask = { ...mockTask, title: 'Updated' }
    jest.mocked(prisma.task.update).mockResolvedValue(updatedTask)

    const result = await taskService.updateTaskById('1', {
      title: 'Updated',
    })

    expect(result).toEqual(updatedTask)
  })
})
