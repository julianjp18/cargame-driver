/**
 * Componente Fallback a mostrar en lugar del mapa
 */

//  Dependencias
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, View, ActivityIndicator, Text } from 'react-native';

// Constantes
import { shortBrandOrangeGreyUrl } from '../../../constants/Utils';
import { accentColor } from '../../../constants/Colors';

// Estilos
import { fullWidth, fullHeight, boxShadow } from '../../../styles/layout';

/**
 * Componente Fallback a mostrar en lugar del mapa
 * 
 */
const Fallback = () => {

    const [text, setText] = useState();

    // Luego de un periodo muestra el mensaje
    useEffect(() => {
        setTimeout(() => {
            setText('Lo sentimos. Imposible continuar, por favor asegurate de que la ubicación este encendida y el permiso concedido');
        }, 10000);
    }, []);

    return (
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={shortBrandOrangeGreyUrl}
            />
            {!text && <ActivityIndicator size="large" />}
            {text &&
                <View style={styles.textContainer}>
                    <Text style={styles.text}>
                        {text}
                    </Text>
                </View>
            }
        </View>
    );

};
// Estilos
const styles = StyleSheet.create({
    container: {
        height: fullHeight,
        width: fullWidth,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    logo: {
        width: '50%',
        height: '50%',
    },
    textContainer: {
        display: 'flex',
        justifyContent: 'center',
        width: fullWidth - 40,
        height: 100,
        margin: 20,
        backgroundColor: accentColor,
        padding: 20,
        ...boxShadow
    },
    text: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'white'
    }
});
export default Fallback;