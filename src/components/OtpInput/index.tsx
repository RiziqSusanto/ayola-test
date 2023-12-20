import React, {useState, useRef} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

interface OtpInputProps {
  length: number;
  onOtpChange: (otp: string) => void;
}

interface CustomTextInput extends TextInput {
  text?: string;
}

const OtpInput: React.FC<OtpInputProps> = ({length, onOtpChange}) => {
  const [otp, setOtp] = useState<Array<string>>(Array(length).fill(''));
  const otpInputs = useRef<CustomTextInput[]>([]);

  const handleOtpChange = (index: number, value: string) => {
    const newOtp = [...otp];
    newOtp[index] = value;

    setOtp(newOtp);
    onOtpChange(newOtp.join(''));
  };

  const handleKeyPress = (index: number, key: string) => {
    if (key === 'Backspace' && index > 0) {
      otpInputs.current[index - 1].focus();
    } else if (
      key === 'Backspace' &&
      index === 0 &&
      otpInputs.current[index]?.text === ''
    ) {
      otpInputs.current[length - 1].focus();
    } else if (key !== 'Backspace' && index < length - 1) {
      otpInputs.current[index + 1].focus();
    }
  };

  return (
    <View style={styles.container}>
      {Array.from({length}, (_, index) => (
        <TextInput
          key={index}
          style={styles.input}
          value={otp[index]}
          onChangeText={value => handleOtpChange(index, value)}
          keyboardType="numeric"
          maxLength={1}
          onKeyPress={({nativeEvent: {key}}) => handleKeyPress(index, key)}
          ref={input => (otpInputs.current[index] = input as CustomTextInput)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  input: {
    width: 40,
    height: 40,
    margin: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'gray',
    textAlign: 'center',
  },
});

export default OtpInput;
