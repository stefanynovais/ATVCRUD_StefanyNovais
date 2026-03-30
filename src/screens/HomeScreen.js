import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button } from "react-native";

import styles from "../styles/styles.js";

import { getPeople, deletePerson } from "../servers/peopleCrud.js";
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

       {/* <FlatList
        data={filtrarPessoa}
        renderItem={({item}) => 
        <Item firstName={item.firstName} 
        lastName = {item.lastName}
        email={item.email}
        phone={item.phone}
        />}
        keyExtractor={item => item.id.toString()}
      /> */}

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

function CardPersonal({ item, navigation, refresh }) {
  return (
    <View style={styles.card}>
      <View>
        <Text style={styles.name}>
          {item.firstName} {item.lastName}
        </Text>

        <Text style={styles.email}>
          {item.email}
        </Text>

        <Text style={styles.phone}>
          {item.phone}
        </Text>
      </View>

      <View>
        <Button
          title="Editar"
          onPress={() => navigation.navigate("AddEditScreen", { person: item })}
        />

        <Button
          title="Deletar"
          onPress={async () => {
            await deletePerson(item.id);
            refresh();
          }}
        />
      </View>
    </View>
  );
}


