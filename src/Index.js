import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';
import firebase from '../firebase';

export default function Index({ navigation }) {
  const [name, setName] = useState(null);
  const [document, setDocument] = useState(null);
  const [address, setAddress] = useState(null);
  const [listFire, setListFire] = useState(null);

  useEffect(() => {
    try {
      firebase.database().ref('/estabilishment').on('value', (snapshot) => {
        const list = [];
        snapshot.forEach((childItem) => {
          list.push({
            key: childItem.key,
            document: childItem.val().document,
            name: childItem.val().name,
            address: childItem.val().address,
          });
        });
        setListFire(list);
      })

    } catch (error) {
      alert(error);
    }
  }, [])

  function delFire(key) {
    firebase.database().ref('/estabilishment/' + key).remove()
  }

  function editFire(key, document, name, address) {
    navigation.navigate("Edit", {
      key: key,
      name: name,
      document: document,
      address: address,
    });
  }


  function createFire() {
    try {
      firebase.database().ref('/estabilishment').push({
        name: name,
        document: document,
        address: address,
      })

    } catch (error) {
      alert(error);
    }
    finally {
      setName('');
      setDocument('')
      setAddress('')
    }
  }

  return (
    <View style={styles.container}>

      <FlatList style={styles.viewFlat} data={listFire}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) =>

          <View style={styles.iconFlat}>
            <Text style={styles.text}> Key: {item.key}</Text>
            <Text style={styles.text}> Nome: {item.name}</Text>
            <Text style={styles.text}> CNPJ: {item.document}</Text>
            <Text style={styles.text}> Endereço: {item.address}</Text>
            <TouchableOpacity style={styles.btnEnviar} onPress={() => { editFire(item.key, item.name, item.document, item.adress) }}>
              <Text style={styles.text}>Edit</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnEnviar} onPress={() => { delFire(item.key) }}>
              <Text style={styles.text}>Delete</Text>
            </TouchableOpacity>
          </View>

        } />

      <TextInput style={styles.textInput}
        onChangeText={name => setName(name)} value={name}
        placeholder='Yours estabelishment name'
      />

      <TextInput style={styles.textInput}
        onChangeText={document => setDocument(document)} value={document}
        placeholder='Yours estabelishment document'
      />

      <TextInput style={styles.textInput}
        onChangeText={address => setAddress(address)} value={address}
        placeholder='Yours estabelishment address'
      />
      <TouchableOpacity style={styles.btnEnviar} onPress={createFire}>
        <Text style={styles.text}>Enviar</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
  },
  textInput: {
    width: 300,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    textAlign: 'center',
    marginTop: 5
  },
  btnEnviar: {
    margin: 10,
    borderWidth: 1,
    borderColor: 'red',
    width: 150,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconFlat: {
    flexDirection: 'row',
    width: 600,
    height: 300,
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5
  },
  btnEnviar: {
    borderWidth: 1,
    borderColor: 'red',
    width: 50,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5
  },
  viewFlat: {
    maxHeight: 410,
  }
});