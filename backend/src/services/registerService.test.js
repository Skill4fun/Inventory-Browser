import request from 'supertest';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import app from '../app';
import User from '../models/User';

const sendMailMock = jest.fn();
jest.mock('nodemailer');
nodemailer.createTransport.mockReturnValue({ sendMail: sendMailMock });

describe('POST /api/register', () => {
  beforeEach(async () => {
    dotenv.config();
    await mongoose.connect(process.env.TEST_MONGO_URI, { useNewUrlParser: true });
  });

  afterAll(async () => {
    await User.deleteMany();
    mongoose.connection.close();
  });

  test('should respond with 400 if password is missing', (done) => {
    const reqBody = {
      name: 'Valaki',
      email: 'valaki@email.com',
      password: '',
    };

    request(app)
      .post('/api/register')
      .set('Content-Type', 'application/json')
      .send(reqBody)
      .expect(400)
      .end((error, data) => {
        if (error) {
          return done(error);
        }
        expect(data.body.message).toEqual('Password is required.');
        return done();
      });
  });

  test('should respond with 400 if name is missing', (done) => {
    const reqBody = {
      name: '',
      email: 'valaki2@email.com',
      password: '12345678',
    };

    request(app)
      .post('/api/register')
      .set('Content-Type', 'application/json')
      .send(reqBody)
      .expect(400)
      .end((error, data) => {
        if (error) {
          return done(error);
        }
        expect(data.body.message).toEqual('Name is required.');
        return done();
      });
  });

  test('should respond with 400 if email is missing', (done) => {
    const reqBody = {
      name: 'Aki',
      email: '',
      password: '12345678',
    };

    request(app)
      .post('/api/register')
      .set('Content-Type', 'application/json')
      .send(reqBody)
      .expect(400)
      .end((error, data) => {
        if (error) {
          return done(error);
        }
        expect(data.body.message).toEqual('Email is required.');
        return done();
      });
  });

  test('should respond with 400 if name, email and password are missing', (done) => {
    const reqBody = {
      name: '',
      email: '',
      password: '',
    };

    request(app)
      .post('/api/register')
      .set('Content-Type', 'application/json')
      .send(reqBody)
      .expect(400)
      .end((error, data) => {
        if (error) {
          return done(error);
        }
        expect(data.body.message).toEqual(
          'Name, email and password are required.',
        );
        return done();
      });
  });

  test("should respond with 400 if password aren't 8 characters", (done) => {
    const reqBody = {
      name: 'Valaki',
      email: 'valaki3@email.com',
      password: '1',
    };

    request(app)
      .post('/api/register')
      .set('Content-Type', 'application/json')
      .send(reqBody)
      .expect(400)
      .end((error, data) => {
        if (error) {
          return done(error);
        }
        expect(data.body.message).toEqual(
          'Password must be at least 8 characters.',
        );
        return done();
      });
  });

  test('should respond with 200 and registration should happened', (done) => {
    const reqBody = {
      name: 'Valaki',
      email: 'valaki@email.com',
      password: '1132343435',
    };

    request(app)
      .post('/api/register')
      .set('Content-Type', 'application/json')
      .send(reqBody)
      .expect(200)
      .end((error, data) => {
        if (error) {
          return done(error);
        }
        const resData = {
          id: data.body.id,
          isAdmin: false,
          email: 'valaki@email.com',
          isVerified: false,
        };

        expect(data.body).toEqual(resData);
        expect(sendMailMock).toHaveBeenCalled();
        return done();
      });
  });

  test('should respond with 400 if email is already taken', (done) => {
    async function createNewUser() {
      const user = new User({
        name: 'Valaki',
        email: 'valaki123@email.com',
        password: '12345678',
        isAdmin: false,
        isVerified: false,
      });
      await user.save();
    }
    createNewUser();

    const reqBody1 = {
      name: 'Valaki',
      email: 'valaki123@email.com',
      password: '1132434423',
    };

    request(app)
      .post('/api/register')
      .set('Content-Type', 'application/json')
      .send(reqBody1)
      .expect(400)
      .end((err, data) => {
        if (err) return done(err);
        expect(data.body.message).toEqual('Email is already taken');
        return done();
      });
  });
});
