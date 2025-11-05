import React, { useState } from 'react';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import OrderCard from '@/components/OrderCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

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
            <OrderCard
              key={order.id}
              id={order.id}
              date={order.date}
              total={order.total}
              items={order.items}
              status={order.status}
              progress={order.progress}
              onConfirm={() => console.log('Order confirmed:', order.id)}
            />
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