import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';

import styles from '../styles/styles.js';
import { createPerson, updatePerson } from '../servers/peopleCrud.js';

export default function AddEditScreen({ route, navigation }) {
    const person = route.params?.person;

    const [firstName, setFirstName] = useState(person?.firstName || '');
    const [lastName, setLastName] = useState(person?.lastName || '');
    const [email, setEmail] = useState(person?.email || '');
    const [phone, setPhone] = useState(person?.phone || '');


    const save = async () => {
        const data = { firstName, lastName, email, phone };

        try {
            if (person) {

                await updatePerson(person.id, data);
            } else {

                await createPerson(data);
            }

            navigation.goBack();
        } catch (error) {
            console.error('Erro ao salvar pessoa:', error);

        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="First Name"
                value={firstName}
                onChangeText={setFirstName}
            />

            <TextInput
                placeholder="Last Name"
                value={lastName}
                onChangeText={setLastName}
            />

            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

             <TextInput
                placeholder="Telefone"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
            />

            <Button title="Salvar" onPress={save} />

            <Button
                title="Cancelar"
                onPress={() => navigation.goBack()}
            />
        </View>
    );
}