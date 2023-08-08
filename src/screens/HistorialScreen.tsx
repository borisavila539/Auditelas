import { StackScreenProps } from '@react-navigation/stack';
import React, { useContext, useState, useEffect } from 'react'
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../theme/app.Theme';
import { FlatList, RefreshControl, TextInput } from 'react-native-gesture-handler';
import { rollos } from '../interfaces/reqResApi';
import { reqResApiFinanza } from '../api/reqResApi';
import { TelasContext } from '../context/telasContext';


interface Props extends StackScreenProps<any, any> { };

export const HistorialScreen = ({ navigation }: Props) => {
  const [NumeroRollo, setNumeroRollo] = useState<string>('')
  const [IdPieza, setIdPieza] = useState<string>('')
  const [cargando, setCargando] = useState<boolean>(false)
  const [historial, setHistorial] = useState<rollos[]>([])
  const [page, setPage] = useState<number>(0)
  const { changeApVendRoll, changeRolloId, changeNameAlias } = useContext(TelasContext);

  const reqRollos = async () => {
    console.log("Inicio")
    if (!cargando) {
      setCargando(true)
      try {
        const request = await reqResApiFinanza.get<rollos[]>('Auditelas/' + (NumeroRollo != '' ? NumeroRollo : 'R') + '/' + (IdPieza != '' ? IdPieza : '-') + '/0/15');
        console.log(request.data)
        setHistorial(request.data)
        setPage(1)
      } catch (error) {
        console.log(error)
      };
      setCargando(false)
    }
  }
  const reqRollosMas = async () => {
    console.log("Inicio")
    if (!cargando) {
      setCargando(true)
      try {
        let request2: rollos[] = []
        const request = await reqResApiFinanza.get<rollos[]>('Auditelas/' + (NumeroRollo != '' ? NumeroRollo : 'R') + '/' + (IdPieza != '' ? IdPieza : '-') + '/' + page + '/15');
        console.log(request.data)
        request.data.map((x) => {
          request2 = [...request2, x]
        })
        setHistorial(historial.concat(request2))
        setPage(page + 1)
      } catch (error) {
        console.log(error)
      };
      setCargando(false)
    }
  }

  useEffect (() =>{
    reqRollos()
  },[])

  const onPress = (item: rollos) => {
    changeApVendRoll(item.apVendRoll)
    changeRolloId(item.rollId)
    changeNameAlias(item.nameAlias)
    navigation.navigate('DetalleHistorialScreen')
  }

  const renderItem = (item: rollos) => {

    return (
      <View style={{ width: '100%', alignItems: 'center' }}>
        <TouchableOpacity style={{ flex: 1, width: '100%', alignItems: 'center' }} onPress={() => onPress(item)}>
          <View style={{
            width: '95%', borderWidth: 1, paddingHorizontal: 10, paddingVertical: 10, marginVertical: 2,
            borderColor: item.estado == true ? '#000' : 'red', borderRadius: 5
          }}>
            <Text style={styles.textRender}>Id de Pieza: {item.rollId}</Text>
            <Text style={styles.textRender}>Numero de rollo: {item.apVendRoll}</Text>
            <Text style={styles.textRender}>Tela: {item.nameAlias}</Text>
          </View>
        </TouchableOpacity>
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
          style={{ width: '100%', marginTop: 10 }}
          activeOpacity={0.5}
          onPress={() => reqRollos()}
          hitSlop={{ top: 10, bottom: 20, left: 20, right: 20 }}
        >
          <View style={styles.button}><Text style={styles.text}>Buscar</Text></View>

        </TouchableOpacity>
      </View>

      <View style={{ flex: 1, width: '100%', maxWidth: 600, borderWidth: 1, marginTop: 10 }}>
        <FlatList
          data={historial}
          renderItem={({ item }) => renderItem(item)}
          onEndReached={reqRollosMas}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={() => reqRollos()} colors={['#069A8E']} />
          }
        >
        </FlatList>
      </View>
    </View>

  )
}

