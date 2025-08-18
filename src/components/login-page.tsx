'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface LoginPageProps {
  onLogin: (username: string, password: string) => void;
  isDarkMode: boolean;
}

const AlertraLogo = (props: React.HTMLAttributes<HTMLDivElement>) => (
    <div
      className="text-4xl font-bold font-headline tracking-wider text-primary"
      {...props}
    >
      ALERTRA
    </div>
  );

export default function LoginPage({ onLogin, isDarkMode }: LoginPageProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(username, password);
  };

  const cardClasses = isDarkMode ? 'bg-[#36454F]' : 'bg-white';
  const inputBgClasses = isDarkMode ? 'bg-slate-700 border-slate-600 text-white' : 'bg-gray-100 border-gray-300 text-slate-900';
  const labelTextClasses = isDarkMode ? 'text-gray-300' : 'text-gray-700';

  return (
    <div className="min-h-screen flex items-center justify-center p-4 transition-colors duration-300">
      <div className={`w-full max-w-md p-8 space-y-8 rounded-2xl shadow-xl ${cardClasses}`}>
        <div className="text-center">
            <AlertraLogo className="mx-auto mb-4" />
            <p className={`font-semibold text-lg ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>Your Personal Health Guardian</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className={`block text-sm font-medium mb-2 ${labelTextClasses}`}>
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`block w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm ${inputBgClasses}`}
            />
          </div>
          <div>
            <label htmlFor="password" className={`block text-sm font-medium mb-2 ${labelTextClasses}`}>
              Password
            </label>
            <div className="relative">
                <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`block w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm ${inputBgClasses}`}
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                >
                    {showPassword ? <EyeOff size={20} className={isDarkMode ? 'text-slate-400' : 'text-gray-500'} /> : <Eye size={20} className={isDarkMode ? 'text-slate-400' : 'text-gray-500'} />}
                </button>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity animate-gradient-xy"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
