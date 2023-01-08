import request from 'supertest';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import app from '../app';

import { loginService } from './loginService';
import { errorMessages } from '../models/errorMessages';
import User from '../models/User';

describe('when the email or password is missing', () => {
  let expectError = '';
  test('should respond with a status code of 400', async () => {
    try {
      await loginService.authentication({ email: '', password: '' });
    } catch (error) {
      expectError = error;
    }
    expect(expectError.status).toEqual(400);
  });

  test('should respond with "All fields are required."', async () => {
    try {
      await loginService.authentication({ email: '', password: '' });
    } catch (error) {
      expectError = error;
    }
    expect(expectError.message).toEqual(errorMessages.emptyFields);
  });

  test('should respond with "Password is required."', async () => {
    try {
      await loginService.authentication({
        email: 'kiscica@gmail.com',
        password: '',
      });
    } catch (error) {
      expectError = error;
    }
    expect(expectError.message).toEqual(errorMessages.emptyPassword);
  });

  test('should respond with "Email is required."', async () => {
    try {
      await loginService.authentication({ email: '', password: 'A12345678' });
    } catch (error) {
      expectError = error;
    }
    expect(expectError.message).toEqual(errorMessages.emptyEmail);
  });
});

jest.mock('jsonwebtoken', () => ({
  ...jest.requireActual('jsonwebtoken'),
  sign: jest.fn().mockReturnValue('abc'),
}));

async function hashPassword(password) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

async function createNewUser() {
  const user = new User({
    name: 'Teszt Elek',
    email: 'teszt.elek@gmail.com',
    password: await hashPassword('12345678'),
    isAdmin: false,
    isVerified: false,
  });

  const newUser = await user.save();
  return newUser;
}

beforeAll(async () => {
  dotenv.config();
  await mongoose.connect(process.env.TEST_MONGO_URI);
  await createNewUser();
});

afterAll(async () => {
  await User.deleteMany();
  mongoose.connection.close();
});

describe('POST /api/login', () => {
  test('should respond with 400 if email is not exist in the database', (done) => {
    const reqBody = {
      email: 'notexist@email.com',
      password: 'password',
    };

    request(app)
      .post('/api/login')
      .set('Content-Type', 'application/json')
      .send(reqBody)
      .expect(400)
      .end((error, data) => {
        if (error) {
          return done(error);
        }
        expect(data.body.message).toEqual(errorMessages.wrongData);
        return done();
      });
  });

  test('should respond with 400 if password is not correct', (done) => {
    const reqBody = {
      email: 'teszt.elek@gmail.com',
      password: '123456789',
    };

    request(app)
      .post('/api/login')
      .set('Content-Type', 'application/json')
      .send(reqBody)
      .expect(400)
      .end((error, data) => {
        if (error) {
          return done(error);
        }
        expect(data.body.message).toEqual(errorMessages.wrongData);
        return done();
      });
  });

  test('should respond with 200 if data is correct and login successful', (done) => {
    const reqBody = {
      email: 'teszt.elek@gmail.com',
      password: '12345678',
    };

    request(app)
      .post('/api/login')
      .set('Content-Type', 'application/json')
      .send(reqBody)
      .expect(200)
      .end((error, data) => {
        if (error) {
          return done(error);
        }
        expect(data.body.token).toEqual('abc');
        return done();
      });
  });
});
