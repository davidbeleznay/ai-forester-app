import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { COLORS, SPACING } from '../config/constants';

interface FieldInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  keyboardType?: 'default' | 'number-pad' | 'decimal-pad' | 'numeric' | 'email-address' | 'phone-pad';
  unit?: string;
  error?: string;
  editable?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  info?: string;
}

const FieldInput: React.FC<FieldInputProps> = ({
  label,
  value,
  onChangeText,
  placeholder = '0.0',
  keyboardType = 'default',
  unit,
  error,
  editable = true,
  multiline = false,
  numberOfLines = 1,
  info,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      
      {info && (
        <Text style={styles.info}>{info}</Text>
      )}
      
      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.input,
            unit ? styles.inputWithUnit : {},
            error ? styles.inputError : {},
            !editable ? styles.inputDisabled : {},
            multiline ? { textAlignVertical: 'top', height: numberOfLines * 24 } : {}
          ]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          keyboardType={keyboardType}
          editable={editable}
          multiline={multiline}
          numberOfLines={multiline ? numberOfLines : undefined}
        />
        
        {unit && (
          <View style={styles.unitContainer}>
            <Text style={styles.unitText}>{unit}</Text>
          </View>
        )}
      </View>
      
      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.md,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: SPACING.xs,
    color: COLORS.gray[700],
  },
  info: {
    fontSize: 12,
    color: COLORS.gray[500],
    marginBottom: SPACING.xs,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: COLORS.gray[300],
    borderRadius: 6,
    paddingHorizontal: SPACING.md,
    fontSize: 16,
    color: COLORS.gray[800],
    backgroundColor: COLORS.white,
  },
  inputWithUnit: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderRightWidth: 0,
  },
  inputError: {
    borderColor: COLORS.danger,
  },
  inputDisabled: {
    backgroundColor: COLORS.gray[100],
    color: COLORS.gray[500],
  },
  unitContainer: {
    height: 48,
    paddingHorizontal: SPACING.md,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.gray[200],
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderColor: COLORS.gray[300],
  },
  unitText: {
    fontSize: 14,
    color: COLORS.gray[700],
  },
  errorText: {
    fontSize: 12,
    color: COLORS.danger,
    marginTop: SPACING.xs,
  },
});

export default FieldInput;