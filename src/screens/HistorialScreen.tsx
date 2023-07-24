import { StackScreenProps } from '@react-navigation/stack';
import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../theme/app.Theme';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import { historialRollosInterface } from '../interfaces/historialRollos';

interface Props extends StackScreenProps<any, any> { };

export const HistorialScreen = ({ navigation }: Props) => {
  const [NumeroRollo, setNumeroRollo] = useState<string>('')
  const [IdPieza, setIdPieza] = useState<string>('')

  let historial: historialRollosInterface[] = [
    {IdPieza: 'RO000001', NumeroRollo: '2454896', Fecha: '04/07/2023', estado: false},
    {IdPieza: 'RO000002', NumeroRollo: '2459678', Fecha: '28/06/2023', estado: false},
    {IdPieza: 'RO000003', NumeroRollo: '2453265', Fecha: '29/06/2023', estado: true},
    {IdPieza: 'RO000004', NumeroRollo: '2451217', Fecha: '30/06/2023', estado: false},
    {IdPieza: 'RO000005', NumeroRollo: '2455423', Fecha: '02/07/2023', estado: true},
    {IdPieza: 'RO000006', NumeroRollo: '2453265', Fecha: '29/06/2023', estado: true},
    {IdPieza: 'RO000007', NumeroRollo: '2451217', Fecha: '30/06/2023', estado: false},
    {IdPieza: 'RO000008', NumeroRollo: '2455423', Fecha: '02/07/2023', estado: true},
    {IdPieza: 'RO000009', NumeroRollo: '2451217', Fecha: '30/06/2023', estado: false},
    {IdPieza: 'RO0000010', NumeroRollo: '2455423', Fecha: '02/07/2023', estado: true},
    {IdPieza: 'RO0000011', NumeroRollo: '2455422', Fecha: '02/09/2023', estado: true},
  ]
  
  const renderItem = (item: historialRollosInterface) =>{
    return(
      <View style ={{width:'100%', alignItems: 'center'}}>
        <View style = {{width: '95%', borderWidth: 1, paddingHorizontal:10,paddingVertical:10, marginVertical:2, 
        borderColor: item.estado == true ? '#000' : 'red',borderRadius:5}}>
          <Text style={styles.textRender}>Id de Pieza: {item.IdPieza}</Text>
          <Text style={styles.textRender}>Numero de rollo: {item.NumeroRollo}</Text>
          <Text style={styles.textRender}>Fecha: {item.Fecha}</Text>
        </View>
      </View>
    )
  }

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <View style={{ width: '80%', maxWidth: 500, marginTop: 10 }}>
        <Text style={styles.textRender}>Numero de rollo :</Text>
        <TextInput style={styles.textInputs} value={NumeroRollo}
          onChangeText={(value) => setNumeroRollo(value)}
        >
        </TextInput>
        <Text style={styles.textRender}>Id de Pieza :</Text>
        <TextInput style={styles.textInputs} value={IdPieza}
          onChangeText={(value) => setIdPieza(value)}
        ></TextInput>

          <TouchableOpacity
            style={{ width: '100%', marginTop: 10, }}
            activeOpacity={0.5}
            hitSlop={{ top: 10, bottom: 20, left: 20, right: 20 }}
          >
            <View style={styles.button}>
              <Text style={styles.text}>Buscar</Text>
            </View>
          </TouchableOpacity>
      </View>
      
      <View style = {{flex:1, width: '100%', maxWidth: 600, borderWidth: 1, marginTop:10}}>
        <FlatList
        data={historial}
        renderItem={({item}) => renderItem(item)}>
        </FlatList>
      </View>
    </View>
    
  )
}
