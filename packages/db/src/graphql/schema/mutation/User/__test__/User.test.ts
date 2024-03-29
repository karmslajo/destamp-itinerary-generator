import bcrypt from 'bcrypt';

import { MockContext } from '../../../../../types/types';
import { Context, createMockContext } from '../../../../context';
import { createUser } from '../User.resolver';

let mockContext: MockContext;
let context: Context;

beforeEach(() => {
  mockContext = createMockContext();
  context = mockContext as unknown as Context;
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('createUser mutation', () => {
  it('should create a user with valid input', async () => {
    const userInput = {
      id: 'testing',
      email: 'test@yahoo.com',
      password: 'testing',
      firstName: 'Juan',
      lastName: 'Dela Cruz',
    };

    const user = {
      id: 'testing',
      email: 'test@yahoo.com',
      password: 'testing',
      firstName: 'Juan',
      lastName: 'Dela Cruz',
      createdAt: new Date('2022-10-12'),
      updatedAt: new Date('2022-10-12'),
      tripCount: 0,
    };

    const saltRounds = 10;
    const expectedHashedPassword = 'hashed_password'; // mock hashed password

    bcrypt.hash = jest.fn().mockResolvedValue(expectedHashedPassword);

    mockContext.prisma.user.create.mockResolvedValue({
      ...user,
    });

    const expectedResult = {
      ...user,
    };

    const result = await createUser('TRAVELER', userInput, context);

    expect(bcrypt.hash).toHaveBeenCalledWith(userInput.password, saltRounds);

    expect(result).toEqual(expectedResult);
  });
});
