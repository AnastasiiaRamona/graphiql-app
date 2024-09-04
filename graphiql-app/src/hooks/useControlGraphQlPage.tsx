'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
interface FormData {
  endpoint: string;
  sdl: string;
}

export default function useControlGraphQlPage() {
  const [value, setValue] = useState('1');
  const [status, setStatus] = useState('');
  const [data, setData] = useState({});
  const [sdl, setSdl] = useState('');

  const [code, setCode] = useState(``);
  const [variables, setVariables] = useState('');
  const [headers, setHeaders] = useState([{ key: '', value: '' }]);
  const { handleSubmit, register, watch } = useForm<FormData>();
  const sdlValue: string = watch('sdl');
  const router = useRouter();

  const handleHeaderChange = (index: number, field: string, value: string) => {
    const newHeaders = [...headers];
    newHeaders[index] = {
      ...newHeaders[index],
      [field]: value,
    };
    setHeaders(newHeaders);
  };

  const handleAddHeader = () => {
    setHeaders([...headers, { key: '', value: '' }]);
  };

  const handleDeleteHeader = (index: number) => {
    const newHeaders = headers.filter((_, i) => i !== index);
    setHeaders(newHeaders);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleCodeChange = (value: string) => {
    setCode(value);
  };

  const updateHeaders = (data: { [key: string]: string }) => {
    const newHeaders = Object.entries(data).map(([key, value]) => ({
      key: key.trim(),
      value: value.trim(),
    }));

    setHeaders(newHeaders);
  };

  const onClickSdl = () => {
    setSdl(sdlValue);
  };

  const handleVariablesChange = (value: string) => {
    setVariables(value);
  };

  return {
    value,
    setValue,
    status,
    setStatus,
    data,
    setData,
    sdl,
    setSdl,
    code,
    setCode,
    variables,
    setVariables,
    headers,
    setHeaders,
    handleHeaderChange,
    handleAddHeader,
    handleDeleteHeader,
    handleChange,
    handleCodeChange,
    onClickSdl,
    handleVariablesChange,
    handleSubmit,
    register,
    router,
    sdlValue,
    updateHeaders,
  };
}
