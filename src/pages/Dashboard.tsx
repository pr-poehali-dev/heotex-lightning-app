import React from 'react';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import Icon from '@/components/ui/icon';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Dashboard: React.FC = () => {
  const topProducts = [
    { id: 1, name: 'Молоко 3.2%', price: '89₽', image: 'https://cdn.poehali.dev/projects/4f748fcb-1eff-4c8d-8547-4a6db6814996/files/53a6557c-d186-4092-9619-6c6953e99105.jpg' },
    { id: 2, name: 'Хлеб белый', price: '45₽', image: 'https://cdn.poehali.dev/projects/4f748fcb-1eff-4c8d-8547-4a6db6814996/files/53a6557c-d186-4092-9619-6c6953e99105.jpg' },
    { id: 3, name: 'Яйца С1 10шт', price: '129₽', image: 'https://cdn.poehali.dev/projects/4f748fcb-1eff-4c8d-8547-4a6db6814996/files/53a6557c-d186-4092-9619-6c6953e99105.jpg' }
  ];

  const weekData = [
    { day: 'Пн', value: 65 },
    { day: 'Вт', value: 78 },
    { day: 'Ср', value: 45 },
    { day: 'Чт', value: 92 },
    { day: 'Пт', value: 88 },
    { day: 'Сб', value: 95 },
    { day: 'Вс', value: 82 }
  ];

  const maxValue = Math.max(...weekData.map(d => d.value));

  return (
    <div className="min-h-screen bg-[#121212] pb-20">
      <Header notificationCount={3} />
      
      <main className="pt-20 px-4 max-w-md mx-auto">
        <Card className="bg-[#1A1A1A] border-[#333] mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-white text-lg font-semibold">Сегодня</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-3xl font-bold text-white">45 280₽</p>
                <p className="text-[#E0E0E0] text-sm mt-1">Выручка</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-semibold text-[#007BFF]">24</p>
                <p className="text-[#E0E0E0] text-sm mt-1">Заказов</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#1A1A1A] border-[#333] mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-white text-lg font-semibold">Продажи за неделю</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 flex items-end justify-between gap-2">
              {weekData.map((item, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full bg-[#2A2A2A] rounded-t-lg relative" style={{ height: `${(item.value / maxValue) * 100}%` }}>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#007BFF] to-[#00BFFF] rounded-t-lg"></div>
                  </div>
                  <span className="text-xs text-[#E0E0E0]">{item.day}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="mb-6">
          <h2 className="text-white text-lg font-semibold mb-3 flex items-center gap-2">
            <Icon name="TrendingUp" size={20} className="text-[#007BFF]" />
            Топ-3 товара
          </h2>
          <div className="space-y-3">
            {topProducts.map((product) => (
              <Card key={product.id} className="bg-[#1A1A1A] border-[#007BFF] border-2">
                <CardContent className="p-3 flex items-center gap-3">
                  <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-lg" />
                  <div className="flex-1">
                    <h3 className="text-white font-medium">{product.name}</h3>
                    <p className="text-[#007BFF] font-bold text-lg">{product.price}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <Navigation />
    </div>
  );
};

export default Dashboard;
