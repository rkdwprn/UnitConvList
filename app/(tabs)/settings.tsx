import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { useApp } from '@/context/AppContext';
import { useThemeColors } from '@/hooks/useThemeColors';
import appConfig from '../../app.json';

const APP_VERSION = appConfig.expo.version;
const DEVELOPER_NAME = 'perfectLemon';
const DEVELOPER_EMAIL = 'rkdwprn@gmail.com';

export default function SettingsScreen() {
  const colors = useThemeColors();
  const { t, theme, language, setTheme, setLanguage } = useApp();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>{t('settings.theme')}</Text>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => setTheme('light')}
            style={[
              styles.option,
              { borderColor: colors.border, backgroundColor: theme === 'light' ? colors.primary + '22' : 'transparent' },
            ]}
          >
            <Text style={[styles.optionText, { color: colors.text }]}>{t('settings.themeLight')}</Text>
            {theme === 'light' && <View style={[styles.radio, { backgroundColor: colors.primary }]} />}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setTheme('dark')}
            style={[
              styles.option,
              { borderColor: colors.border, backgroundColor: theme === 'dark' ? colors.primary + '22' : 'transparent' },
            ]}
          >
            <Text style={[styles.optionText, { color: colors.text }]}>{t('settings.themeDark')}</Text>
            {theme === 'dark' && <View style={[styles.radio, { backgroundColor: colors.primary }]} />}
          </TouchableOpacity>
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>{t('settings.language')}</Text>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => setLanguage('ko')}
            style={[
              styles.option,
              { borderColor: colors.border, backgroundColor: language === 'ko' ? colors.primary + '22' : 'transparent' },
            ]}
          >
            <Text style={[styles.optionText, { color: colors.text }]}>{t('settings.languageKo')}</Text>
            {language === 'ko' && <View style={[styles.radio, { backgroundColor: colors.primary }]} />}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setLanguage('en')}
            style={[
              styles.option,
              { borderColor: colors.border, backgroundColor: language === 'en' ? colors.primary + '22' : 'transparent' },
            ]}
          >
            <Text style={[styles.optionText, { color: colors.text }]}>{t('settings.languageEn')}</Text>
            {language === 'en' && <View style={[styles.radio, { backgroundColor: colors.primary }]} />}
          </TouchableOpacity>
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>{t('settings.appInfo')}</Text>
        <View style={[styles.infoRow, { borderColor: colors.border }]}>
          <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>{t('settings.version')}</Text>
          <Text style={[styles.infoValue, { color: colors.text }]}>{APP_VERSION}</Text>
        </View>
        <View style={[styles.infoRow, { borderColor: colors.border }]}>
          <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>{t('settings.developer')}</Text>
          <Text style={[styles.infoValue, { color: colors.text }]}>{DEVELOPER_NAME}</Text>
        </View>
        <TouchableOpacity
          style={[styles.infoRow, styles.infoRowLast, { borderColor: colors.border }]}
          onPress={() => Linking.openURL(`mailto:${DEVELOPER_EMAIL}`)}
          activeOpacity={0.7}
        >
          <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>{t('settings.email')}</Text>
          <Text style={[styles.infoValue, { color: colors.primary }]}>{DEVELOPER_EMAIL}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  section: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  row: { flexDirection: 'row', gap: 12 },
  option: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
    borderRadius: 8,
    borderWidth: 1,
  },
  optionText: { fontSize: 15 },
  radio: { width: 10, height: 10, borderRadius: 5 },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  infoRowLast: { borderBottomWidth: 0 },
  infoLabel: { fontSize: 15 },
  infoValue: { fontSize: 15 },
});
