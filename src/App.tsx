import React, { useState, useEffect } from 'react';
import { Palette, Image, Info, Menu, X, Mail, Phone, MapPin, ArrowLeft, Instagram, Facebook, Twitter } from 'lucide-react';
import { useLanguage } from './i18n/LanguageContext';
import { LanguageSwitch } from './components/LanguageSwitch';

const artworks = [
  {
    title: "Summer Dreams",
    year: "2024",
    technique: "Oil on Canvas",
    description: "A vibrant exploration of color and emotion, inspired by the warmth and energy of summer afternoons.",
    dimensions: "100x80 cm",
    image: "https://images.unsplash.com/photo-1580136579312-94651dfd596d?auto=format&fit=crop&q=80"
  },
  {
    title: "Urban Rhythms",
    year: "2023",
    technique: "Acrylic",
    description: "An abstract interpretation of city life, capturing the dynamic energy of urban spaces.",
    dimensions: "90x70 cm",
    image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&q=80"
  },
  {
    title: "Abstract Flow",
    year: "2024",
    technique: "Mixed Media",
    description: "A fluid composition exploring the boundaries between form and chaos.",
    dimensions: "120x100 cm",
    image: "https://images.unsplash.com/photo-1576769267415-9642010aa962?auto=format&fit=crop&q=80"
  }
];

const exhibitions = [
  {
    title: "Contemporary Visions 2024",
    date: "March 15 - April 30, 2024",
    location: "Modern Art Space, Kyiv",
    status: "upcoming",
    description: "A solo exhibition featuring new works exploring themes of nature and urban life.",
    image: "https://images.unsplash.com/photo-1577720580479-7d839d829c73?auto=format&fit=crop&q=80"
  },
  {
    title: "Abstract Perspectives",
    date: "November 1 - December 15, 2023",
    location: "Gallery White Space, Kyiv",
    status: "past",
    description: "A group exhibition featuring contemporary abstract artists from Ukraine.",
    image: "https://images.unsplash.com/photo-1577083552431-6e5fd01988ec?auto=format&fit=crop&q=80"
  },
  {
    title: "Summer Collection",
    date: "June 1 - July 30, 2023",
    location: "Art Hub Gallery, Lviv",
    status: "past",
    description: "A seasonal showcase of new works inspired by Ukrainian summers.",
    image: "https://images.unsplash.com/photo-1577083552925-2c1398fdaf86?auto=format&fit=crop&q=80"
  }
];

