import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import Constants from 'expo-constants';
import {
  BannerAd,
  BannerAdSize,
  TestIds,
  mobileAds,
  useForeground,
} from 'react-native-google-mobile-ads';

// 배너 광고 단위 ID — 개발 시 테스트 ID, 프로덕션 시 실제 단위 ID
const BANNER_AD_UNIT_ID = __DEV__
  ? TestIds.BANNER
  : 'ca-app-pub-5922905617998234/6202262757';

function AdBannerInner() {
  const bannerRef = useRef<BannerAd>(null);

  useEffect(() => {
    mobileAds()
      .initialize()
      .catch((e) => console.warn('AdMob init:', e));
  }, []);

  useForeground(() => {
    if (Platform.OS === 'ios') {
      bannerRef.current?.load();
    }
  });

  return (
    <View style={styles.container}>
      <BannerAd
        ref={bannerRef}
        unitId={BANNER_AD_UNIT_ID}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        onAdFailedToLoad={(error) => {
          console.warn('AdMob banner failed to load:', error);
        }}
      />
    </View>
  );
}

export function AdBanner() {
  // Expo Go에는 AdMob 네이티브 모듈이 없으므로 배너 미표시
  if (Constants.appOwnership === 'expo') {
    return null;
  }
  return <AdBannerInner />;
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    minHeight: 50,
  },
});
