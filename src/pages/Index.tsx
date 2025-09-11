import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface CashbackOffer {
  id: string;
  store: string;
  category: string;
  percentage: number;
  icon: string;
  color: string;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'cashback' | 'offer' | 'bonus';
}

export default function Index() {
  const [balance, setBalance] = useState(1247);
  const [savedAmount, setSavedAmount] = useState(835);
  const [activeTab, setActiveTab] = useState('home');

  const cashbackOffers: CashbackOffer[] = [
    { id: '1', store: 'Продукты', category: 'Супермаркеты', percentage: 5, icon: 'ShoppingCart', color: 'bg-green-500' },
    { id: '2', store: 'Косметика', category: 'Красота', percentage: 12, icon: 'Sparkles', color: 'bg-pink-500' },
    { id: '3', store: 'Техника', category: 'Электроника', percentage: 8, icon: 'Smartphone', color: 'bg-blue-500' },
    { id: '4', store: 'Одежда', category: 'Мода', percentage: 15, icon: 'Shirt', color: 'bg-purple-500' },
  ];

  const notifications: Notification[] = [
    { id: '1', title: 'Новый кэшбек!', message: 'Получите 20% в магазине техники', type: 'offer' },
    { id: '2', title: 'Начислено +50₽', message: 'За покупку в супермаркете', type: 'cashback' },
    { id: '3', title: 'Бонус активирован', message: 'Удвоенный кэшбек на выходных', type: 'bonus' },
  ];

  const showNotification = (notification: Notification) => {
    const icon = notification.type === 'cashback' ? '💰' : notification.type === 'offer' ? '🎁' : '⚡';
    toast(`${icon} ${notification.title}`, {
      description: notification.message,
      duration: 4000,
    });
  };

  useEffect(() => {
    // Симуляция push-уведомлений
    const timer = setInterval(() => {
      const randomNotification = notifications[Math.floor(Math.random() * notifications.length)];
      showNotification(randomNotification);
    }, 10000);

    return () => clearInterval(timer);
  }, []);

  const navigationItems = [
    { id: 'home', label: 'Главная', icon: 'Home' },
    { id: 'profile', label: 'Профиль', icon: 'User' },
    { id: 'cashback', label: 'Кэшбек', icon: 'Percent' },
    { id: 'categories', label: 'Категории', icon: 'Grid3x3' },
    { id: 'history', label: 'История', icon: 'Clock' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pt-12">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600">
            <Icon name="Zap" size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">HeoTex</h1>
            <p className="text-sm text-gray-300">Кэшбек сервис</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost" 
            size="sm"
            onClick={() => showNotification(notifications[0])}
            className="text-white hover:bg-white/10"
          >
            <Icon name="Bell" size={20} />
          </Button>
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
            <Icon name="QrCode" size={20} />
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-4 mb-6">
        <div className="relative">
          <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Искать магазины и предложения"
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm text-white placeholder-gray-300 border border-white/20 focus:border-blue-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Balance Cards */}
      <div className="px-4 mb-6 grid grid-cols-3 gap-3">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
          <CardContent className="p-4">
            <div className="text-sm text-gray-300 mb-1">Бонусы</div>
            <div className="text-xl font-bold">{balance}₽</div>
            <div className="text-xs text-green-400">К сгоранию: 0₽</div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
          <CardContent className="p-4">
            <div className="text-sm text-gray-300 mb-1">Сэкономлено</div>
            <div className="text-xl font-bold">{savedAmount}₽</div>
            <div className="text-xs text-blue-400">За все время</div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center mb-2">
              <div className="w-8 h-8 border-2 border-white rounded-sm grid grid-cols-3 gap-px">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div key={i} className="bg-white rounded-sm" />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cashback Banner */}
      <div className="px-4 mb-6">
        <Card className="bg-gradient-to-r from-blue-600 to-blue-700 border-0 text-white overflow-hidden">
          <CardContent className="p-4 relative">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg mb-1">Кэшбек 10%</h3>
                <p className="text-blue-100 text-sm">Электроника и гаджеты</p>
              </div>
              <Button variant="secondary" size="sm" className="bg-white text-blue-700 hover:bg-gray-100">
                Выбрать
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cashback Offers Grid */}
      <div className="px-4 mb-6 grid grid-cols-2 gap-4">
        {cashbackOffers.map((offer) => (
          <Card key={offer.id} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-8 h-8 rounded-lg ${offer.color} flex items-center justify-center`}>
                  <Icon name={offer.icon as any} size={16} className="text-white" />
                </div>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                  {offer.percentage}%
                </Badge>
              </div>
              <h3 className="font-semibold text-white mb-1">{offer.store}</h3>
              <p className="text-sm text-gray-300">{offer.category}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Premium Section */}
      <div className="px-4 mb-6 grid grid-cols-2 gap-4">
        <Card className="bg-gradient-to-br from-orange-500 to-red-500 border-0 text-white">
          <CardContent className="p-4">
            <Badge className="bg-black/30 text-white mb-3 text-xs">ПРЕМИУМ</Badge>
            <h3 className="font-bold mb-2">Подключить 30 дней бесплатно</h3>
            <p className="text-xs text-orange-100 mb-3">С подпиской копят в среднем 350 бонусов в месяц</p>
            <Button size="sm" variant="secondary" className="bg-white text-orange-600 hover:bg-gray-100">
              Подключить
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
          <CardContent className="p-4 flex flex-col items-center justify-center text-center">
            <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center mb-2">
              <Icon name="Heart" size={16} className="text-white" />
            </div>
            <p className="text-sm font-medium">Больше любимых категорий</p>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-lg border-t border-white/10">
        <div className="flex items-center justify-around py-2">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center p-3 rounded-lg transition-colors ${
                activeTab === item.id 
                  ? 'text-blue-400 bg-blue-500/10' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Icon name={item.icon as any} size={20} />
              <span className="text-xs mt-1 font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Push notification trigger for demo */}
      <div className="fixed top-20 right-4">
        <Button
          onClick={() => showNotification(notifications[Math.floor(Math.random() * notifications.length)])}
          className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
          size="sm"
        >
          <Icon name="Zap" size={16} />
        </Button>
      </div>
    </div>
  );
}