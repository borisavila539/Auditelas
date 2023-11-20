import { StackScreenProps } from '@react-navigation/stack'
import React, { useContext } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { styles } from '../theme/app.Theme';
import Buttons from '../components/Buttons';
import { TelasContext } from '../context/telasContext';


interface Props extends StackScreenProps<any, any> { };

export const SeleccionAuditoria = ({ navigation }: Props) => {
    const {changeSeleccionAuditoria} = useContext(TelasContext)
    return (
        <View style={styles.container}>
            <View style={stylesScreen.containerButtons}>
                <Buttons
                    disable={false}
                    onPress={()=>{changeSeleccionAuditoria('AuditoriaEnProceso'); navigation.navigate('AuditoriaScreen')}}
                    title='Auditoria'
                />
                <Buttons
                    disable={false}
                    onPress={()=>{changeSeleccionAuditoria('PruebaCalidad');navigation.navigate('AuditoriaScreen')}}
                    title='Pruebas Calidad'
                />  
                <Buttons
                    disable={false}
                    onPress={()=>{navigation.navigate('PruebaCalidadLote')}}
                    title='Pruebas Calidad Por Lote'
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