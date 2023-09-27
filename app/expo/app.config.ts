import type { ExpoConfig } from '@expo/config';
import * as dotenv from 'dotenv';

dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
const MAPBOX_API_KEY = process.env.MAPBOX_API_KEY;

if (typeof SUPABASE_URL !== 'string' || typeof SUPABASE_ANON_KEY !== 'string') {
  throw new Error('Missing Supabase URL or anonymous key');
}

if (typeof MAPBOX_API_KEY !== 'string') {
  throw new Error('Missing Mapbox API key');
}

const defineConfig = (): ExpoConfig => ({
  name: 'expo',
  slug: 'expo',
  scheme: 'expo',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/images/destamp_logo.png',
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/images/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#1F104A',
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'your.bundle.identifier',
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/images/destamp_logo.png',
      backgroundColor: '#1F104A',
    },
  },
  extra: {
    // eas: {
    //   projectId: "ijgufbptbcpxemkduevh",
    // },
    SUPABASE_URL,
    SUPABASE_ANON_KEY,
    MAPBOX_API_KEY,
  },
  experiments: {
    tsconfigPaths: true,
    typedRoutes: true,
  },
  web: {
    bundler: 'metro',
  },
  plugins: ['expo-router', './expo-plugins/with-modify-gradle.js'],
});

export default defineConfig;
