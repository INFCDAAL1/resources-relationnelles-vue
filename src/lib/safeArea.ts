import { SafeArea } from 'capacitor-plugin-safe-area';

// Enveloppez le code dans une fonction async auto-invoquée (IIFE)
(async () => {
  try {
    // Récupérer les informations initiales (optionnel, mais peut être utile)
    const insets = await SafeArea.getSafeAreaInsets();
    console.log('Initial Safe Area Insets:', insets);

    const statusBarHeight = await SafeArea.getStatusBarHeight();
    console.log('Initial Status Bar Height:', statusBarHeight);

    // Nettoyer les écouteurs précédents pour éviter les fuites de mémoire
    await SafeArea.removeAllListeners();

    // Ajouter un nouvel écouteur pour les changements de la zone de sécurité
    await SafeArea.addListener('safeAreaChanged', (data) => {
      console.log('Safe Area changed:', data);
      const { insets } = data;
      for (const [key, value] of Object.entries(insets)) {
        document.documentElement.style.setProperty(
          `--safe-area-inset-${key}`,
          `${value}px`
        );
      }
    });
  } catch (e) {
    console.error('Error setting up safe area listeners', e);
  }
})();
