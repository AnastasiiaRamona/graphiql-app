export default interface GraphQLTabsProps {
  value: string;
  headers: { key: string; value: string }[];
  code: string;
  variables: string;
  handleChange: (event: React.SyntheticEvent, newValue: string) => void;
  handleCodeChange: (value: string) => void;
  handleVariablesChange: (value: string) => void;
  handlePrettier: (
    code: string,
    isQuery: boolean,
    callback: (value: string) => void
  ) => void;
  handleAddHeader: () => void;
  handleDeleteHeader: (index: number) => void;
  handleHeaderChange: (index: number, field: string, value: string) => void;
  handleChangeUrl: (code: string, variables: string) => void;
}
