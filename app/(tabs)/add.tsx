import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useApp } from '@/context/AppContext';
import { useThemeColors } from '@/hooks/useThemeColors';
import { UNIT_CATEGORIES, getCategory, type UnitCategoryKey } from '@/constants/units';

const MAX_ITEMS = 100;

export default function AddScreen() {
  const colors = useThemeColors();
  const router = useRouter();
  const { t, items, addItem } = useApp();
  const [title, setTitle] = useState('');
  const [categoryId, setCategoryId] = useState<UnitCategoryKey>('length');
  const [fromUnitId, setFromUnitId] = useState('m');
  const [toUnitId, setToUnitId] = useState('cm');

  const category = useMemo(() => getCategory(categoryId), [categoryId]);
  const fromOptions = category.units;
  const toOptions = category.units;

  const handleAdd = () => {
    if (items.length >= MAX_ITEMS) {
      Alert.alert('', t('main.maxItems').replace('{{max}}', String(MAX_ITEMS)));
      return;
    }
    addItem({
      title: title.trim() || undefined,
      categoryId,
      fromUnitId,
      toUnitId,
    });
    setTitle('');
    setFromUnitId(category.siUnitId);
    setToUnitId(category.units.find((u) => u.id !== category.siUnitId)?.id ?? category.units[0].id);
    router.back();
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.section}>
        <Text style={[styles.label, { color: colors.textSecondary }]}>{t('add.unitType')}</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipRow}>
          {UNIT_CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              onPress={() => {
                setCategoryId(cat.id);
                setFromUnitId(cat.siUnitId);
                const other = cat.units.find((u) => u.id !== cat.siUnitId);
                setToUnitId(other?.id ?? cat.units[0].id);
              }}
              style={[
                styles.chip,
                {
                  backgroundColor: categoryId === cat.id ? colors.primary : colors.card,
                  borderColor: colors.border,
                },
              ]}
            >
              <Text
                style={[
                  styles.chipText,
                  { color: categoryId === cat.id ? '#fff' : colors.text },
                ]}
              >
                {t(cat.nameKey)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text style={[styles.label, { color: colors.textSecondary }]}>{t('common.title')} ({t('common.optional')})</Text>
        <TextInput
          style={[styles.input, { color: colors.text, borderColor: colors.border }]}
          value={title}
          onChangeText={setTitle}
          placeholder={t('common.title')}
          placeholderTextColor={colors.placeholder}
        />
      </View>

      <View style={styles.section}>
        <Text style={[styles.label, { color: colors.textSecondary }]}>{t('add.fromUnit')}</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipRow}>
          {fromOptions.map((u) => (
            <TouchableOpacity
              key={u.id}
              onPress={() => setFromUnitId(u.id)}
              style={[
                styles.chip,
                {
                  backgroundColor: fromUnitId === u.id ? colors.primary : colors.card,
                  borderColor: colors.border,
                },
              ]}
            >
              <Text
                style={[
                  styles.chipText,
                  { color: fromUnitId === u.id ? '#fff' : colors.text },
                ]}
              >
                {u.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text style={[styles.label, { color: colors.textSecondary }]}>{t('add.toUnit')}</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipRow}>
          {toOptions.map((u) => (
            <TouchableOpacity
              key={u.id}
              onPress={() => setToUnitId(u.id)}
              style={[
                styles.chip,
                {
                  backgroundColor: toUnitId === u.id ? colors.primary : colors.card,
                  borderColor: colors.border,
                },
              ]}
            >
              <Text
                style={[
                  styles.chipText,
                  { color: toUnitId === u.id ? '#fff' : colors.text },
                ]}
              >
                {u.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <TouchableOpacity
        style={[styles.addButton, { backgroundColor: colors.primary }]}
        onPress={handleAdd}
      >
        <Text style={styles.addButtonText}>{t('add.addItem')}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, paddingBottom: 40 },
  section: { marginBottom: 20 },
  label: { fontSize: 14, marginBottom: 8 },
  chipRow: { flexGrow: 0, marginHorizontal: -4 },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    marginHorizontal: 4,
  },
  chipText: { fontSize: 15 },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
  },
  addButton: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  addButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
