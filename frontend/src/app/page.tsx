'use client';

import { ChatBubbleLeftIcon, UserGroupIcon, CalendarIcon, ArrowTrendingUpIcon } from '@heroicons/react/24/outline';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ElementType;
}

function MetricCard({ title, value, change, isPositive, icon: Icon }: MetricCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <h3 className="text-3xl font-bold mt-1">{value}</h3>
          <p className={`text-sm mt-1 ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {isPositive ? '+' : ''}{change}
          </p>
        </div>
        <div className={`p-3 rounded-lg ${isPositive ? 'bg-green-50' : 'bg-red-50'}`}>
          <Icon className="w-6 h-6 text-gray-600" />
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const metrics = [
    {
      title: 'Total Posts',
      value: '124',
      change: '12%',
      isPositive: true,
      icon: ChatBubbleLeftIcon,
    },
    {
      title: 'Engagement',
      value: '4,832',
      change: '18%',
      isPositive: true,
      icon: UserGroupIcon,
    },
    {
      title: 'Scheduled',
      value: '26',
      change: '5%',
      isPositive: true,
      icon: CalendarIcon,
    },
    {
      title: 'Conversions',
      value: '482',
      change: '3%',
      isPositive: false,
      icon: ArrowTrendingUpIcon,
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Welcome back!</h1>
        <p className="text-gray-500 mt-1">Last updated: 5 minutes ago</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <MetricCard key={metric.title} {...metric} />
        ))}
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold">Content Performance</h2>
            <p className="text-gray-500">Engagement trends across platforms</p>
          </div>
        </div>
        <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg">
          <p className="text-gray-500">Performance chart will be displayed here</p>
        </div>
      </div>
    </div>
  );
} 