import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone } from 'lucide-react';
import { facultyService } from '../services/api';
import { toast } from 'sonner';

const Faculty = () => {
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFaculty();
  }, []);

  const fetchFaculty = async () => {
    try {
      const response = await facultyService.getAll();
      if (response.success) {
        setFaculty(response.data);
      }
    } catch (error) {
      console.error('Error fetching faculty:', error);
      toast.error('Failed to load faculty data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen" data-testid="faculty-page">
      {/* Header */}
      <section className="bg-indigo-950 text-white py-16 px-6 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl tracking-tighter font-bold mb-4">
              Our Faculty
            </h1>
            <p className="text-lg text-slate-300 max-w-3xl">
              Meet our dedicated team of experienced educators committed to student success
            </p>
          </motion.div>
        </div>
      </section>

      {/* Faculty Grid */}
      <section className="py-16 px-6 md:px-12 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="border border-slate-200 rounded-md overflow-hidden animate-pulse">
                  <div className="h-64 bg-slate-200"></div>
                  <div className="p-6 space-y-3">
                    <div className="h-6 bg-slate-200 rounded w-3/4"></div>
                    <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-testid="faculty-grid">
              {faculty.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="border border-slate-200 bg-white rounded-md overflow-hidden hover:shadow-lg transition-shadow"
                  data-testid={`faculty-card-${member.id}`}
                >
                  <div className="h-64 bg-slate-100 overflow-hidden">
                    <img
                      src={member.photoUrl || 'https://images.pexels.com/photos/5212321/pexels-photo-5212321.jpeg'}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-indigo-950 mb-1">{member.name}</h3>
                    <p className="text-sm font-medium text-orange-600 mb-3 uppercase tracking-widest">
                      {member.subject}
                    </p>
                    <p className="text-base text-slate-600 mb-4">{member.qualification}</p>
                    {member.experience && (
                      <p className="text-sm text-slate-500 mb-4">Experience: {member.experience}</p>
                    )}
                    {member.bio && (
                      <p className="text-sm text-slate-600 mb-4 italic">"{member.bio}"</p>
                    )}
                    <div className="space-y-2">
                      {member.email && (
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Mail className="w-4 h-4" strokeWidth={1.5} />
                          <span>{member.email}</span>
                        </div>
                      )}
                      {member.phone && (
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Phone className="w-4 h-4" strokeWidth={1.5} />
                          <span>{member.phone}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Faculty;