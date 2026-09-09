export type Course = 'Breakfast' | 'Mains' | 'Desserts';

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  course: Course;
  price: string;
};