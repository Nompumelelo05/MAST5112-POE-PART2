import React from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  StyleSheet 
} from 'react-native';
import { useMenu } from '../context/MenuContext';
import { Course } from '../types';

export default function MenuListScreen({ navigation }: any) {
  const { items, getTotalItems, getItemsByCourse } = useMenu();

  const COURSES: Course[] = ['Breakfast', 'Mains', 'Desserts'];

  const renderCourseSection = (course: Course) => {
    const courseItems = getItemsByCourse(course);
    if (courseItems.length === 0) return null;

    return (
      <View key={course} style={styles.courseSection}>
        <View style={styles.courseHeader}>
          <Text style={styles.courseTitle}>{course}</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{courseItems.length}</Text>
          </View>
        </View>

        {courseItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.menuItem}
            onPress={() => navigation.navigate('ItemDetails', { item })}
            activeOpacity={0.8}
          >
            <View style={styles.itemContent}>
              <View style={styles.itemMain}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemDescription}>{item.description}</Text>
              </View>
              <View style={styles.priceContainer}>
                <Text style={styles.itemPrice}>R {item.price}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.topHeader}>
        <Text style={styles.title}>Your Menu</Text>
        <Text style={styles.subtitle}>
          {getTotalItems()} {getTotalItems() === 1 ? 'dish' : 'dishes'}
        </Text>
      </View>

      {getTotalItems() === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>No Dishes Yet 🍽️</Text>
          <Text style={styles.emptyText}>
            Start by adding some dishes from the home screen to build your menu!
          </Text>
        </View>
      ) : (
        <FlatList
          data={COURSES}
          renderItem={({ item }) => renderCourseSection(item)}
          keyExtractor={(item) => item}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#EAF2FF', // bleu clair
  },

  topHeader: {
    backgroundColor: '#1E90FF', // bleu principal
    marginHorizontal: 20,
    marginTop: 15,
    padding: 25,
    borderRadius: 18,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: '#FFFFFF', // texte blanc
  },
  subtitle: {
    fontSize: 16,
    color: '#EAF2FF',
    fontWeight: '600',
    marginTop: 4,
  },

  listContent: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },

  courseSection: {
    marginBottom: 30,
  },
  courseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 6,
  },
  courseTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0A1F44', // bleu foncé
  },
  badge: {
    backgroundColor: '#1E90FF',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },

  menuItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#1E90FF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 4,
  },

  itemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  itemMain: {
    flex: 1,
    marginRight: 10,
  },
  itemName: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0A1F44',
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 14,
    color: '#5A5A5A',
    lineHeight: 20,
  },
  priceContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '900',
    color: '#1E90FF',
  },

  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0A1F44',
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 15,
    color: '#555',
    textAlign: 'center',
    lineHeight: 22,
  },
});

