import base64 from '@/utils/base64';

describe('base64 utility functions', () => {
  const { encodeToBase64, decodeFromBase64 } = base64();

  describe('encodeToBase64', () => {
    it('should correctly encode a simple string to Base64', () => {
      const input = 'Hello, world!';
      const expectedOutput = 'SGVsbG8sIHdvcmxkIQ==';

      const result = encodeToBase64(input);
      expect(result).toBe(expectedOutput);
    });

    it('should return an empty string when encoding fails (invalid input)', () => {
      const input = String.fromCharCode(0xd800);

      const result = encodeToBase64(input);
      expect(result).toBe('');
    });
  });

  describe('decodeFromBase64', () => {
    it('should correctly decode a Base64 string back to a normal string', () => {
      const input = 'SGVsbG8sIHdvcmxkIQ==';
      const expectedOutput = 'Hello, world!';

      const result = decodeFromBase64(input);
      expect(result).toBe(expectedOutput);
    });

    it('should return an empty string when decoding fails (invalid Base64)', () => {
      const invalidInput = 'InvalidBase64!!';

      const result = decodeFromBase64(invalidInput);
      expect(result).toBe('');
    });
  });
});
