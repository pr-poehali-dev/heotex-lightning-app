import React, { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'users' | 'products' | 'analytics' | 'settings' | 'logs'>('users');
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const users = [
    { id: 1, name: 'Иван Петров', role: 'Клиент', status: 'active' },
    { id: 2, name: 'Мария Сидорова', role: 'Менеджер', status: 'active' },
    { id: 3, name: 'Алексей Смирнов', role: 'Владелец', status: 'active' },
    { id: 4, name: 'Елена Кузнецова', role: 'Клиент', status: 'blocked' }
  ];

  const logs = [
    { id: 1, user: 'Иван Петров', action: 'Оформил заказ #1247', date: '05.11.2025 14:32' },
    { id: 2, user: 'Admin', action: 'Добавил товар "Молоко 3.2%"', date: '05.11.2025 13:15' },
    { id: 3, user: 'Мария Сидорова', action: 'Обновила статус заказа #1246', date: '05.11.2025 12:48' }
  ];

  return (
    <div className="min-h-screen bg-[#121212]">
      <header className="bg-[#1A1A1A] border-b border-[#333] px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00BFFF] to-[#007BFF] flex items-center justify-center shadow-[0_0_15px_rgba(0,191,255,0.4)]">
            <Icon name="Home" size={20} className="text-white" />
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-[#00BFFF] to-[#007BFF] bg-clip-text text-transparent">
            Next Door Admin
          </h1>
        </div>

        <Avatar className="w-10 h-10 cursor-pointer">
          <AvatarFallback className="bg-gradient-to-br from-[#007BFF] to-[#003D80] text-white font-bold">
            АС
          </AvatarFallback>
        </Avatar>
      </header>

      <div className="flex">
        <aside className="w-64 bg-[#1A1A1A] border-r border-[#333] min-h-[calc(100vh-73px)] p-4">
          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab('users')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === 'users'
                  ? 'bg-[#00BFFF]/20 text-[#00BFFF] shadow-[0_0_10px_rgba(0,191,255,0.2)]'
                  : 'text-[#E0E0E0] hover:bg-[#2A2A2A]'
              }`}
            >
              <Icon name="Users" size={20} />
              <span className="font-medium">Пользователи</span>
            </button>

            <button
              onClick={() => setActiveTab('products')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === 'products'
                  ? 'bg-[#00BFFF]/20 text-[#00BFFF] shadow-[0_0_10px_rgba(0,191,255,0.2)]'
                  : 'text-[#E0E0E0] hover:bg-[#2A2A2A]'
              }`}
            >
              <Icon name="Package" size={20} />
              <span className="font-medium">Товары</span>
            </button>

            <button
              onClick={() => setActiveTab('analytics')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === 'analytics'
                  ? 'bg-[#00BFFF]/20 text-[#00BFFF] shadow-[0_0_10px_rgba(0,191,255,0.2)]'
                  : 'text-[#E0E0E0] hover:bg-[#2A2A2A]'
              }`}
            >
              <Icon name="BarChart3" size={20} />
              <span className="font-medium">Аналитика</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === 'settings'
                  ? 'bg-[#00BFFF]/20 text-[#00BFFF] shadow-[0_0_10px_rgba(0,191,255,0.2)]'
                  : 'text-[#E0E0E0] hover:bg-[#2A2A2A]'
              }`}
            >
              <Icon name="Settings" size={20} />
              <span className="font-medium">Настройки</span>
            </button>

            <button
              onClick={() => setActiveTab('logs')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === 'logs'
                  ? 'bg-[#00BFFF]/20 text-[#00BFFF] shadow-[0_0_10px_rgba(0,191,255,0.2)]'
                  : 'text-[#E0E0E0] hover:bg-[#2A2A2A]'
              }`}
            >
              <Icon name="FileText" size={20} />
              <span className="font-medium">Логи системы</span>
            </button>
          </nav>

          <div className="mt-auto pt-6">
            <Button className="w-full bg-[#FF4D4D] hover:bg-[#FF3333] text-white">
              <Icon name="LogOut" size={18} className="mr-2" />
              Выйти
            </Button>
          </div>
        </aside>

        <main className="flex-1 p-6">
          {activeTab === 'users' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Управление пользователями</h2>
                <div className="flex gap-3">
                  <Button className="bg-gradient-to-r from-[#00BFFF] to-[#007BFF] hover:shadow-[0_0_15px_rgba(0,191,255,0.4)] text-white">
                    <Icon name="Plus" size={18} className="mr-2" />
                    Добавить
                  </Button>
                </div>
              </div>

              <Card className="bg-[#1A1A1A] border-[#333]">
                <CardContent className="p-6">
                  <div className="space-y-3">
                    {users.map((user) => (
                      <div
                        key={user.id}
                        className="flex items-center justify-between p-4 bg-[#2A2A2A] rounded-lg hover:bg-[#333] transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <Avatar>
                            <AvatarFallback className="bg-gradient-to-br from-[#007BFF] to-[#003D80] text-white">
                              {user.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-white font-medium">{user.name}</p>
                            <p className="text-[#888] text-sm">{user.role}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge
                            className={
                              user.status === 'active'
                                ? 'bg-green-500/20 text-green-400 border-green-500'
                                : 'bg-red-500/20 text-red-400 border-red-500'
                            }
                          >
                            {user.status === 'active' ? 'Активен' : 'Заблокирован'}
                          </Badge>
                          <Button size="sm" variant="outline" className="border-[#00BFFF] text-[#00BFFF]">
                            <Icon name="Edit" size={16} className="mr-1" />
                            Редактировать
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'products' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Товары и категории</h2>
                <div className="flex gap-3">
                  <Button variant="outline" className="border-[#00BFFF] text-[#00BFFF]">
                    <Icon name="Upload" size={18} className="mr-2" />
                    Импорт CSV
                  </Button>
                  <Button variant="outline" className="border-[#00BFFF] text-[#00BFFF]">
                    <Icon name="Download" size={18} className="mr-2" />
                    Экспорт PDF
                  </Button>
                  <Button className="bg-gradient-to-r from-[#00BFFF] to-[#007BFF] hover:shadow-[0_0_15px_rgba(0,191,255,0.4)] text-white">
                    <Icon name="Plus" size={18} className="mr-2" />
                    Добавить товар
                  </Button>
                </div>
              </div>

              <div className="mb-4">
                <div className="relative">
                  <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#888]" />
                  <Input
                    placeholder="Поиск по названию..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-[#2A2A2A] border-[#333] focus:border-[#00BFFF] text-white placeholder:text-[#888]"
                  />
                </div>
              </div>

              <Card className="bg-[#1A1A1A] border-[#333]">
                <CardContent className="p-6">
                  <p className="text-[#888] text-center py-8">Управление товарами</p>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Аналитика</h2>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <Button variant="outline" className="border-[#00BFFF] text-[#00BFFF]">День</Button>
                <Button variant="outline" className="border-[#00BFFF] text-[#00BFFF]">Неделя</Button>
                <Button className="bg-gradient-to-r from-[#00BFFF] to-[#007BFF] text-white">Месяц</Button>
              </div>
              <Card className="bg-[#1A1A1A] border-[#333]">
                <CardContent className="p-6">
                  <p className="text-[#888] text-center py-8">Графики и статистика</p>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Настройки приложения</h2>
              <Card className="bg-[#1A1A1A] border-[#333]">
                <CardContent className="p-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">Режим обслуживания</p>
                      <p className="text-[#888] text-sm">Отключить доступ для пользователей</p>
                    </div>
                    <Switch
                      checked={maintenanceMode}
                      onCheckedChange={setMaintenanceMode}
                    />
                  </div>

                  <div className="border-t border-[#333] pt-6">
                    <h3 className="text-white font-medium mb-4">API-ключи интеграций</h3>
                    <div className="space-y-3">
                      <Input
                        placeholder="CRM API Key"
                        className="bg-[#2A2A2A] border-[#333] focus:border-[#00BFFF] text-white"
                      />
                      <Input
                        placeholder="Payment Gateway Key"
                        className="bg-[#2A2A2A] border-[#333] focus:border-[#00BFFF] text-white"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'logs' && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Логи системы (7 дней)</h2>
              <Card className="bg-[#1A1A1A] border-[#333]">
                <CardContent className="p-6">
                  <div className="space-y-3">
                    {logs.map((log) => (
                      <div key={log.id} className="p-4 bg-[#2A2A2A] rounded-lg">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-white font-medium">{log.user}</p>
                            <p className="text-[#E0E0E0] text-sm">{log.action}</p>
                          </div>
                          <p className="text-[#888] text-sm">{log.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;
