const base64 = () => {
  const decodeFromBase64 = (string: string) => {
    try {
      return decodeURIComponent(
        Array.prototype.map
          .call(atob(string), (char) => {
            return '%' + ('00' + char.charCodeAt(0).toString(16)).slice(-2);
          })
          .join('')
      );
    } catch (error) {
      return '';
    }
  };

  const encodeToBase64 = (string: string) => {
    try {
      return btoa(
        encodeURIComponent(string).replace(/%([0-9A-F]{2})/g, (_, p1) =>
          String.fromCharCode(parseInt(p1, 16))
        )
      );
    } catch (error) {
      return '';
    }
  };

  return { decodeFromBase64, encodeToBase64 };
};

export default base64;
