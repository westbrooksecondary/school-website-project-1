import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, MessageCircle, Building2 } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen" data-testid="about-page">
      {/* Header */}
      <section className="bg-indigo-950 text-white py-16 px-6 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl tracking-tighter font-bold mb-4">
              About Us
            </h1>
            <p className="text-lg text-slate-300 max-w-3xl">
              Learn about our rich history, vision, and commitment to educational excellence
            </p>
          </motion.div>
        </div>
      </section>

      {/* School History */}
      <section className="py-16 px-6 md:px-12 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl md:text-3xl lg:text-4xl tracking-tight font-semibold text-indigo-950 mb-6">
                Our History
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-slate-600">
                <p>
                  Established with a vision to provide quality education to the students of Azamgarh region, 
                  Modern Public Inter College has been a beacon of learning and excellence for over three decades.
                </p>
                <p>
                  From humble beginnings with just 50 students, we have grown into one of the most respected 
                  educational institutions in the area, currently serving over 1000 students from primary to 
                  higher secondary levels.
                </p>
                <p>
                  Our journey has been marked by consistent academic achievements, innovative teaching methodologies, 
                  and a strong commitment to holistic development of every student.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:sticky lg:top-24"
            >
              <img
                src="https://images.unsplash.com/photo-1758611228434-7b5b697abd0a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzNDR8MHwxfHNlYXJjaHwzfHxtb2Rlcm4lMjBzY2hvb2wlMjBidWlsZGluZyUyMGNhbXB1c3xlbnwwfHx8fDE3NzQ3MjQ0MDl8MA&ixlib=rb-4.1.0&q=85"
                alt="School Campus"
                className="w-full rounded-md border border-slate-200"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 px-6 md:px-12 lg:px-16 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="border border-slate-200 bg-white p-8 rounded-md"
            >
              <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-md flex items-center justify-center mb-6">
                <Eye className="w-7 h-7" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl md:text-2xl font-medium text-indigo-900 mb-4">Our Vision</h3>
              <p className="text-base leading-relaxed text-slate-600">
                To be a leading educational institution that nurtures young minds, fosters creativity, 
                and builds character, preparing students to become responsible global citizens and future leaders.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="border border-slate-200 bg-white p-8 rounded-md"
            >
              <div className="w-14 h-14 bg-indigo-100 text-indigo-600 rounded-md flex items-center justify-center mb-6">
                <Target className="w-7 h-7" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl md:text-2xl font-medium text-indigo-900 mb-4">Our Mission</h3>
              <p className="text-base leading-relaxed text-slate-600">
                To provide high-quality education that combines academic excellence with moral values, 
                critical thinking, and practical skills, ensuring every student reaches their full potential.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Principal's Message */}
      <section className="py-16 px-6 md:px-12 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="border border-slate-200 bg-slate-50 p-8 md:p-12 rounded-md"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-indigo-600 text-white rounded-md flex items-center justify-center">
                <MessageCircle className="w-7 h-7" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-indigo-950">Principal's Message</h3>
                <p className="text-sm text-slate-600">Dr. Ramesh Kumar Gupta</p>
              </div>
            </div>
            <div className="space-y-4 text-base leading-relaxed text-slate-600">
              <p className="italic">
                "Dear Students, Parents, and Well-wishers,"
              </p>
              <p>
                It gives me immense pleasure to welcome you to Modern Public Inter College. Our institution 
                stands as a testament to the power of dedicated education and unwavering commitment to student success.
              </p>
              <p>
                We believe that education is not just about academic excellence, but about building character, 
                developing critical thinking, and nurturing compassionate individuals who will contribute 
                positively to society.
              </p>
              <p>
                Our experienced faculty, modern infrastructure, and student-centric approach create an environment 
                where every child can thrive and discover their unique potential.
              </p>
              <p className="font-medium text-indigo-900">
                Together, let us continue our journey towards excellence.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Infrastructure */}
      <section className="py-16 px-6 md:px-12 lg:px-16 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl tracking-tight font-semibold text-indigo-950 mb-12 text-center">
              Our Infrastructure
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: Building2, title: 'Spacious Classrooms', desc: 'Well-ventilated, modern classrooms equipped with teaching aids' },
                { icon: Building2, title: 'Science Labs', desc: 'Fully equipped Physics, Chemistry, and Biology laboratories' },
                { icon: Building2, title: 'Computer Lab', desc: 'Modern computer lab with high-speed internet connectivity' },
                { icon: Building2, title: 'Library', desc: 'Extensive collection of books, journals, and digital resources' },
                { icon: Building2, title: 'Sports Facilities', desc: 'Playground, indoor games room, and sports equipment' },
                { icon: Building2, title: 'Auditorium', desc: 'Large auditorium for events, seminars, and cultural programs' },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="border border-slate-200 bg-white p-6 rounded-md"
                  >
                    <Icon className="w-8 h-8 text-orange-600 mb-4" strokeWidth={1.5} />
                    <h4 className="text-lg font-medium text-indigo-900 mb-2">{item.title}</h4>
                    <p className="text-base text-slate-600">{item.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;