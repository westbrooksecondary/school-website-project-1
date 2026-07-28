import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, FileText, DollarSign, Calendar } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Textarea } from '../components/ui/textarea';
import { admissionService } from '../services/api';
import { toast } from 'sonner';

const Admissions = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    studentName: '',
    fatherName: '',
    motherName: '',
    dateOfBirth: '',
    gender: '',
    classApplied: '',
    previousSchool: '',
    address: '',
    city: '',
    state: 'Uttar Pradesh',
    pincode: '',
    email: '',
    phone: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await admissionService.apply(formData);
      if (response.success) {
        toast.success('Application submitted successfully! We will contact you soon.');
        setFormData({
          studentName: '',
          fatherName: '',
          motherName: '',
          dateOfBirth: '',
          gender: '',
          classApplied: '',
          previousSchool: '',
          address: '',
          city: '',
          state: 'Uttar Pradesh',
          pincode: '',
          email: '',
          phone: '',
        });
      }
    } catch (error) {
      toast.error('Failed to submit application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const admissionProcess = [
    { step: 1, title: 'Fill Application', desc: 'Complete the online admission form' },
    { step: 2, title: 'Document Submission', desc: 'Submit required documents' },
    { step: 3, title: 'Interaction', desc: 'Student and parent interaction with management' },
    { step: 4, title: 'Admission Confirmation', desc: 'Fee payment and admission confirmation' },
  ];

  const feeStructure = [
    { class: 'Class 1 to 5', fee: '₹12,000/year' },
    { class: 'Class 6 to 8', fee: '₹15,000/year' },
    { class: 'Class 9 to 10', fee: '₹18,000/year' },
    { class: 'Class 11 to 12', fee: '₹20,000/year' },
  ];

  return (
    <div className="min-h-screen" data-testid="admissions-page">
      {/* Header */}
      <section className="bg-indigo-950 text-white py-16 px-6 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl tracking-tighter font-bold mb-4">
              Admissions
            </h1>
            <p className="text-lg text-slate-300 max-w-3xl">
              Join our community of learners and begin your journey towards excellence
            </p>
          </motion.div>
        </div>
      </section>

      {/* Admission Process */}
      <section className="py-16 px-6 md:px-12 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl tracking-tight font-semibold text-indigo-950 mb-12 text-center">
              Admission Process
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {admissionProcess.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="border border-slate-200 bg-slate-50 p-6 rounded-md">
                    <div className="w-12 h-12 bg-orange-600 text-white rounded-md flex items-center justify-center mb-4 font-bold text-lg">
                      {item.step}
                    </div>
                    <h3 className="text-lg font-semibold text-indigo-900 mb-2">{item.title}</h3>
                    <p className="text-base text-slate-600">{item.desc}</p>
                  </div>
                  {index < admissionProcess.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-orange-300"></div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Eligibility & Fee Structure */}
      <section className="py-16 px-6 md:px-12 lg:px-16 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl md:text-3xl lg:text-4xl tracking-tight font-semibold text-indigo-950 mb-8">
                Eligibility Criteria
              </h2>
              <div className="border border-slate-200 bg-white p-8 rounded-md">
                <ul className="space-y-4">
                  {[
                    'Age as per CBSE/UP Board norms for respective classes',
                    'Transfer certificate from previous school (for Class 2 onwards)',
                    'Birth certificate',
                    'Aadhar card of student and parents',
                    'Recent passport size photographs',
                    'Previous year mark sheets',
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-base text-slate-600">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl md:text-3xl lg:text-4xl tracking-tight font-semibold text-indigo-950 mb-8">
                Fee Structure
              </h2>
              <div className="border border-slate-200 bg-white p-8 rounded-md">
                <div className="space-y-4">
                  {feeStructure.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between pb-4 border-b border-slate-200 last:border-b-0">
                      <span className="text-base font-medium text-indigo-900">{item.class}</span>
                      <span className="text-lg font-bold text-orange-600">{item.fee}</span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-slate-600 mt-6">
                  *Fee includes tuition, sports, and library charges. Additional charges apply for transport and hostel facilities.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16 px-6 md:px-12 lg:px-16 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl tracking-tight font-semibold text-indigo-950 mb-12 text-center">
              Online Admission Form
            </h2>
            <div className="border border-slate-200 bg-slate-50 p-8 md:p-12 rounded-md">
              <form onSubmit={handleSubmit} className="space-y-6" data-testid="admission-form">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="studentName">Student Name *</Label>
                    <Input
                      id="studentName"
                      name="studentName"
                      value={formData.studentName}
                      onChange={handleChange}
                      required
                      data-testid="input-student-name"
                      className="bg-white border-slate-200 focus:ring-orange-600"
                    />
                  </div>
                  <div>
                    <Label htmlFor="fatherName">Father's Name *</Label>
                    <Input
                      id="fatherName"
                      name="fatherName"
                      value={formData.fatherName}
                      onChange={handleChange}
                      required
                      className="bg-white border-slate-200 focus:ring-orange-600"
                    />
                  </div>
                  <div>
                    <Label htmlFor="motherName">Mother's Name *</Label>
                    <Input
                      id="motherName"
                      name="motherName"
                      value={formData.motherName}
                      onChange={handleChange}
                      required
                      className="bg-white border-slate-200 focus:ring-orange-600"
                    />
                  </div>
                  <div>
                    <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                    <Input
                      id="dateOfBirth"
                      name="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      required
                      className="bg-white border-slate-200 focus:ring-orange-600"
                    />
                  </div>
                  <div>
                    <Label htmlFor="gender">Gender *</Label>
                    <Select onValueChange={(value) => handleSelectChange('gender', value)} required>
                      <SelectTrigger className="bg-white border-slate-200">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="classApplied">Class Applied For *</Label>
                    <Select onValueChange={(value) => handleSelectChange('classApplied', value)} required>
                      <SelectTrigger className="bg-white border-slate-200">
                        <SelectValue placeholder="Select class" />
                      </SelectTrigger>
                      <SelectContent>
                        {[...Array(12)].map((_, i) => (
                          <SelectItem key={i + 1} value={`Class ${i + 1}`}>
                            Class {i + 1}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="previousSchool">Previous School</Label>
                    <Input
                      id="previousSchool"
                      name="previousSchool"
                      value={formData.previousSchool}
                      onChange={handleChange}
                      className="bg-white border-slate-200 focus:ring-orange-600"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="address">Address *</Label>
                    <Textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      rows={3}
                      className="bg-white border-slate-200 focus:ring-orange-600"
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className="bg-white border-slate-200 focus:ring-orange-600"
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State *</Label>
                    <Input
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      required
                      className="bg-white border-slate-200 focus:ring-orange-600"
                    />
                  </div>
                  <div>
                    <Label htmlFor="pincode">Pincode *</Label>
                    <Input
                      id="pincode"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      required
                      className="bg-white border-slate-200 focus:ring-orange-600"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
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
                      className="bg-white border-slate-200 focus:ring-orange-600"
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  disabled={loading}
                  data-testid="submit-admission-btn"
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold px-6 py-3 rounded-md transition-all hover:-translate-y-0.5 shadow-md"
                >
                  {loading ? 'Submitting...' : 'Submit Application'}
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Admissions;