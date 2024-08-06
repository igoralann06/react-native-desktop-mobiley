/* eslint-disable react/no-unstable-nested-components */
import { SplashScreen, Stack, Tabs } from 'expo-router';
// import React, { useCallback, useEffect } from 'react';
import Feather from 'react-native-vector-icons/Feather';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';

// import { NavigationContainer } from '@react-navigation/native';

import { useAuth } from '@/core';
// import { View, TouchableOpacity } from 'react-native';

import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import MyDevicesScreen from './my-devices';
import PhoneScreen from './phone';
import NotesScreen from './notes';
import { yellow100 } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

export default function TabLayout() {
  const status = useAuth.use.status();
  const hideSplash = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);
  const [activeScreen, setActiveScreen] = useState('Calls');

  useEffect(() => {
    if (status !== 'idle') {
      setTimeout(() => {
        hideSplash();
      }, 1000);
    }
  }, [hideSplash, status]);

  // return (
  //   <>
  //     <Stack.Screen options={{ headerShown: false }} />
  //     <Tabs
  //       initialRouteName="my-devices"
  //       screenOptions={{
  //         headerShown: false,
  //       }}
  //     >
  //       <Tabs.Screen
  //         name="phone"
  //         options={{
  //           title: 'Calls',
  //           tabBarIcon: ({ color, size }) => (
  //             <Feather name="phone" color={color} size={size} />
  //           ),
  //         }}
  //       />

  //       <Tabs.Screen
  //         name="my-devices"
  //         options={{
  //           title: 'My Devices',
  //           tabBarIcon: ({ color, size }) => (
  //             <Feather name="home" color={color} size={size} />
  //           ),
  //         }}
  //       />
        
  //       <Tabs.Screen
  //         name="notes"
  //         options={{
  //           title: 'Notes',
  //           headerShown: false,
  //           tabBarIcon: ({ color, size }) => (
  //             <SimpleLineIcon name="notebook" color={color} size={size} />
  //           ),
  //           tabBarTestID: 'settings-tab',
  //         }}
  //       />
  //     </Tabs>
  //   </>
  // );

  return <> 
      <View style={styles.sidebarContainer}>
        <View style={styles.sidebar}>
          <TouchableOpacity onPress={() => setActiveScreen('Calls')}>
            <Text style={styles.sidebarItem}><Feather name="phone" color="black" size={20}/>&nbsp;Calls</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.sidebarItem} onPress={() => setActiveScreen('my-devices')}><Feather name="home" color="black" size={20} />&nbsp;My Devices</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.sidebarItem} onPress={() => setActiveScreen('Notes')}><SimpleLineIcon name="notebook" color="black" size={20} />&nbsp;Notes</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          {activeScreen === 'Calls' && <PhoneScreen/> }
          {activeScreen === 'my-devices' && <MyDevicesScreen/> }
          {activeScreen === 'Notes' && <NotesScreen/> }
        </View>
      </View>
    </>
}


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sidebarContainer: {
    flexDirection: 'row',
    height: '100%',
  },
  sidebar: {
    width: 200,
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  sidebarItem: {
    marginBottom: 20,
    fontSize: 18,
  },
  content: {
    flex: 1,
    padding: 20,
  },
});

// const CreateNewPostLink = () => {
//   return (
//     <Link href="/feed/add-post" asChild>
//       <Pressable>
//         <Text className="px-3 text-primary-300">Create</Text>
//       </Pressable>
//     </Link>
//   );
// };
