import { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [selectedDevice, setSelectedDevice] = useState(null);

  const [devices, setDevices] = useState([
    {
      id: 1,
      name: 'Kudus - Bpk Istiqom',
      sn: 'Q0045388788290094801',
      location: 'Kudus',
      updatedAt: '2026-03-30 08:27:08 (UTC +07:00)',
      productionToday: 3.8,
      weather: '27°C',
      production: 2.58,
      grid: 0.0,
      battery: -1.34,
      upsLoad: 1.0,
      load: 0.0,
      status: 'On grid',
    },
    {
      id: 2,
      name: 'LarantukaNTTBuGerta',
      sn: 'Q0045372742561094801',
      location: 'Larantuka',
      updatedAt: '2026-03-30 09:15:00 (UTC +07:00)',
      productionToday: 2.9,
      weather: '29°C',
      production: 2.12,
      grid: 0.2,
      battery: -0.95,
      upsLoad: 0.88,
      load: 0.4,
      status: 'On grid',
    },
  ]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        selectedDevice,
        setSelectedDevice,
        devices,
        setDevices,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};