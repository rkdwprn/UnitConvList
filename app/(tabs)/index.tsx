import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from 'react-native';
import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
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
const EMPTY_ICON_SIZE = Math.min(660, Dimensions.get('window').width - 48);

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
  const { t, removeItem, duplicateItem } = useApp();
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
    Alert.alert(t('main.itemMenu'), '', [
      { text: t('common.cancel'), style: 'cancel' },
      { text: t('common.copy'), onPress: () => duplicateItem(item.id) },
      { text: t('common.delete'), style: 'destructive', onPress: () => removeItem(item.id) },
    ]);
  }, [item.id, removeItem, duplicateItem, t]);

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
              {displayFrom} → {formatConverted(converted)} {displayTo}
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
  const { items, reorderItems, t } = useApp();
  const sorted = [...items].sort((a, b) => a.order - b.order);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 1000);
    return () => clearTimeout(timer);
  }, []);

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

  if (showSplash) {
    return (
      <View style={styles.splashWrap}>
        <Image
          source={require('@/assets/splash-icon.png')}
          style={styles.splashImage}
          resizeMode="contain"
        />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={[styles.container, { backgroundColor: colors.background }]}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        {sorted.length === 0 ? (
          <View style={[styles.empty, { backgroundColor: '#ffffff' }]}>
            <View style={[styles.emptyCard, { backgroundColor: '#ffffff', borderColor: colors.border }]}>
              <View style={styles.emptyIconWrap}>
                <Image
                  source={require('@/assets/splash-icon.png')}
                  style={styles.emptyIconImage}
                  resizeMode="contain"
                />
              </View>
              <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
                {t('main.empty')}
              </Text>
            </View>
          </View>
        ) : (
          <DraggableFlatList
            data={sorted}
            keyExtractor={(i) => i.id}
            renderItem={renderItem}
            onDragEnd={onDragEnd}
            containerStyle={styles.list}
            contentContainerStyle={styles.listContent}
          />
        )}
      </KeyboardAvoidingView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  splashWrap: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashImage: {
    width: EMPTY_ICON_SIZE,
    height: EMPTY_ICON_SIZE,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingTop: 8,
    paddingBottom: 24,
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyCard: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 20,
    borderWidth: 1,
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  emptyIconWrap: {
    backgroundColor: '#ffffff',
    marginBottom: 24,
  },
  emptyIconImage: {
    width: EMPTY_ICON_SIZE,
    height: EMPTY_ICON_SIZE,
    backgroundColor: '#ffffff',
  },
  emptyText: {
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
    opacity: 0.9,
  },
  row: {
    minHeight: ROW_HEIGHT,
    marginBottom: 6,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowContentTouch: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  input: {
    width: 150,
    minHeight: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 18,
    marginRight: 14,
  },
  conversionWrap: {
    flex: 1,
    minWidth: 0,
  },
  conversionText: {
    fontSize: 15,
    fontWeight: '600',
  },
  titleText: {
    fontSize: 12,
    marginTop: 2,
  },
  dragHandle: {
    padding: 8,
    marginLeft: 4,
  },
});