export default function App() {
  const { t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedArtwork, setSelectedArtwork] = useState<null | typeof artworks[0]>(null);
  const [currentPage, setCurrentPage] = useState<'home' | 'about' | 'works' | 'gallery'>('home');

  useEffect(() => {
    const handleScroll = () => {
      const reveals = document.querySelectorAll('.reveal');
      reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < windowHeight - 100) {
          element.classList.add('active');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (page: 'home' | 'about' | 'works' | 'gallery') => {
    setCurrentPage(page);
    setSelectedArtwork(null);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderWorks = () => (
    <div className="reveal py-16 px-8 md:px-16">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-light mb-16 text-center">{t('works.allWorks')}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          {artworks.map((artwork, index) => (
            <div 
              key={index}
              className="group cursor-pointer transform hover:-translate-y-2 transition-all duration-300"
              onClick={() => setSelectedArtwork(artwork)}
            >
              <div className="relative overflow-hidden aspect-[4/5] mb-6">
                <img
                  src={artwork.image}
                  alt={artwork.title}
                  className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-light group-hover:text-gray-600 transition-colors">
                  {artwork.title}
                </h3>
                <p className="text-gray-500">{artwork.technique}, {artwork.dimensions}</p>
                <p className="text-sm text-gray-500">{artwork.year}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderGallery = () => (
    <div className="reveal">
      <div className="relative h-[60vh] mb-24">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1577083552431-6e5fd01988ec?auto=format&fit=crop&q=80"
            alt="Gallery space"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center text-white">
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-light">{t('gallery.exhibitions')}</h1>
            <p className="text-xl text-gray-200">{t('gallery.showsSubtitle')}</p>
          </div>
        </div>
      </div>

      <div className="px-8 md:px-16 max-w-7xl mx-auto mb-24 reveal">
        <h2 className="text-3xl font-light mb-16">{t('gallery.upcomingExhibitions')}</h2>
        {exhibitions
          .filter(ex => ex.status === 'upcoming')
          .map((exhibition, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={exhibition.image}
                  alt={exhibition.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-2xl font-light">{exhibition.title}</h3>
                  <p className="text-gray-600">{exhibition.date}</p>
                  <p className="text-gray-500">{exhibition.location}</p>
                </div>
                <p className="text-gray-600 leading-relaxed">{exhibition.description}</p>
                <button className="px-8 py-3 border border-black text-sm tracking-wider hover:bg-black hover:text-white transition-colors duration-300">
                  {t('gallery.learnMore')}
                </button>
              </div>
            </div>
          ))}
      </div>

      <div className="px-8 md:px-16 max-w-7xl mx-auto pb-24 reveal">
        <h2 className="text-3xl font-light mb-16">{t('gallery.pastExhibitions')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          {exhibitions
            .filter(ex => ex.status === 'past')
            .map((exhibition, index) => (
              <div key={index} className="group">
                <div className="relative overflow-hidden aspect-[4/3] mb-6">
                  <img
                    src={exhibition.image}
                    alt={exhibition.title}
                    className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-light group-hover:text-gray-600 transition-colors">
                    {exhibition.title}
                  </h3>
                  <p className="text-gray-600">{exhibition.date}</p>
                  <p className="text-gray-500">{exhibition.location}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    if (selectedArtwork) {
      return (
        <div className="reveal">
          <div className="fixed top-20 left-4 z-10">
            <button 
              onClick={() => setSelectedArtwork(null)}
              className="flex items-center space-x-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg hover:bg-white transition-colors"
            >
              <ArrowLeft size={20} />
              <span>{t('artwork.back')}</span>
            </button>
          </div>
          <div className="flex flex-col md:flex-row min-h-[calc(100vh-4rem)]">
            <div className="w-full md:w-1/2 h-[60vh] md:h-auto">
              <div className="h-full relative overflow-hidden">
                <img
                  src={selectedArtwork.image}
                  alt={selectedArtwork.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="w-full md:w-1/2 p-8 md:p-16">
              <div className="max-w-xl space-y-6">
                <div className="space-y-2">
                  <h1 className="text-4xl font-light">{selectedArtwork.title}</h1>
                  <p className="text-xl text-gray-600">{selectedArtwork.technique}, {selectedArtwork.year}</p>
                  <p className="text-gray-500">{selectedArtwork.dimensions}</p>
                </div>
                <p className="text-gray-600 leading-relaxed">{selectedArtwork.description}</p>
                <button className="px-8 py-3 border border-black text-sm tracking-wider hover:bg-black hover:text-white transition-colors duration-300">
                  {t('artwork.inquire')}
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    switch (currentPage) {
      case 'works':
        return renderWorks();
      case 'gallery':
        return renderGallery();
      case 'about':
        return (
          <div className="reveal py-16 px-8 md:px-16 max-w-4xl mx-auto">
            <h1 className="text-4xl font-light mb-8">{t('about.aboutTheArtist')}</h1>
            <div className="prose max-w-none">
              <p className="text-lg text-gray-600 mb-8">
                {t('about.bio')}
              </p>
              
              <div className="mt-12 space-y-6">
                <h2 className="text-2xl font-light">{t('about.contact')}</h2>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 text-gray-600">
                    <Mail size={20} />
                    <span>contact@gallazubko.art</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-600">
                    <Phone size={20} />
                    <span>+380 XX XXX XX XX</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-600">
                    <MapPin size={20} />
                    <span>Kyiv, Ukraine</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <>
            <div className="reveal flex flex-col md:flex-row min-h-[calc(100vh-4rem)]">
              <div className="w-full md:w-1/2 p-8 md:p-16 flex items-center">
                <div className="max-w-xl">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h2 className="text-sm tracking-wider text-gray-500">{t('home.featuredWork')}</h2>
                      <h1 className="text-4xl md:text-5xl lg:text-6xl font-light">Summer Dreams</h1>
                      <p className="text-xl text-gray-600">Oil on Canvas, 2024</p>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      A vibrant exploration of color and emotion, inspired by the warmth and energy of summer afternoons.
                    </p>
                    <button 
                      onClick={() => setSelectedArtwork(artworks[0])}
                      className="mt-8 px-8 py-3 border border-black text-sm tracking-wider hover:bg-black hover:text-white transition-colors duration-300"
                    >
                      {t('home.viewDetails')}
                    </button>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2 h-[60vh] md:h-auto">
                <div className="h-full relative overflow-hidden">
                  <img
                    src={artworks[0].image}
                    alt="Featured painting"
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>

            <div className="py-24 px-8 md:px-16 reveal">
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                  <div className="space-y-8">
                    <h2 className="text-3xl font-light">{t('home.latestExhibition')}</h2>
                    <div className="space-y-4">
                      <p className="text-xl text-gray-600">Contemporary Visions 2024</p>
                      <p className="text-gray-500">{t('home.openingReception')}: March 15, 2024</p>
                      <p className="text-gray-600 leading-relaxed">
                        Join us for an evening of art and conversation as we unveil new works exploring themes of nature, urban life, and human connection.
                      </p>
                      <button 
                        onClick={() => handleNavClick('gallery')}
                        className="px-8 py-3 border border-black text-sm tracking-wider hover:bg-black hover:text-white transition-colors duration-300"
                      >
                        {t('home.viewAllExhibitions')}
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-8">
                    {artworks.slice(0, 4).map((artwork, index) => (
                      <div 
                        key={index}
                        className="group cursor-pointer"
                        onClick={() => setSelectedArtwork(artwork)}
                      >
                        <div className="relative overflow-hidden aspect-square">
                          <img
                            src={artwork.image}
                            alt={artwork.title}
                            className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <h1 
                onClick={() => handleNavClick('home')}
                className="text-xl font-light tracking-wider cursor-pointer"
              >
                Galla Zubko
              </h1>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <NavLink icon={<Palette size={20} />} text={t('nav.works')} onClick={() => handleNavClick('works')} />
              <NavLink icon={<Image size={20} />} text={t('nav.gallery')} onClick={() => handleNavClick('gallery')} />
              <NavLink icon={<Info size={20} />} text={t('nav.about')} onClick={() => handleNavClick('about')} />
              <LanguageSwitch />
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-gray-800 hover:text-gray-600"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <MobileNavLink icon={<Palette size={20} />} text={t('nav.works')} onClick={() => handleNavClick('works')} />
              <MobileNavLink icon={<Image size={20} />} text={t('nav.gallery')} onClick={() => handleNavClick('gallery')} />
              <MobileNavLink icon={<Info size={20} />} text={t('nav.about')} onClick={() => handleNavClick('about')} />
              <div className="px-3 py-2">
                <LanguageSwitch />
              </div>
            </div>
          </div>
        )}
      </nav>

      <main className="pt-16">
        {renderContent()}
      </main>

      <footer className="bg-gray-100 py-16 px-8 md:px-16 reveal">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div>
              <h3 className="text-xl font-light mb-6">{t('footer.quickLinks')}</h3>
              <div className="space-y-3">
                <a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('works'); }} className="block text-gray-600 hover:text-gray-900">{t('nav.works')}</a>
                <a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('gallery'); }} className="block text-gray-600 hover:text-gray-900">{t('nav.gallery')}</a>
                <a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('about'); }} className="block text-gray-600 hover:text-gray-900">{t('nav.about')}</a>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-light mb-6">{t('footer.contact')}</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Mail size={18} />
                  <span>contact@gallazubko.art</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Phone size={18} />
                  <span>+380 XX XXX XX XX</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <MapPin size={18} />
                  <span>Kyiv, Ukraine</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-light mb-6">Social</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-600 hover:text-gray-900"><Instagram size={24} /></a>
                <a href="#" className="text-gray-600 hover:text-gray-900"><Facebook size={24} /></a>
                <a href="#" className="text-gray-600 hover:text-gray-900"><Twitter size={24} /></a>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-200 text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} Galla Zubko. {t('footer.rights')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function NavLink({ icon, text, onClick }: { icon: React.ReactNode; text: string; onClick: () => void }) {
  return (
    <a
      href="#"
      onClick={(e) => { e.preventDefault(); onClick(); }}
      className="flex items-center space-x-1 text-sm text-gray-800 hover:text-gray-600 transition-colors duration-200"
    >
      {icon}
      <span>{text}</span>
    </a>
  );
}

function MobileNavLink({ icon, text, onClick }: { icon: React.ReactNode; text: string; onClick: () => void }) {
  return (
    <a
      href="#"
      onClick={(e) => { e.preventDefault(); onClick(); }}
      className="flex items-center space-x-2 px-3 py-2 text-base text-gray-800 hover:bg-gray-50 rounded-md"
    >
      {icon}
      <span>{text}</span>
    </a>
  );
}