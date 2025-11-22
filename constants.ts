import { Compass, Layers, BarChart3, Monitor, Smartphone, Cloud, Lock, Cpu } from 'lucide-react';
import { ApproachItem, Project, ServiceItem } from './types';
import content from './content.json';

const ICON_MAP: Record<string, any> = {
  Compass, Layers, BarChart3, Monitor, Smartphone, Cloud, Lock, Cpu
};

// --- NEW SITE SETTINGS EXPORT ---
export const SITE_SETTINGS = content.site_settings || {
  name: "Shakibul Alam Emon",
  logo_text: "Shakibul.",
  email: "hello@lustra.studio",
  footer_text: "All rights reserved 2025 © Shakibul Alam Emon",
  social_links: []
};
// -------------------------------

export const APPROACH_DATA: ApproachItem[] = content.approach_data.map((item: any) => ({
  ...item,
  icon: ICON_MAP[item.icon] || Compass
}));

export const PROJECTS: Project[] = content.projects;

export const SERVICES: ServiceItem[] = content.services;

export const SKILL_TAGS = content.skill_tags.map((item: any) => ({
  ...item,
  icon: ICON_MAP[item.icon] || Cloud
}));

export const WORK_HISTORY = content.work_history || [];
export const RESUME_URL = content.resume_url || "#";
export const TESTIMONIALS = content.testimonials || [];
