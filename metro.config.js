const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// "runtime not ready" / Hermes require 오류 완화 (패키지 exports 해석 방식 조정)
config.resolver.unstable_enablePackageExports = false;

module.exports = config;
