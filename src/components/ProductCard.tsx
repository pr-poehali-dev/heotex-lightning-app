import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface ProductCardProps {
  name: string;
  price: string;
  stock: number;
  image: string;
  category?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ name, price, stock, image, category }) => {
  const getStockBadge = () => {
    if (stock > 50) {
      return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">В наличии</Badge>;
    } else if (stock > 0) {
      return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Заканчивается</Badge>;
    } else {
      return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Нет в наличии</Badge>;
    }
  };

  return (
    <Card className="bg-[#1A1A1A] border-[#333] overflow-hidden hover:border-[#007BFF] transition-all duration-300 hover:shadow-lg hover:shadow-[#007BFF]/20 hover:scale-105 group">
      <CardContent className="p-0">
        <div className="relative overflow-hidden">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {category && (
            <Badge className="absolute top-2 right-2 bg-[#007BFF]/90 text-white border-none">
              {category}
            </Badge>
          )}
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-white font-semibold text-lg flex-1">{name}</h3>
            <button className="text-[#007BFF] hover:text-[#0056B3] transition-colors">
              <Icon name="Edit" size={18} />
            </button>
          </div>
          
          <div className="flex justify-between items-center mb-3">
            <span className="text-[#007BFF] font-bold text-xl">{price}</span>
            {getStockBadge()}
          </div>
          
          <div className="flex items-center gap-2 text-[#E0E0E0] text-sm">
            <Icon name="Package" size={16} className="text-[#888]" />
            <span>Остаток: {stock} шт</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;