import React from 'react';
import { StyleSheet, Text, TextInput, View, TextInputProps } from 'react-native';

type Props = {
  label: string;
  helper?: string;
  error?: string;
} & Pick<
  TextInputProps,
  'placeholder' | 'value' | 'onChangeText' | 'keyboardType' | 'autoCapitalize'
>;

const InputField = ({ label, helper, error, ...rest }: Props) => (
  <View style={styles.field}>
    <Text style={styles.label}>{label}</Text>
    <TextInput style={[styles.input, error && styles.inputError]} {...rest} />
    {helper ? <Text style={styles.helper}>{helper}</Text> : null}
    {error ? <Text style={styles.error}>{error}</Text> : null}
  </View>
);

export default InputField;

const styles = StyleSheet.create({
  field: {
    marginBottom: 12,
  },
  label: {
    color: '#0f172a',
    marginBottom: 6,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    color: '#0f172a',
    borderWidth: 1,
    borderColor: '#cbd5e1',
  },
  inputError: {
    borderColor: '#f87171',
  },
  helper: {
    marginTop: 4,
    color: '#64748b',
    fontSize: 12,
  },
  error: {
    marginTop: 4,
    color: '#fca5a5',
    fontSize: 12,
  },
});
