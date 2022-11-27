import { View, Image, StyleSheet, ScrollView } from 'react-native'
import React, { useState, useCallback } from 'react'
import { Text, TextInput, Button, Title, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';
import * as yup from 'yup';

const schema = yup.object({
  name: yup.string()
    .max(30)
    .required("Required"),
  startDate: yup.date()
    .required("Required"),
  endDate: yup.date(),
  symptoms: yup.string()
    .max(300, "Max character limit reached (300)")
    .required("Required"),
  description: yup.string()
    .max(300, "Max character limit reached (300)")
})

const MedicalHistoryScreen = ({ route }) => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { operation } = route.params;
  const formik = useFormik({
    initialValues: {
      name: operation === "edit" ? route.params.recordDetails.name : "",
      symptoms: operation === "edit" ? route.params.recordDetails.symptoms : "",
      description: operation === "edit" ? route.params.recordDetails.description : "",
      startDate: operation === "edit" ? route.params.recordDetails.startDate : "",
      endDate: operation === "edit" ? route.params.recordDetails.endDate : "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      console.log(values);
    },
  })

  const handleSubmit = () => {
    navigation.navigate("Profile")
  }

  return (
    <View style={{ ...styles.root }}>
      <View style={{ ...styles.row, ...styles.custom_card, backgroundColor: theme.colors.primary }}>
        {operation === "add" ? <Title style={{ ...styles.centerX, color: "white" }}>Add Record</Title> :
          <Title style={{ ...styles.centerX, color: "white" }}>Update Record</Title>}
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>

        <View style={{ ...styles.row, ...styles.custom_card }}>
          <Text variant='bodyLarge'>Title </Text>
          <TextInput style={{ ...styles.input }}
            dense
            onChangeText={formik.handleChange('name')}
            value={formik.values.name}
          >
          </TextInput>
        </View>

        <View style={{ ...styles.row, ...styles.custom_card }}>
          <Text variant="bodyLarge" style={{ paddingBottom: 5 }}>Current Status </Text>
          <View style={{ width: '100%', flexDirection: 'row' }}>
            <View style={{ width: '50%', paddingRight: 10 }}>
              <Text>Start Date </Text>
              <TextInput style={{ ...styles.input }}
                dense
                onChangeText={formik.handleChange('startDate')}
                value={formik.values.startDate}
              >
              </TextInput>
            </View>
            <View style={{ width: '50%', paddingLeft: 10 }}>
              <Text>End Date </Text>
              <TextInput style={{ ...styles.input }}
                  dense
                  onChangeText={formik.handleChange('endDate')}
                  value={formik.values.endDate}
              >
              </TextInput>
            </View>
          </View>
          <Text variant='bodySmall'>*Leave end date empty if ongoing</Text>
        </View>

        <View style={{ ...styles.row, ...styles.custom_card }}>
          <Text variant="bodyLarge">Symptoms </Text>
          <TextInput numberOfLines={4} multiline style={{ ...styles.input }}
              dense
              onChangeText={formik.handleChange('symptoms')}
              value={formik.values.symptoms}
          >
          </TextInput>
        </View>

        <View style={{ ...styles.row, ...styles.custom_card }}>
          <Text variant="bodyLarge">Description </Text>
          <TextInput numberOfLines={6} multiline style={{ ...styles.input }}
              dense
              onChangeText={formik.handleChange('description')}
              value={formik.values.description}
          ></TextInput>
        </View>

        <Button onPress={handleSubmit} mode="contained" style={{ ...styles.button }}>
          Submit
        </Button>
      </ScrollView>
    </View>
  );
}

export default MedicalHistoryScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    marginTop: 5,
    paddingBottom: 15,
    paddingRight: 15,
    paddingLeft: 15,
    elevation: 2
  },
  input: {
    marginVertical: 10,
    backgroundColor: "#ebf2fc",
    color: 'gray',
    shadowColor: '#0000cc',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  button: {
    marginVertical: 10,
    borderRadius: 5
  },
  row: {
    paddingTop: 12,
    paddingBottom: 12
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    zIndex: 99
  },
  centerX: {
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  custom_card: {
    shadowColor: '#0000cc',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 4,
    backgroundColor: "white",
    padding: 5,
    marginTop: 10,
    marginBottom: 10
  },
})