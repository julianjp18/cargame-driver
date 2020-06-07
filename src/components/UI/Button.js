import React from 'react';
import { Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Button = props => {
    return (
        <LinearGradient
            start={{ x: -1, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={[
                props.colorOne ? props.colorOne : '#1D59A2',
                props.colorTwo ? props.colorTwo : '#18A7C9'
            ]}
            style={{
                borderRadius: 5,
            }}
        >
            <Text 
                style={{
                    textAlign: "center",
                    padding: 10,
                    borderWidth: props.fontColor ? 1 : 0,
                    borderColor: '#1D59A2',
                    borderRadius: 5,
                    color: props.fontColor ? props.fontColor : 'white' 
                }}
                onPress={props.onPress}
            >
                {props.title}
            </Text>
        </LinearGradient>
    )
};

export default Button;