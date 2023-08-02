import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useState, FC, useContext } from 'react'
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../theme/app.Theme';
import { FlatList, RefreshControl, TextInput } from 'react-native-gesture-handler';
import { reqResApiFinanza } from '../api/reqResApi';
import { rollos } from '../interfaces/reqResApi';
import { TelasContext } from '../context/telasContext';

interface Props extends StackScreenProps<any, any> { };

export const AuditoriaScreen = ({ navigation }: Props) => {
  const [NumeroRollo, setNumeroRollo] = useState<string>('')
  const [IdPieza, setIdPieza] = useState<string>('')
  const [historial, setHistorial] = useState<rollos[]>([])
  const [page, setPage] = useState<number>(0)
  const [cargando, setCargando] = useState<boolean>(false)
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
  // let historial: historialRollosInterface[] = [
  //   { IdPieza: 'RO000001', NumeroRollo: '2454896', Fecha: '04/07/2023', estado: false },
  //   { IdPieza: 'RO000002', NumeroRollo: '2459678', Fecha: '28/06/2023', estado: false },
  //   { IdPieza: 'RO000003', NumeroRollo: '2453265', Fecha: '29/06/2023', estado: true },
  //   { IdPieza: 'RO000004', NumeroRollo: '2451217', Fecha: '30/06/2023', estado: false },
  //   { IdPieza: 'RO000005', NumeroRollo: '2455423', Fecha: '02/07/2023', estado: true },
  //   { IdPieza: 'RO000006', NumeroRollo: '2453265', Fecha: '29/06/2023', estado: true },
  //   { IdPieza: 'RO000007', NumeroRollo: '2451217', Fecha: '30/06/2023', estado: false },
  //   { IdPieza: 'RO000008', NumeroRollo: '2455423', Fecha: '02/07/2023', estado: true },
  //   { IdPieza: 'RO000009', NumeroRollo: '2451217', Fecha: '30/06/2023', estado: false },
  //   { IdPieza: 'RO0000010', NumeroRollo: '2455423', Fecha: '02/07/2023', estado: true },
  // ]

  const onPress = (item: rollos) => {
    changeApVendRoll(item.apVendRoll)
    changeRolloId(item.rollId)
    changeNameAlias(item.nameAlias)
    navigation.navigate('AuditoriaProcess')
  }
  const renderItem = (item: rollos) => {

    return (
      <View style={{ width: '100%', alignItems: 'center' }}>
        <TouchableOpacity style={{ flex: 1, width: '100%', alignItems: 'center' }} onPress={() => onPress(item)}>
          <View style={{
            width: '95%', borderWidth: 1, paddingHorizontal: 10, paddingVertical: 10, marginVertical: 2,
            borderColor: 'black', borderRadius: 5, backgroundColor: 'white'
          }}>
            <Text style={styles.textRender}>Id de Pieza: {item.rollId}</Text>
            <Text style={styles.textRender}>Numero de rollo: {item.apVendRoll}</Text>
            <Text style={styles.textRender}>Tela: {item.nameAlias}</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  useEffect(() => {
    reqRollos()
    console.log("Hola")
  }, [])

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>

      <View style={{ width: '80%', maxWidth: 500, marginTop: 10 }}>

        <Text style={styles.textRender}>Id de Pieza</Text>
        <TextInput style={styles.textInputs} value={NumeroRollo}
          onChangeText={(value) => setNumeroRollo(value)}
        ></TextInput>

        <Text style={styles.textRender}>Numero de rollo</Text>
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




