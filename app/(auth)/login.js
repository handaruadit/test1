import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

export default function Login() {
  const { setUser } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);

      // dummy login dulu
      const dummyUser = {
        email: email,
        role: 'admin',
      };

      await AsyncStorage.setItem('token', 'dummy-token');
      setUser(dummyUser);

      router.replace('/');
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={styles.title}>Login</Text>

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="hallo@batari.com"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="password"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Remember me */}
      <TouchableOpacity
        style={styles.rememberRow}
        onPress={() => setRemember(!remember)}
      >
        <View style={[styles.checkbox, remember && styles.checkboxActive]} />
        <Text style={styles.rememberText}>Remember me</Text>
      </TouchableOpacity>

      {/* Login Button */}
      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.loginText}>Log In</Text>
        )}
      </TouchableOpacity>

      <View style={styles.linkRow}>
        <Text style={styles.link}>Forgot password</Text>
        <Text style={styles.link}>Create new account</Text>
      </View>

      <Text style={styles.or}>OR</Text>

      <TouchableOpacity style={styles.googleButton}>
        <Text style={styles.googleText}>Continue with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.fbButton}>
        <Text style={styles.fbText}>Continue with Facebook</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B1A2B',
    padding: 20,
    justifyContent: 'center',
  },

  title: {
    fontSize: 28,
    color: '#fff',
    marginBottom: 20,
  },

  label: {
    color: '#fff',
    marginBottom: 5,
  },

  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },

  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },

  checkbox: {
    width: 20,
    height: 20,
    backgroundColor: '#555',
    borderRadius: 5,
    marginRight: 10,
  },

  checkboxActive: {
    backgroundColor: '#1DA1F2',
  },

  rememberText: {
    color: '#fff',
  },

  loginButton: {
    backgroundColor: '#1DA1F2',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 15,
  },

  loginText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  linkRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  link: {
    color: '#1DA1F2',
  },

  or: {
    color: '#aaa',
    textAlign: 'center',
    marginVertical: 10,
  },

  googleButton: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 10,
  },

  googleText: {
    color: '#000',
  },

  fbButton: {
    backgroundColor: '#3b5998',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
  },

  fbText: {
    color: '#fff',
  },
});