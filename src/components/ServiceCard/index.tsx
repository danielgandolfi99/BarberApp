import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Button, Card } from '@rneui/base';
import { RegisterServiceProps } from '../../types/services';


export default function ServiceCard({
  service,
}: {
  service: RegisterServiceProps;
}) {
  return (
    <Card containerStyle={styles.cardContainer}>
      <View style={styles.cardContent}>
        <View style={styles.textContainer}>
          <Text style={styles.serviceTitle}>{service.titulo}</Text>
          <Text style={styles.servicePrice}>{`R$ ${service.valor} - 30 mins`}</Text>
        </View>
        <Button title="AGENDAR" buttonStyle={styles.button} />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 10,
    padding: 0,
    height: 70,
    justifyContent: 'center',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  cardImage: {
    width: 50,
    height: 50,
    backgroundColor: '#fff',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  servicePrice: {
    fontSize: 14,
    color: '#666',
  },
  button: {
    backgroundColor: '#00D1B2',
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
});