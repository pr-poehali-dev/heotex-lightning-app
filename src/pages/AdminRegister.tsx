import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import Icon from '@/components/ui/icon';

const AdminRegister: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [inviteToken, setInviteToken] = useState('');
  const [isValidToken, setIsValidToken] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      setInviteToken(token);
      setIsValidToken(true);
    }
  }, [searchParams]);

  const isPasswordStrong = () => {
    const password = formData.password;
    return (
      password.length >= 12 &&
      /[0-9]/.test(password) &&
      /[a-zA-Z]/.test(password) &&
      /[!@#$%^&*]/.test(password)
    );
  };

  const getPasswordStrength = () => {
    const password = formData.password;
    if (password.length === 0) return { text: '', color: '' };
    
    let strength = 0;
    if (password.length >= 12) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/[!@#$%^&*]/.test(password)) strength++;

    if (strength <= 1) return { text: 'Слабый', color: 'text-red-500' };
    if (strength === 2) return { text: 'Средний', color: 'text-yellow-500' };
    if (strength === 3) return { text: 'Хороший', color: 'text-green-500' };
    return { text: 'Отличный', color: 'text-green-400' };
  };

  const passwordsMatch = formData.password === formData.confirmPassword && formData.confirmPassword.length > 0;
  const passwordStrength = getPasswordStrength();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isValidToken) {
      alert('Недействительная пригласительная ссылка');
      return;
    }

    if (isPasswordStrong() && passwordsMatch && agreedToTerms) {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', formData.email);
      localStorage.setItem('userRole', 'owner');
      
      navigate('/admin');
    }
  };

  if (!isValidToken) {
    return (
      <div className="min-h-screen bg-[#121212] flex items-center justify-center px-4">
        <div className="text-center">
          <Icon name="AlertCircle" size={64} className="text-[#FF4D4D] mx-auto mb-4" />
          <h2 className="text-white text-2xl font-bold mb-2">Доступ запрещён</h2>
          <p className="text-[#E0E0E0] mb-6">Регистрация доступна только по пригласительной ссылке</p>
          <Button onClick={() => navigate('/login')} className="bg-[#00BFFF] hover:bg-[#007BFF]">
            Вернуться к входу
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212] px-4 py-8">
      <div className="w-full max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-14 h-16 rounded-xl bg-gradient-to-br from-[#007BFF] to-[#003D80] flex items-center justify-center shadow-[0_0_30px_rgba(0,191,255,0.6)]">
              <Icon name="Crown" size={32} className="text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Регистрация главного администратора</h1>
          <p className="text-[#E0E0E0] text-sm">Заполните все поля для создания аккаунта владельца</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[#E0E0E0] text-sm block mb-2">Полное имя</label>
            <Input
              type="text"
              placeholder="Иван Иванов"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              required
              className="h-12 bg-[#2A2A2A] border-[#333] focus:border-[#00BFFF] text-white placeholder:text-[#888]"
            />
          </div>

          <div>
            <label className="text-[#E0E0E0] text-sm block mb-2">Рабочий email</label>
            <Input
              type="email"
              placeholder="admin@nextdoor.ru"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="h-12 bg-[#2A2A2A] border-[#333] focus:border-[#00BFFF] text-white placeholder:text-[#888]"
            />
          </div>

          <div>
            <label className="text-[#E0E0E0] text-sm block mb-2">Контактный телефон</label>
            <Input
              type="tel"
              placeholder="+7 (999) 123-45-67"
              value={formData.phone}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '');
                setFormData({ ...formData, phone: value });
              }}
              required
              className="h-12 bg-[#2A2A2A] border-[#333] focus:border-[#00BFFF] text-white placeholder:text-[#888]"
            />
          </div>

          <div>
            <label className="text-[#E0E0E0] text-sm block mb-2">Пароль</label>
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Минимум 12 символов"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                className="h-12 bg-[#2A2A2A] border-[#333] focus:border-[#00BFFF] text-white placeholder:text-[#888] pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#888] hover:text-[#00BFFF]"
              >
                <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={20} />
              </button>
            </div>
            {formData.password.length > 0 && (
              <div className="mt-2">
                <p className={`text-sm ${passwordStrength.color}`}>
                  Прочность пароля: {passwordStrength.text}
                </p>
                <p className="text-xs text-[#888] mt-1">
                  Требования: 12+ символов, цифры, буквы, спецсимволы (!@#$%^&*)
                </p>
              </div>
            )}
          </div>

          <div>
            <label className="text-[#E0E0E0] text-sm block mb-2">Повторите пароль</label>
            <div className="relative">
              <Input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Повторите пароль"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
                className="h-12 bg-[#2A2A2A] border-[#333] focus:border-[#00BFFF] text-white placeholder:text-[#888] pr-12"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#888] hover:text-[#00BFFF]"
              >
                <Icon name={showConfirmPassword ? 'EyeOff' : 'Eye'} size={20} />
              </button>
            </div>
            {formData.confirmPassword.length > 0 && (
              <p className={`text-xs mt-2 ${passwordsMatch ? 'text-green-500' : 'text-red-500'}`}>
                {passwordsMatch ? '✓ Пароли совпадают' : '✗ Пароли не совпадают'}
              </p>
            )}
          </div>

          <div className="flex items-start gap-2 pt-2">
            <Checkbox
              checked={agreedToTerms}
              onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
              className="mt-1 border-[#00BFFF] data-[state=checked]:bg-[#00BFFF]"
            />
            <label className="text-sm text-[#E0E0E0]">
              Я подтверждаю права на управление магазином и принимаю{' '}
              <button type="button" className="text-[#00BFFF] hover:underline">
                условия использования
              </button>
            </label>
          </div>

          <Button
            type="submit"
            disabled={!isPasswordStrong() || !passwordsMatch || !agreedToTerms}
            className="w-full h-12 bg-gradient-to-r from-[#00BFFF] to-[#007BFF] hover:shadow-[0_0_20px_rgba(0,191,255,0.5)] text-white font-semibold disabled:opacity-50"
          >
            Завершить регистрацию
          </Button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/login')}
            className="text-[#888] text-sm hover:text-[#00BFFF]"
          >
            Вернуться к входу
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminRegister;
