import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Award, Users, Building2, BookOpen, ArrowRight } from 'lucide-react';
import { noticeService } from '../services/api';

const Home = () => {
  const [latestNotices, setLatestNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLatestNotices();
  }, []);

  const fetchLatestNotices = async () => {
    try {
      const response = await noticeService.getLatest();

      if (response?.success && Array.isArray(response.data)) {
        setLatestNotices(response.data);
      } else {
        setLatestNotices([]);
      }
    } catch (error) {
      console.error('Error fetching notices:', error);
      setLatestNotices([]);
    } finally {
      setLoading(false);
    }
  };

  const highlights = [
    { icon: Award, title: '95% Pass Rate', description: 'Consistent academic excellence', color: 'bg-orange-100 text-orange-600' },
    { icon: Users, title: '50+ Teachers', description: 'Experienced faculty members', color: 'bg-indigo-100 text-indigo-600' },
    { icon: Building2, title: 'Modern Infrastructure', description: 'State-of-the-art facilities', color: 'bg-blue-100 text-blue-600' },
    { icon: BookOpen, title: 'Holistic Education', description: 'Academic & extracurricular', color: 'bg-green-100 text-green-600' },
  ];

  const testimonials = [
    {
      name: 'Rahul Sharma',
      role: 'Class XII Student',
      text: 'The teachers here are incredibly supportive. They helped me achieve my dream of getting into engineering college.',
      avatar: 'RS',
    },
    {
      name: 'Priya Singh',
      role: 'Parent',
      text: 'My daughter has shown tremendous improvement in her studies and overall personality development since joining this school.',
      avatar: 'PS',
    },
    {
      name: 'Amit Kumar',
      role: 'Alumni',
      text: 'The foundation I received here has been instrumental in my success. Forever grateful to my teachers.',
      avatar: 'AK',
    },
  ];

  return (
    <div className="min-h-screen" data-testid="home-page">
      
      {/* Hero Section */}
      <section
        className="relative h-[600px] flex items-center justify-center"
        style={{
          backgroundImage: `url(https://static.prod-images.emergentagent.com/jobs/17e4a968-4874-48c0-8afa-781fc5997026/images/ce473e7d7f8b82a4d712f9534fb271ab644a1aa1ac36589fa34fd7167bdc8155.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-indigo-950/60"></div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center text-white px-6"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Modern Public Inter College
          </h1>

          <p className="text-xl text-slate-200 mb-2">
            Samaisa, Mahul, Azamgarh, Uttar Pradesh
          </p>

          <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
            Empowering students with knowledge, values, and skills for a brighter future
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              to="/admissions"
              className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-bold px-6 py-3 rounded-md transition-all"
            >
              Apply for Admission
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-white text-indigo-950 font-bold px-6 py-3 rounded-md hover:bg-slate-100"
            >
              Contact Us
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Highlights */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-semibold text-indigo-950 mb-12 text-center">
            Why Choose Us
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {highlights.map((h, i) => {
              const Icon = h.icon;
              return (
                <div key={i} className="border p-6 rounded-md">
                  <div className={`w-14 h-14 ${h.color} flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-medium">{h.title}</h3>
                  <p className="text-slate-600">{h.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Notices */}
      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">

          <div className="flex justify-between mb-8">
            <h2 className="text-3xl font-semibold text-indigo-950">
              Latest Notices
            </h2>

            <Link to="/notices" className="text-orange-600 flex items-center gap-2">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {loading ? (
            <p>Loading...</p>
          ) : latestNotices.length === 0 ? (
            <p className="text-center text-slate-500">No notices available</p>
          ) : (
            latestNotices.map((notice) => (
              <div key={notice.id} className="bg-white p-4 rounded-md mb-4">
                <h3 className="font-medium">{notice.title}</h3>

                <p className="text-sm text-slate-500">
                  {notice.noticeDate
                    ? new Date(notice.noticeDate).toLocaleDateString()
                    : 'No Date'}
                </p>

                <p>{notice.content}</p>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl text-center mb-10">What People Say</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-slate-50 p-6 rounded-md">
                <h4 className="font-semibold">{t.name}</h4>
                <p className="text-sm">{t.role}</p>
                <p className="italic mt-2">"{t.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;