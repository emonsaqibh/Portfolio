import React from 'react';

export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  year: string;
  role?: string;
  client?: string;
  website?: string;
  challenge?: string;
  solution?: string;
  gallery?: string[];
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  description: string;
  tags: string[];
}

export interface ApproachItem {
  icon: React.ElementType;
  title: string;
  subtitle: string;
  description: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}