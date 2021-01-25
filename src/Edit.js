import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import firebase from '../firebase';


export default function Update({ navigation }) {
    const [name, setName] = useState(navigation.getParam('name'));
    const [age, setAge] = useState(navigation.getParam('age'));

   
  function upDateFire() {
    try {
      firebase.database().ref('/crud/'+navigation.getParam('key')).update({
        name: name,
        age: age
      })

    } catch (error) {
      alert(error);
    }
    finally {
      setAge('');
      setName('');
      navigation.navigate("Index")
    }
  }

    return (
        <View style={styles.container}>
            <View style={styles.viewCenter}>

                <Text style={styles.text}>Nome</Text>
                <TextInput style={styles.textInput} onChangeText={name => setName(name)} value={name} />

                <Text style={styles.text}>Idade</Text>
                <TextInput style={styles.textInput} onChangeText={age => setAge(age)} value={age} />

                <TouchableOpacity style={styles.btnEnviar} onPress={() => { upDateFire() }}>
                    <Text style={styles.text}>Update</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnEnviar} onPress={() => navigation.navigate("Index")}>
                    <Text style={styles.text}>Cancel</Text>
                </TouchableOpacity>

            </View>
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
    viewCenter: {
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: '#fff',
    },
    btnEnviar: {
        borderWidth: 1,
        borderColor: 'red',
        width: 100,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20
    },
    textInput: {
        width: 300,
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 10,
        textAlign: 'center',
        marginTop: 5
    },
});