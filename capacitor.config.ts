import type {CapacitorConfig} from '@capacitor/cli';

  const config: CapacitorConfig = {
  appId: 'local.cesi.rr',
  appName: 'RR',
  webDir: 'dist',
  loggingBehavior: 'production',
  zoomEnabled: true,
  server: {
    url: process.env.VITE_API_URL,
    cleartext: false,
  },
  android: {
    adjustMarginsForEdgeToEdge: "auto"
  }
};

export default config;
