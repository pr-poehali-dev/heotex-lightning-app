import React from 'react';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import Icon from '@/components/ui/icon';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Analytics: React.FC = () => {
  const monthData = [
    { day: 1, value: 45 },
    { day: 5, value: 62 },
    { day: 10, value: 58 },
    { day: 15, value: 78 },
    { day: 20, value: 85 },
    { day: 25, value: 92 },
    { day: 30, value: 88 }
  ];

  const categoryData = [
    { name: 'Молочные', margin: 85, color: '#007BFF' },
    { name: 'Хлеб', margin: 65, color: '#0056B3' },
    { name: 'Яйца', margin: 92, color: '#003D80' },
    { name: 'Сыры', margin: 78, color: '#00BFFF' }
  ];

  const maxValue = Math.max(...monthData.map(d => d.value));
  const maxMargin = Math.max(...categoryData.map(d => d.margin));

  return (
    <div className="min-h-screen bg-[#121212] pb-20">
      <Header notificationCount={3} />
      
      <main className="pt-20 px-4 max-w-md mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-white text-2xl font-bold">Аналитика</h1>
          <Button variant="outline" size="icon" className="border-[#007BFF] text-[#007BFF]">
            <Icon name="FileText" size={20} />
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="bg-gradient-to-br from-[#007BFF] to-[#0056B3] border-none">
            <CardContent className="p-4">
              <p className="text-white/80 text-sm mb-1">Средняя выручка/день</p>
              <p className="text-white text-3xl font-bold">18 450₽</p>
            </CardContent>
          </Card>

          <Card className="bg-[#1A1A1A] border-[#333]">
            <CardContent className="p-4">
              <p className="text-[#E0E0E0] text-sm mb-1">Рост к прошлому месяцу</p>
              <p className="text-green-400 text-3xl font-bold">+12%</p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-[#1A1A1A] border-[#333] mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-white text-lg font-semibold flex items-center gap-2">
              <Icon name="TrendingUp" size={20} className="text-[#007BFF]" />
              Продажи за месяц
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 relative">
              <svg className="w-full h-full" viewBox="0 0 300 180">
                <defs>
                  <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#007BFF" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#007BFF" stopOpacity="0.05" />
                  </linearGradient>
                </defs>
                
                {monthData.map((point, i) => {
                  const x = (point.day / 30) * 280 + 10;
                  const y = 170 - (point.value / maxValue) * 150;
                  const nextPoint = monthData[i + 1];
                  const nextX = nextPoint ? (nextPoint.day / 30) * 280 + 10 : x;
                  const nextY = nextPoint ? 170 - (nextPoint.value / maxValue) * 150 : y;
                  
                  return (
                    <g key={i}>
                      {i < monthData.length - 1 && (
                        <line
                          x1={x}
                          y1={y}
                          x2={nextX}
                          y2={nextY}
                          stroke="#007BFF"
                          strokeWidth="3"
                        />
                      )}
                      <circle cx={x} cy={y} r="4" fill="#007BFF" />
                    </g>
                  );
                })}
                
                <polygon
                  points={`10,170 ${monthData.map((p, i) => {
                    const x = (p.day / 30) * 280 + 10;
                    const y = 170 - (p.value / maxValue) * 150;
                    return `${x},${y}`;
                  }).join(' ')} ${(monthData[monthData.length - 1].day / 30) * 280 + 10},170`}
                  fill="url(#chartGradient)"
                />
                
                <line x1="10" y1="10" x2="10" y2="170" stroke="#333" strokeWidth="1" />
                <line x1="10" y1="170" x2="290" y2="170" stroke="#333" strokeWidth="1" />
              </svg>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#1A1A1A] border-[#333]">
          <CardHeader className="pb-3">
            <CardTitle className="text-white text-lg font-semibold flex items-center gap-2">
              <Icon name="BarChart3" size={20} className="text-[#007BFF]" />
              Маржа по категориям
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categoryData.map((category, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white text-sm font-medium">{category.name}</span>
                    <span className="text-[#007BFF] text-sm font-bold">{category.margin}%</span>
                  </div>
                  <div className="h-8 bg-[#2A2A2A] rounded-lg overflow-hidden">
                    <div
                      className="h-full rounded-lg transition-all duration-500"
                      style={{
                        width: `${(category.margin / maxMargin) * 100}%`,
                        backgroundColor: category.color
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>

      <Navigation />
    </div>
  );
};

export default Analytics;
