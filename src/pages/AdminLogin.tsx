import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState<'credentials' | '2fa'>('credentials');
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);

  const handleCredentialsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Заполните все поля');
      return;
    }

    if (attempts >= 3) {
      setIsBlocked(true);
      setError('Превышено количество попыток. Попробуйте через 5 минут');
      setTimeout(() => {
        setIsBlocked(false);
        setAttempts(0);
      }, 300000);
      return;
    }

    setStep('2fa');
    setError('');
  };

  const handle2FASubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (twoFactorCode.length !== 6) {
      setError('Введите 6-значный код');
      setAttempts(prev => prev + 1);
      return;
    }

    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userRole', 'admin');
    
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-14 h-16 rounded-xl bg-gradient-to-br from-[#007BFF] to-[#003D80] flex items-center justify-center shadow-[0_0_30px_rgba(0,191,255,0.6)]">
              <Icon name="ShieldCheck" size={32} className="text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#00BFFF] to-[#007BFF] bg-clip-text text-transparent">
              Next Door Admin
            </h1>
          </div>
          <p className="text-[#E0E0E0]">Вход для администратора</p>
        </div>

        {step === 'credentials' ? (
          <form onSubmit={handleCredentialsSubmit} className="space-y-5">
            <div>
              <Input
                type="email"
                placeholder="Email администратора"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
                disabled={isBlocked}
                className="bg-[#2A2A2A] border-[#333] focus:border-[#00BFFF] text-white placeholder:text-[#888] h-12"
              />
            </div>

            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Пароль"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                disabled={isBlocked}
                className="bg-[#2A2A2A] border-[#333] focus:border-[#00BFFF] text-white placeholder:text-[#888] h-12 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#888] hover:text-[#00BFFF] transition-colors"
              >
                <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={20} />
              </button>
            </div>

            {error && (
              <p className="text-[#FF4D4D] text-sm">{error}</p>
            )}

            <Button
              type="submit"
              disabled={isBlocked}
              className="w-full bg-[#00BFFF] hover:bg-[#007BFF] text-white h-12 text-base font-semibold shadow-lg shadow-[#00BFFF]/30 transition-all disabled:opacity-50"
            >
              Продолжить
            </Button>

            <div className="text-center">
              <Link to="/admin/reset" className="text-[#00BFFF] text-sm hover:underline">
                Восстановить доступ
              </Link>
            </div>
          </form>
        ) : (
          <form onSubmit={handle2FASubmit} className="space-y-5">
            <div className="bg-[#1A1A1A] border border-[#333] rounded-lg p-4 mb-4">
              <div className="flex items-center gap-3 mb-2">
                <Icon name="Smartphone" size={20} className="text-[#00BFFF]" />
                <p className="text-white font-semibold">Двухэтапная проверка</p>
              </div>
              <p className="text-[#E0E0E0] text-sm">
                Введите код из приложения Google Authenticator или из SMS
              </p>
            </div>

            <div>
              <Input
                type="text"
                placeholder="6-значный код"
                value={twoFactorCode}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                  setTwoFactorCode(value);
                  setError('');
                }}
                maxLength={6}
                className="bg-[#2A2A2A] border-[#333] focus:border-[#00BFFF] text-white placeholder:text-[#888] h-12 text-center text-2xl tracking-widest"
              />
            </div>

            {error && (
              <p className="text-[#FF4D4D] text-sm">{error}</p>
            )}

            <Button
              type="submit"
              className="w-full bg-[#00BFFF] hover:bg-[#007BFF] text-white h-12 text-base font-semibold shadow-lg shadow-[#00BFFF]/30 transition-all"
            >
              Войти
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setStep('credentials');
                setTwoFactorCode('');
                setError('');
              }}
              className="w-full border-[#333] text-white hover:bg-[#2A2A2A] h-12"
            >
              Назад
            </Button>
          </form>
        )}

        <div className="mt-6 text-center">
          <Link to="/login" className="text-[#888] text-sm hover:text-[#00BFFF] transition-colors">
            Вернуться к входу клиентов
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
