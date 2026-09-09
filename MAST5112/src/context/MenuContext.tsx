import React, { createContext, useState, useContext, ReactNode } from 'react';
import { MenuItem, Course } from '../types';

type MenuContextType = {
  items: MenuItem[];
  addItem: (item: Omit<MenuItem, 'id'>) => void;
  getTotalItems: () => number;
  getItemsByCourse: (course: Course) => MenuItem[];
};

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) throw new Error('useMenu must be used within MenuProvider');
  return context;
};

export const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<MenuItem[]>([]);

  const addItem = (item: Omit<MenuItem, 'id'>) => {
    const newItem: MenuItem = {
      ...item,
      id: Math.random().toString(36).substr(2, 9),
    };
    setItems(prev => [...prev, newItem]);
  };

  const getTotalItems = () => items.length;
  const getItemsByCourse = (course: Course) => items.filter(item => item.course === course);

  return (
    <MenuContext.Provider value={{ items, addItem, getTotalItems, getItemsByCourse }}>
      {children}
    </MenuContext.Provider>
  );
};
