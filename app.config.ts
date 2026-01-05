import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => {
  // switch app configuration based on environment
  if (process.env.APP_ENV === 'dev') {
    return {
      ...config,
      slug: `DEV - ${config.slug}`,
      name: `DEV - ${config.name}`,
      updates: {
        url: 'https://u.expo.dev/YOUR-DEV-PROJECT-ID',
      },
      ios: {
        ...config.ios,
        bundleIdentifier: 'com.qatarpost.app',
        buildNumber: '1.0.0',
      },
      android: {
        ...config.android,
        package: 'com.qatarpost.app',
        versionCode: 1,
      },
      extra: {
        ...config.extra,
        eas: { projectId: '26530158-f0bc-4e90-83f1-59d7ff875b7c' },
        env: process.env.APP_ENV,
        // add more env variables...
      },
    };
  }

  return {
    ...config,
    slug: config.slug ?? '',
    name: config.name ?? '',
    ios: {
      ...config.ios,
      bundleIdentifier: 'com.qatarpost.app',
      buildNumber: '1.0.0',
    },
    android: {
      ...config.android,
      package: 'com.qatarpost.app',
      versionCode: 1,
    },
    extra: {
      ...config.extra,
      env: 'prod',
    },
  };
};
