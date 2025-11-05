import React, { useState } from 'react';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface Product {
  id: number;
  name: string;
  price: string;
  stock: number;
  image: string;
  status?: 'low' | 'out';
}

const Products: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'low' | 'new'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const products: Product[] = [
    { id: 1, name: 'Молоко 3.2% 1л', price: '89₽', stock: 24, image: 'https://cdn.poehali.dev/projects/4f748fcb-1eff-4c8d-8547-4a6db6814996/files/53a6557c-d186-4092-9619-6c6953e99105.jpg' },
    { id: 2, name: 'Хлеб белый', price: '45₽', stock: 3, image: 'https://cdn.poehali.dev/projects/4f748fcb-1eff-4c8d-8547-4a6db6814996/files/53a6557c-d186-4092-9619-6c6953e99105.jpg', status: 'low' },
    { id: 3, name: 'Яйца С1 10шт', price: '129₽', stock: 0, image: 'https://cdn.poehali.dev/projects/4f748fcb-1eff-4c8d-8547-4a6db6814996/files/53a6557c-d186-4092-9619-6c6953e99105.jpg', status: 'out' },
    { id: 4, name: 'Сыр российский', price: '245₽', stock: 15, image: 'https://cdn.poehali.dev/projects/4f748fcb-1eff-4c8d-8547-4a6db6814996/files/53a6557c-d186-4092-9619-6c6953e99105.jpg' },
    { id: 5, name: 'Масло сливочное', price: '189₽', stock: 8, image: 'https://cdn.poehali.dev/projects/4f748fcb-1eff-4c8d-8547-4a6db6814996/files/53a6557c-d186-4092-9619-6c6953e99105.jpg' },
    { id: 6, name: 'Йогурт натуральный', price: '67₽', stock: 2, image: 'https://cdn.poehali.dev/projects/4f748fcb-1eff-4c8d-8547-4a6db6814996/files/53a6557c-d186-4092-9619-6c6953e99105.jpg', status: 'low' }
  ];

  const filteredProducts = products.filter(p => {
    if (activeFilter === 'low' && p.status !== 'low') return false;
    if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#121212] pb-20">
      <Header notificationCount={3} />
      
      <main className="pt-20 px-4 max-w-md mx-auto">
        <div className="mb-4">
          <div className="relative">
            <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#888]" />
            <Input
              placeholder="Поиск товаров..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-[#2A2A2A] border-[#007BFF] focus:border-[#007BFF] text-white placeholder:text-[#888]"
            />
          </div>
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          <Button
            onClick={() => setActiveFilter('all')}
            variant={activeFilter === 'all' ? 'default' : 'outline'}
            className={activeFilter === 'all' ? 'bg-[#007BFF] text-white' : 'bg-transparent border-[#007BFF] text-[#007BFF]'}
          >
            Все
          </Button>
          <Button
            onClick={() => setActiveFilter('low')}
            variant={activeFilter === 'low' ? 'default' : 'outline'}
            className={activeFilter === 'low' ? 'bg-[#007BFF] text-white' : 'bg-transparent border-[#007BFF] text-[#007BFF]'}
          >
            Мало остатков
          </Button>
          <Button
            onClick={() => setActiveFilter('new')}
            variant={activeFilter === 'new' ? 'default' : 'outline'}
            className={activeFilter === 'new' ? 'bg-[#007BFF] text-white' : 'bg-transparent border-[#007BFF] text-[#007BFF]'}
          >
            Новинки
          </Button>
        </div>

        <div className="space-y-3">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="bg-[#1A1A1A] border-[#333]">
              <CardContent className="p-3 flex items-center gap-3">
                <img src={product.image} alt={product.name} className="w-20 h-20 object-cover rounded-lg" />
                
                <div className="flex-1">
                  <h3 className="text-white font-medium mb-1">{product.name}</h3>
                  <p className="text-[#007BFF] font-bold text-xl mb-1">{product.price}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-[#E0E0E0] text-sm">Остаток: {product.stock} шт</span>
                    {product.status === 'low' && (
                      <Badge className="bg-orange-500/20 text-orange-400 border-orange-500 text-xs">Мало</Badge>
                    )}
                    {product.status === 'out' && (
                      <Badge className="bg-[#FF4D4D]/20 text-[#FF4D4D] border-[#FF4D4D] text-xs">Нет</Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <button className="fixed bottom-20 right-4 w-14 h-14 rounded-full bg-[#007BFF] shadow-lg flex items-center justify-center hover:bg-[#0056B3] transition-colors z-30">
          <Icon name="Plus" size={24} className="text-white" />
        </button>
      </main>

      <Navigation />
    </div>
  );
};

export default Products;
