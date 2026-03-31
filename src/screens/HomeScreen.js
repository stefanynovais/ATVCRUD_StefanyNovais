import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button } from "react-native";
import CardPersonal from "../componentes/CardPersonal.js";

import styles from "../styles/styles.js";

import { getPeople } from "../servers/peopleCrud.js";
import { TextInput } from "react-native-web";

export default function HomeScreen({ navigation }) {

  // estado da lista
  const [people, setPeople] = useState([]);
  const [busca, setBusca] = useState('');

  //para filtrar o usuário
  const filtrarPessoa = people.filter(usuario => usuario.firstName.toLowerCase().includes(busca.toLowerCase().trim()));

  // função para carregar dados
  async function loadPeople() {

    const data = await getPeople();

    setPeople(data);
  }

  // executa ao abrir tela
  useEffect(() => {
    loadPeople();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pessoas</Text>
      <TextInput
        value={busca}
        onChangeText={setBusca}
        placeholder="Buscar usuários..."
        style={{
          borderWidth: 1,
          margin: 10,
          padding: 8,
          borderRadius: 8
        }}
      />

      <Button
        title="Adicionar Pessoa"
        onPress={() => navigation.navigate("AddEditScreen")}
      />

      <FlatList
        data={filtrarPessoa}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CardPersonal
            item={item}
            navigation={navigation}
            refresh={loadPeople}
          />
        )}
      />
    </View>
  );
}




