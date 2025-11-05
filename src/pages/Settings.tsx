import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import Icon from '@/components/ui/icon';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = React.useState(true);
  const [twoFactor, setTwoFactor] = React.useState(false);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#121212] pb-20">
      <Header showNotifications={false} />
      
      <main className="pt-20 px-4 max-w-md mx-auto">
        <Card className="bg-[#1A1A1A] border-[#333] mb-6">
          <CardContent className="p-6 flex items-center gap-4">
            <Avatar className="w-16 h-16">
              <AvatarFallback className="bg-gradient-to-br from-[#007BFF] to-[#003D80] text-white text-xl font-bold">
                АС
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-white text-xl font-bold">Алексей Смирнов</h2>
              <p className="text-[#E0E0E0] text-sm">Владелец магазина</p>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-3 mb-6">
          <h3 className="text-white text-lg font-semibold px-1">Уведомления</h3>
          
          <Card className="bg-[#1A1A1A] border-[#333]">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Icon name="Bell" size={20} className="text-[#007BFF]" />
                <span className="text-white">Push-уведомления</span>
              </div>
              <Switch checked={notifications} onCheckedChange={setNotifications} />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-3 mb-6">
          <h3 className="text-white text-lg font-semibold px-1">Интеграции</h3>
          
          <Card className="bg-[#1A1A1A] border-[#333]">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Icon name="Database" size={20} className="text-[#007BFF]" />
                <span className="text-white">CRM система</span>
              </div>
              <Icon name="ChevronRight" size={20} className="text-[#888]" />
            </CardContent>
          </Card>

          <Card className="bg-[#1A1A1A] border-[#333]">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Icon name="Calculator" size={20} className="text-[#007BFF]" />
                <span className="text-white">Бухгалтерия</span>
              </div>
              <Icon name="ChevronRight" size={20} className="text-[#888]" />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-3 mb-6">
          <h3 className="text-white text-lg font-semibold px-1">Безопасность</h3>
          
          <Card className="bg-[#1A1A1A] border-[#333]">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Icon name="Shield" size={20} className="text-[#007BFF]" />
                <span className="text-white">Двухэтапная проверка</span>
              </div>
              <Switch checked={twoFactor} onCheckedChange={setTwoFactor} />
            </CardContent>
          </Card>

          <Card className="bg-[#1A1A1A] border-[#333]">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Icon name="Key" size={20} className="text-[#007BFF]" />
                <span className="text-white">Сменить пароль</span>
              </div>
              <Icon name="ChevronRight" size={20} className="text-[#888]" />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-3">
          <Card className="bg-[#1A1A1A] border-[#333]">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Icon name="HelpCircle" size={20} className="text-[#007BFF]" />
                <span className="text-white">Помощь и поддержка</span>
              </div>
              <Icon name="ChevronRight" size={20} className="text-[#888]" />
            </CardContent>
          </Card>

          <Card className="bg-[#1A1A1A] border-[#333]">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Icon name="Info" size={20} className="text-[#007BFF]" />
                <span className="text-white">О приложении</span>
              </div>
              <Icon name="ChevronRight" size={20} className="text-[#888]" />
            </CardContent>
          </Card>
        </div>

        <Button 
          onClick={handleLogout}
          className="w-full mt-8 bg-[#FF4D4D] hover:bg-[#FF3333] text-white"
        >
          <Icon name="LogOut" size={20} className="mr-2" />
          Выйти из аккаунта
        </Button>
      </main>

      <Navigation />
    </div>
  );
};

export default Settings;