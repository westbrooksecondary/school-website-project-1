import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, GraduationCap, Lightbulb } from 'lucide-react';

const Academics = () => {
  const classes = [
    { level: 'Primary', grades: 'Class 1 to 5', description: 'Foundation years with focus on basic literacy, numeracy, and value education' },
    { level: 'Secondary', grades: 'Class 6 to 10', description: 'Comprehensive curriculum preparing students for board examinations' },
    { level: 'Higher Secondary', grades: 'Class 11 to 12', description: 'Stream-wise education (Science, Commerce, Arts) for career preparation' },
  ];

  const subjects = [
    { stream: 'Science', subjects: ['Physics', 'Chemistry', 'Biology', 'Mathematics', 'English', 'Hindi'] },
    { stream: 'Commerce', subjects: ['Accountancy', 'Business Studies', 'Economics', 'English', 'Hindi', 'Mathematics'] },
    { stream: 'Arts', subjects: ['History', 'Geography', 'Political Science', 'Economics', 'English', 'Hindi'] },
  ];

  return (
    <div className="min-h-screen" data-testid="academics-page">
      {/* Header */}
      <section className="bg-indigo-950 text-white py-16 px-6 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl tracking-tighter font-bold mb-4">
              Academics
            </h1>
            <p className="text-lg text-slate-300 max-w-3xl">
              Excellence in education through comprehensive curriculum and innovative teaching
            </p>
          </motion.div>
        </div>
      </section>

      {/* Classes Offered */}
      <section className="py-16 px-6 md:px-12 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl tracking-tight font-semibold text-indigo-950 mb-12 text-center">
              Classes Offered
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {classes.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="border border-slate-200 bg-slate-50 p-8 rounded-md"
                  data-testid={`class-${index}`}
                >
                  <div className="w-14 h-14 bg-indigo-100 text-indigo-600 rounded-md flex items-center justify-center mb-6">
                    <GraduationCap className="w-7 h-7" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl md:text-2xl font-semibold text-indigo-950 mb-2">{item.level}</h3>
                  <p className="text-sm font-medium text-orange-600 mb-4 uppercase tracking-widest">{item.grades}</p>
                  <p className="text-base leading-relaxed text-slate-600">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Subjects by Stream */}
      <section className="py-16 px-6 md:px-12 lg:px-16 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl tracking-tight font-semibold text-indigo-950 mb-12 text-center">
              Subjects by Stream (Class 11-12)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {subjects.map((stream, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="border border-slate-200 bg-white p-8 rounded-md"
                >
                  <h3 className="text-xl md:text-2xl font-semibold text-indigo-950 mb-6">{stream.stream}</h3>
                  <ul className="space-y-3">
                    {stream.subjects.map((subject, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-base text-slate-600">
                        <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                        {subject}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Teaching Methodology */}
      <section className="py-16 px-6 md:px-12 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl tracking-tight font-semibold text-indigo-950 mb-12 text-center">
              Our Teaching Methodology
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  icon: BookOpen,
                  title: 'Interactive Learning',
                  description: 'We employ interactive teaching methods with audio-visual aids, smart classes, and hands-on activities to make learning engaging and effective.',
                },
                {
                  icon: Lightbulb,
                  title: 'Practical Approach',
                  description: 'Emphasis on practical knowledge through lab work, projects, field trips, and real-world problem-solving to complement theoretical learning.',
                },
                {
                  icon: GraduationCap,
                  title: 'Personalized Attention',
                  description: 'Small class sizes and dedicated doubt-clearing sessions ensure every student receives individual attention and support.',
                },
                {
                  icon: BookOpen,
                  title: 'Continuous Assessment',
                  description: 'Regular tests, assignments, and assessments help track student progress and identify areas for improvement.',
                },
              ].map((method, index) => {
                const Icon = method.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="border border-slate-200 bg-slate-50 p-8 rounded-md"
                  >
                    <Icon className="w-8 h-8 text-orange-600 mb-4" strokeWidth={1.5} />
                    <h3 className="text-lg md:text-xl font-medium text-indigo-900 mb-3">{method.title}</h3>
                    <p className="text-base leading-relaxed text-slate-600">{method.description}</p>
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

export default Academics;