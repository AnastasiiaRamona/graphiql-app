const variablesRestfull = () => {
  const replaceVariables = (
    value: string
  ): { replaced: string; variables: Map<string, string> } => {
    const variablePattern = /{{\s*[\w\d]+\s*}}/g;
    const variables = new Map<string, string>();
    let replaced = value;
    let match;
    let index = 0;
    while ((match = variablePattern.exec(value)) !== null) {
      const placeholder = `__VAR_PLACEHOLDER_${index++}__`;
      variables.set(placeholder, match[0]);
      replaced = replaced.replace(match[0], placeholder);
    }
    return { replaced, variables };
  };

  const restoreVariables = (
    formatted: string,
    variables: Map<string, string>
  ) => {
    let result = formatted;
    variables.forEach((original, placeholder) => {
      const regex = new RegExp(placeholder, 'g');
      result = result.replace(regex, original);
    });
    return result;
  };
  return { replaceVariables, restoreVariables };
};

export default variablesRestfull;
