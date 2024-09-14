//
const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const metroConfig = async () => {
  const {
    resolver: {sourceExts, assetExts},
  } = await getDefaultConfig(__dirname);

  // Add 'svg' to the list of source extensions
  sourceExts.push('svg');

  return {
    resolver: {
      assetExts: assetExts.filter(ext => ext !== 'svg'),
      sourceExts: [...sourceExts, 'svg'],
    },
    transformer: {
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
    },
  };
};

const config = mergeConfig(getDefaultConfig(__dirname), metroConfig);

module.exports = config;
