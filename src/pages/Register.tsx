import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const isPasswordValid = formData.password.length >= 8;
  const passwordsMatch = formData.password === formData.confirmPassword && formData.confirmPassword.length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isPasswordValid && passwordsMatch && agreedToTerms) {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] px-4 py-8">
      <div className="w-full max-w-md mx-auto">
        <div className="mb-8">
          <button
            onClick={() => navigate('/login')}
            className="flex items-center gap-2 text-[#00BFFF] hover:text-[#007BFF] transition-colors mb-6"
          >
            <Icon name="ArrowLeft" size={20} />
            <span>Назад</span>
          </button>

          <div className="text-center mb-2">
            <h1 className="text-2xl font-bold text-white mb-2">Создайте аккаунт</h1>
            <p className="text-[#E0E0E0] text-sm">Заполните данные для регистрации</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="text"
              placeholder="Имя"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="h-12 bg-[#2A2A2A] border-[#333] focus:border-[#00BFFF] focus:shadow-[0_0_10px_rgba(0,191,255,0.3)] text-white placeholder:text-[#888] transition-all"
            />
          </div>

          <div>
            <Input
              type="text"
              placeholder="Телефон или email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="h-12 bg-[#2A2A2A] border-[#333] focus:border-[#00BFFF] focus:shadow-[0_0_10px_rgba(0,191,255,0.3)] text-white placeholder:text-[#888] transition-all"
            />
          </div>

          <div>
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Пароль"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className={`h-12 bg-[#2A2A2A] border-[#333] focus:shadow-[0_0_10px_rgba(0,191,255,0.3)] text-white placeholder:text-[#888] pr-12 transition-all ${
                  isPasswordValid ? 'border-green-500 focus:border-green-500' : 'focus:border-[#00BFFF]'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#888] hover:text-[#00BFFF] transition-colors"
              >
                <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={20} />
              </button>
            </div>
            <p className={`text-xs mt-2 transition-colors ${isPasswordValid ? 'text-green-500' : 'text-[#888]'}`}>
              {isPasswordValid ? '✓ ' : ''}Минимум 8 символов
            </p>
          </div>

          <div>
            <div className="relative">
              <Input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Повторите пароль"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className={`h-12 bg-[#2A2A2A] border-[#333] focus:shadow-[0_0_10px_rgba(0,191,255,0.3)] text-white placeholder:text-[#888] pr-12 transition-all ${
                  passwordsMatch ? 'border-green-500 focus:border-green-500' : 'focus:border-[#00BFFF]'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#888] hover:text-[#00BFFF] transition-colors"
              >
                <Icon name={showConfirmPassword ? 'EyeOff' : 'Eye'} size={20} />
              </button>
            </div>
            {formData.confirmPassword.length > 0 && (
              <p className={`text-xs mt-2 transition-colors ${passwordsMatch ? 'text-green-500' : 'text-red-500'}`}>
                {passwordsMatch ? '✓ Пароли совпадают' : '✗ Пароли не совпадают'}
              </p>
            )}
          </div>

          <div className="flex items-start gap-2 pt-2">
            <Checkbox
              checked={agreedToTerms}
              onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
              className="mt-1 border-[#00BFFF] data-[state=checked]:bg-[#00BFFF] data-[state=checked]:border-[#00BFFF]"
            />
            <label className="text-sm text-[#E0E0E0] cursor-pointer select-none">
              Согласен с{' '}
              <button type="button" className="text-[#00BFFF] hover:underline">
                условиями использования
              </button>
            </label>
          </div>

          <Button
            type="submit"
            disabled={!isPasswordValid || !passwordsMatch || !agreedToTerms}
            className="w-full h-12 bg-gradient-to-r from-[#00BFFF] to-[#007BFF] hover:shadow-[0_0_20px_rgba(0,191,255,0.5)] text-white font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
          >
            Зарегистрироваться
          </Button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-[#E0E0E0] text-sm">
            Уже есть аккаунт?{' '}
            <button
              onClick={() => navigate('/login')}
              className="text-[#00BFFF] font-semibold hover:underline"
            >
              Войти
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
