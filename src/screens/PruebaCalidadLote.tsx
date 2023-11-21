import React, { useState, useContext } from 'react'
import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { styles } from '../theme/app.Theme';
import { RolloImporteLoteInterface } from '../interfaces/RollosImporteLoteInterface';
import { reqResApiFinanza } from '../api/reqResApi';
import { StackScreenProps } from '@react-navigation/stack';

import { TelasContext } from '../context/telasContext';

interface Props extends StackScreenProps<any, any> { };

export const PruebaCalidadLote = ({ navigation }: Props) => {
  const [Importacion, setImportacion] = useState<string>('')
  const [Lote, setLote] = useState<string>('')
  const [Tela, setTela] = useState<string>('')
  const [Rollos, setRollos] = useState<RolloImporteLoteInterface[]>([])
  const [cargando, setCargando] = useState<boolean>(false)
  const [cantidad, setCantidad] = useState<string>('')
  const { changeCantidadLote, changeRollosLote } = useContext(TelasContext)

  const getRollos = async () => {
    if (!cargando) {
      if (Importacion != '' || Lote != '') {
        setCargando(true)
        try {
          await reqResApiFinanza.get<RolloImporteLoteInterface[]>('Auditelas/getRolloImportacionLote/' + Importacion + '/' + (Lote != '' ? Lote : '-') + '/' + (Tela != '' ? Tela : '-'))
            .then(resp => {
              setRollos(resp.data)
              console.log(resp.data)
            });
        } catch (err) {
          console.log(err)
        }
        setCargando(false)

      }
    }

  }

  const Pruebas = () => {
    let rollos: string[] = []
    Rollos.forEach(x => {
      if (x.isSelected) {
        rollos.push(x.rollid)
      }
    })
    if(rollos.length > 0 && parseInt(cantidad) > 0){
      changeRollosLote(rollos)
      changeCantidadLote(parseInt(cantidad))
      navigation.navigate('PruebaCalidadLoteProcess')
    }
  }

  const renderItem = (item: RolloImporteLoteInterface, index: number) => {
    return (
      <View style={{ width: '100%', alignItems: 'center' }}>
        <TouchableOpacity style={{ flex: 1, width: '100%', alignItems: 'center' }} onPress={() => {
          const nuevosDatos = [...Rollos]
          nuevosDatos[index].isSelected = !item.isSelected
          setRollos(nuevosDatos)
        }} >
          <View style={{
            width: '95%', borderWidth: 1, paddingHorizontal: 10, paddingVertical: 10, marginVertical: 2,
            borderColor: 'black', borderRadius: 5, backgroundColor: (item.isSelected ? '#9AD0C2' : 'white')
          }}>
            <View style={{ width: '100%' }}>
              <Text style={styles.textRender}>Id de Pieza: {item.rollid}</Text>
              <Text style={styles.textRender}>Numero de rollo: {item.apvendroll}</Text>
              <Text style={styles.textRender}>Tela: {item.namealias}</Text>
              <Text style={styles.textRender}>Lote: {item.inventbatchid}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View >
    )
  }

  const seleccinarTodos = () => {
    setRollos((prev) => prev.map(e => ({ ...e, isSelected: true })));
  }


  return (
    <View style={{ alignItems: 'center', flex: 1 }}>
      <View style={{ width: '90%', maxWidth: 500, marginTop: 10 }}>
        <View style={{ flexDirection: 'row', width: '100%' }}>
          <View style={{ flexDirection: 'column', width: '50%' }}>
            <Text style={styles.textRender}>Importacion</Text>
            <TextInput style={[styles.textInputs, { width: '98%' }]} value={Importacion}
              onChangeText={(value) => setImportacion(value)} />
          </View>
          <View style={{ flexDirection: 'column', width: '50%' }}>
            <Text style={styles.textRender}>Lote</Text>
            <TextInput style={[styles.textInputs, { width: '98%' }]} value={Lote}
              onChangeText={(value) => setLote(value)} />
          </View>
        </View>
        <View style={{ flexDirection: 'column', width: '100%' }}>
          <Text style={styles.textRender}>Tela</Text>
          <TextInput style={[styles.textInputs, { width: '100%' }]} value={Tela}
            onChangeText={(value) => setTela(value)} />
        </View>
        <TouchableOpacity
          style={{ width: '100%', marginTop: 10 }}
          activeOpacity={0.5}
          onPress={() => getRollos()}
          hitSlop={{ top: 10, bottom: 20, left: 20, right: 20 }}
        >
          <View style={styles.button}><Text style={styles.text}>{cargando ? 'Cargando...' : 'Buscar'}</Text></View>
        </TouchableOpacity>
        {
          !cargando && Rollos.length > 0 &&
          <TouchableOpacity
            style={{ width: '100%', marginTop: 10 }}
            activeOpacity={0.5}
            onPress={() => seleccinarTodos()}
            hitSlop={{ top: 10, bottom: 20, left: 20, right: 20 }}
          >
            <View style={styles.button}><Text style={styles.text}>Seleccionar Todos</Text></View>
          </TouchableOpacity>
        }
      </View>
      <View style={{ flex: 1, width: '100%', maxWidth: 600, borderWidth: 1, marginTop: 10 }}>
        {
          Rollos.length > 0 &&
          <FlatList
            data={Rollos}
            keyExtractor={(item) => item.rollid.toString()}
            renderItem={({ item, index }) => renderItem(item, index)}
          />
        }

      </View>
      <View style={{ width: '90%', maxWidth: 500, paddingBottom:10}}>
        <View style={{ flexDirection: 'row', width: '100%' }}>
          <View style={{ flexDirection: 'column', width: '30%' }}>

            <Text style={styles.textRender}>No. Pruebas</Text>
            <TextInput style={styles.textInputs} value={cantidad}
              onChangeText={(value) => setCantidad(value)} keyboardType='decimal-pad' />
          </View>
          <TouchableOpacity
            style={{ width: '70%', marginTop: 10 }}
            activeOpacity={0.5}
            onPress={() => Pruebas()}
            hitSlop={{ top: 10, bottom: 20, left: 20, right: 20 }}
          >
            <View style={styles.button}><Text style={styles.text}>Prueba</Text></View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
