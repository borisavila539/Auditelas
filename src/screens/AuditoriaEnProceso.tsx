import React, { useState, useEffect, useContext, useId } from 'react'
import { Text, View, FlatList, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native'
import { styles } from '../theme/app.Theme';
import { listaDefectosInterface } from '../interfaces/listaDefectos'
import { black, grey, orange } from '../components/colores';
import { TelasContext } from '../context/telasContext';
import { InsertAuditelas } from '../interfaces/insertAuditelas';
import { reqResApiFinanza } from '../api/reqResApi';
import MyAlert from '../components/myAlert';
import { StackScreenProps } from '@react-navigation/stack';
import { Niveles } from '../components/Niveles';
import { yardasRealesInterface } from '../interfaces/yardas';

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


    const onPressEnviar = async () => {

        if (!enviando) {
            setEnviando(true)

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

                    try {
                        const request2 = await reqResApiFinanza.get<string>('Auditelas/EnvioAX/' + telasState.IdRollo);

                        if (request2.data = 'Creado' || request2.data == 'Actualizado') {
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
                    const request3 = await reqResApiFinanza.post<yardasRealesInterface[]>('Auditelas/InsertarAnchoYardas', enviar2);
                }

            }
            catch (error) {
                console.log(error)
                setMensajeAlerta('Error en el envío')
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

                    <Text style={{ color: '#000' }}>{item.descripcion}</Text>

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

    useEffect(() => {
        GetData()
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
                    Yardas Reales:
                </Text>
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.viewsAuditoria}>
                        <TextInput placeholder='Yardas Proveedor'
                            value={YardasProveedor}
                            onChangeText={(value) => setYardasProveedor(value)}
                            textAlign='center' keyboardType='decimal-pad'
                            placeholderTextColor={grey} style={{ color: black, backgroundColor: 'white' }}></TextInput>
                    </View>
                    <View style={styles.viewsAuditoria}>
                        <TextInput placeholder='Yardas Reales'
                            value={YardasReales}
                            onChangeText={(value) => setYardasReales(value)}
                            textAlign='center' keyboardType='decimal-pad'
                            placeholderTextColor={grey} style={{ color: black, backgroundColor: 'white' }}></TextInput>
                    </View>
                    <View style={styles.viewsAuditoria}>
                        <TextInput editable={false} placeholder='Diferencia'
                            value={(parseFloat(YardasReales ? YardasReales : '0') - parseFloat(YardasProveedor ? YardasProveedor : '0')).toString()}
                            textAlign='center' keyboardType='decimal-pad'
                            placeholderTextColor={grey} style={{ color: black, backgroundColor: 'white' }}></TextInput>
                    </View>
                </View>
                <Text style={{ fontWeight: 'bold', fontSize: 12, color: 'black' }}>
                    Comentarios:
                </Text>
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
            </View>

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
