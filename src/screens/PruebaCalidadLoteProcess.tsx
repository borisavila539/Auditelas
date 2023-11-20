import React, { useContext, useEffect, useState, FC } from 'react'
import { ActivityIndicator, FlatList, TouchableOpacity, View } from 'react-native'
import { styles } from '../theme/app.Theme'
import { Text } from 'react-native'
import { orange } from '../components/colores'
import { TelasContext } from '../context/telasContext'
import { reqResApiFinanza } from '../api/reqResApi'
import { PruebaCalidadInterface, PruebaCalidadInterfaceLote, PruebaCalidadInterfacenumber } from '../interfaces/PruebaCalidadInterface'
import TextInputContainer from '../components/TextInputContainer'
import { ObjectHeigth } from '../components/Constant'
import MyAlert from '../components/myAlert'
import { StackScreenProps } from '@react-navigation/stack'
import { TextInput } from 'react-native-gesture-handler'


interface Props extends StackScreenProps<any, any> { };

export const PruebaCalidadProcess: FC<Props> = ({ navigation }) => {
    const { telasState } = useContext(TelasContext);
    const [cargando, setCargando] = useState<boolean>(false)
    const [datos, setDatos] = useState<PruebaCalidadInterface[]>([{
        id_Rollo: 0, usuarioID: 0, trama1: '',
        trama2: '',
        trama3: '',
        undimbre1: '',
        undimbre2: '',
        undimbre3: '',
        torsion_AC: '',
        torsion_BD: ''
    }])
    const [enviando, setEnviando] = useState<boolean>(false)
    const [showMensajeAlerta, setShowMensajeAlerta] = useState<boolean>(false);
    const [tipoMensaje, setTipoMensaje] = useState<boolean>(false);
    const [mensajeAlerta, setMensajeAlerta] = useState<string>('');
    const [cantidad, setCantidad] = useState<number>(0)
    const [pruebas,setPruebas] = useState<PruebaCalidadInterfaceLote[]>([])

    const GuardarAuditoria=()=>{
        let prueba: PruebaCalidadInterfaceLote = {
            id_Rollo: '',
            trama1: parseFloat(datos[0].trama1 == '' ? '0' : datos[0].trama1),
            trama2: parseFloat(datos[0].trama2 == '' ? '0' : datos[0].trama2),
            trama3: parseFloat(datos[0].trama3 == '' ? '0' : datos[0].trama3),
            undimbre1: parseFloat(datos[0].undimbre1 == '' ? '0' : datos[0].undimbre1),
            undimbre2: parseFloat(datos[0].undimbre2 == '' ? '0' : datos[0].undimbre2),
            undimbre3: parseFloat(datos[0].undimbre3 == '' ? '0' : datos[0].undimbre3),
            torsion_AC: parseFloat(datos[0].torsion_AC == '' ? '0' : datos[0].torsion_AC),
            torsion_BD: parseFloat(datos[0].torsion_BD == '' ? '0' : datos[0].torsion_BD)
        }
        setPruebas(pruebas.concat(prueba))
        setCantidad(cantidad + 1)

    }
    const onPressEnviar = async () => {
        

        if (!enviando) {
            setEnviando(true)
            if (telasState.CantidadLote == cantidad) {
                let cont:number = telasState.RollosLote.length;
                let prueba: PruebaCalidadInterfaceLote = {
                    id_Rollo: '',
                    trama1:0 ,
                    trama2: 0,
                    trama3: 0,
                    undimbre1: 0,
                    undimbre2:0,
                    undimbre3: 0,
                    torsion_AC: 0,
                    torsion_BD: 0
                }
                pruebas.forEach(x=>{
                    prueba.trama1 += x.trama1
                    prueba.trama2 += x.trama2 
                    prueba.trama3 += x.trama3
                    prueba.undimbre1 += x.undimbre1
                    prueba.undimbre2 += x.undimbre2
                    prueba.undimbre3 += x.undimbre3
                    prueba.torsion_AC += x.torsion_AC
                    prueba.torsion_BD += x.torsion_BD
                })
                let dividir: number = pruebas.length
                prueba = {
                    id_Rollo: '',
                    trama1:prueba.trama1/dividir ,
                    trama2: prueba.trama2/dividir,
                    trama3: prueba.trama3/dividir,
                    undimbre1: prueba.undimbre1/dividir,
                    undimbre2:prueba.undimbre2/dividir,
                    undimbre3: prueba.undimbre3/dividir,
                    torsion_AC: prueba.torsion_AC/dividir,
                    torsion_BD: prueba.torsion_BD/dividir
                }
                telasState.RollosLote.forEach(async (x) => {
                    try {
                        prueba.id_Rollo = x

                        console.log(prueba)
                        
                        /*const request = await reqResApiFinanza.post<PruebaCalidadInterfacenumber[]>('Auditelas/InsertPruebaCalidad', enviar);
                        if (request.data.length > 0) {
                            setMensajeAlerta('Auditoría Enviada')
                            setTipoMensaje(true);
                            setShowMensajeAlerta(true);
                        }*/
                        cont --;
                    } catch (err) {

                    }
                })
                if (cont == 0){
                    navigation.goBack();
                }else{

                }
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


    return (
        <View style={{ alignItems: 'center', flex: 1, alignContent: 'center' }}>
            <View style={{ width: '90%', maxWidth: 500, marginTop: 10 }}>
                <View style={{ flexDirection: 'row', width: '100%' }}>
                    <View style={{ flexDirection: 'column', width: '50%' }}>

                        <Text style={styles.textRender}>No. Pruebas</Text>
                        <TextInput style={styles.textInputs} value={telasState.CantidadLote + ''}
                            editable={false} />
                    </View>
                    <View style={{ flexDirection: 'column', width: '50%' }}>

                        <Text style={styles.textRender}>Pruebas Realizadas</Text>
                        <TextInput style={styles.textInputs} value={cantidad + ''}
                            editable={false} />
                    </View>
                </View>
            </View>
            <View style={{ flex: 1, width: '100%', maxWidth: 600, marginTop: 10, alignItems: 'center' }}>
                <TouchableOpacity
                    style={{ width: '70%' }}
                    activeOpacity={0.5}
                    onPress={() => cantidad == telasState.CantidadLote ?onPressEnviar():GuardarAuditoria()}
                    disabled={datos.length > 0 ? enviando : false}
                >
                    <View style={[styles.button, { backgroundColor: orange, height: 41, width: '100%', alignSelf: 'center' }]}>
                        <Text style={styles.text}>{enviando ? "Enviando..." : (cantidad == telasState.CantidadLote ? "Enviar Auditoria" : "Enviar Auditoria " + (cantidad + 1))}</Text>
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
                if (tipoMensaje) {
                    navigation.goBack()
                }
                setShowMensajeAlerta(false)

            }} />

        </View>
    )
}
