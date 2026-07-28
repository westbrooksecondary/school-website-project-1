import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Message sent! We will get back to you soon.');
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Address',
      content: 'Modern Public Inter College\nSamaisa, Mahul\nAzamgarh, Uttar Pradesh - 276001',
    },
    {
      icon: Phone,
      title: 'Phone',
      content: '+91-9876543210\n+91-9876543211',
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'info@modernintercollege.com\nadmissions@modernintercollege.com',
    },
    {
      icon: Clock,
      title: 'Office Hours',
      content: 'Monday - Friday: 9:00 AM - 5:00 PM\nSaturday: 9:00 AM - 2:00 PM',
    },
  ];

  return (
    <div className="min-h-screen" data-testid="contact-page">
      {/* Header */}
      <section className="bg-indigo-950 text-white py-16 px-6 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl tracking-tighter font-bold mb-4">
              Contact Us
            </h1>
            <p className="text-lg text-slate-300 max-w-3xl">
              Get in touch with us for any queries or assistance
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 px-6 md:px-12 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="border border-slate-200 bg-slate-50 p-6 rounded-md"
                  data-testid={`contact-info-${index}`}
                >
                  <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-md flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg font-semibold text-indigo-950 mb-2">{item.title}</h3>
                  <p className="text-base text-slate-600 whitespace-pre-line">{item.content}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-16 px-6 md:px-12 lg:px-16 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl md:text-3xl lg:text-4xl tracking-tight font-semibold text-indigo-950 mb-8">
                Send us a Message
              </h2>
              <div className="border border-slate-200 bg-white p-8 rounded-md">
                <form onSubmit={handleSubmit} className="space-y-6" data-testid="contact-form">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      required
                      data-testid="input-name"
                      className="bg-slate-50 border-slate-200 focus:ring-orange-600"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      data-testid="input-email"
                      className="bg-slate-50 border-slate-200 focus:ring-orange-600"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      data-testid="input-phone"
                      className="bg-slate-50 border-slate-200 focus:ring-orange-600"
                    />
                  </div>
                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      rows={5}
                      required
                      data-testid="input-message"
                      className="bg-slate-50 border-slate-200 focus:ring-orange-600"
                    />
                  </div>
                  <Button
                    type="submit"
                    data-testid="submit-contact-btn"
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold px-6 py-3 rounded-md transition-all hover:-translate-y-0.5 shadow-md"
                  >
                    Send Message
                  </Button>
                </form>
              </div>
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl md:text-3xl lg:text-4xl tracking-tight font-semibold text-indigo-950 mb-8">
                Find Us Here
              </h2>
              <div className="border border-slate-200 bg-white rounded-md overflow-hidden h-[500px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28665.426489851963!2d83.18461!3d26.06179!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399315d5b92e31f9%3A0x9e1c3c8eacb5f9c4!2sAzamgarh%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="School Location"
                ></iframe>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;