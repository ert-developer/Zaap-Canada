import React, { useRef } from 'react';
import { View, Button } from 'react-native'; // Import View and Button from 'react-native'

const OtpComponent = () => {
    let otpInput = useRef(null);

    const clearText = () => {
        // Use otpInput.current.clear() to clear the input
        otpInput.current.clear();
    }

    const setText = () => {
        // Use otpInput.current.setValue("1234") to set the input value
        otpInput.current.setValue("1234");
    }

    return (
        <View>
            {/* Use the OTPTextInput component and pass the ref */}
            <OTPTextInput ref={otpInput} />
            {/* Use onPress instead of onClick for Button */}
            <Button title="Clear" onPress={clearText} />
            {/* Use onPress instead of onClick for Button */}
            <Button title="Set Text" onPress={setText} />
        </View>
    );
}

export default OtpComponent;
