import { StackScreenProps } from '@react-navigation/stack';
import React, { useContext } from 'react'
import { View, Text, } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { styles } from '../theme/app.Theme';
import Icon from 'react-native-vector-icons/Ionicons';
import { grey, navy } from '../components/colores';
import { TelasContext } from '../context/telasContext';

interface Props extends StackScreenProps<any, any> { };

export const BienvenidaScreen = ({ navigation }: Props) => {
  const { telasState } = useContext(TelasContext);
  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 60 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 30, color: navy }}>
          Bienvenido, {telasState.username}
        </Text>
      </View>
      <View >
        <Text>
          <Icon name='person-outline' size={300} color={grey}></Icon>
        </Text>
      </View>
      <View style={styles.containerSelector}>
        <View style={{ width: '40%', marginRight: '5%' }}>
          <TouchableOpacity
            style={{ width: '100%' }}
            activeOpacity={0.5}
            onPress={() => navigation.navigate('SeleccionAuditoria')}
          >
            <View style={styles.button}>
              <Text style={[styles.text]}>Auditar rollo</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ width: '40%', marginLeft: '5%' }} >
          <TouchableOpacity
            style={{ width: '100%', }}
            onPress={() => navigation.navigate('HistorialScreen')}
            activeOpacity={0.5}
          >
            <View style={styles.button}>
              <Text style={[styles.text]}>Historial</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
