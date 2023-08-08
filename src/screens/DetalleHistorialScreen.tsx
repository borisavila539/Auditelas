import React, { useContext, useState } from 'react'
import { View, Text } from 'react-native';
import { styles } from '../theme/app.Theme';
import { TelasContext } from '../context/telasContext';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { listaDefectosInterface } from '../interfaces/listaDefectos';
import { rollos } from '../interfaces/reqResApi';

export const DetalleHistorialScreen = () => {
  const { telasState } = useContext(TelasContext);
  const [historial, setHistorial] = useState<rollos[]>([])
  const [Datos, setDatos] = useState<listaDefectosInterface[]>(
    [
    ]
  )
  return (
    <View style={styles.contenedorNiveldefectos}>
      <Text style={{ fontSize: 16, color: 'black', fontWeight: 'bold' }}>Tela: {telasState.nameAlias}, Id de Pieza:
        {telasState.rollId}, Numero de rollo: {telasState.apVendRoll}</Text>
    </View>
  )
  const renderItem = (item: rollos) => {
    return (
      <><TouchableOpacity style={{ flex: 1, width: '100%', alignItems: 'center' }}>
        <View style={{
          width: '95%', borderWidth: 1, paddingHorizontal: 10, paddingVertical: 10, marginVertical: 2
        }}>
          <Text style={styles.textRender}>Id de Pieza: {item.rollId}</Text>
          <Text style={styles.textRender}>Numero de rollo: {item.apVendRoll}</Text>
          <Text style={styles.textRender}>Tela: {item.nameAlias}</Text>
        </View>
      </TouchableOpacity><View style={{ flex: 1, width: '100%', maxWidth: 600, borderWidth: 1, marginTop: 10 }}>
          <FlatList
            data={historial}
            renderItem={({ item }) => renderItem(item)}
          >
          </FlatList>
        </View></>
    )
  }
}
