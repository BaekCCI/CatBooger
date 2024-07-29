import React from 'react';
import { StyleSheet, StatusBar, SafeAreaView, Text, TouchableOpacity, Image  } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from './screen/Home/home';
import RecordDialog from './screen/Home/RecordDialog'
import Hospital from './screen/Hospital';
import Counseling from './screen/Counseling/Counsel';
import Comunity from './screen/Comunity';
import CommunityPost from './screen/CommunityPost';
import Menu from './screen/Menu/Menu';
import HospitalDetail from './screen/HospitalDetail';
import DoctorDetail from './screen/Counseling/DoctorDetail';
import ChangeProfileScreen from './screen/Menu/Menu_ChangeProfile';
import PetManagementScreen from './screen/Menu/Menu_PetManagment';
import SharedParentingScreen from './screen/Menu/Menu_SharedParenting';
import PostManagementScreen from './screen/Menu/Menu_PostManagement';
import ConsultationHistoryScreen from './screen/Menu/Menu_ConsultationHistory';
import OwnedConsultationsScreen from './screen/Menu/Menu_OwnedConsultations';
import PaymentMethodsScreen from './screen/Menu/Menu_PaymentMethods';
import VetCertificationScreen from './screen/Menu/Menu_VetCertification';
 
const HomeStack = createNativeStackNavigator();
const HospitalStack = createNativeStackNavigator();
const CounselingStack = createNativeStackNavigator();
const ComunityStack = createNativeStackNavigator();
const MenuStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={commonHeader}>
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="RecordDialog" component={RecordDialog} />
    </HomeStack.Navigator>
  );
}

function HospitalStackScreen() {
  return (
    <HospitalStack.Navigator screenOptions={commonHeader}>
      <HospitalStack.Screen name="Hospital" component={Hospital} />
      <HospitalStack.Screen name="HospitalDetail" component={HospitalDetail} />
    </HospitalStack.Navigator>
  );
}

function CounselingStackScreen() {
  return (
    <CounselingStack.Navigator screenOptions={commonHeader}>
      <CounselingStack.Screen name="Counseling" component={Counseling} />
      <CounselingStack.Screen name="DoctorDetail" component={DoctorDetail} />
    </CounselingStack.Navigator>
  );
}

function ComunityStackScreen() {
  return (
    <ComunityStack.Navigator screenOptions={commonHeader}>
      <ComunityStack.Screen name="Comunity" component={Comunity} />
      <ComunityStack.Screen name="CommunityContentWindow" component={CommunityPost} />
    </ComunityStack.Navigator>
  );
}

function MenuStackScreen() {
  return (
    <MenuStack.Navigator screenOptions={commonHeader} >
      <MenuStack.Screen name="Menu" component={Menu} />
      <MenuStack.Screen name='ChangeProfile' component={ChangeProfileScreen} options={{title: "프로필 변경"}} />
      <MenuStack.Screen name="PetManagement" component={PetManagementScreen} options={{title: "반려동물 관리"}} />
      <MenuStack.Screen name='SharedParenting' component={SharedParentingScreen} options={{title: "공동 육아"}} />
      <MenuStack.Screen name='PostManagement' component={PostManagementScreen} options={{title: "작성 글 관리"}} />
      <MenuStack.Screen name='ConsultationHistory' component={ConsultationHistoryScreen} options={{title: "나의 상담 내역"}} />
      <MenuStack.Screen name='OwnedConsultations' component={OwnedConsultationsScreen} options={{title: "보유한 상담권"}} />
      <MenuStack.Screen name='PaymentMethods' component={PaymentMethodsScreen} options={{title: "결제 수단 관리"}} />
      <MenuStack.Screen name='VetCertification' component={VetCertificationScreen} options={{title: "수의사 인증"}} />
    </MenuStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

//상단바
const commonHeader = {
  headerRight: () => (
    <TouchableOpacity onPress={() => alert('알림 클릭됨')}>
      <Image 
        source={require('./assets/alert.png')} 
        style={{ width: 27, height: 27, marginRight: 10 }} 
      />
    </TouchableOpacity>
  ),
  headerTitle: '',
};

//하단바
function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;
          switch (route.name) {
            case 'HomeTab':
              iconName = focused
                ? require('./assets/Home_active.png')
                : require('./assets/Home_inactive.png');
              break;
            case 'HospitalTab':
              iconName = focused
                ? require('./assets/Hospital_active.png')
                : require('./assets/Hospital_inactive.png');
              break;
            case 'CounselingTab':
              iconName = focused
                ? require('./assets/Counseling_active.png')
                : require('./assets/Counseling_inactive.png');
              break;
            case 'ComunityTab':
              iconName = focused
                ? require('./assets/Comu_active.png')
                : require('./assets/Comu_inactive.png');
              break;
            case 'MenuTab':
              iconName = focused
                ? require('./assets/Menu_active.png')
                : require('./assets/Menu_inactive.png');
              break;
          }

          return <Image source={iconName} style={{ width: 20, height: 20, marginTop: 5 }} />;
        },

        tabBarLabel: ({ focused }) => {
          let label;

          switch (route.name) {
            case 'HomeTab':
              label = '홈';
              break;
            case 'HospitalTab':
              label = '병원';
              break;
            case 'CounselingTab':
              label = '상담';
              break;
            case 'ComunityTab':
              label = '커뮤니티';
              break;
            case 'MenuTab':
              label = '메뉴';
              break;
          }

          return (
            <Text style={{ color: focused ? '#0089AB' : 'gray', fontSize: 12 }}>
              {label}
            </Text>
          );
        },
        tabBarActiveTintColor: '#0089AB',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="HospitalTab" component={HospitalStackScreen} options={{ headerShown: false }} />
      <Tab.Screen name="CounselingTab" component={CounselingStackScreen} options={{ headerShown: false }} />
      <Tab.Screen name="HomeTab" component={HomeStackScreen} options={{ headerShown: false }} />
      <Tab.Screen name="ComunityTab" component={ComunityStackScreen} options={{ headerShown: false }} />
      <Tab.Screen name="MenuTab" component={MenuStackScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <NavigationContainer theme={navTheme}>
        <MyTabs />
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
  },
};