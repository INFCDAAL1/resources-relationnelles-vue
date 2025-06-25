import type {CapacitorConfig} from '@capacitor/cli';

  const config: CapacitorConfig = {
  appId: 'local.cesi.rr',
  appName: 'RR',
  webDir: 'dist',
  zoomEnabled: true,
  server: {
    cleartext: false,
    androidScheme: 'http',
  },
  android: {
    adjustMarginsForEdgeToEdge: "auto"
  }
};

export default config;
