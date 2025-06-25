import type {CapacitorConfig} from '@capacitor/cli';

  const config: CapacitorConfig = {
  appId: 'local.cesi.rr',
  appName: 'RR',
  webDir: 'dist',
  loggingBehavior: 'production',
  zoomEnabled: true,
  server: {
    // Utiliser l'URL de l'API définie dans les variables d'environnement du workflow
    url: process.env.VITE_API_URL,
    cleartext: false,
  },
  android: {
    adjustMarginsForEdgeToEdge: "auto",
    buildOptions: {
      keystorePath: "./release.jks",
      keystoreAlias: "release",
      keystorePassword: process.env.RELEASE_KEYSTORE_PASSWORD,
      releaseType: 'APK',
    }
  }
};

export default config;
