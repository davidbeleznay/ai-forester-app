import React from 'react';
import { 
  View,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native';
import { COLORS, SPACING } from '../config/constants';

interface FieldInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad' | 'decimal-pad';
  unit?: string;
  error?: string;
  info?: string;
}

const FieldInput: React.FC<FieldInputProps> = ({
  label,
  value,
  onChangeText,
  placeholder = '',
  keyboardType = 'default',
  unit,
  error,
  info,
}) => {
  return (
    <View style={styles.container}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      
      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.input,
            unit ? styles.inputWithUnit : null,
            error ? styles.inputError : null
          ]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          keyboardType={keyboardType}
        />
        
        {unit && (
          <View style={styles.unitContainer}>
            <Text style={styles.unitText}>{unit}</Text>
          </View>
        )}
      </View>
      
      {error && <Text style={styles.errorText}>{error}</Text>}
      {info && <Text style={styles.infoText}>{info}</Text>}
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
    color: COLORS.gray[700],
    marginBottom: SPACING.xs,
  },
  inputContainer: {
    flexDirection: 'row',
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
  },
  inputWithUnit: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  inputError: {
    borderColor: COLORS.danger,
  },
  unitContainer: {
    height: 48,
    paddingHorizontal: SPACING.md,
    backgroundColor: COLORS.gray[200],
    justifyContent: 'center',
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
    color: COLORS.danger,
    fontSize: 12,
    marginTop: SPACING.xs,
  },
  infoText: {
    color: COLORS.gray[500],
    fontSize: 12,
    marginTop: SPACING.xs,
  },
});

export default FieldInput;