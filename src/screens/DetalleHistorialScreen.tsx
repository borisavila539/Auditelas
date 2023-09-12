import React, { FC, useContext, useEffect, useState } from 'react'
import { View, Text, FlatList, TextInput } from 'react-native';
import { styles } from '../theme/app.Theme';
import { TelasContext } from '../context/telasContext';
import { listaDefectosInterface } from '../interfaces/listaDefectos';
import { black, grey } from '../components/colores';
import { reqResApiFinanza } from '../api/reqResApi';
import { anchosinterface } from '../interfaces/anchos';
import { rollos } from '../interfaces/reqResApi';


type defectoCardProps = {
  item: listaDefectosInterface,
  index: number,
}

type anchoCardProps = {
  item: anchosinterface,
  index: number,
}

export const DetalleHistorialScreen = () => {
  const { telasState } = useContext(TelasContext);
  const [comentario, setComentario] = useState<string>("");
  const [YardasProveedor, setYardasProveedor] = useState<string>('')
  const [YardasReales, setYardasReales] = useState<string>('')
  const [ancho1, setancho1] = useState<string>('')
  const [ancho2, setancho2] = useState<string>('')
  const [ancho3, setancho3] = useState<string>('')

  const [Datos, setDatos] = useState<listaDefectosInterface[]>(
    [
    ]
  )


  const GetData = async () => {
    console.log(telasState.IdRollo)
    let id: Number = 0;
    try {
      const request = await reqResApiFinanza.get<anchosinterface[]>('Auditelas/DetalleRolloYardas/' +telasState.rollId+'/'+telasState.apVendRoll )
      const datos2 = request.data;
      console.log(datos2[0])
      id = datos2[0].id_Rollo
      setancho1(datos2[0].ancho_1 + '')
      setancho2(datos2[0].ancho_2 + '')
      setancho3(datos2[0].ancho_3 + '')
      setYardasProveedor(datos2[0].yardas_Proveedor + '');
      setYardasReales(datos2[0].yardas_Reales + '');
      setComentario(datos2[0].observaciones)


    } catch (error) {
    }
    try {
      const request = await reqResApiFinanza.get<listaDefectosInterface[]>('Auditelas/DatosDefectosTelas/' + id)
      const datos: listaDefectosInterface[] = request.data;
      console.log(telasState.IdRollo)
      setDatos(datos)
    } catch (error) {
      console.log(error)
    }

    
  }
  const DefectosCard: FC<defectoCardProps> = ({ item,index
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
                  <Text style={styles.textRender}>{item.nivel_1}</Text>
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
                  <Text style={styles.textRender}>{item.nivel_2}</Text>
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
                  <Text style={styles.textRender}>{item.nivel_3}</Text>
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
                  <Text style={styles.textRender}>{item.nivel_4}</Text>
                </View>
                <View style={{ width: '33%' }}>

                </View>
              </View>
            </View>
            <View style={{ borderRadius: 5, alignItems: 'center' }}>
              <Text style={styles.textRender}>Total: {item.total_Defectos}</Text>
            </View>
          </View >
        </View>
      </View>
    )
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
            <TextInput editable={false} textAlign='center' value={ancho1} keyboardType='decimal-pad' placeholderTextColor={black} style={{ color: black, backgroundColor: 'white' }}></TextInput>
          </View>
          <View style={styles.viewsAuditoria}>
            <TextInput editable={false} textAlign='center' placeholder={ancho2} keyboardType='decimal-pad' placeholderTextColor={black} style={{ color: black, backgroundColor: 'white' }}></TextInput>
          </View>
          <View style={styles.viewsAuditoria}>
            <TextInput editable={false} textAlign='center' placeholder={ancho3} keyboardType='decimal-pad' placeholderTextColor={black} style={{ color: black, backgroundColor: 'white' }}></TextInput>
          </View>
        </View>
        <Text style={{ fontWeight: 'bold', fontSize: 12, color: 'black' }}>
          Yardas Reales:
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.viewsAuditoria}>
            <TextInput editable={false}
              value={YardasProveedor}
              onChangeText={(value) => setYardasProveedor(value)}
              textAlign='center' keyboardType='decimal-pad'
              placeholderTextColor={grey} style={{ color: black, backgroundColor: 'white' }}></TextInput>
          </View>

          <View style={styles.viewsAuditoria}>
            <TextInput editable={false}
              value={YardasReales}
              onChangeText={(value) => setYardasReales(value)}
              textAlign='center' keyboardType='decimal-pad'
              placeholderTextColor={grey} style={{ color: black, backgroundColor: 'white' }}></TextInput>
          </View>

          <View style={styles.viewsAuditoria}>
            <TextInput editable={false}
              textAlign='center' keyboardType='decimal-pad'
              placeholderTextColor={grey} style={{ color: black, backgroundColor: 'white' }}
              value={(parseFloat(YardasProveedor)-parseFloat(YardasReales))+''}></TextInput>
          </View>
        </View>

        <Text style={{ fontWeight: 'bold', fontSize: 12, color: 'black' }}>
          Comentarios:
        </Text>
        <View style={{ width: '60%', margin: 2, borderRadius: 5, borderWidth: 1, backgroundColor: 'white' }}>
          <TextInput
            //placeholder={'1'}
            editable={false}
            style={{ color: black }}
            placeholderTextColor={grey}
            multiline={true}
            //onChangeText={(value) => setComentario(value)}
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

