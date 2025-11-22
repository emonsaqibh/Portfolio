import { Compass, Layers, BarChart3, Monitor, Smartphone, Cloud, Lock, Cpu } from 'lucide-react';
import { ApproachItem, Project, ServiceItem } from './types';
// We import the data from your JSON file
import content from './content.json';

// This map allows the CMS to save a string like "Compass" and the app to use the actual Icon component
const ICON_MAP: Record<string, any> = {
  Compass, Layers, BarChart3, Monitor, Smartphone, Cloud, Lock, Cpu
};

// We map over the JSON data to attach the correct Icon component
export const APPROACH_DATA: ApproachItem[] = content.approach_data.map((item: any) => ({
  ...item,
  icon: ICON_MAP[item.icon] || Compass // Default to Compass if icon missing
}));

export const PROJECTS: Project[] = content.projects;

export const SERVICES: ServiceItem[] = content.services;

export const SKILL_TAGS = content.skill_tags.map((item: any) => ({
  ...item,
  icon: ICON_MAP[item.icon] || Cloud
}));

// THIS IS THE MISSING PART THAT CAUSED THE ERROR
export const WORK_HISTORY = content.work_history || [];
export const RESUME_URL = content.resume_url || "#";
