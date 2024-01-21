import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View, Linking, Touchable, TouchableOpacity } from "react-native";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import { auth } from "./config";

export default function Auth() {
  const [page, setPage] = useState("login");

  return (
    <View style={styles.totalcontainer}>
      {page == "login" ? (
        <LogIn setPage={setPage} />
      ) : (
        <SignUp setPage={setPage} />
      )}
    </View>
  );
}

function LogIn({ setPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log("Successfully logged in");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <Text style={styles.signUp}>
        Don't have an account?
        <Text style={styles.signUpText} onPress={() => setPage("signup")}> Sign Up</Text>
      </Text>
      <View style={styles.inputboxes}>
        <View style={styles.usernamePasswordBox}>
          <MaterialIcons name='alternate-email' size={20} color='#666' />
          <TextInput style={styles.inputUsername} 
          onChangeText={setEmail}
          value={email} 
          placeholder="Enter Email" />
        </View>
        
        <View style={styles.usernamePasswordBox}>
        <MaterialIcons name='lock' size={20} color='#666' />
          <TextInput
            style={styles.inputPassword}
            onChangeText={setPassword}
            value={password}
            placeholder="Enter Password"
            secureTextEntry={true}/>

        </View>
        <View style={styles.LogInBox}>
          <TouchableOpacity
            onPress={loginUser}
          >
            <Text style={{color:"white", fontWeight:'600', fontSize:18}}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

function SignUp({ setPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const createUser = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log("Sucessfully created user");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <Text style={styles.signUp}>
        Already have an account?
        <Text style={styles.signUpText} onPress={() => setPage("login")}> Login</Text>
      </Text>

      <View style={styles.inputboxes}>
        <View style={styles.usernamePasswordBox}>
          <MaterialIcons name='alternate-email' size={20} color='#666' />
          <TextInput style={styles.inputUsername} 
          onChangeText={setEmail}
          value={email} 
          placeholder="Enter Email" />
        </View>
        
        <View style={styles.usernamePasswordBox}>
        <MaterialIcons name='lock' size={20} color='#666' />
          <TextInput
            style={styles.inputPassword}
            onChangeText={setPassword}
            value={password}
            placeholder="Enter Password"
            secureTextEntry={true}/>

        </View>
        <View style={styles.LogInBox}>
          <TouchableOpacity
            onPress={createUser}
          >
            <Text style={{color:"white", fontWeight:'600', fontSize:18}}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export function SignOut() {
  const signout = () => {
    signOut(auth)
      .then(() => {
        console.log("Successfully logged out");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View>
      <Button title="Sign out" onPress={signout} />
    </View>
  );
}

const styles = StyleSheet.create({
  usernamePasswordBox: {
    flexDirection: 'row', 
    marginBottom: 12,
    marginTop: 6, 
    padding:12,
    backgroundColor: '#F2F2F2',
    borderRadius: 10
  },
  LogInBox: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row', 
    marginBottom: 12,
    marginTop: 6, 
    padding: 12,
    backgroundColor: '#8ED3AE',
    borderRadius: 10,
  },
  inputUsername: {
    paddingLeft: 6,
  },
  inputPassword: {
    paddingLeft: 6,
    paddingRight: 12,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  totalcontainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontWeight: '600',
    marginBottom: 20,
    fontSize: 46,
    color: '#74AF93',
  },
  inputboxes: {
    width: 310,
    flexDirection:'col',
  },
  signUp: {
    color: 'gray',
    marginBottom: 20,
  },
  signUpText: {
    color:'#74AF93'
  }
});
