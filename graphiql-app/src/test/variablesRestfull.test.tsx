import { describe, it, expect } from 'vitest';
import variablesRestfull from '@/utils/variablesRestfull';

describe('variablesRestfull', () => {
  const { replaceVariables, restoreVariables } = variablesRestfull();

  describe('replaceVariables', () => {
    it('should replace variables in the string with placeholders', () => {
      const input = 'Hello {{ name }}, welcome to {{ place }}!';
      const { replaced, variables } = replaceVariables(input);

      expect(replaced).toBe(
        'Hello __VAR_PLACEHOLDER_0__, welcome to __VAR_PLACEHOLDER_1__!'
      );
      expect(variables.size).toBe(2);
      expect(variables.get('__VAR_PLACEHOLDER_0__')).toBe('{{ name }}');
      expect(variables.get('__VAR_PLACEHOLDER_1__')).toBe('{{ place }}');
    });

    it('should return the original string if no variables are found', () => {
      const input = 'Hello, welcome to the system!';
      const { replaced, variables } = replaceVariables(input);

      expect(replaced).toBe(input);
      expect(variables.size).toBe(0);
    });

    it('should handle variables with extra spaces correctly', () => {
      const input = 'Hello {{   name   }}, welcome to {{ place }}!';
      const { replaced, variables } = replaceVariables(input);

      expect(replaced).toBe(
        'Hello __VAR_PLACEHOLDER_0__, welcome to __VAR_PLACEHOLDER_1__!'
      );
      expect(variables.get('__VAR_PLACEHOLDER_0__')).toBe('{{   name   }}');
      expect(variables.get('__VAR_PLACEHOLDER_1__')).toBe('{{ place }}');
    });

    it('should handle multiple occurrences of the same variable', () => {
      const input = 'Hello {{ name }}, {{ name }} is your username.';
      const { replaced, variables } = replaceVariables(input);

      expect(replaced).toBe(
        'Hello __VAR_PLACEHOLDER_0__, __VAR_PLACEHOLDER_1__ is your username.'
      );
      expect(variables.size).toBe(2);
      expect(variables.get('__VAR_PLACEHOLDER_0__')).toBe('{{ name }}');
      expect(variables.get('__VAR_PLACEHOLDER_1__')).toBe('{{ name }}');
    });
  });

  describe('restoreVariables', () => {
    it('should restore variables back to their original form', () => {
      const formatted =
        'Hello __VAR_PLACEHOLDER_0__, welcome to __VAR_PLACEHOLDER_1__!';
      const variables = new Map([
        ['__VAR_PLACEHOLDER_0__', '{{ name }}'],
        ['__VAR_PLACEHOLDER_1__', '{{ place }}'],
      ]);

      const result = restoreVariables(formatted, variables);

      expect(result).toBe('Hello {{ name }}, welcome to {{ place }}!');
    });

    it('should return the original string if no variables are provided', () => {
      const formatted = 'Hello, welcome to the system!';
      const variables = new Map();

      const result = restoreVariables(formatted, variables);

      expect(result).toBe(formatted);
    });

    it('should handle case when some placeholders are missing', () => {
      const formatted = 'Hello __VAR_PLACEHOLDER_0__, welcome to the system!';
      const variables = new Map([['__VAR_PLACEHOLDER_0__', '{{ name }}']]);

      const result = restoreVariables(formatted, variables);

      expect(result).toBe('Hello {{ name }}, welcome to the system!');
    });

    it('should correctly restore multiple instances of the same placeholder', () => {
      const formatted =
        'Hello __VAR_PLACEHOLDER_0__, __VAR_PLACEHOLDER_0__ is your username.';
      const variables = new Map([['__VAR_PLACEHOLDER_0__', '{{ name }}']]);

      const result = restoreVariables(formatted, variables);

      expect(result).toBe('Hello {{ name }}, {{ name }} is your username.');
    });
  });
});
