import React, { FC, useState, useEffect, useContext, useId } from 'react'
import { Text, View, FlatList, TouchableOpacity, TextInput } from 'react-native'
import { styles } from '../theme/app.Theme';
import { listaDefectosInterface } from '../interfaces/listaDefectos'
import { TextoPantallas } from '../components/Constant';
import { black, grey, navyclaro, orange } from '../components/colores';
import { TelasContext } from '../context/telasContext';

type defectoCardProps = {
    item: listaDefectosInterface,
    index: number,
    //onPressPlus: (item: listaDefectosInterface, index: number, nivel: number) => void,
    //onPressMin: (item: listaDefectosInterface, index: number, nivel: number) => void,
}

export const AuditoriaProcess = () => {
    const [comentario, setComentario] = useState<string>("");
    const { changeRolloId, changeApVendRoll, changeNameAlias } = useContext(TelasContext);
    const { telasState } = useContext(TelasContext);

    const [Datos, setDatos] = useState<listaDefectosInterface[]>(
        [

        ]
    )
    const DefectosCard: FC<defectoCardProps> = ({ item, index, //onPressMin, onPressPlus 
    }) => {
        const onPressPlus = (item2: listaDefectosInterface, index: number, nivel: number) => {
            const nuevosDatos = [...Datos];
            switch (nivel) {
                case 1:
                    nuevosDatos[index].Nivel_1 = item2.Nivel_1 + 1;
                    setDatos(nuevosDatos)
                    return

                case 2:
                    nuevosDatos[index].Nivel_2 = item2.Nivel_2 + 1;
                    setDatos(nuevosDatos)
                    return

                case 3:
                    nuevosDatos[index].Nivel_3 = item2.Nivel_3 + 1;
                    setDatos(nuevosDatos)
                    return

                case 4:
                    nuevosDatos[index].Nivel_4 = item2.Nivel_4 + 1;
                    setDatos(nuevosDatos)
                    return
                default:
            }
        }
        const onPressMin = (item2: listaDefectosInterface, index: number, nivel: number) => {
            const nuevosDatos = [...Datos];
            switch (nivel) {
                case 1:
                    nuevosDatos[index].Nivel_1 = (item2.Nivel_1 - 1) >= 0 ? item2.Nivel_1 - 1 : item2.Nivel_1;
                    setDatos(nuevosDatos)
                    return
                    break;
                case 2:
                    nuevosDatos[index].Nivel_2 = (item2.Nivel_2 - 1) >= 0 ? item2.Nivel_2 - 1 : item2.Nivel_2;
                    setDatos(nuevosDatos)
                    return
                    break;
                case 3:
                    nuevosDatos[index].Nivel_3 = (item2.Nivel_3 - 1) >= 0 ? item2.Nivel_3 - 1 : item2.Nivel_3;
                    setDatos(nuevosDatos)
                    return
                    break;
                case 4:
                    nuevosDatos[index].Nivel_4 = (item2.Nivel_4 - 1) >= 0 ? item2.Nivel_4 - 1 : item2.Nivel_4;
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
                            <Text style={styles.textRender}>{item.NombreDefecto}</Text>
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
                                    <Text style={styles.textRender}>{item.Nivel_1}</Text>
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
                                    <Text style={styles.textRender}>{item.Nivel_2}</Text>
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
                                    <Text style={styles.textRender}>{item.Nivel_3}</Text>
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
                                    <Text style={styles.textRender}>{item.Nivel_4}</Text>
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
                        <View style={{ backgroundColor: navyclaro, borderRadius: 5, alignItems: 'center' }}>
                            <Text style={styles.textRender}>Total: {item.Nivel_1 + item.Nivel_2 * 2 + item.Nivel_3 * 3 + item.Nivel_4 * 4}</Text>
                        </View>
                    </View >
                </View>
            </View>
        )
    }
    const GetData = () => {
        let data: listaDefectosInterface[] = [
            { Id: 1, NombreDefecto: 'Nudos', Nivel_1: 0, Nivel_2: 0, Nivel_3: 0, Nivel_4: 0, Cantidad: 0, Total: 7 },
            { Id: 2, NombreDefecto: 'Hoyos', Nivel_1: 0, Nivel_2: 0, Nivel_3: 0, Nivel_4: 0, Cantidad: 0, Total: 24 },
            { Id: 3, NombreDefecto: 'Hilo Grueso en trama', Nivel_1: 0, Nivel_2: 0, Nivel_3: 0, Nivel_4: 0, Cantidad: 0, Total: 7 },
            { Id: 4, NombreDefecto: 'Barrado', Nivel_1: 0, Nivel_2: 0, Nivel_3: 0, Nivel_4: 0, Cantidad: 0, Total: 24 },
            { Id: 5, NombreDefecto: 'Perdida de licra', Nivel_1: 0, Nivel_2: 0, Nivel_3: 0, Nivel_4: 0, Cantidad: 0, Total: 24 },
            { Id: 6, NombreDefecto: 'Hilo Grueso en urdimbre', Nivel_1: 0, Nivel_2: 0, Nivel_3: 0, Nivel_4: 0, Cantidad: 0, Total: 7 },
            { Id: 7, NombreDefecto: 'Manchas', Nivel_1: 0, Nivel_2: 0, Nivel_3: 0, Nivel_4: 0, Cantidad: 0, Total: 24 },
            { Id: 8, NombreDefecto: 'Faltante de hilo en trama', Nivel_1: 0, Nivel_2: 0, Nivel_3: 0, Nivel_4: 0, Cantidad: 0, Total: 7 },
            { Id: 9, NombreDefecto: 'Faltante de hilo en urdimbre', Nivel_1: 0, Nivel_2: 0, Nivel_3: 0, Nivel_4: 0, Cantidad: 0, Total: 24 },
            { Id: 10, NombreDefecto: 'Plises', Nivel_1: 0, Nivel_2: 0, Nivel_3: 0, Nivel_4: 0, Cantidad: 0, Total: 24 },
            { Id: 11, NombreDefecto: 'Desgaste', Nivel_1: 0, Nivel_2: 0, Nivel_3: 0, Nivel_4: 0, Cantidad: 0, Total: 7 },
            { Id: 12, NombreDefecto: 'Arrugas', Nivel_1: 0, Nivel_2: 0, Nivel_3: 0, Nivel_4: 0, Cantidad: 0, Total: 24 },
        ]
        setDatos(data)
    }
    useEffect(() => {
        GetData()
    }, [])

    return (
        <View style={{ alignItems: 'center', flex: 1 }}>
            <View style={{alignItems: 'flex-end'}}>
                <Text style={{ fontSize: 10, color: 'black' }}>Tela:{telasState.nameAlias}</Text>
                <Text style={{ fontSize: 10, color: 'black'}}>Id: {telasState.rollId}</Text>
                <Text style={{ fontSize: 10, color: 'black'}}>Proveedor: {telasState.apVendRoll}</Text>
            </View>
            <View style={styles.contenedorDatosRollo}>
                <Text style={{ fontWeight: 'bold', fontSize: 15, color: 'black' }}>
                    Ancho Real:
                </Text>
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.viewsAuditoria}>
                        <TextInput placeholder='Inicio' textAlign='center' keyboardType='decimal-pad' placeholderTextColor={grey} style={{ color: black }}></TextInput>
                    </View>
                    <View style={styles.viewsAuditoria}>
                        <TextInput placeholder='Medio' textAlign='center' keyboardType='decimal-pad' placeholderTextColor={grey} style={{ color: black }}></TextInput>
                    </View>
                    <View style={styles.viewsAuditoria}>
                        <TextInput placeholder='Final' textAlign='center' keyboardType='decimal-pad' placeholderTextColor={grey} style={{ color: black }}></TextInput>
                    </View>
                </View>
                <Text style={{ fontWeight: 'bold', fontSize: 15, color: 'black' }}>
                    Yardas Reales:
                </Text>
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.viewsAuditoria}>
                        <TextInput placeholder='Yardas Proveedor' textAlign='center' keyboardType='decimal-pad'
                            placeholderTextColor={grey} style={{ color: black }}></TextInput>
                    </View>
                    <View style={styles.viewsAuditoria}>
                        <TextInput placeholder='Yardas Reales' textAlign='center' keyboardType='decimal-pad'
                            placeholderTextColor={grey} style={{ color: black }}></TextInput>
                    </View>
                    <View style={styles.viewsAuditoria}>
                        <TextInput editable={false} placeholder='Diferencia' textAlign='center' keyboardType='decimal-pad'
                            placeholderTextColor={grey} style={{ color: black }} ></TextInput>
                    </View>
                </View>
                <Text style={{ fontWeight: 'bold', fontSize: 15, color: 'black' }}>
                    Comentarios:
                </Text>
                <View style={{ width: '60%', margin: 2, borderRadius: 5, borderWidth: 1 }}>
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
            >
                <View style={[styles.button, { backgroundColor: orange }]}>
                    <Text style={styles.text}>Enviar Auditoria</Text>
                </View>
            </TouchableOpacity>
            <View style={{ flex: 1, width: '100%', maxWidth: 600, borderWidth: 1, marginTop: 10 }}>
                <FlatList
                    data={Datos}
                    keyExtractor={(item) => item.Id.toString()}
                    renderItem={({ item, index }) => <DefectosCard index={index} item={item} //onPressMin={onPressMin} onPressPlus={onPressPlus} 
                    />}
                    style={{ flex: 1, width: '100%' }}>
                </FlatList>
            </View>
        </View>
    )
}
