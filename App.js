import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {useEffect, useState} from "react";
import * as Updates from "expo-updates";

export default function App() {
  const log = async (object) => {
    console.log(object);
    await fetch("https://eo7smyw28ydqjai.m.pipedream.net",{
      method : "POST",
      body : JSON.stringify(object)
    })
    setLogText(JSON.stringify(object))
  }

  const [logText, setLogText] = useState("");
  useEffect(()=>{
    (async () => {
      try {
        const update = await Updates.checkForUpdateAsync();
        await log(update);
        if (update.isAvailable) {
          await Updates.fetchUpdateAsync();
          await log({
            msg : "updated!! "
          });
          await Updates.reloadAsync();
        }
      } catch (e) {
        await log({
          exception : "exception : " +  e.toString()
        });
      } finally {
        await log(Updates.manifest);
      }
    })()
  },[]);
  return (
    <View style={styles.container}>
      <Text>This is the OTA!</Text>
      <Text>{logText}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
