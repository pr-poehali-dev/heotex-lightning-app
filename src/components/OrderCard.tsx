import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

interface OrderItem {
  name: string;
  price: string;
  image: string;
}

interface OrderCardProps {
  id: string;
  date: string;
  total: string;
  items: OrderItem[];
  status: 'new' | 'processing' | 'completed';
  progress: number;
  onConfirm?: () => void;
}

const OrderCard: React.FC<OrderCardProps> = ({ 
  id, 
  date, 
  total, 
  items, 
  status, 
  progress,
  onConfirm 
}) => {
  return (
    <Card className="bg-[#1A1A1A] border-[#333] hover:border-[#007BFF] transition-all duration-300">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-[#007BFF] font-bold text-lg">{id}</h3>
            <p className="text-[#E0E0E0] text-sm">{date}</p>
          </div>
          <p className="text-white font-bold text-xl">{total}</p>
        </div>

        <div className="space-y-2 mb-3">
          {items.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-10 h-10 object-cover rounded" 
              />
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
            <span className="text-[#007BFF] text-sm font-medium">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2 bg-[#2A2A2A]" />
        </div>

        {status === 'processing' && onConfirm && (
          <Button 
            onClick={onConfirm}
            className="w-full mt-4 bg-[#007BFF] hover:bg-[#0056B3] text-white"
          >
            Подтвердить выполнение
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default OrderCard;
