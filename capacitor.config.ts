import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'local.cesi.rr',
  appName: 'RR',
  webDir: 'dist',
  android:{
    adjustMarginsForEdgeToEdge:"auto"
  }
};

export default config;
