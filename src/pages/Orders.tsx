import React, { useState } from 'react';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface Order {
  id: string;
  date: string;
  total: string;
  items: { name: string; price: string; image: string }[];
  status: 'new' | 'processing' | 'completed';
  progress: number;
}

const Orders: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'new' | 'processing' | 'completed'>('new');

  const orders: Order[] = [
    {
      id: '#1247',
      date: '05.11.2025 14:32',
      total: '892₽',
      items: [
        { name: 'Молоко 3.2%', price: '89₽', image: 'https://cdn.poehali.dev/projects/4f748fcb-1eff-4c8d-8547-4a6db6814996/files/95288e1a-c77f-4bfb-96fd-c22f55969ef2.jpg' },
        { name: 'Хлеб белый', price: '45₽', image: 'https://cdn.poehali.dev/projects/4f748fcb-1eff-4c8d-8547-4a6db6814996/files/f9ab637e-243e-43a8-a1a8-5d525001b965.jpg' }
      ],
      status: 'new',
      progress: 0
    },
    {
      id: '#1246',
      date: '05.11.2025 13:18',
      total: '1 245₽',
      items: [
        { name: 'Яйца С1 10шт', price: '129₽', image: 'https://cdn.poehali.dev/projects/4f748fcb-1eff-4c8d-8547-4a6db6814996/files/b31fa237-db15-4f9b-b5a6-a50138979ac4.jpg' },
        { name: 'Сыр российский', price: '245₽', image: 'https://cdn.poehali.dev/projects/4f748fcb-1eff-4c8d-8547-4a6db6814996/files/25ddbf80-b6b5-410d-8d62-86c1ee446863.jpg' }
      ],
      status: 'processing',
      progress: 65
    },
    {
      id: '#1245',
      date: '05.11.2025 12:05',
      total: '567₽',
      items: [
        { name: 'Масло сливочное', price: '189₽', image: 'https://cdn.poehali.dev/projects/4f748fcb-1eff-4c8d-8547-4a6db6814996/files/940de6f3-a6de-4fbe-b4ee-6cc0da96b59f.jpg' }
      ],
      status: 'completed',
      progress: 100
    }
  ];

  const filteredOrders = orders.filter(o => o.status === activeTab);
  const newOrdersCount = orders.filter(o => o.status === 'new').length;

  return (
    <div className="min-h-screen bg-[#121212] pb-20">
      <Header notificationCount={newOrdersCount} />
      
      <main className="pt-20 px-4 max-w-md mx-auto">
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          <Button
            onClick={() => setActiveTab('new')}
            variant={activeTab === 'new' ? 'default' : 'outline'}
            className={`relative ${activeTab === 'new' ? 'bg-[#007BFF] text-white' : 'bg-transparent border-[#007BFF] text-[#007BFF]'}`}
          >
            Новые
            {newOrdersCount > 0 && (
              <Badge className="ml-2 bg-[#FF4D4D] text-white border-none h-5 w-5 p-0 flex items-center justify-center text-xs">
                {newOrdersCount}
              </Badge>
            )}
          </Button>
          <Button
            onClick={() => setActiveTab('processing')}
            variant={activeTab === 'processing' ? 'default' : 'outline'}
            className={activeTab === 'processing' ? 'bg-[#007BFF] text-white' : 'bg-transparent border-[#007BFF] text-[#007BFF]'}
          >
            В работе
          </Button>
          <Button
            onClick={() => setActiveTab('completed')}
            variant={activeTab === 'completed' ? 'default' : 'outline'}
            className={activeTab === 'completed' ? 'bg-[#007BFF] text-white' : 'bg-transparent border-[#007BFF] text-[#007BFF]'}
          >
            Выполнены
          </Button>
        </div>

        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <Card key={order.id} className="bg-[#1A1A1A] border-[#333]">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-[#007BFF] font-bold text-lg">{order.id}</h3>
                    <p className="text-[#E0E0E0] text-sm">{order.date}</p>
                  </div>
                  <p className="text-white font-bold text-xl">{order.total}</p>
                </div>

                <div className="space-y-2 mb-3">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded" />
                      <div className="flex-1">
                        <p className="text-white text-sm">{item.name}</p>
                        <p className="text-[#007BFF] text-xs">{item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[#E0E0E0] text-sm">Статус</span>
                    <span className="text-[#007BFF] text-sm font-medium">{order.progress}%</span>
                  </div>
                  <Progress value={order.progress} className="h-2 bg-[#2A2A2A]" />
                </div>

                {order.status === 'processing' && (
                  <Button className="w-full mt-4 bg-[#007BFF] hover:bg-[#0056B3] text-white">
                    Подтвердить выполнение
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}

          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <p className="text-[#888] text-lg">Нет заказов в этом статусе</p>
            </div>
          )}
        </div>
      </main>

      <Navigation />
    </div>
  );
};

export default Orders;