// backend/tasks.test.js
const request = require('supertest');
const app = require('./app');
const mongoose = require('mongoose');

// Connect to a test database before all tests
beforeAll(async () => {
    // For a real project, use an in-memory test DB
    // For this assignment, connecting to your dev DB is okay
    const url = process.env.MONGO_URI;
    await mongoose.connect(url, { useNewUrlParser: true });
});

// Clean up the database after each test
afterEach(async () => {
    await mongoose.connection.db.collection('tasks').deleteMany({});
});

// Disconnect after all tests
afterAll(async () => {
    await mongoose.connection.close();
});

describe('Tasks API', () => {
    it('GET /api/tasks --> should return an empty array', async () => {
        return request(app)
            .get('/api/tasks')
            .expect(200)
            .then((res) => {
                expect(res.body).toEqual([]);
            });
    });

    it('POST /api/tasks --> should create a task', async () => {
        const taskData = { title: 'Test Task', category: 'Testing' };
        return request(app)
            .post('/api/tasks')
            .send(taskData)
            .expect(201)
            .then((res) => {
                expect(res.body.title).toBe(taskData.title);
            });
    });
});