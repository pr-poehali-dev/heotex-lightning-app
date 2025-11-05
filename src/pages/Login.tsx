import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00BFFF] to-[#007BFF] flex items-center justify-center shadow-[0_0_20px_rgba(0,191,255,0.4)]">
              <Icon name="Home" size={24} className="text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#00BFFF] to-[#007BFF] bg-clip-text text-transparent">
              Next Door
            </h1>
          </div>
          <p className="text-[#E0E0E0] text-sm">Войдите в свой аккаунт</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <Input
              type="text"
              placeholder="Телефон или email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 bg-[#2A2A2A] border-[#333] focus:border-[#00BFFF] focus:shadow-[0_0_10px_rgba(0,191,255,0.3)] text-white placeholder:text-[#888] transition-all"
            />
          </div>

          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 bg-[#2A2A2A] border-[#333] focus:border-[#00BFFF] focus:shadow-[0_0_10px_rgba(0,191,255,0.3)] text-white placeholder:text-[#888] pr-12 transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#888] hover:text-[#00BFFF] transition-colors"
            >
              <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={20} />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Checkbox
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                className="border-[#00BFFF] data-[state=checked]:bg-[#00BFFF] data-[state=checked]:border-[#00BFFF]"
              />
              <label className="text-sm text-[#E0E0E0] cursor-pointer select-none">
                Запомнить меня
              </label>
            </div>
            <button type="button" className="text-sm text-[#00BFFF] hover:underline">
              Забыли пароль?
            </button>
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-gradient-to-r from-[#00BFFF] to-[#007BFF] hover:shadow-[0_0_20px_rgba(0,191,255,0.5)] text-white font-semibold transition-all"
          >
            Войти
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#333]"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-[#121212] text-[#888]">или</span>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              type="button"
              variant="outline"
              className="w-full h-12 bg-transparent border-[#00BFFF] text-white hover:bg-[#00BFFF]/10 hover:shadow-[0_0_15px_rgba(0,191,255,0.3)] transition-all"
            >
              <Icon name="Mail" size={20} className="mr-2" />
              Войти через Google
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full h-12 bg-transparent border-[#00BFFF] text-white hover:bg-[#00BFFF]/10 hover:shadow-[0_0_15px_rgba(0,191,255,0.3)] transition-all"
            >
              <Icon name="Apple" size={20} className="mr-2" />
              Войти через Apple
            </Button>
          </div>
        </form>

        <div className="mt-8 text-center">
          <p className="text-[#E0E0E0] text-sm">
            Нет аккаунта?{' '}
            <button
              onClick={() => navigate('/register')}
              className="text-[#00BFFF] font-semibold hover:underline"
            >
              Зарегистрироваться
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
