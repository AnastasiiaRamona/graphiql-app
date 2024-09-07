interface PrettyButtonProps {
  content: string;
  isQuery: boolean;
  handlePrettier: (
    content: string,
    isQuery: boolean,
    onChange: (value: string) => void
  ) => void;
  onChange: (value: string) => void;
}

export default PrettyButtonProps;
