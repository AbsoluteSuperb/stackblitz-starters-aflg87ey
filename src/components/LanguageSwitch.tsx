import { Globe } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export function LanguageSwitch() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="relative inline-flex items-center">
      <Globe size={20} className="absolute left-3 text-gray-500" />
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as 'en' | 'uk')}
        className="appearance-none pl-10 pr-8 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm font-medium 
                 cursor-pointer hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 
                 focus:ring-gray-200 focus:border-gray-300"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236B7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 0.5rem center',
          backgroundSize: '1.5em 1.5em'
        }}
      >
        <option value="en">English</option>
        <option value="uk">Українська</option>
      </select>
    </div>
  );
}