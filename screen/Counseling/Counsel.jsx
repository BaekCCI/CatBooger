import React from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import ChatList from "./ChatList";
import DoctorList from "./DoctorList";
import Ticket from "./Ticket";

const Tab = createMaterialTopTabNavigator();

function CounselingTabs() {
  return (
    <Tab.Navigator
        initialRouteName="DoctorList"
        screenOptions={({ route }) => ({
        tabBarLabel: ({ focused }) => {
          let label;

          switch (route.name) {
            case 'DoctorList':
              label = '의사 목록';
              break;
            case 'ChatList':
              label = '채팅 내역';
              break;
            case 'Ticket':
              label = '보유한 상담권';
              break;
          }
          return (
            <Text style={{ color: focused ? '#0089AB' : 'gray', fontSize: 15 }}>
              {label}
            </Text>
          );
        },
        tabBarActiveTintColor: '#0089AB',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="DoctorList" component={DoctorList} />
      <Tab.Screen name="ChatList" component={ChatList} />
      <Tab.Screen name="Ticket" component={Ticket} />
    </Tab.Navigator>
  );
}

export default function Counsel() {
  return (
    <CounselingTabs />
  );
}
