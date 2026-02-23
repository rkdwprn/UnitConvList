import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useRouter } from 'expo-router';
import { useApp } from '@/context/AppContext';
import { useThemeColors } from '@/hooks/useThemeColors';
import {
  convertUnit,
  formatConverted,
  getCategory,
  getUnit,
  type UnitCategoryKey,
} from '@/constants/units';
import type { ConversionItem } from '@/context/AppContext';
import { Ionicons } from '@expo/vector-icons';

const MAX_ITEMS = 100;
const ROW_HEIGHT = 72;

function RowItem({
  item,
  drag,
  isActive,
}: {
  item: ConversionItem;
  drag: () => void;
  isActive: boolean;
}) {
  const colors = useThemeColors();
  const { t, removeItem } = useApp();
  const [input, setInput] = useState('');
  const num = parseFloat(input.replace(/,/g, '')) || 0;
  const converted = convertUnit(
    num,
    item.categoryId,
    item.fromUnitId,
    item.toUnitId
  );
  const fromUnit = getUnit(item.categoryId, item.fromUnitId);
  const toUnit = getUnit(item.categoryId, item.toUnitId);
  const displayFrom = fromUnit.name;
  const displayTo = toUnit.name;

  const onLongPressRow = useCallback(() => {
    Alert.alert(t('main.deleteConfirm'), '', [
      { text: t('common.cancel'), style: 'cancel' },
      { text: t('common.delete'), style: 'destructive', onPress: () => removeItem(item.id) },
    ]);
  }, [item.id, removeItem, t]);

  return (
    <ScaleDecorator>
      <View
        style={[
          styles.row,
          {
            backgroundColor: isActive ? colors.border : colors.card,
            borderBottomColor: colors.border,
          },
        ]}
      >
        <TouchableOpacity
          onLongPress={onLongPressRow}
          delayLongPress={400}
          activeOpacity={1}
          style={styles.rowContentTouch}
        >
          <TextInput
            style={[styles.input, { color: colors.text, borderColor: colors.border }]}
            value={input}
            onChangeText={setInput}
            placeholder="0"
            placeholderTextColor={colors.placeholder}
            keyboardType="decimal-pad"
          />
          <View style={styles.conversionWrap}>
            <Text style={[styles.conversionText, { color: colors.text }]} numberOfLines={1}>
              {displayFrom} —→ {formatConverted(converted)} {displayTo}
            </Text>
            {item.title ? (
              <Text style={[styles.titleText, { color: colors.textSecondary }]} numberOfLines={1}>
                {item.title}
              </Text>
            ) : null}
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onLongPress={drag}
          style={styles.dragHandle}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <Ionicons name="reorder-three" size={24} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>
    </ScaleDecorator>
  );
}

export default function MainScreen() {
  const colors = useThemeColors();
  const router = useRouter();
  const { items, reorderItems, t } = useApp();
  const sorted = [...items].sort((a, b) => a.order - b.order);
  const canAdd = items.length < MAX_ITEMS;

  const renderItem = useCallback(
    ({ item, drag, isActive }: RenderItemParams<ConversionItem>) => (
      <RowItem item={item} drag={drag} isActive={isActive} />
    ),
    []
  );

  const onDragEnd = useCallback(
    ({ data }: { data: ConversionItem[] }) => {
      reorderItems(data);
    },
    [reorderItems]
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={[styles.container, { backgroundColor: colors.background }]}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        {sorted.length === 0 ? (
          <View style={styles.empty}>
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
              {t('main.empty')}
            </Text>
          </View>
        ) : (
          <DraggableFlatList
            data={sorted}
            keyExtractor={(i) => i.id}
            renderItem={renderItem}
            onDragEnd={onDragEnd}
            containerStyle={styles.list}
          />
        )}
        {canAdd && (
          <TouchableOpacity
            style={[styles.fab, { backgroundColor: colors.primary }]}
            onPress={() => router.push('/add')}
            activeOpacity={0.8}
          >
            <Ionicons name="add" size={28} color="#fff" />
          </TouchableOpacity>
        )}
      </KeyboardAvoidingView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  row: {
    minHeight: ROW_HEIGHT,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowContentTouch: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  input: {
    width: 72,
    height: 44,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    marginRight: 12,
  },
  conversionWrap: {
    flex: 1,
    minWidth: 0,
  },
  conversionText: {
    fontSize: 15,
  },
  titleText: {
    fontSize: 12,
    marginTop: 2,
  },
  dragHandle: {
    padding: 8,
    marginLeft: 4,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});
