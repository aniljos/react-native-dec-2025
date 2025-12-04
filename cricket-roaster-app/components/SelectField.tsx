import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export type SelectOption = { label: string; value: string };

type Props = {
  label: string;
  value: string;
  placeholder: string;
  options: SelectOption[];
  onSelect: (value: string) => void;
  error?: string;
};

const SelectField = ({ label, value, placeholder, options, onSelect, error }: Props) => {
  const [open, setOpen] = useState(false);
  const selectedLabel = options.find(opt => opt.value === value)?.label;

  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        style={[styles.select, error && styles.inputError]}
        onPress={() => setOpen(prev => !prev)}
        activeOpacity={0.7}
      >
        <Text style={value ? styles.selectValue : styles.placeholder}>
          {selectedLabel || placeholder}
        </Text>
        <Text style={styles.chevron}>{open ? '▲' : '▼'}</Text>
      </TouchableOpacity>
      {open && (
        <View style={styles.dropdown}>
          {options.map(option => (
            <TouchableOpacity
              key={option.value}
              style={styles.option}
              onPress={() => {
                onSelect(option.value);
                setOpen(false);
              }}
            >
              <Text style={styles.optionText}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

export default SelectField;

const styles = StyleSheet.create({
  field: {
    marginBottom: 12,
  },
  label: {
    color: '#0f172a',
    marginBottom: 6,
    fontWeight: '600',
  },
  select: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectValue: {
    color: '#0f172a',
  },
  placeholder: {
    color: '#94a3b8',
  },
  chevron: {
    color: '#64748b',
  },
  dropdown: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    overflow: 'hidden',
  },
  option: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  optionText: {
    color: '#0f172a',
  },
  inputError: {
    borderColor: '#f87171',
  },
  error: {
    marginTop: 4,
    color: '#fca5a5',
    fontSize: 12,
  },
});
