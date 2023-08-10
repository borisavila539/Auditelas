import React, { FC, useContext, useEffect, useState } from 'react'
import { View, Text, FlatList, TextInput } from 'react-native';
import { styles } from '../theme/app.Theme';
import { TelasContext } from '../context/telasContext';
import { listaDefectosInterface } from '../interfaces/listaDefectos';
import { rollos } from '../interfaces/reqResApi';
import { black, grey } from '../components/colores';
import { reqResApiFinanza } from '../api/reqResApi';


type defectoCardProps = {
  item: listaDefectosInterface,
  index: number,
}

export const DetalleHistorialScreen = () => {
  const { telasState } = useContext(TelasContext);
  const [historial, setHistorial] = useState<rollos[]>([])
  const [comentario, setComentario] = useState<string>("");
  const [YardasProveedor, setYardasProveedor] = useState<string>('')
  const [YardasReales, setYardasReales] = useState<string>('')

  const [Datos, setDatos] = useState<listaDefectosInterface[]>(
    [
    ]
  )

  const DefectosCard: FC<defectoCardProps> = ({ item, index
  }) => {

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
                </View>
                <View style={{ width: '33%', alignItems: 'center' }}>
                  <Text style={styles.textRender}>{item.Nivel_1 ? item.Nivel_1 : 0}</Text>
                </View>
                <View style={{ width: '33%' }}>
                </View>
              </View>
            </View>
            <View style={styles.nivelDefectosStilos}>
              <View style={{ width: '60%' }}>
                <Text style={styles.textRender}>Nivel 2: </Text>
              </View>
              <View style={{ flexDirection: 'row', alignContent: 'center', width: '40%' }}>
                <View style={{ width: '33%' }}>

                </View>
                <View style={{ width: '33%', alignItems: 'center' }}>
                  <Text style={styles.textRender}>{item.Nivel_2 ? item.Nivel_2 : 0}</Text>
                </View>
                <View style={{ width: '33%' }}>

                </View>
              </View>
            </View>
            <View style={styles.nivelDefectosStilos}>
              <View style={{ width: '60%' }}>
                <Text style={styles.textRender}>Nivel 3: </Text>
              </View>
              <View style={{ flexDirection: 'row', alignContent: 'center', width: '40%' }}>
                <View style={{ width: '33%' }}>

                </View>
                <View style={{ width: '33%', alignItems: 'center' }}>
                  <Text style={styles.textRender}>{item.Nivel_3 ? item.Nivel_3 : 0}</Text>
                </View>
                <View style={{ width: '33%' }}>

                </View>
              </View>
            </View>
            <View style={styles.nivelDefectosStilos}>
              <View style={{ width: '60%' }}>
                <Text style={styles.textRender}>Nivel 4: </Text>
              </View>
              <View style={{ flexDirection: 'row', alignContent: 'center', width: '40%' }}>
                <View style={{ width: '33%' }}>

                </View>
                <View style={{ width: '33%', alignItems: 'center' }}>
                  <Text style={styles.textRender}>{item.Nivel_4 ? item.Nivel_4 : 0}</Text>
                </View>
                <View style={{ width: '33%' }}>

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
            <TextInput editable={false} placeholder='Inicio' textAlign='center' keyboardType='decimal-pad' placeholderTextColor={grey} style={{ color: black, backgroundColor: 'white' }}></TextInput>
          </View>
          <View style={styles.viewsAuditoria}>
            <TextInput editable={false} placeholder='Medio' textAlign='center' keyboardType='decimal-pad' placeholderTextColor={grey} style={{ color: black, backgroundColor: 'white' }}></TextInput>
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
            <TextInput editable={false} placeholder='Yardas Proveedor'
              value={YardasProveedor}
              onChangeText={(value) => setYardasProveedor(value)}
              textAlign='center' keyboardType='decimal-pad'
              placeholderTextColor={grey} style={{ color: black, backgroundColor: 'white' }}></TextInput>
          </View>
          <View style={styles.viewsAuditoria}>
            <TextInput editable={false} placeholder='Yardas Reales'
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
            editable={false}
            style={{ color: black }}
            placeholderTextColor={grey}
            multiline={true}
            onChangeText={(value) => setComentario(value)}
            value={comentario}
            maxLength={300}
          />
        </View>
      </View>
      <View style={{ flex: 1, width: '100%', maxWidth: 600, borderWidth: 1, marginTop: 10 }}>
        <FlatList
          data={Datos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => <DefectosCard index={index} item={item}
          />}
          style={{ flex: 1, width: '100%' }}>
        </FlatList>
      </View>
    </View>
  )
}
