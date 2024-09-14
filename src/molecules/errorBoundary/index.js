import React, {useState, useEffect} from 'react';
import {View, Text, Button} from 'react-native';

function ErrorBoundary({children}) {
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const handleErrors = (error, info) => {
      setHasError(true);
      setErrorMessage(error.toString());
    };

    const errorListener = global.ErrorUtils.getGlobalHandler();
    global.ErrorUtils.setGlobalHandler(handleErrors);
    return () => {
      global.ErrorUtils.setGlobalHandler(errorListener);
    };
  }, []);

  const handleReload = () => {
    setHasError(false);
    setErrorMessage('');
  };

  if (hasError) {
    return (
      <View>
        <Text>Error: {errorMessage}</Text>
        <Button title="Reload" onPress={handleReload} />
      </View>
    );
  }

  return children;
}

export default ErrorBoundary;
