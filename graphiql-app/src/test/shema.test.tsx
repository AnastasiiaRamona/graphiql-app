import { describe, it, expect } from 'vitest';
import schema from '@/validation/schema';

describe('Validation Schema', () => {
  it('should validate a correct user object', async () => {
    const validData = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'Password1!',
    };

    await expect(schema.validate(validData)).resolves.toEqual(validData);
  });

  it('should fail validation with missing email', async () => {
    const invalidData = {
      username: 'testuser',
      password: 'Password1!',
    };

    await expect(schema.validate(invalidData)).rejects.toHaveProperty(
      'errors',
      expect.arrayContaining(['Email is required'])
    );
  });

  it('should fail validation with incorrect email format', async () => {
    const invalidData = {
      username: 'testuser',
      email: 'invalid-email',
      password: 'Password1!',
    };

    await expect(schema.validate(invalidData)).rejects.toHaveProperty(
      'errors',
      expect.arrayContaining(['Email must be a valid email'])
    );
  });
});
