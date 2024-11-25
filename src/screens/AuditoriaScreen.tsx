import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useState, FC, useContext } from 'react'
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../theme/app.Theme';
import { FlatList, RefreshControl, TextInput } from 'react-native-gesture-handler';
import { reqResApiFinanza } from '../api/reqResApi';
import { rollos } from '../interfaces/reqResApi';
import { TelasContext, TelasState } from '../context/telasContext';
import { actualizarRollos } from '../interfaces/ActualizarRollos';

interface Props extends StackScreenProps<any, any> { };

export const AuditoriaScreen = ({ navigation }: Props) => {
  const [NumeroRollo, setNumeroRollo] = useState<string>('')
  const [IdPieza, setIdPieza] = useState<string>('')
  const [historial, setHistorial] = useState<rollos[]>([])
  const [page, setPage] = useState<number>(0)
  const [cargando, setCargando] = useState<boolean>(false)
  const { changeApVendRoll, changeRolloId, changeNameAlias, changeIdRollo, telasState } = useContext(TelasContext);
  const [Importacion, setImportacion] = useState<string>('')
  const [Tela, setTela] = useState<string>('')



  const reqRollos = async () => {
    if (!cargando) {
      setCargando(true)
      try {
        const request = await reqResApiFinanza.get<rollos[]>('Auditelas/' + (NumeroRollo != '' ? NumeroRollo : 'R') + '/' + (IdPieza != '' ? IdPieza : '-') + '/' + (Importacion != '' ? Importacion : '-') + '/' + (Tela != '' ? Tela : '-') + '/0/15');
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
    if (!cargando) {
      setCargando(true)
      try {
        let request2: rollos[] = []
        const request = await reqResApiFinanza.get<rollos[]>('Auditelas/' + (NumeroRollo != '' ? NumeroRollo : 'R') + '/' + (IdPieza != '' ? IdPieza : '-') + '/' + (Importacion != '' ? Importacion : '-') + '/' + (Tela != '' ? Tela : '-') + '/' + page + '/15');

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

  const onPress = async (item: rollos) => {
    try {
      const datos: actualizarRollos[] = [{ id: '0', id_Pieza: item.rollId, numero_Rollo_Proveedor: item.apVendRoll, observaciones: '' }]
      const request = await reqResApiFinanza.post<actualizarRollos[]>('Auditelas/ActualizarRollos', datos);
      changeIdRollo(request.data[0].id)
      setIdPieza('')
      setNumeroRollo('')
      //setImportacion('')
      //setTela('')
      setHistorial([])
      setPage(0)
    } catch (error) {
      console.log(error)
    }

    changeRolloId(item.rollId)
    changeApVendRoll(item.apVendRoll)
    changeRolloId(item.rollId)
    changeNameAlias(item.nameAlias)
    switch (telasState.SeleccionAuditoria) {
      case 'AuditoriaEnProceso':
        navigation.navigate('AuditoriaEnProceso')
        break;
      case 'PruebaCalidad':
        navigation.navigate('PruebaCalidad')
        break;
      default:
        navigation.navigate('AuditoriaEnProceso')
    }



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
            <Text style={styles.textRender}>Lote: {item.inventbatchid}</Text>
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

      <View style={{ width: '90%', maxWidth: 500, marginTop: 10 }}>

        <View style={{ flexDirection: 'row', width: '100%' }}>
          <View style={{ flexDirection: 'column', width: '50%' }}>

            <Text style={styles.textRender}>Id de Pieza</Text>
            <TextInput style={styles.textInputs} value={NumeroRollo}
              onChangeText={(value) => setNumeroRollo(value)} />
          </View>
          <View style={{ flexDirection: 'column', width: '50%' }}>
            <Text style={styles.textRender}>No. Rollo Proveedor</Text>
            <TextInput style={styles.textInputs} value={IdPieza}
              onChangeText={(value) => setIdPieza(value)} />
          </View>
        </View>

        <View style={{ flexDirection: 'row', width: '100%' }}>
          <View style={{ flexDirection: 'column', width: '50%' }}>

            <Text style={styles.textRender}>Importacion</Text>
            <TextInput style={styles.textInputs} value={Importacion}
              onChangeText={(value) => setImportacion(value)} />
          </View>
          <View style={{ flexDirection: 'column', width: '50%' }}>
            <Text style={styles.textRender}>Tela</Text>
            <TextInput style={styles.textInputs} value={Tela}
              onChangeText={(value) => setTela(value)} />
          </View>
        </View>

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




