import React, { useContext, useEffect, useState,FC } from 'react'
import { ActivityIndicator, FlatList, ScrollView, TouchableOpacity, View } from 'react-native'
import { styles } from '../theme/app.Theme'
import { Text } from 'react-native'
import { black, grey, orange } from '../components/colores'
import { TelasContext } from '../context/telasContext'
import { reqResApiFinanza } from '../api/reqResApi'
import { PruebaCalidadInterface, PruebaCalidadInterfacenumber } from '../interfaces/PruebaCalidadInterface'
import { TextInput } from 'react-native-gesture-handler'
import TextInputContainer from '../components/TextInputContainer'
import { ObjectHeigth } from '../components/Constant'
import MyAlert from '../components/myAlert'
import { StackScreenProps } from '@react-navigation/stack'


interface Props extends StackScreenProps<any, any> { };

export const PruebaCalikdad: FC<Props> = ({navigation}) => {
    const { telasState } = useContext(TelasContext);
    const [cargando, setCargando] = useState<boolean>(false)
    const [datos, setDatos] = useState<PruebaCalidadInterface[]>([])
    const [enviando, setEnviando] = useState<boolean>(false)
    const [showMensajeAlerta, setShowMensajeAlerta] = useState<boolean>(false);
    const [tipoMensaje, setTipoMensaje] = useState<boolean>(false);
    const [mensajeAlerta, setMensajeAlerta] = useState<string>('');

    const getPruebaCalidad = async () => {
        setCargando(true)
        try {
            const request = await reqResApiFinanza.get<PruebaCalidadInterface[]>('Auditelas/GetPruebaCalidad/' + telasState.IdRollo)
            if (request.data.length === 0) {
                let data: PruebaCalidadInterface[] = [{
                    id_Rollo: parseInt(telasState.IdRollo),
                    usuarioID: telasState.usuarioId,
                    trama1: '',
                    trama2: '',
                    trama3: '',
                    undimbre1: '',
                    undimbre2: '',
                    undimbre3: '',
                    torsion_AC: '',
                    torsion_BD: ''
                }];
                setDatos(data)
            } else {
                setDatos(request.data)
            }
        } catch (err) {

        }
        setCargando(false)

    }
    const onPressEnviar = async () => {
        if (!enviando) {
            setEnviando(true)
            try {
                
                let enviar: PruebaCalidadInterfacenumber[] = [{
                    id_Rollo: parseInt(telasState.IdRollo),
                    usuarioID: telasState.usuarioId,
                    trama1: parseFloat(datos[0].trama1==''?'0':datos[0].trama1),
                    trama2: parseFloat(datos[0].trama2==''?'0':datos[0].trama2),
                    trama3: parseFloat(datos[0].trama3==''?'0':datos[0].trama3),
                    undimbre1: parseFloat(datos[0].undimbre1==''?'0':datos[0].undimbre1),
                    undimbre2: parseFloat(datos[0].undimbre2==''?'0':datos[0].undimbre2),
                    undimbre3: parseFloat(datos[0].undimbre3==''?'0':datos[0].undimbre3),
                    torsion_AC: parseFloat(datos[0].torsion_AC==''?'0':datos[0].torsion_AC),
                    torsion_BD: parseFloat(datos[0].torsion_BD==''?'0':datos[0].torsion_BD)
                }]

                const request = await reqResApiFinanza.post<PruebaCalidadInterfacenumber[]>('Auditelas/InsertPruebaCalidad', enviar);
                if (request.data.length > 0) {
                    setMensajeAlerta('Auditoría Enviada')
                    setTipoMensaje(true);
                    setShowMensajeAlerta(true);
                }
            } catch (err) {

            }
            setEnviando(false)
        }
    }
    const renderItem = (item: PruebaCalidadInterface, index: number) => {
        return (
            <View style={{ width: '100%' }}>
                <Text style={styles.textRender}>Prueba de calidad de Telas</Text>
                <TextInputContainer
                    title='Trama1:'
                    justify={false}
                    height={ObjectHeigth}
                    placeholder='0.00'
                    teclado={'decimal-pad'}
                    multiline={false}
                    editable={true}
                    onChangeText={(value) => {
                        const nuevosDatos = [...datos]
                        nuevosDatos[index].trama1 = value
                        setDatos(nuevosDatos)
                    }}
                    value={item.trama1.toString()}
                />
                <TextInputContainer
                    title='Trama2:'
                    justify={false}
                    height={ObjectHeigth}
                    placeholder='0.00'
                    teclado={'decimal-pad'}
                    multiline={false}
                    editable={true}
                    onChangeText={(value) => {
                        const nuevosDatos = [...datos]
                        nuevosDatos[index].trama2 = value
                        setDatos(nuevosDatos)
                    }}
                    value={item.trama2.toString()}
                />
                <TextInputContainer
                    title='Trama3:'
                    justify={false}
                    height={ObjectHeigth}
                    placeholder='0.00'
                    teclado={'decimal-pad'}
                    multiline={false}
                    editable={true}
                    onChangeText={(value) => {
                        const nuevosDatos = [...datos]
                        nuevosDatos[index].trama3 = value
                        setDatos(nuevosDatos)
                    }}
                    value={item.trama3.toString()}
                />
                <TextInputContainer
                    title='Undimbre1:'
                    justify={false}
                    height={ObjectHeigth}
                    placeholder='0.00'
                    teclado={'decimal-pad'}
                    multiline={false}
                    editable={true}
                    onChangeText={(value) => {
                        const nuevosDatos = [...datos]
                        nuevosDatos[index].undimbre1 = value
                        setDatos(nuevosDatos)
                    }}
                    value={item.undimbre1.toString()}
                />
                <TextInputContainer
                    title='Undimbre2:'
                    justify={false}
                    height={ObjectHeigth}
                    placeholder='0.00'
                    teclado={'decimal-pad'}
                    multiline={false}
                    editable={true}
                    onChangeText={(value) => {
                        const nuevosDatos = [...datos]
                        nuevosDatos[index].undimbre2 = value
                        setDatos(nuevosDatos)
                    }}
                    value={item.undimbre2.toString()}
                />
                <TextInputContainer
                    title='Undimbre3:'
                    justify={false}
                    height={ObjectHeigth}
                    placeholder='0.00'
                    teclado={'decimal-pad'}
                    multiline={false}
                    editable={true}
                    onChangeText={(value) => {
                        const nuevosDatos = [...datos]
                        nuevosDatos[index].undimbre3 = value
                        setDatos(nuevosDatos)
                    }}
                    value={item.undimbre3.toString()}
                />
                <TextInputContainer
                    title='Torision AC:'
                    justify={false}
                    height={ObjectHeigth}
                    placeholder='0.00'
                    teclado={'decimal-pad'}
                    multiline={false}
                    editable={true}
                    onChangeText={(value) => {
                        const nuevosDatos = [...datos]
                        nuevosDatos[index].torsion_AC = value
                        setDatos(nuevosDatos)
                    }}
                    value={item.torsion_AC.toString()}
                />
                <TextInputContainer
                    title='Torision BD:'
                    justify={false}
                    height={ObjectHeigth}
                    placeholder='0.00'
                    teclado={'decimal-pad'}
                    multiline={false}
                    editable={true}
                    onChangeText={(value) => {
                        const nuevosDatos = [...datos]
                        nuevosDatos[index].torsion_BD = value
                        setDatos(nuevosDatos)
                    }}
                    value={item.torsion_BD.toString()}
                />                
            </View>
        )
    }

    useEffect(() => {
        getPruebaCalidad()
    }, [])
    return (
        <View style={{ alignItems: 'center', flex: 1, alignContent: 'center' }}>

            <View style={{ backgroundColor: grey, borderWidth: 1 }}>
                <Text style={{ fontSize: 14, color: 'black', fontWeight: 'bold' }}>Tela: {telasState.nameAlias} - {telasState.rollId} - {telasState.apVendRoll}</Text>

            </View>

            <View style={{ flex: 1, width: '100%', maxWidth: 600, marginTop: 10, alignItems: 'center' }}>
                <TouchableOpacity
                    style={{ width: '70%' }}
                    activeOpacity={0.5}
                    onPress={() => onPressEnviar()}
                    disabled={datos.length > 0 ? enviando : false}
                >
                    <View style={[styles.button, { backgroundColor: orange, height: 41, width: '100%', alignSelf: 'center' }]}>
                        <Text style={styles.text}>{enviando ? "Enviando..." : "Enviar Auditoria"}</Text>
                    </View>
                </TouchableOpacity>
                {
                    cargando ?
                        <ActivityIndicator size={'large'} />
                        :
                        <FlatList
                            data={datos}
                            keyExtractor={(item) => item.id_Rollo.toString()}
                            renderItem={({ item, index }) => renderItem(item, index)}
                            extraData={false}
                        />
                }

            </View>
            <MyAlert visible={showMensajeAlerta} tipoMensaje={tipoMensaje} mensajeAlerta={mensajeAlerta} onPress={() => {
                if(tipoMensaje){
                    navigation.goBack()
                    navigation.goBack()

                }
                setShowMensajeAlerta(false)
                
                }} />

        </View>
    )
}
