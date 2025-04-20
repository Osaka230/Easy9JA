'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  HomeIcon, 
  DocumentTextIcon,
  PencilSquareIcon,
  CalendarIcon,
  ChartBarIcon,
  ShareIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';

const navItems = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'Content', href: '/content', icon: DocumentTextIcon },
  { name: 'Create', href: '/create', icon: PencilSquareIcon },
  { name: 'Schedule', href: '/schedule', icon: CalendarIcon },
  { name: 'Analytics', href: '/analytics', icon: ChartBarIcon },
  { name: 'Channels', href: '/channels', icon: ShareIcon },
  { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
];

export const pageTransitions = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 }
};

export const cardHover = {
  scale: 1.02,
  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
  transition: { duration: 0.2 }
};

export const loadingPulse = {
  opacity: [0.6, 1],
  transition: { duration: 1, repeat: Infinity }
};

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="fixed left-0 h-full w-64 bg-white border-r border-gray-200 p-4">
      <div className="flex items-center gap-2 mb-8">
        <div className="w-10 h-10 rounded-full bg-purple-600"></div>
        <span className="text-xl font-bold">Easy9JA</span>
      </div>
      
      <nav className="space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                isActive 
                  ? 'bg-purple-50 text-purple-600' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-4 left-4 right-4">
        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
          <div className="w-10 h-10 rounded-full bg-purple-600"></div>
          <div>
            <p className="font-medium">User Name</p>
            <p className="text-sm text-gray-500">Pro Plan</p>
          </div>
        </div>
      </div>
    </div>
  );
} 