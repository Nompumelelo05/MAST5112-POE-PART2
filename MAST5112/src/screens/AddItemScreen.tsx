import React, { useState } from 'react';
import { 
  View, 
  TextInput, 
  Text, 
  StyleSheet, 
  ScrollView,
  TouchableOpacity,
  Alert 
} from 'react-native';
import { useMenu } from '../context/MenuContext';
import { Course } from '../types';

const COURSES: Course[] = ['Breakfast', 'Mains', 'Desserts'];

export default function AddItemScreen({ navigation }: any) {
  const { addItem } = useMenu();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState<Course>('Mains');
  const [price, setPrice] = useState('');

  const handleSave = () => {
    if (!name.trim() || !description.trim() || !price.trim()) {
      Alert.alert('Missing Information', 'Please fill in all fields.');
      return;
    }

    if (isNaN(parseFloat(price)) || parseFloat(price) <= 0) {
      Alert.alert('Invalid Price', 'Please enter a valid price.');
      return;
    }

    addItem({ 
      name: name.trim(), 
      description: description.trim(), 
      course,
      price: parseFloat(price).toFixed(0),
    });
    
    Alert.alert('Success!', `${name} has been added to your menu.`, [
      { 
        text: 'OK', 
        onPress: () => {
          setName('');
          setDescription('');
          setPrice('');
          setCourse('Mains');
        }
      }
    ]);
  };

  const isFormValid = name.trim() && description.trim() && price.trim() && !isNaN(parseFloat(price));

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>➕ Create New Dish</Text>
        <Text style={styles.headerSubtitle}>Add a new item to Ocean Breeze Cuisine</Text>
      </View>

      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={{ paddingBottom: 50 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.formCard}>
          {/* Dish Name */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Dish Name</Text>
            <TextInput 
              placeholder="Enter dish name" 
              value={name} 
              onChangeText={setName} 
              style={styles.input} 
              placeholderTextColor="#7BAACD"
            />
          </View>

          {/* Description */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Description</Text>
            <TextInput 
              placeholder="Describe your dish..." 
              value={description} 
              onChangeText={setDescription} 
              style={[styles.input, styles.textArea]} 
              multiline
              numberOfLines={3}
              placeholderTextColor="#7BAACD"
            />
          </View>

          {/* Course selection */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Course</Text>
            <View style={styles.courseContainer}>
              {COURSES.map((courseOption) => (
                <TouchableOpacity
                  key={courseOption}
                  style={[
                    styles.courseButton,
                    course === courseOption && styles.courseButtonActive
                  ]}
                  onPress={() => setCourse(courseOption)}
                >
                  <Text style={[
                    styles.courseText,
                    course === courseOption && styles.courseTextActive
                  ]}>
                    {courseOption}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Price */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Price (R)</Text>
            <TextInput 
              placeholder="0" 
              value={price} 
              onChangeText={setPrice} 
              style={styles.input} 
              keyboardType="number-pad"
              placeholderTextColor="#7BAACD"
            />
          </View>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.saveButton, !isFormValid && styles.saveButtonDisabled]}
              onPress={handleSave}
              disabled={!isFormValid}
            >
              <Text style={styles.saveButtonText}>Add to Menu</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#E6F4F9' 
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

  scrollView: { 
    flex: 1, 
    paddingHorizontal: 20, 
    paddingTop: 20 
  },

  formCard: {
    backgroundColor: '#FFFFFF',
    padding: 25,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#ADE8F4',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },

  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 15,
    fontWeight: '700',
    color: '#03045E',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#90E0EF',
    padding: 14,
    borderRadius: 12,
    backgroundColor: '#F8FDFF',
    fontSize: 15,
    color: '#03045E',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },

  courseContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  courseButton: {
    flex: 1,
    padding: 15,
    marginHorizontal: 5,
    borderRadius: 12,
    backgroundColor: '#CAF0F8',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  courseButtonActive: {
    backgroundColor: '#00B4D8',
    borderColor: '#0077B6',
  },
  courseText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0077B6',
  },
  courseTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  cancelButton: {
    flex: 1,
    padding: 15,
    borderRadius: 12,
    backgroundColor: '#90E0EF',
    marginRight: 8,
    alignItems: 'center',
  },
  saveButton: {
    flex: 2,
    padding: 15,
    borderRadius: 12,
    backgroundColor: '#0077B6',
    marginLeft: 8,
    alignItems: 'center',
  },
  saveButtonDisabled: {
    backgroundColor: '#7BAACD',
    opacity: 0.6,
  },
  cancelButtonText: {
    color: '#03045E',
    fontSize: 15,
    fontWeight: '700',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
