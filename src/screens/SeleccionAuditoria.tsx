import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { styles } from '../theme/app.Theme';
import Buttons from '../components/Buttons';


interface Props extends StackScreenProps<any, any> { };

export const SeleccionAuditoria = ({ navigation }: Props) => {
    return (
        <View style={styles.container}>
            <View style={stylesScreen.containerButtons}>
                <Buttons
                    disable={false}
                    onPress={()=>navigation.navigate('AuditoriaEnProceso')}
                    title='Auditoria'
                />
                <Buttons
                    disable={false}
                    onPress={()=>navigation.navigate('PruebaCalidad')}
                    title='Pruebas Calidad'
                />                
            </View>

        </View>
    )
}

const stylesScreen = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        alignItems: 'center',
        position: 'relative'
    
    },
    containerButtons: {
        width: '80%',
        maxWidth: 500,
        marginTop: 10
    },
    toucheable: {

    }
});