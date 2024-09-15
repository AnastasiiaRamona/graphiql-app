import prettier from 'prettier';
import parserBabel from 'prettier/plugins/babel';
import parserEstree from 'prettier/plugins/estree';
import parserGraphql from 'prettier/plugins/graphql';
import { toast } from 'react-toastify';

export const handlePrettier = async (
  value: string,
  isGraphQl: boolean,
  onChange = (value: string) => {}
) => {
  let formatted = value;

  try {
    formatted = await prettier.format(value, {
      parser: isGraphQl ? 'graphql' : 'json',
      plugins: isGraphQl ? [parserGraphql] : [parserBabel, parserEstree],
    });
  } catch (error) {
    toast.error('Error formatting code');
  }

  return onChange(formatted);
};
