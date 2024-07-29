import React from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import styled from 'styled-components/native';

const PetManagementScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <Container>
        <Title>공동 육아</Title>
        {/* Add your content here */}
      </Container>
    </SafeAreaView>
  );
};

const Container = styled.View`
  flex: 1;
  padding: 16px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
`;

export default PetManagementScreen;
