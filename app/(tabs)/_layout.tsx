import React, { useState } from 'react';
import {
  TouchableOpacity,
  Modal,
  Pressable,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useThemeColors } from '@/hooks/useThemeColors';
import { useApp } from '@/context/AppContext';
import { Ionicons } from '@expo/vector-icons';

export default function TabsLayout() {
  const colors = useThemeColors();
  const router = useRouter();
  const { t } = useApp();
  const [menuVisible, setMenuVisible] = useState(false);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const goTo = (path: string) => {
    closeMenu();
    router.push(path);
  };

  const menuButton = () => (
    <TouchableOpacity
      onPress={openMenu}
      style={{ marginRight: 12 }}
      hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
    >
      <Ionicons name="ellipsis-horizontal" size={24} color={colors.text} />
    </TouchableOpacity>
  );

  return (
    <>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.card },
          headerTintColor: colors.text,
          headerTitleStyle: { fontWeight: '600', fontSize: 18 },
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: 'Unit Calc',
            headerRight: menuButton,
          }}
        />
        <Stack.Screen
          name="add"
          options={{
            title: t('nav.add'),
          }}
        />
        <Stack.Screen
          name="settings"
          options={{
            title: t('nav.settings'),
          }}
        />
      </Stack>

      <Modal
        visible={menuVisible}
        transparent
        animationType="fade"
        onRequestClose={closeMenu}
      >
        <Pressable style={styles.backdrop} onPress={closeMenu}>
          <Pressable style={[styles.menuPanel, { backgroundColor: colors.card, borderColor: colors.border }]} onPress={(e) => e.stopPropagation()}>
            <TouchableOpacity
              style={[styles.menuRow, styles.menuRowBorder, { borderBottomColor: colors.border }]}
              onPress={() => goTo('/add')}
              activeOpacity={0.7}
            >
              <Ionicons name="add-circle-outline" size={22} color={colors.primary} style={styles.menuIcon} />
              <Text style={[styles.menuText, { color: colors.text }]}>{t('nav.add')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuRow}
              onPress={() => goTo('/settings')}
              activeOpacity={0.7}
            >
              <Ionicons name="settings-outline" size={22} color={colors.primary} style={styles.menuIcon} />
              <Text style={[styles.menuText, { color: colors.text }]}>{t('nav.settings')}</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 56,
    paddingRight: 12,
  },
  menuPanel: {
    minWidth: 160,
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  menuRowBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  menuIcon: {
    marginRight: 12,
  },
  menuText: {
    fontSize: 16,
  },
});
