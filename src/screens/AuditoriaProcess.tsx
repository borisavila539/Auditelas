import React, { FC, useState, useEffect, useContext, useId } from 'react'
import { Text, View, FlatList, TouchableOpacity, TextInput, Alert, Pressable, Button } from 'react-native'
import { styles } from '../theme/app.Theme';
import { listaDefectosInterface } from '../interfaces/listaDefectos'
import { TextoPantallas } from '../components/Constant';
import { black, grey, orange } from '../components/colores';
import { TelasContext } from '../context/telasContext';
import { InsertAuditelas } from '../interfaces/insertAuditelas';
import { reqResApiFinanza } from '../api/reqResApi';
import MyAlert from '../components/myAlert';

type defectoCardProps = {
    item: listaDefectosInterface,
    index: number,
}

export const AuditoriaProcess = () => {
    const [comentario, setComentario] = useState<string>("");
    const { telasState } = useContext(TelasContext);
    const [YardasProveedor, setYardasProveedor] = useState<string>('')
    const [YardasReales, setYardasReales] = useState<string>('')
    const [showMensajeAlerta, setShowMensajeAlerta] = useState<boolean>(false);
    const [tipoMensaje, setTipoMensaje] = useState<boolean>(false);
    const [mensajeAlerta, setMensajeAlerta] = useState<string>('');

    const [Datos, setDatos] = useState<listaDefectosInterface[]>([])
    //let Datos2: listaDefectosInterface[] = []

    const onPressEnviar = async () => {
        try {
            let enviar: InsertAuditelas[] = Datos.map(x => (
                {
                    id_Auditor_Creacion: telasState.usuarioId,
                    id_Rollo: telasState.IdRollo,
                    id_Estado: 1,
                    id_Defecto: x.id,
                    total_Defectos: ((x.Nivel_1 ? x.Nivel_1 : 0) + ((x.Nivel_2 ? x.Nivel_2 : 0) * 2) + ((x.Nivel_3 ? x.Nivel_3 : 0) * 3) + ((x.Nivel_4 ? x.Nivel_4 : 0) * 4)),
                    nivel_1: x.Nivel_1 ? x.Nivel_1 : 0,
                    nivel_2: x.Nivel_2 ? x.Nivel_2 : 0,
                    nivel_3: x.Nivel_3 ? x.Nivel_3 : 0,
                    nivel_4: x.Nivel_4 ? x.Nivel_4 : 0,
                }
            ));

            const request = await reqResApiFinanza.post<InsertAuditelas[]>('Auditelas/DatosRollosInsert', enviar);
            if (request.data.length > 0) {
                setMensajeAlerta('Auditoría Enviada')
                setTipoMensaje(true);
                setShowMensajeAlerta(true);
            } else {
                setMensajeAlerta('Error en el envío')
                setTipoMensaje(false);
                setShowMensajeAlerta(true);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const onPressMin = (item2: listaDefectosInterface, index: number, nivel: number) => {
        const nuevosDatos: listaDefectosInterface[] = [...Datos];
        switch (nivel) {
            case 1:
                item2.Nivel_1 = (item2.Nivel_1 - 1 >= 0) ? item2.Nivel_1 - 1 : 0
                break
            case 2:
                item2.Nivel_2 = (item2.Nivel_2 - 1 >= 0) ? item2.Nivel_2 - 1 : 0
                break
            case 3:
                item2.Nivel_3 = (item2.Nivel_3 - 1 >= 0) ? item2.Nivel_3 - 1 : 0
                break
            case 4:
                item2.Nivel_4 = (item2.Nivel_4 - 1 >= 0) ? item2.Nivel_4 - 1 : 0
                break
            default:
                item2 = item2
        }
        nuevosDatos[index] = item2;
        setDatos(nuevosDatos)
    }
    const DefectosCard: FC<defectoCardProps> = ({ item, index, //onPressMin, onPressPlus 
    }) => {
        const onPressPlus = (item2: listaDefectosInterface, index: number, nivel: number) => {
            const nuevosDatos: listaDefectosInterface[] = [...Datos];

            if (nivel = 1) {
                item.Nivel_1 = item.Nivel_1 + 1;

            }
            switch (nivel) {
                case 1:
                    item2.Nivel_1 = item2.Nivel_1 + 1;
                    break
                case 2:
                    item2.Nivel_2 = item2.Nivel_2 + 1;
                    break
                case 3:
                    item2.Nivel_3 = item2.Nivel_3 + 1;
                    break
                case 4:
                    item2.Nivel_4 = item2.Nivel_4 + 1;
                    break
                default:
                    item2 = item2
            }
            nuevosDatos[index] = item2;
            // Datos2 = nuevosDatos
            setDatos(nuevosDatos)

        }
        return (
            <View style={{ width: '100%', flexDirection: 'row', alignContent: 'center', alignItems: 'center' }}>
                <View style={{ width: '95%', borderWidth: 1, alignItems: 'center', borderRadius: 10, marginTop: 5 }}>
                    <Text style={{ color: '#000' }}>{item.descripcion}</Text>

                    <View style={{ flexDirection: 'row', width: '80%' }}>
                        <Text style={{ width: '55%', color: '#000' }}>Nivel 1</Text>
                        <TouchableOpacity style={[styles.botonSumaResta, { width: '15%' }]}
                            onPress={() => {
                                const nuevosDatos = [...Datos]
                                nuevosDatos[index].Nivel_1 = (item.Nivel_1 - 1 >= 0) ? item.Nivel_1 - 1 : 0
                                setDatos(nuevosDatos)
                            }}
                        >
                            <Text style={{ color: 'white', fontSize: TextoPantallas }}>-</Text>
                        </TouchableOpacity>
                        <TextInput value={item.Nivel_1 + ""} style={{ color: '#000', borderColor: '#000' }} />
                        {
                            //<Text style={[styles.textRender, { width: '15%', textAlign: 'center' }]}>{item.Nivel_1}</Text>
                        }

                        <TouchableOpacity style={[styles.botonSumaResta, { width: '15%' }]}
                            onPress={() => {
                                const nuevosDatos: listaDefectosInterface[] = [...Datos]
                                nuevosDatos[index].Nivel_1 = item.Nivel_1 + 1
                                console.log("inicio")
                                setDatos(nuevosDatos)
                                console.log("FIn")
                            }}
                        >
                            <Text style={{ color: 'white', fontSize: TextoPantallas }}>+</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', width: '80%', marginTop: 5 }}>
                        <Text style={{ width: '55%', color: '#000' }}>Nivel 2</Text>
                        <TouchableOpacity style={[styles.botonSumaResta, { width: '15%' }]}
                            onPress={() => onPressMin(item, index, 2)
                            }
                        >
                            <Text style={{ color: 'white', fontSize: TextoPantallas }}>-</Text>
                        </TouchableOpacity>
                        <TextInput value={item.Nivel_2 + ""} style={{ color: '#000', borderColor: '#000' }} />
                        {
                            //<Text style={[styles.textRender, { width: '15%', textAlign: 'center' }]}>{item.Nivel_2}</Text>
                        }
                        <TouchableOpacity style={[styles.botonSumaResta, { width: '15%' }]}

                            onPress={() => onPressPlus(item, index, 2)}
                        >
                            <Text style={{ color: 'white', fontSize: TextoPantallas }}>+</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: 'row', width: '80%', marginTop: 5 }}>
                        <Text style={{ width: '55%', color: '#000' }}>Nivel 3</Text>
                        <TouchableOpacity style={[styles.botonSumaResta, { width: '15%' }]}
                            onPress={() => onPressMin(item, index, 3)
                            }
                        >
                            <Text style={{ color: 'white', fontSize: TextoPantallas }}>-</Text>
                        </TouchableOpacity>
                        <TextInput value={item.Nivel_3 + ""} style={{ color: '#000', borderColor: '#000' }} />
                        {
                            //<Text style={[styles.textRender, { width: '15%', textAlign: 'center' }]}>{item.Nivel_3}</Text>
                        }
                        <TouchableOpacity style={[styles.botonSumaResta, { width: '15%' }]}

                            onPress={() => onPressPlus(item, index, 3)}
                        >
                            <Text style={{ color: 'white', fontSize: TextoPantallas }}>+</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: 'row', width: '80%', marginTop: 5 }}>
                        <Text style={{ width: '55%', color: '#000' }}>Nivel 4</Text>
                        <TouchableOpacity style={[styles.botonSumaResta, { width: '15%' }]}
                            onPress={() => onPressMin(item, index, 4)
                            }
                        >
                            <Text style={{ color: 'white', fontSize: TextoPantallas }}>-</Text>
                        </TouchableOpacity>
                        <TextInput value={item.Nivel_4 + ""} style={{ color: '#000', borderColor: '#000' }} />
                        {
                            //<Text style={[styles.textRender, { width: '15%', textAlign: 'center' }]}>{item.Nivel_4}</Text>
                        }
                        <TouchableOpacity style={[styles.botonSumaResta, { width: '15%' }]}

                            onPress={() => onPressPlus(item, index, 4)}
                        >
                            <Text style={{ color: 'white', fontSize: TextoPantallas }}>+</Text>
                        </TouchableOpacity>
                    </View>
                    {
                        <Text style={styles.textTotal} >Total: {((item.Nivel_1 ? item.Nivel_1 : 0) + ((item.Nivel_2 ? item.Nivel_2 : 0) * 2) + ((item.Nivel_3 ? item.Nivel_3 : 0) * 3) + ((item.Nivel_4 ? item.Nivel_4 : 0) * 4))}</Text>
                    }
                </View>
            </View>
        )
    }

    const GetData = async () => {

        const request = await reqResApiFinanza.get<listaDefectosInterface[]>('Auditelas/DatosDefectosTelas')
        const datos: listaDefectosInterface[] = request.data;

        for (let index = 0; index < datos.length; index++) {
            datos[index].nivel_1 = 0
            datos[index].nivel_2 = 0
            datos[index].nivel_3 = 0
            datos[index].nivel_4 = 0
            datos[index].total_Defectos = 0
        }
        //Datos2 = datos
        setDatos(datos)
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
                        <TextInput placeholder='Inicio' textAlign='center' keyboardType='decimal-pad' placeholderTextColor={grey} style={{ color: black, backgroundColor: 'white' }}></TextInput>
                    </View>
                    <View style={styles.viewsAuditoria}>
                        <TextInput placeholder='Medio' textAlign='center' keyboardType='decimal-pad' placeholderTextColor={grey} style={{ color: black, backgroundColor: 'white' }}></TextInput>
                    </View>
                    <View style={styles.viewsAuditoria}>
                        <TextInput placeholder='Final' textAlign='center' keyboardType='decimal-pad' placeholderTextColor={grey} style={{ color: black, backgroundColor: 'white' }}></TextInput>
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
                        onChangeText={(value) => setComentario(value)}
                        value={comentario}
                        maxLength={300}
                    />
                </View>
            </View>

            <TouchableOpacity
                style={{ width: '90%' }}
                activeOpacity={0.5}
                onPress={() => onPressEnviar()}
            >
                <View style={[styles.button, { backgroundColor: orange, height: 41, width: '50%', alignSelf: 'center' }]}>
                    <Text style={styles.text}>Enviar Auditoria</Text>
                </View>
                <MyAlert visible={showMensajeAlerta} tipoMensaje={tipoMensaje} mensajeAlerta={mensajeAlerta} onPress={() => setShowMensajeAlerta(false)} />
            </TouchableOpacity>

            <View style={{ flex: 1, width: '100%', maxWidth: 600, borderWidth: 1, marginTop: 10 }}>
                <FlatList
                    data={Datos}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item, index }) => <DefectosCard index={index} item={item} //onPressMin={onPressMin} onPressPlus={onPressPlus} 
                    />}
                    style={{ flex: 1, width: '104%', alignContent: 'center', marginLeft: 2, marginRight: 2 }}>
                </FlatList>
            </View>
        </View>
    )
}
