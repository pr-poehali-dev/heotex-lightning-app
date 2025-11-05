import React from 'react';
import Icon from '@/components/ui/icon';
import { Link, useLocation } from 'react-router-dom';

const Navigation: React.FC = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', icon: 'Home', label: 'Главная' },
    { path: '/products', icon: 'Package', label: 'Товары' },
    { path: '/orders', icon: 'List', label: 'Заказы' },
    { path: '/analytics', icon: 'LineChart', label: 'Аналитика' },
    { path: '/settings', icon: 'Settings', label: 'Настройки' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#1A1A1A] border-t border-[#333] z-50">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto px-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`relative flex flex-col items-center justify-center gap-1 flex-1 transition-all duration-300 ${
                isActive ? 'text-[#007BFF] scale-110' : 'text-[#888] hover:text-[#007BFF] hover:scale-105'
              }`}
            >
              <Icon name={item.icon} size={22} />
              <span className="text-[10px] font-medium">{item.label}</span>
              {isActive && (
                <div className="absolute bottom-0 w-12 h-1 bg-[#007BFF] rounded-t-full animate-in fade-in slide-in-from-bottom-2 duration-300" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;