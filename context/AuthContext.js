import { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [selectedDevice, setSelectedDevice] = useState(null);
    const [devices, setDevices] = useState([
  {
    id: 1,
    name: 'Adit',
    sn: 'SN-938472615',
    location: 'Jakarta',
    updatedAt: '2026-03-30 08:10:00 (UTC +07:00)',
    productionToday: 3.2,
    weather: '30°C',
    production: 2.1,
    grid: 0.5,
    battery: -1.2,
    upsLoad: 1.0,
    load: 0.8,
    status: 'On grid',

    batteryVoltage: '52.3 V',
    batteryCurrent: '10.5 A',
    inverterVoltage: '220 V',
    inverterCurrent: '3.5 A',
    pvVoltage: '75.2 V',
    pvCurrent: '7.8 A',
    outputPower: '780 W',
  },
  {
    id: 2,
    name: 'Catur',
    sn: 'SN-583920174',
    location: 'Bandung',
    updatedAt: '2026-03-30 09:00:00 (UTC +07:00)',
    productionToday: 2.8,
    weather: '28°C',
    production: 1.9,
    grid: 0.3,
    battery: -0.9,
    upsLoad: 0.7,
    load: 0.6,
    status: 'On grid',

    batteryVoltage: '51.8 V',
    batteryCurrent: '9.2 A',
    inverterVoltage: '220 V',
    inverterCurrent: '3.0 A',
    pvVoltage: '70.5 V',
    pvCurrent: '6.9 A',
    outputPower: '690 W',
  },
  {
    id: 3,
    name: 'Bany',
    sn: 'SN-847261593',
    location: 'Surabaya',
    updatedAt: '2026-03-30 10:15:00 (UTC +07:00)',
    productionToday: 4.1,
    weather: '32°C',
    production: 2.9,
    grid: 0.0,
    battery: -1.5,
    upsLoad: 1.3,
    load: 1.0,
    status: 'On grid',

    batteryVoltage: '53.0 V',
    batteryCurrent: '11.0 A',
    inverterVoltage: '220 V',
    inverterCurrent: '4.0 A',
    pvVoltage: '80.1 V',
    pvCurrent: '8.5 A',
    outputPower: '850 W',
  },
  {
    id: 4,
    name: 'Raihan',
    sn: 'SN-264839105',
    location: 'Yogyakarta',
    updatedAt: '2026-03-30 11:30:00 (UTC +07:00)',
    productionToday: 3.5,
    weather: '29°C',
    production: 2.3,
    grid: 0.2,
    battery: -1.0,
    upsLoad: 0.9,
    load: 0.7,
    status: 'On grid',

    batteryVoltage: '52.6 V',
    batteryCurrent: '10.0 A',
    inverterVoltage: '220 V',
    inverterCurrent: '3.3 A',
    pvVoltage: '76.4 V',
    pvCurrent: '7.2 A',
    outputPower: '720 W',
  },
  {
    id: 5,
    name: 'Azka',
    sn: 'SN-719302845',
    location: 'Medan',
    updatedAt: '2026-03-30 12:45:00 (UTC +07:00)',
    productionToday: 2.6,
    weather: '31°C',
    production: 1.8,
    grid: 0.4,
    battery: -0.7,
    upsLoad: 0.6,
    load: 0.5,
    status: 'On grid',

    batteryVoltage: '51.5 V',
    batteryCurrent: '8.7 A',
    inverterVoltage: '220 V',
    inverterCurrent: '2.8 A',
    pvVoltage: '69.8 V',
    pvCurrent: '6.5 A',
    outputPower: '650 W',
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