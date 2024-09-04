import prettier from 'prettier';
import parserBabel from 'prettier/parser-babel';
import parserEstree from 'prettier/plugins/estree';
import parserGraphql from 'prettier/parser-graphql';

export const handlePrettier = async (
  value: string,
  isGraphQl: boolean,
  onChange
) => {
  let formatted = value;

  try {
    formatted = await prettier.format(value, {
      parser: isGraphQl ? 'graphql' : 'json',
      plugins: isGraphQl ? [parserGraphql] : [parserBabel, parserEstree],
    });
  } catch (error) {
    console.error('Error formatting code:', error);
  }

  return onChange(formatted);
};
