import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Button } from '../components/ui/button';
import { enquiryService } from '../services/api';
import { toast } from 'sonner';

const Enquiry = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await enquiryService.submit(formData);
      if (response.success) {
        toast.success('Enquiry submitted successfully! We will contact you soon.');
        setFormData({ name: '', phone: '', email: '', message: '' });
      }
    } catch (error) {
      toast.error('Failed to submit enquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen" data-testid="enquiry-page">
      {/* Header */}
      <section className="bg-indigo-950 text-white py-16 px-6 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl tracking-tighter font-bold mb-4">
              Enquiry
            </h1>
            <p className="text-lg text-slate-300 max-w-3xl">
              Have questions? We're here to help. Send us your enquiry and we'll get back to you
            </p>
          </motion.div>
        </div>
      </section>

      {/* Enquiry Form */}
      <section className="py-16 px-6 md:px-12 lg:px-16 bg-white">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="border border-slate-200 bg-slate-50 p-8 md:p-12 rounded-md">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-orange-600 text-white rounded-md flex items-center justify-center">
                  <Send className="w-7 h-7" strokeWidth={1.5} />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-indigo-950">Send Your Enquiry</h2>
                  <p className="text-sm text-slate-600">Fill out the form below and we'll respond within 24 hours</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6" data-testid="enquiry-form">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    data-testid="input-enquiry-name"
                    className="bg-white border-slate-200 focus:ring-orange-600"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    data-testid="input-enquiry-phone"
                    className="bg-white border-slate-200 focus:ring-orange-600"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    data-testid="input-enquiry-email"
                    className="bg-white border-slate-200 focus:ring-orange-600"
                  />
                </div>

                <div>
                  <Label htmlFor="message">Your Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    data-testid="input-enquiry-message"
                    className="bg-white border-slate-200 focus:ring-orange-600"
                    placeholder="Tell us about your enquiry..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  data-testid="submit-enquiry-btn"
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold px-6 py-3 rounded-md transition-all hover:-translate-y-0.5 shadow-md"
                >
                  {loading ? 'Submitting...' : 'Submit Enquiry'}
                </Button>
              </form>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12 border border-slate-200 bg-white p-8 rounded-md"
          >
            <h3 className="text-xl font-semibold text-indigo-950 mb-4">Other Ways to Reach Us</h3>
            <div className="space-y-3 text-base text-slate-600">
              <p><strong>Phone:</strong> +91-9876543210</p>
              <p><strong>Email:</strong> info@modernintercollege.com</p>
              <p><strong>Address:</strong> Samaisa, Mahul, Azamgarh, Uttar Pradesh - 276001</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Enquiry;