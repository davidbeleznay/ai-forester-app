import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity, 
  Platform,
  KeyboardTypeOptions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING } from '../config/constants';

interface FieldInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  multiline?: boolean;
  required?: boolean;
  info?: string;
  error?: string;
  unit?: string;
  min?: number;
  max?: number;
  clearable?: boolean;
}

const FieldInput: React.FC<FieldInputProps> = ({
  label,
  value,
  onChangeText,
  placeholder = '',
  keyboardType = 'default',
  multiline = false,
  required = false,
  info,
  error,
  unit,
  min,
  max,
  clearable = false,
}) => {
  const [focused, setFocused] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  // Handle number validation based on min and max if provided
  const validateInput = (text: string) => {
    // Skip validation for non-numeric input
    if (keyboardType !== 'numeric' && keyboardType !== 'decimal-pad') {
      onChangeText(text);
      return;
    }

    // Allow empty input (will be caught by required validation elsewhere)
    if (text === '') {
      onChangeText('');
      return;
    }

    const numValue = parseFloat(text);
    
    // Validate input is a number
    if (isNaN(numValue)) {
      return;
    }
    
    // Validate against min/max if provided
    if ((min !== undefined && numValue < min) || (max !== undefined && numValue > max)) {
      // Still update the text but validation will show error
      onChangeText(text);
      return;
    }
    
    onChangeText(text);
  };

  // Handle clear input
  const handleClear = () => {
    onChangeText('');
  };

  // Determine if there's a validation error
  const hasError = error !== undefined && error !== '';
  
  // Determine if there's a validation warning (e.g., value outside min/max)
  const hasWarning = keyboardType === 'numeric' || keyboardType === 'decimal-pad' 
    ? (value !== '' && !isNaN(parseFloat(value))) &&
      ((min !== undefined && parseFloat(value) < min) || 
       (max !== undefined && parseFloat(value) > max))
    : false;

  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        <Text style={styles.label}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
        
        {info && (
          <TouchableOpacity
            onPress={() => setShowInfo(!showInfo)}
            style={styles.infoButton}
          >
            <Ionicons
              name={showInfo ? 'information-circle' : 'information-circle-outline'}
              size={18}
              color={COLORS.primary}
            />
          </TouchableOpacity>
        )}
      </View>

      {showInfo && info && (
        <Text style={styles.infoText}>{info}</Text>
      )}

      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.input,
            multiline && styles.multilineInput,
            focused && styles.focusedInput,
            hasError && styles.errorInput,
            hasWarning && styles.warningInput,
            unit && styles.inputWithUnit,
          ]}
          value={value}
          onChangeText={validateInput}
          placeholder={placeholder}
          placeholderTextColor={COLORS.textLight}
          keyboardType={keyboardType}
          multiline={multiline}
          numberOfLines={multiline ? 3 : 1}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />

        {unit && (
          <View style={styles.unitContainer}>
            <Text style={styles.unitText}>{unit}</Text>
          </View>
        )}

        {clearable && value !== '' && (
          <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
            <Ionicons name="close-circle" size={18} color={COLORS.textLight} />
          </TouchableOpacity>
        )}
      </View>

      {hasError && (
        <Text style={styles.errorText}>{error}</Text>
      )}

      {hasWarning && !hasError && (
        <Text style={styles.warningText}>
          {min !== undefined && parseFloat(value) < min
            ? `Value should be at least ${min}${unit ? ' ' + unit : ''}`
            : max !== undefined && parseFloat(value) > max
            ? `Value should be at most ${max}${unit ? ' ' + unit : ''}`
            : ''}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.medium,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.tiny,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.text,
  },
  required: {
    color: COLORS.error,
  },
  infoButton: {
    padding: 4,
  },
  infoText: {
    fontSize: 14,
    color: COLORS.textLight,
    marginBottom: SPACING.small,
    fontStyle: 'italic',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 6,
    paddingHorizontal: SPACING.small,
    paddingVertical: Platform.OS === 'ios' ? SPACING.small : SPACING.tiny,
    fontSize: 16,
    color: COLORS.text,
    backgroundColor: COLORS.lightBackground,
  },
  multilineInput: {
    minHeight: 80,
    textAlignVertical: 'top',
    paddingTop: SPACING.small,
  },
  focusedInput: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.white,
  },
  errorInput: {
    borderColor: COLORS.error,
  },
  warningInput: {
    borderColor: COLORS.warning,
  },
  inputWithUnit: {
    paddingRight: 50, // Make room for the unit
  },
  unitContainer: {
    position: 'absolute',
    right: 0,
    paddingHorizontal: SPACING.small,
    height: '100%',
    justifyContent: 'center',
    backgroundColor: COLORS.lightGray,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    borderLeftWidth: 1,
    borderLeftColor: COLORS.border,
  },
  unitText: {
    fontSize: 14,
    color: COLORS.textLight,
    fontWeight: '500',
  },
  clearButton: {
    position: 'absolute',
    right: unit ? 50 : SPACING.small,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    paddingHorizontal: 4,
  },
  errorText: {
    fontSize: 14,
    color: COLORS.error,
    marginTop: SPACING.tiny,
  },
  warningText: {
    fontSize: 14,
    color: COLORS.warning,
    marginTop: SPACING.tiny,
  },
});

export default FieldInput;