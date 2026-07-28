import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, Info, BookOpen, UserPlus, Users, Image, Bell, Phone, MessageSquare, Menu, X } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { motion } from 'framer-motion';

const navLinks = [
  { path: '/', label: 'Home', icon: Home, testId: 'sidebar-nav-home' },
  { path: '/about', label: 'About Us', icon: Info, testId: 'sidebar-nav-about' },
  { path: '/academics', label: 'Academics', icon: BookOpen, testId: 'sidebar-nav-academics' },
  { path: '/admissions', label: 'Admissions', icon: UserPlus, testId: 'sidebar-nav-admissions' },
  { path: '/faculty', label: 'Faculty', icon: Users, testId: 'sidebar-nav-faculty' },
  { path: '/gallery', label: 'Gallery', icon: Image, testId: 'sidebar-nav-gallery' },
  { path: '/notices', label: 'Notices', icon: Bell, testId: 'sidebar-nav-notices' },
  { path: '/contact', label: 'Contact', icon: Phone, testId: 'sidebar-nav-contact' },
  { path: '/enquiry', label: 'Enquiry', icon: MessageSquare, testId: 'sidebar-nav-enquiry' },
];

const SidebarContent = ({ onLinkClick }) => {
  const location = useLocation();

  return (
    <div className="h-full bg-[#1E1B4B] text-white flex flex-col">
      <div className="p-6 border-b border-indigo-700">
        <h2 className="text-xl font-bold text-white">Modern Public</h2>
        <p className="text-sm text-slate-300">Inter College</p>
      </div>
      
      <nav className="flex-1 py-6 space-y-2 px-4">
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.path;
          
          return (
            <Link
              key={link.path}
              to={link.path}
              data-testid={link.testId}
              onClick={onLinkClick}
              className={`flex items-center gap-3 px-4 py-3 rounded-md transition-all ${
                isActive
                  ? 'bg-indigo-800 border-l-4 border-orange-600 text-white'
                  : 'text-slate-300 hover:bg-indigo-800/50 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" strokeWidth={1.5} />
              <span className="font-medium">{link.label}</span>
            </Link>
          );
        })}
      </nav>
      
      <div className="p-6 border-t border-indigo-700">
        <Link 
          to="/teacher/login" 
          data-testid="teacher-login-link"
          className="block w-full text-center bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-md transition-colors"
        >
          Teacher Login
        </Link>
      </div>
    </div>
  );
};

const Layout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:w-72 lg:block z-50">
        <SidebarContent />
      </aside>

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 bg-[#1E1B4B] text-white z-40 px-4 py-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold">Modern Public Inter College</h2>
        </div>

        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild>
            <button 
              data-testid="mobile-menu-button"
              className="p-2 hover:bg-indigo-700 rounded-md cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </SheetTrigger>

          <SheetContent side="left" className="p-0 w-72">
            <SidebarContent onLinkClick={() => setMobileMenuOpen(false)} />
          </SheetContent>
        </Sheet>
      </header>

      {/* Main Content */}
      <main className="lg:ml-72 pt-16 lg:pt-0">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Outlet />
        </motion.div>
      </main>
    </div>
  );
};

export default Layout;