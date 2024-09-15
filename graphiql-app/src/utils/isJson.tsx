const isJson = (text: string) => {
  try {
    const parsed = JSON.parse(text);
    return typeof parsed === 'object' && parsed !== null;
  } catch (error) {
    return false;
  }
};
export default isJson;
