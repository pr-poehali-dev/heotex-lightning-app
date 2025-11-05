import React from 'react';
import Logo from './Logo';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';

interface HeaderProps {
  showNotifications?: boolean;
  notificationCount?: number;
}

const Header: React.FC<HeaderProps> = ({ showNotifications = true, notificationCount = 0 }) => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-[#121212] border-b border-[#333] z-40">
      <div className="flex items-center justify-between h-16 max-w-md mx-auto px-4">
        <Logo variant="full" size="sm" />
        
        <div className="flex items-center gap-4">
          {showNotifications && (
            <button className="relative">
              <Icon name="Bell" size={20} className="text-[#007BFF]" />
              {notificationCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[8px] bg-[#FF4D4D] border-none">
                  {notificationCount}
                </Badge>
              )}
            </button>
          )}
          
          <button className="w-8 h-8 rounded-full bg-gradient-to-br from-[#007BFF] to-[#003D80] flex items-center justify-center">
            <Icon name="User" size={16} className="text-white" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
