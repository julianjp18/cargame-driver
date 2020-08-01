import React, { useReducer, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';
import { primaryColor } from '../../constants/Colors';

const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_BLUR = 'INPUT_BLUR';

const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid
      };
    case INPUT_BLUR:
      return {
        ...state,
        touched: true
      };
    default:
      return state;
  }
};

const TextInput = props => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue ? props.initialValue : props.value,
    isValid: props.initiallyValid,
    touched: false
  });

  const { onInputChange, id } = props;

  useEffect(() => {
    if (inputState.touched) {
      onInputChange(id, inputState.value, inputState.isValid);
    }
  }, [inputState, onInputChange, id]);

  const textChangeHandler = text => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = true;
    if (props.required && text.trim().length === 0) {
      isValid = false;
    }
    if (props.email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if (props.min != null && +text < props.min) {
      isValid = false;
    }
    if (props.max != null && +text > props.max) {
      isValid = false;
    }
    if (props.minLength != null && text.length < props.minLength) {
      isValid = false;
    }
    dispatch({ type: INPUT_CHANGE, value: text, isValid: isValid });
  };

  const lostFocusHandler = () => {
    dispatch({ type: INPUT_BLUR });
  };

  return (
    <View style={styles.formControl}>
      <Text style={styles.label}>{props.label}</Text>
      <Input
        {...props}
        labelStyle={styles.disabledLabel}
        containerStyle={styles.mainContainer}
        inputContainerStyle={styles.inputContainer}
        inputStyle={{...styles.input, ...(props.isMapField ? styles.isMapField : '')}}
        value={inputState.value}
        onChangeText={textChangeHandler}
        onBlur={lostFocusHandler}
        errorMessage={!inputState.isValid && inputState.touched ? props.errorText : ''}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    paddingBottom: 0,
    marginBottom: 0
  },
  inputContainer: {
    paddingHorizontal: 10,
    marginBottom: 0,
    fontFamily: 'Quicksand',
    fontSize: 10,
    borderColor: '#1D59A2',
    borderEndWidth: 1,
    borderWidth: 1,
    borderRadius: 15,
  },
  input: {
    marginBottom: 0,
    paddingBottom: 0,
    fontFamily: 'Quicksand',
  },
  disabledLabel: {
    display: "none"
  },
  formControl: {
    width: '100%'
  },
  label: {
    fontFamily: 'Quicksand',
    fontWeight: 'bold',
    marginVertical: 1,
    color: primaryColor
  },
  errorContainer: {
    paddingTop: 0
  },
  errorText: {
    paddingTop: 0,
    marginTop: 0,
    textAlign: "center",
    fontFamily: 'Quicksand',
    color: 'red',
    fontSize: 11
  },
  isMapField: {
    fontSize: 14,
  },
});

export default TextInput;
