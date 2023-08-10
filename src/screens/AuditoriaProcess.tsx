import React, { FC, useState, useEffect, useContext, useId } from 'react'
import { Text, View, FlatList, TouchableOpacity, TextInput } from 'react-native'
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

    const [Datos, setDatos] = useState<listaDefectosInterface[]>(
        [

        ]
    )
    const onPressEnviar = async () => {
        try {
            let enviar: InsertAuditelas[] = [];
            Datos.map(x => {
                enviar.push({
                    id_Auditor_Creacion: telasState.usuarioId,
                    id_Rollo: telasState.IdRollo,
                    id_Estado: 1,
                    id_Defecto: x.id,
                    total_Defectos: ((x.Nivel_1 ? x.Nivel_1 : 0) + ((x.Nivel_2 ? x.Nivel_2 : 0) * 2) + ((x.Nivel_3 ? x.Nivel_3 : 0) * 3) + ((x.Nivel_4 ? x.Nivel_4 : 0) * 4)),
                    nivel_1: x.Nivel_1 ? x.Nivel_1 : 0,
                    nivel_2: x.Nivel_2 ? x.Nivel_2 : 0,
                    nivel_3: x.Nivel_3 ? x.Nivel_3 : 0,
                    nivel_4: x.Nivel_4 ? x.Nivel_4 : 0,
                })
            })
            const request = await reqResApiFinanza.post<InsertAuditelas[]>('Auditelas/DatosRollosInsert', enviar);
            if (request.data.length > 0) {
                let x = 0;
                console.log(request.data[0])
            } else {
                console.log('No se modificó!')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const DefectosCard: FC<defectoCardProps> = ({ item, index, //onPressMin, onPressPlus 
    }) => {
        const onPressPlus = (item2: listaDefectosInterface, index: number, nivel: number) => {
            const nuevosDatos = [...Datos];
            switch (nivel) {
                case 1:
                    nuevosDatos[index].Nivel_1 = item2.Nivel_1 ? item2.Nivel_1 + 1 : 0 + 1;
                    setDatos(nuevosDatos)
                    return

                case 2:
                    nuevosDatos[index].Nivel_2 = item2.Nivel_2 ? item2.Nivel_2 + 1 : 0 + 1;
                    setDatos(nuevosDatos)
                    return

                case 3:
                    nuevosDatos[index].Nivel_3 = item2.Nivel_3 ? item2.Nivel_3 + 1 : 0 + 1;
                    setDatos(nuevosDatos)
                    return

                case 4:
                    nuevosDatos[index].Nivel_4 = item2.Nivel_4 ? item2.Nivel_4 + 1 : 0 + 1;
                    setDatos(nuevosDatos)
                    return
                default:
            }
        }
        const onPressMin = (item2: listaDefectosInterface, index: number, nivel: number) => {
            const nuevosDatos = [...Datos];
            switch (nivel) {
                case 1:
                    nuevosDatos[index].Nivel_1 = (item2.Nivel_1 - 1) >= 0 ? item2.Nivel_1 ? item2.Nivel_1 - 1 : 0 - 1 : item2.Nivel_1;
                    setDatos(nuevosDatos)
                    return
                    break;
                case 2:
                    nuevosDatos[index].Nivel_2 = (item2.Nivel_2 - 1) >= 0 ? item2.Nivel_2 ? item2.Nivel_2 - 1 : 0 - 1 : item2.Nivel_2;
                    setDatos(nuevosDatos)
                    return
                    break;
                case 3:
                    nuevosDatos[index].Nivel_3 = (item2.Nivel_3 - 1) >= 0 ? item2.Nivel_3 ? item2.Nivel_3 - 1 : 0 - 1 : item2.Nivel_3;
                    setDatos(nuevosDatos)
                    return
                    break;
                case 4:
                    nuevosDatos[index].Nivel_4 = (item2.Nivel_4 - 1) >= 0 ? item2.Nivel_4 ? item2.Nivel_4 - 1 : 0 - 1 : item2.Nivel_4;
                    setDatos(nuevosDatos)
                    return
                default:
            }
        }
        return (
            <View style={{ width: '100%', flexDirection: 'row', alignContent: 'center' }}>
                <View style={styles.contenedorNiveldefectos
                }>
                    <View style={{ width: '100%', marginHorizontal: 3 }}>
                        <View style={{ width: '100%', alignItems: 'center' }}>
                            <Text style={styles.textRender}>{item.descripcion}</Text>
                        </View>
                        <View style={styles.nivelDefectosStilos}>
                            <View style={{ width: '60%' }}>
                                <Text style={styles.textRender}>Nivel 1: </Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignContent: 'center', width: '40%' }}>
                                <View style={{ width: '33%' }}>
                                    <TouchableOpacity style={styles.botonSumaResta}
                                        onPress={() => onPressMin(item, index, 1)
                                        }
                                    >
                                        <Text style={{ color: 'white', fontSize: TextoPantallas }}>-</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ width: '33%', alignItems: 'center' }}>
                                    <Text style={styles.textRender}>{item.Nivel_1 ? item.Nivel_1 : 0}</Text>
                                </View>
                                <View style={{ width: '33%' }}>
                                    <TouchableOpacity style={styles.botonSumaResta}

                                        onPress={() => onPressPlus(item, index, 1)
                                        }
                                    >
                                        <Text style={{ color: 'white', fontSize: TextoPantallas }}>+</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={styles.nivelDefectosStilos}>
                            <View style={{ width: '60%' }}>
                                <Text style={styles.textRender}>Nivel 2: </Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignContent: 'center', width: '40%' }}>
                                <View style={{ width: '33%' }}>
                                    <TouchableOpacity style={styles.botonSumaResta}
                                        onPress={() => onPressMin(item, index, 2)
                                        }
                                    >
                                        <Text style={{ color: 'white', fontSize: TextoPantallas }}>-</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ width: '33%', alignItems: 'center' }}>
                                    <Text style={styles.textRender}>{item.Nivel_2 ? item.Nivel_2 : 0}</Text>
                                </View>
                                <View style={{ width: '33%' }}>
                                    <TouchableOpacity style={styles.botonSumaResta}
                                        onPress={() => onPressPlus(item, index, 2)
                                        }
                                    >
                                        <Text style={{ color: 'white', fontSize: TextoPantallas }}>+</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={styles.nivelDefectosStilos}>
                            <View style={{ width: '60%' }}>
                                <Text style={styles.textRender}>Nivel 3: </Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignContent: 'center', width: '40%' }}>
                                <View style={{ width: '33%' }}>
                                    <TouchableOpacity style={styles.botonSumaResta}
                                        onPress={() => onPressMin(item, index, 3)
                                        }
                                    >
                                        <Text style={{ color: 'white', fontSize: TextoPantallas }}>-</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ width: '33%', alignItems: 'center' }}>
                                    <Text style={styles.textRender}>{item.Nivel_3 ? item.Nivel_3 : 0}</Text>
                                </View>
                                <View style={{ width: '33%' }}>
                                    <TouchableOpacity style={styles.botonSumaResta}
                                        onPress={() => onPressPlus(item, index, 3)
                                        }
                                    >
                                        <Text style={{ color: 'white', fontSize: TextoPantallas }}>+</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={styles.nivelDefectosStilos}>
                            <View style={{ width: '60%' }}>
                                <Text style={styles.textRender}>Nivel 4: </Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignContent: 'center', width: '40%' }}>
                                <View style={{ width: '33%' }}>
                                    <TouchableOpacity style={styles.botonSumaResta}
                                        onPress={() => onPressMin(item, index, 4)
                                        }
                                    >
                                        <Text style={{ color: 'white', fontSize: TextoPantallas }}>-</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ width: '33%', alignItems: 'center' }}>
                                    <Text style={styles.textRender}>{item.Nivel_4 ? item.Nivel_4 : 0}</Text>
                                </View>
                                <View style={{ width: '33%' }}>
                                    <TouchableOpacity style={styles.botonSumaResta}
                                        onPress={() => onPressPlus(item, index, 4)
                                        }
                                    >
                                        <Text style={{ color: 'white', fontSize: TextoPantallas }}>+</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={{ borderRadius: 5, alignItems: 'center' }}>
                            <Text style={styles.textRender}>Total: {((item.Nivel_1 ? item.Nivel_1 : 0) + ((item.Nivel_2 ? item.Nivel_2 : 0) * 2) + ((item.Nivel_3 ? item.Nivel_3 : 0) * 3) + ((item.Nivel_4 ? item.Nivel_4 : 0) * 4))}</Text>
                        </View>
                    </View >
                </View>
            </View>
        )
    }

    const GetData = async () => {

        const request = await reqResApiFinanza.get<listaDefectosInterface[]>('Auditelas/DatosDefectosTelas')
        console.log(request.data)

        if (request.data.length > 0) {
            setMensajeAlerta('Auditoria enviada con exito')
        } else {
            setMensajeAlerta('Envió falló. Intente de nuevo')
            setTipoMensaje(false);
            setShowMensajeAlerta(true);
        }

        setDatos(request.data)
    }

    useEffect(() => {
        GetData()
    }, [])

    return (
        <View style={{ alignItems: 'center', flex: 1 }}>
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
            </TouchableOpacity>
            <MyAlert visible={showMensajeAlerta} tipoMensaje={tipoMensaje} mensajeAlerta={mensajeAlerta} onPress={() => onPressEnviar()} />
            <View style={{ flex: 1, width: '100%', maxWidth: 600, borderWidth: 1, marginTop: 10 }}>
                <FlatList
                    data={Datos}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item, index }) => <DefectosCard index={index} item={item} //onPressMin={onPressMin} onPressPlus={onPressPlus} 
                    />}
                    style={{ flex: 1, width: '100%' }}>
                </FlatList>
            </View>
        </View>
    )
}
