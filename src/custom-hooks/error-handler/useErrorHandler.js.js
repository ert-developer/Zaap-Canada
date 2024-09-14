import {useState} from 'react';

function useErrorHandler() {
  const [error, setError] = useState(null);

  const clearError = () => setError(null);

  const handleError = error => {
    setError(error);
  };

  return {
    error,
    clearError,
    handleError,
  };
}

export default useErrorHandler;
