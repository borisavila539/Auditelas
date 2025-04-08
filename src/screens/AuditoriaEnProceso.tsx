import React, { useState, useEffect, useContext } from 'react'
import { Text, View, FlatList, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native'
import { styles } from '../theme/app.Theme';
import { listaDefectosInterface } from '../interfaces/listaDefectos'
import { black, grey, menta, orange } from '../components/colores';
import { TelasContext } from '../context/telasContext';
import { InsertAuditelas } from '../interfaces/insertAuditelas';
import { reqResApiFinanza } from '../api/reqResApi';
import MyAlert from '../components/myAlert';
import { StackScreenProps } from '@react-navigation/stack';
import { Niveles } from '../components/Niveles';
import { yardasRealesInterface } from '../interfaces/yardas';
import { DatosRolloInterface } from '../interfaces/DatosRollosInterface';
//import { yardasRealesInterface } from '../interfaces/yardas';
import Icon from 'react-native-vector-icons/Ionicons';


interface Props extends StackScreenProps<any, any> { };


export const AuditoriaEnProceso = ({ navigation }: Props) => {
    const { telasState } = useContext(TelasContext);
    const [YardasProveedor, setYardasProveedor] = useState<string>('')
    const [YardasReales, setYardasReales] = useState<string>('')
    const [DiferenciaYardas, setDiferenciaYardas] = useState<string>('')
    const [showMensajeAlerta, setShowMensajeAlerta] = useState<boolean>(false);
    const [tipoMensaje, setTipoMensaje] = useState<boolean>(false);
    const [mensajeAlerta, setMensajeAlerta] = useState<string>('');
    const [Datos, setDatos] = useState<listaDefectosInterface[]>([]);
    const [cargando, setCargando] = useState<boolean>(false);
    const [enviando, setEnviando] = useState<boolean>(false);
    const [ancho1, setAncho1] = useState<string>('');
    const [ancho2, setAncho2] = useState<string>('');
    const [ancho3, setAncho3] = useState<string>('');
    const [observaciones, setobservaciones] = useState<string>('');
    const [PM, setPM] = useState<string>('');


    const ActualizarAncho = async () => {
        let a1 = parseFloat(ancho1)
        let a2 = parseFloat(ancho2)
        let a3 = parseFloat(ancho3)
        let minimo: number = Math.min(a1, a2, a3)
        try {
            const request = await reqResApiFinanza.get<InsertAuditelas[]>('Auditelas/setAnchoRollo/' + telasState.rollId + '/' + minimo);
        } catch (err) {

        }

    }
    const onPressEnviar = async () => {

        if (!enviando) {
            setEnviando(true)
            ActualizarAncho()
            if (parseFloat(YardasReales ? YardasReales : '0') > 0) {
                try {
                    let enviar: InsertAuditelas[] = Datos.map(x => (
                        {
                            id_Auditor_Creacion: telasState.usuarioId,
                            id_Rollo: telasState.IdRollo,
                            id_Estado: 1,
                            id_Defecto: x.id,
                            total_Defectos: ((x.nivel_1 ? x.nivel_1 : 0) + ((x.nivel_2 ? x.nivel_2 : 0) * 2) + ((x.nivel_3 ? x.nivel_3 : 0) * 3) + ((x.nivel_4 ? x.nivel_4 : 0) * 4)),
                            nivel_1: x.nivel_1 ? x.nivel_1 : 0,
                            nivel_2: x.nivel_2 ? x.nivel_2 : 0,
                            nivel_3: x.nivel_3 ? x.nivel_3 : 0,
                            nivel_4: x.nivel_4 ? x.nivel_4 : 0,
                        }
                    ));

                    let enviar2: yardasRealesInterface[] = [{
                        id_Rollo: parseInt(telasState.IdRollo),
                        ancho_1: parseFloat(ancho1),
                        ancho_2: parseFloat(ancho2),
                        ancho_3: parseFloat(ancho3),
                        yardas_Proveedor: parseFloat(YardasProveedor),
                        yardas_Reales: parseFloat(YardasReales),
                        diferencia_Yardas: parseFloat((parseFloat(YardasReales ? YardasReales : '0') - parseFloat(YardasProveedor ? YardasProveedor : '0')).toString(),),
                        observaciones: observaciones,
                    }]

                    const request = await reqResApiFinanza.post<InsertAuditelas[]>('Auditelas/DatosRollosInsert', enviar);
                    if (request.data.length > 0) {
                        await reqResApiFinanza.post<yardasRealesInterface[]>('Auditelas/InsertarAnchoYardas', enviar2);

                        try {
                            const request2 = await reqResApiFinanza.get<string>('Auditelas/EnvioAX/' + telasState.IdRollo);

                            if (request2.data == 'Creado' || request2.data == 'Actualizado') {
                                CalculoPM()
                                setMensajeAlerta('Auditoría Enviada')
                                setTipoMensaje(true);
                                setShowMensajeAlerta(true);
                            } else {
                                setMensajeAlerta(request2.data)
                                setTipoMensaje(false);
                                setShowMensajeAlerta(true);
                            }
                        }
                        catch (error) {
                            setMensajeAlerta('Error en el envío en AX')
                            setTipoMensaje(false);
                            setShowMensajeAlerta(true);
                        }
                    }

                }
                catch (error) {
                    console.log(error)
                    setMensajeAlerta('Error en el envío')
                    setTipoMensaje(false);
                    setShowMensajeAlerta(true);
                }
            } else {
                setMensajeAlerta('Yardas Reales en Cero')
                setTipoMensaje(false);
                setShowMensajeAlerta(true);
            }
        }

        setEnviando(false)

    }

    const GetData = async () => {
        setCargando(true)
        try {
            const request = await reqResApiFinanza.get<listaDefectosInterface[]>('Auditelas/DatosDefectosTelas/' + telasState.IdRollo)
            const datos: listaDefectosInterface[] = request.data;

            console.log(telasState.IdRollo)
            setDatos(datos)
        } catch (err) {

        }

        setCargando(false)

    }


    const renderItem = (item: listaDefectosInterface, index: number) => {
        return (
            <View style={{ width: '100%', flexDirection: 'row', alignContent: 'center', alignItems: 'center' }}>

                <View style={{ width: '98%', borderWidth: 1, alignItems: 'center', borderRadius: 5, marginTop: 5 }}>

                    <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 18 }}>{item.descripcion}</Text>

                    <Niveles item={item}
                        onPressMin={(num: any) => {
                            const nuevosDatos = [...Datos]
                            nuevosDatos[index].nivel_1 = (item.nivel_1 - num >= 0) ? item.nivel_1 - num : 0
                            setDatos(nuevosDatos)
                        }}

                        onPressPlus={(num: any) => {
                            const nuevosDatos = [...Datos]
                            nuevosDatos[index].nivel_1 = item.nivel_1 + num
                            setDatos(nuevosDatos)
                        }}
                        nivel={item.nivel_1}
                        text='Nivel 1'
                    />

                    <Niveles item={item}
                        onPressMin={(num: any) => {
                            const nuevosDatos = [...Datos]
                            nuevosDatos[index].nivel_2 = (item.nivel_2 - num >= 0) ? item.nivel_2 - num : 0
                            setDatos(nuevosDatos)
                        }}

                        onPressPlus={(num: any) => {
                            const nuevosDatos = [...Datos]
                            nuevosDatos[index].nivel_2 = item.nivel_2 + num
                            setDatos(nuevosDatos)
                        }}
                        nivel={item.nivel_2}
                        text='Nivel 2'
                    />

                    <Niveles item={item}
                        onPressMin={(num: any) => {
                            const nuevosDatos = [...Datos]
                            nuevosDatos[index].nivel_3 = (item.nivel_3 - num >= 0) ? item.nivel_3 - num : 0
                            setDatos(nuevosDatos)
                        }}

                        onPressPlus={(num: any) => {
                            const nuevosDatos = [...Datos]
                            nuevosDatos[index].nivel_3 = item.nivel_3 + num
                            setDatos(nuevosDatos)
                        }}
                        nivel={item.nivel_3}
                        text='Nivel 3'
                    />

                    <Niveles item={item}
                        onPressMin={(num: any) => {
                            const nuevosDatos = [...Datos]
                            nuevosDatos[index].nivel_4 = (item.nivel_4 - num >= 0) ? item.nivel_4 - num : 0
                            setDatos(nuevosDatos)
                        }}

                        onPressPlus={(num: any) => {
                            const nuevosDatos = [...Datos]
                            nuevosDatos[index].nivel_4 = item.nivel_4 + num
                            setDatos(nuevosDatos)
                        }}
                        nivel={item.nivel_4}
                        text='Nivel 4'

                    />

                    <Text style={styles.textTotal} >Total: {((item.nivel_1 ? item.nivel_1 : 0) + ((item.nivel_2 ? item.nivel_2 : 0) * 2) + ((item.nivel_3 ? item.nivel_3 : 0) * 3) + ((item.nivel_4 ? item.nivel_4 : 0) * 4))}</Text>


                </View>

            </View>
        )
    }
    const ImprimirEtiqueta = async () => {
        try {
            await reqResApiFinanza.get<string>(`Auditelas/ImprimirEtiqueta/${telasState.rollId}`).then(resp => {
                navigation.goBack();
            })
        } catch (err) {
            console.log(err + telasState.IdRollo)
        }
    }


    const CalculoPM = () => {
        let calculo: number = 0;
        let total: number = 0;
        Datos.forEach(x => {
            total += ((x.nivel_1 ? x.nivel_1 : 0) + ((x.nivel_2 ? x.nivel_2 : 0) * 2) + ((x.nivel_3 ? x.nivel_3 : 0) * 3) + ((x.nivel_4 ? x.nivel_4 : 0) * 4))
        })
        let denominador: number = (
            (
                (
                    (parseFloat(ancho1 == "" ? '0' : ancho1) + (parseFloat(ancho2 == "" ? '0' : ancho2)) + (parseFloat(ancho3 == "" ? '0' : ancho3))) / 3
                )
                * 0.0254
            ) * parseFloat(YardasProveedor == "" ? '0' : YardasProveedor)
        );
        calculo = (total * 100) / (denominador > 0 ? denominador : 1);
        setPM(parseFloat(calculo.toFixed(2)) > 0 ? calculo.toFixed(2) : '')

    }


    const getDatosRollo = async () => {
        try {
            await reqResApiFinanza.get<DatosRolloInterface>(`Auditelas/ObtenerDatosRollo/${telasState.rollId}`).then(resp => {
                setAncho1(resp.data.ancho_1.toString())
                setAncho2(resp.data.ancho_2.toString())
                setAncho3(resp.data.ancho_3.toString())
                setYardasProveedor(resp.data.yardas_Proveedor.toString())
                setYardasReales(resp.data.yardas_Reales.toString())

            })
        } catch (err) {
            console.log(err + telasState.rollId)
        }
    }
    useEffect(() => {
        GetData()
        getDatosRollo()
    }, [])





    return (

        <View style={{ alignItems: 'center', flex: 1, alignContent: 'center' }}>
            <View style={{ backgroundColor: grey, borderWidth: 1 }}>
                <Text style={{ fontSize: 14, color: 'black', fontWeight: 'bold' }}>Tela: {telasState.nameAlias} - {telasState.rollId} - {telasState.apVendRoll}</Text>
            </View>
            <View style={styles.contenedorDatosRollo}>
                <Text style={{ fontWeight: 'bold', fontSize: 12, color: 'black' }}>
                    Ancho Real:
                </Text>
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.viewsAuditoria}>
                        <TextInput placeholder='Inicio' textAlign='center' keyboardType='decimal-pad'
                            value={ancho1}
                            onChangeText={(value) => setAncho1(value)}
                            placeholderTextColor={grey} style={{ color: black, backgroundColor: 'white' }}></TextInput>
                    </View>
                    <View style={styles.viewsAuditoria}>
                        <TextInput placeholder='Medio' textAlign='center' keyboardType='decimal-pad'
                            value={ancho2}
                            onChangeText={(value) => setAncho2(value)}
                            placeholderTextColor={grey} style={{ color: black, backgroundColor: 'white' }}></TextInput>
                    </View>
                    <View style={styles.viewsAuditoria}>
                        <TextInput placeholder='Final' textAlign='center' keyboardType='decimal-pad'
                            value={ancho3}
                            onChangeText={(value) => setAncho3(value)}
                            placeholderTextColor={grey} style={{ color: black, backgroundColor: 'white' }}></TextInput>
                    </View>
                </View>
                <Text style={{ fontWeight: 'bold', fontSize: 12, color: 'black' }}>
                    Metros Reales:
                </Text>
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.viewsAuditoria}>
                        <TextInput placeholder='Metros Proveedor'
                            value={YardasProveedor}
                            onChangeText={(value) => setYardasProveedor(value)}
                            textAlign='center' keyboardType='decimal-pad'
                            placeholderTextColor={grey} style={{ color: black, backgroundColor: 'white' }}></TextInput>
                    </View>
                    <View style={styles.viewsAuditoria}>
                        <TextInput placeholder='Metros Reales'
                            value={YardasReales}
                            onChangeText={(value) => setYardasReales(value)}
                            textAlign='center' keyboardType='decimal-pad'
                            placeholderTextColor={grey} style={{ color: black, backgroundColor: 'white' }}></TextInput>
                    </View>
                    <View style={styles.viewsAuditoria}>
                        <TextInput editable={false} placeholder='Diferencia'
                            value={(parseFloat(YardasReales ? YardasReales : '0') - parseFloat(YardasProveedor ? YardasProveedor : '0')).toFixed(2).toString()}
                            textAlign='center' keyboardType='decimal-pad'
                            placeholderTextColor={grey} style={{ color: black, backgroundColor: 'white' }}></TextInput>
                    </View>
                </View>


                <Text style={{ fontWeight: 'bold', fontSize: 12, color: 'black' }}>
                    Comentarios:                                                                                               PM/2:
                </Text>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: '60%', margin: 2, borderRadius: 5, borderWidth: 1, backgroundColor: 'white' }}>
                        <TextInput
                            style={{ color: black }}
                            placeholderTextColor={grey}
                            multiline={true}
                            onChangeText={(value) => setobservaciones(value)}
                            value={observaciones}
                            maxLength={300}
                        />
                    </View>
                    <View style={styles.viewsAuditoria}>
                        <TextInput editable={false}
                            value={PM + ''}
                            textAlign='center'
                            placeholderTextColor={grey} style={{ color: black, backgroundColor: 'white' }}></TextInput>
                    </View>
                </View>
            </View>

            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <TouchableOpacity
                    style={{ width: '70%' }}
                    activeOpacity={0.5}
                    onPress={() => onPressEnviar()}
                    disabled={Datos.length > 0 ? enviando : false}

                >
                    <View style={[styles.button, { backgroundColor: orange, height: 41, width: '100%', alignSelf: 'center' }]}>
                        <Text style={styles.text}>{enviando ? "Enviando..." : "Enviar Auditoria"}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={ImprimirEtiqueta} style={{
                    marginTop: 3, borderRadius: 10, width: 50, padding: 5, backgroundColor: menta, alignItems: 'center', justifyContent: 'center'

                }}>
                    <Icon name='print' size={20} color={black}></Icon>
                </TouchableOpacity>
            </View>

            <View style={{ flex: 1, width: '100%', maxWidth: 600, borderWidth: 1, marginTop: 10, alignItems: 'center' }}>
                {
                    cargando ?
                        <ActivityIndicator size={'large'} />
                        :
                        Datos.length > 0 ?
                            <FlatList
                                data={Datos}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={({ item, index }) => renderItem(item, index)}
                                extraData={false}
                            />
                            :
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={styles.text}>No cargó</Text>
                            </View>
                }
            </View>
            <MyAlert visible={showMensajeAlerta} tipoMensaje={tipoMensaje} mensajeAlerta={mensajeAlerta} onPress={() => setShowMensajeAlerta(false)} />

        </View>

    )
}
