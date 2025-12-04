import { Status } from '@prisma/client'
import request from 'supertest'
import { prisma } from '../src/lib/prisma'
import app from './test-app'

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

describe('Task Controller', () => {
  beforeEach(() => jest.clearAllMocks())

  test('POST /api/tasks creates a task', async () => {
    jest.mocked(prisma.task.create).mockResolvedValue(mockTask)

    const res = await request(app).post('/api/tasks').send({ title: 'Test Task' })

    expect(res.status).toBe(201)
    expect(res.body.data.task).toEqual({
      ...mockTask,
      createdAt: mockTask.createdAt.toISOString(),
    })
  })

  test('GET /api/tasks returns all tasks', async () => {
    jest.mocked(prisma.task.findMany).mockResolvedValue([mockTask])

    const res = await request(app).get('/api/tasks')

    expect(res.status).toBe(200)
    expect(res.body.data.tasks).toEqual([
      {
        ...mockTask,
        createdAt: mockTask.createdAt.toISOString(),
      },
    ])
    expect(res.body.total).toBe(1)
  })

  test('GET /api/tasks/:id returns a task', async () => {
    jest.mocked(prisma.task.findUnique).mockResolvedValue(mockTask)

    const res = await request(app).get('/api/tasks/1')

    expect(res.status).toBe(200)
    expect(res.body.data.task).toEqual({
      ...mockTask,
      createdAt: mockTask.createdAt.toISOString(),
    })
  })

  test('DELETE /api/tasks/:id deletes a task', async () => {
    jest.mocked(prisma.task.findUnique).mockResolvedValue(mockTask)
    jest.mocked(prisma.task.delete).mockResolvedValue(mockTask)

    const res = await request(app).delete('/api/tasks/1')

    expect(res.status).toBe(200)
    expect(res.body.data.task).toEqual({
      ...mockTask,
      createdAt: mockTask.createdAt.toISOString(),
    })
  })

  test('PUT /api/tasks/:id updates a task', async () => {
    const updatedTask = {
      ...mockTask,
      title: 'Updated Task',
    }

    jest.mocked(prisma.task.findUnique).mockResolvedValue(mockTask)
    jest.mocked(prisma.task.update).mockResolvedValue(updatedTask)

    const res = await request(app).put('/api/tasks/1').send({ title: 'Updated Task' })

    expect(res.status).toBe(200)
    expect(res.body.data.task).toEqual({
      ...updatedTask,
      createdAt: updatedTask.createdAt.toISOString(),
    })
  })
})
