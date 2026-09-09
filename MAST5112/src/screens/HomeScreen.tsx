import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { useMenu } from '../context/MenuContext';
import Header from '../components/Header';
import { Course } from '../types';

const PREDEFINED_ITEMS = [
  // Breakfast
  { name: 'Blueberry Waffles', description: 'Crispy waffles with blueberries & syrup', course: 'Breakfast' as Course, price: '95.00' },
  { name: 'Avocado Toast', description: 'Toasted bread with smashed avocado & eggs', course: 'Breakfast' as Course, price: '110.00' },
  { name: 'Tropical Smoothie Bowl', description: 'Fresh fruits, coconut, and granola', course: 'Breakfast' as Course, price: '120.00' },
  { name: 'Morning Wrap', description: 'Eggs, cheese, and veggies in a tortilla', course: 'Breakfast' as Course, price: '130.00' },

  // Mains
  { name: 'Grilled Salmon', description: 'Served with lemon butter and vegetables', course: 'Mains' as Course, price: '290' },
  { name: 'Ocean Pasta', description: 'Seafood pasta with creamy garlic sauce', course: 'Mains' as Course, price: '270' },
  { name: 'Chicken Alfredo', description: 'Creamy fettuccine with grilled chicken', course: 'Mains' as Course, price: '240' },
  { name: 'Beef Burger Deluxe', description: 'Juicy burger with cheese and fries', course: 'Mains' as Course, price: '220' },

  // Desserts
  { name: 'Mango Sorbet', description: 'Light and fresh tropical dessert', course: 'Desserts' as Course, price: '80' },
  { name: 'Coconut Tart', description: 'Coconut cream tart with caramel drizzle', course: 'Desserts' as Course, price: '100' },
  { name: 'Ocean Breeze Cake', description: 'Vanilla cake with sea-salt caramel', course: 'Desserts' as Course, price: '130' },
  { name: 'Pineapple Delight', description: 'Pineapple mousse with biscuit base', course: 'Desserts' as Course, price: '95' },
];

export default function HomeScreen({ navigation }: any) {
  const { items, addItem, getTotalItems } = useMenu();
  const [activeTab, setActiveTab] = useState<'All' | 'Breakfast' | 'Mains' | 'Desserts'>('All');

  const handleAddItem = (item: any) => {
    addItem(item);
  };

  const isItemAdded = (itemName: string) => {
    return items.some(item => item.name === itemName);
  };

  const filteredItems = activeTab === 'All' 
    ? PREDEFINED_ITEMS 
    : PREDEFINED_ITEMS.filter(item => item.course === activeTab);

  const tabs = ['All', 'Breakfast', 'Mains', 'Desserts'];

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🌊 Ocean Breeze Cuisine</Text>
        <Text style={styles.headerSubtitle}>Taste the freshness of the sea</Text>
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{getTotalItems()}</Text>
          <Text style={styles.statLabel}>Dishes</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{PREDEFINED_ITEMS.length}</Text>
          <Text style={styles.statLabel}>Available</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>3</Text>
          <Text style={styles.statLabel}>Categories</Text>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabScrollContent}
        >
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.tabActive]}
              onPress={() => setActiveTab(tab as any)}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Menu Items */}
      <ScrollView style={styles.itemsList} showsVerticalScrollIndicator={false}>
        {filteredItems.map((item, index) => (
          <View key={index} style={styles.itemCard}>
            <View style={styles.itemContent}>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemDescription}>{item.description}</Text>
                <View style={styles.itemMeta}>
                  <Text style={styles.itemCourse}>{item.course}</Text>
                  <Text style={styles.itemPrice}>R {item.price}</Text>
                </View>
              </View>
              <TouchableOpacity
                style={[
                  styles.addButton,
                  isItemAdded(item.name) && styles.addedButton
                ]}
                onPress={() => handleAddItem(item)}
                disabled={isItemAdded(item.name)}
              >
                <Text style={styles.addButtonText}>
                  {isItemAdded(item.name) ? '✓' : '+'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity 
          style={styles.createButton}
          onPress={() => navigation.navigate('AddMenu')}
        >
          <Text style={styles.createButtonText}>➕ Add New Dish</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6F4F9',
  },
  header: {
    backgroundColor: '#0077B6',
    paddingVertical: 25,
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#DFF6FF',
    marginTop: 4,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
    backgroundColor: '#023E8A',
    margin: 12,
    borderRadius: 15,
  },
  statBox: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '800',
    color: '#90E0EF',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  tabContainer: {
    height: 50,
    paddingHorizontal: 12,
  },
  tabScrollContent: {
    paddingHorizontal: 5,
    alignItems: 'center',
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#CAF0F8',
    marginHorizontal: 4,
    borderWidth: 2,
    borderColor: 'transparent',
    minWidth: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabActive: {
    backgroundColor: '#00B4D8',
    borderColor: '#0077B6',
  },
  tabText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0077B6',
  },
  tabTextActive: {
    color: '#FFFFFF',
  },
  itemsList: {
    flex: 1,
    padding: 12,
  },
  itemCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1.5,
    borderColor: '#ADE8F4',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  itemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemInfo: {
    flex: 1,
    marginRight: 10,
  },
  itemName: {
    fontSize: 15,
    fontWeight: '800',
    color: '#03045E',
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 13,
    color: '#555',
    marginBottom: 8,
    lineHeight: 16,
  },
  itemMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemCourse: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
    backgroundColor: '#00B4D8',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '800',
    color: '#03045E',
  },
  addButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#0077B6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addedButton: {
    backgroundColor: '#00AA00',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  bottomBar: {
    padding: 12,
    backgroundColor: '#023E8A',
  },
  createButton: {
    backgroundColor: '#90E0EF',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  createButtonText: {
    color: '#03045E',
    fontSize: 14,
    fontWeight: '700',
  },
});
