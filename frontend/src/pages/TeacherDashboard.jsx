// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { LogOut, Calendar, BookOpen, FileText } from 'lucide-react';

// import { Button } from '../components/ui/button';
// import { Input } from '../components/ui/input';
// import { Label } from '../components/ui/label';
// import { Textarea } from '../components/ui/textarea';
// import {
//   Select, SelectContent, SelectItem, SelectTrigger, SelectValue
// } from '../components/ui/select';
// import {
//   Tabs, TabsContent, TabsList, TabsTrigger
// } from '../components/ui/tabs';
// import {
//   Table, TableBody, TableCell, TableHead, TableHeader, TableRow
// } from '../components/ui/table';

// import { useAuth } from '../context/AuthContext';
// import {
//   teacherActivityService,
//   homeworkService,
//   noteService
// } from '../services/api';

// import { toast } from 'sonner';

// const TeacherDashboard = () => {
//   const navigate = useNavigate();
//   const { user, logout } = useAuth();

//   const [activities, setActivities] = useState([]);
//   const [homework, setHomework] = useState([]);
//   const [notes, setNotes] = useState([]);

//   const [loading, setLoading] = useState(false);

//   const [activityPage] = useState(0);
//   const [homeworkPage] = useState(0);
//   const [notesPage] = useState(0);

//   // ---------------- FORMS ----------------
//   const [activityForm, setActivityForm] = useState({
//     activityDate: '',
//     className: '',
//     subject: '',
//     topic: '',
//     description: '',
//     duration: '',
//   });

//   const [homeworkForm, setHomeworkForm] = useState({
//     className: '',
//     subject: '',
//     title: '',
//     description: '',
//     assignedDate: '',
//     dueDate: '',
//   });

//   const [noteFile, setNoteFile] = useState(null);
//   const [noteForm, setNoteForm] = useState({
//     title: '',
//     subject: '',
//     className: '',
//     description: '',
//   });

//   // ---------------- FETCH ----------------
//   useEffect(() => {
//     if (!user) {
//       navigate('/teacher/login');
//       return;
//     }

//     fetchActivities();
//     fetchHomework();
//     fetchNotes();
//   }, [user, activityPage, homeworkPage, notesPage]);

//   const fetchActivities = async () => {
//     try {
//       const res = await teacherActivityService.getMy(activityPage, 10);
//       setActivities(res?.data?.content || []);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const fetchHomework = async () => {
//     try {
//       const res = await homeworkService.getMy(homeworkPage, 10);
//       setHomework(res?.data?.content || []);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const fetchNotes = async () => {
//     try {
//       const res = await noteService.getMy(notesPage, 10);
//       setNotes(res?.data?.content || []);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // ---------------- LOGOUT ----------------
//   const handleLogout = () => {
//     logout();
//     toast.success('Logged out successfully');
//     navigate('/teacher/login');
//   };

//   // ---------------- DATE SAFE ----------------
//   const formatDate = (d) =>
//     d ? new Date(d).toLocaleDateString() : '-';

//   // ---------------- ACTIVITY ----------------
//   const handleActivitySubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       await teacherActivityService.create(activityForm);
//       toast.success('Activity added successfully');

//       setActivityForm({
//         activityDate: '',
//         className: '',
//         subject: '',
//         topic: '',
//         description: '',
//         duration: '',
//       });

//       fetchActivities();
//     } catch {
//       toast.error('Failed to add activity');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ---------------- HOMEWORK ----------------
//   const handleHomeworkSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       await homeworkService.create(homeworkForm);
//       toast.success('Homework added successfully');

//       setHomeworkForm({
//         className: '',
//         subject: '',
//         title: '',
//         description: '',
//         assignedDate: '',
//         dueDate: '',
//       });

//       fetchHomework();
//     } catch {
//       toast.error('Failed to add homework');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ---------------- NOTES ----------------
//   const handleNoteUpload = async (e) => {
//     e.preventDefault();

//     if (!noteFile) {
//       toast.error('Please select a file');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', noteFile);

//     Object.entries(noteForm).forEach(([k, v]) =>
//       formData.append(k, v)
//     );

//     setLoading(true);

//     try {
//       await noteService.upload(formData);
//       toast.success('Note uploaded successfully');

//       setNoteFile(null);
//       setNoteForm({
//         title: '',
//         subject: '',
//         className: '',
//         description: '',
//       });

//       fetchNotes();
//     } catch {
//       toast.error('Failed to upload note');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!user) return null;

//   return (
//     <div className="min-h-screen bg-slate-50">

//       {/* HEADER */}
//       <header className="bg-indigo-950 text-white p-6 flex justify-between">
//         <div>
//           <h1 className="text-xl font-bold">Teacher Dashboard</h1>
//           <p>Welcome, {user?.fullName || user?.username}</p>
//         </div>

//         <Button onClick={handleLogout}>
//           <LogOut className="mr-2 w-4 h-4" />
//           Logout
//         </Button>
//       </header>

//       {/* CONTENT */}
//       <main className="p-6">

//         <Tabs defaultValue="activities">

//           <TabsList>
//             <TabsTrigger value="activities">Activities</TabsTrigger>
//             <TabsTrigger value="homework">Homework</TabsTrigger>
//             <TabsTrigger value="notes">Notes</TabsTrigger>
//           </TabsList>

//           {/* ================= ACTIVITIES ================= */}
//           <TabsContent value="activities">

//             <Select
//               value={activityForm.className}
//               onValueChange={(v) =>
//                 setActivityForm({ ...activityForm, className: v })
//               }
//             >
//               <SelectTrigger>
//                 <SelectValue placeholder="Select class" />
//               </SelectTrigger>

//               <SelectContent>
//                 {[...Array(12)].map((_, i) => (
//                   <SelectItem key={i} value={`Class ${i + 1}`}>
//                     Class {i + 1}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>

//             <Table className="mt-6">
//               <TableBody>
//                 {activities.map(a => (
//                   <TableRow key={a.id}>
//                     <TableCell>{formatDate(a.activityDate)}</TableCell>
//                     <TableCell>{a.className}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>

//           </TabsContent>

//           {/* ================= HOMEWORK ================= */}
//           <TabsContent value="homework">

//             <Select
//               value={homeworkForm.className}
//               onValueChange={(v) =>
//                 setHomeworkForm({ ...homeworkForm, className: v })
//               }
//             >
//               <SelectTrigger>
//                 <SelectValue placeholder="Select class" />
//               </SelectTrigger>

//               <SelectContent>
//                 {[...Array(12)].map((_, i) => (
//                   <SelectItem key={i} value={`Class ${i + 1}`}>
//                     Class {i + 1}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>

//             <Table className="mt-6">
//               <TableBody>
//                 {homework.map(h => (
//                   <TableRow key={h.id}>
//                     <TableCell>{h.title}</TableCell>
//                     <TableCell>{formatDate(h.dueDate)}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>

//           </TabsContent>

//           {/* ================= NOTES ================= */}
//           <TabsContent value="notes">

//             <Input
//               type="file"
//               onChange={(e) => setNoteFile(e.target.files?.[0])}
//             />

//             <Table className="mt-6">
//               <TableBody>
//                 {notes.map(n => (
//                   <TableRow key={n.id}>
//                     <TableCell>{n.title}</TableCell>
//                     <TableCell>{n.fileName}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>

//           </TabsContent>

//         </Tabs>

//       </main>
//     </div>
//   );
// };

// export default TeacherDashboard;
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LogOut,
  Calendar,
  BookOpen,
  FileText,
  Upload,
  Loader2,
  GraduationCap,
  ClipboardList,
  NotebookPen,
} from 'lucide-react';

import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import { Badge } from '../components/ui/badge';

import { useAuth } from '../context/AuthContext';
import {
  teacherActivityService,
  homeworkService,
  noteService,
} from '../services/api';
import { toast } from 'sonner';

const CLASSES = Array.from({ length: 12 }, (_, i) => `Class ${i + 1}`);

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [activities, setActivities] = useState([]);
  const [homework, setHomework] = useState([]);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('activities');
  const [noteFile, setNoteFile] = useState(null);

  const [activityForm, setActivityForm] = useState({
    activityDate: '',
    className: '',
    subject: '',
    topic: '',
    description: '',
    duration: '',
  });

  const [homeworkForm, setHomeworkForm] = useState({
    className: '',
    subject: '',
    title: '',
    description: '',
    assignedDate: '',
    dueDate: '',
  });

  const [noteForm, setNoteForm] = useState({
    title: '',
    subject: '',
    className: '',
    description: '',
  });

  const fetchActivities = useCallback(async () => {
    try {
      const response = await teacherActivityService.getMy(0, 10);
      if (response?.success) {
        setActivities(response?.data?.content || []);
      }
    } catch (error) {
      console.error('Error fetching activities:', error);
      toast.error('Failed to fetch activities');
    }
  }, []);

  const fetchHomework = useCallback(async () => {
    try {
      const response = await homeworkService.getMy(0, 10);
      if (response?.success) {
        setHomework(response?.data?.content || []);
      }
    } catch (error) {
      console.error('Error fetching homework:', error);
      toast.error('Failed to fetch homework');
    }
  }, []);

  const fetchNotes = useCallback(async () => {
    try {
      const response = await noteService.getMy(0, 10);
      if (response?.success) {
        setNotes(response?.data?.content || []);
      }
    } catch (error) {
      console.error('Error fetching notes:', error);
      toast.error('Failed to fetch notes');
    }
  }, []);

  useEffect(() => {
    if (!user) {
      navigate('/teacher/login');
      return;
    }

    fetchActivities();
    fetchHomework();
    fetchNotes();
  }, [user, navigate, fetchActivities, fetchHomework, fetchNotes]);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/teacher/login');
  };

  const handleActivitySubmit = async (e) => {
    e.preventDefault();

    if (
      !activityForm.activityDate ||
      !activityForm.className ||
      !activityForm.subject ||
      !activityForm.topic ||
      !activityForm.duration
    ) {
      toast.error('Please fill all required fields');
      return;
    }

    setLoading(true);
    try {
      const response = await teacherActivityService.create(activityForm);
      if (response?.success) {
        toast.success('Activity added successfully');
        setActivityForm({
          activityDate: '',
          className: '',
          subject: '',
          topic: '',
          description: '',
          duration: '',
        });
        fetchActivities();
      } else {
        toast.error('Failed to add activity');
      }
    } catch (error) {
      console.error('Error adding activity:', error);
      toast.error('Failed to add activity');
    } finally {
      setLoading(false);
    }
  };

  const handleHomeworkSubmit = async (e) => {
    e.preventDefault();

    if (
      !homeworkForm.className ||
      !homeworkForm.subject ||
      !homeworkForm.title ||
      !homeworkForm.assignedDate ||
      !homeworkForm.dueDate
    ) {
      toast.error('Please fill all required fields');
      return;
    }

    setLoading(true);
    try {
      const response = await homeworkService.create(homeworkForm);
      if (response?.success) {
        toast.success('Homework added successfully');
        setHomeworkForm({
          className: '',
          subject: '',
          title: '',
          description: '',
          assignedDate: '',
          dueDate: '',
        });
        fetchHomework();
      } else {
        toast.error('Failed to add homework');
      }
    } catch (error) {
      console.error('Error adding homework:', error);
      toast.error('Failed to add homework');
    } finally {
      setLoading(false);
    }
  };

  const handleNoteUpload = async (e) => {
    e.preventDefault();

    if (!noteFile) {
      toast.error('Please select a file');
      return;
    }

    if (!noteForm.title || !noteForm.subject || !noteForm.className) {
      toast.error('Please fill all required fields');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', noteFile);
      formData.append('title', noteForm.title);
      formData.append('subject', noteForm.subject);
      formData.append('className', noteForm.className);
      formData.append('description', noteForm.description || '');

      const response = await noteService.upload(formData);
      if (response?.success) {
        toast.success('Note uploaded successfully');
        setNoteFile(null);
        setNoteForm({
          title: '',
          subject: '',
          className: '',
          description: '',
        });
        fetchNotes();
      } else {
        toast.error('Failed to upload note');
      }
    } catch (error) {
      console.error('Error uploading note:', error);
      toast.error('Failed to upload note');
    } finally {
      setLoading(false);
    }
  };

  const cardMotion = {
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.35 },
  };

  if (!user) {
    return null;
  }

  return (
    <div
      className="min-h-screen bg-[#f6f8fb] text-slate-800"
      data-testid="teacher-dashboard"
    >
      <div className="flex min-h-screen flex-col">
        {/* Header */}
        <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-900 text-white shadow-sm">
                <GraduationCap className="h-5 w-5" strokeWidth={2} />
              </div>

              <div>
                <h1 className="text-xl font-bold tracking-tight text-slate-900">
                  Teacher Dashboard
                </h1>
                <p className="text-sm text-slate-500">
                  Welcome back, {user?.fullName || user?.username}
                </p>
              </div>
            </div>

            <Button
              onClick={handleLogout}
              variant="outline"
              data-testid="logout-btn"
              className="h-10 rounded-xl border-slate-300 bg-white px-4 text-slate-700 hover:bg-slate-100"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </header>

        {/* Hero */}
        <section className="border-b border-slate-200 bg-gradient-to-r from-indigo-950 via-indigo-900 to-slate-900">
          <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 text-white sm:px-6 lg:grid-cols-[1.5fr_1fr] lg:px-8 lg:py-10">
            <div>
              <p className="mb-2 text-sm font-medium uppercase tracking-[0.18em] text-indigo-200">
                School Management Panel
              </p>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Manage daily teaching work in one place
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
                Add classroom activities, assign homework, and upload notes with
                a clean workflow designed for schools.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                <p className="text-xs uppercase tracking-wide text-indigo-200">
                  Activities
                </p>
                <p className="mt-2 text-2xl font-bold">{activities.length}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                <p className="text-xs uppercase tracking-wide text-indigo-200">
                  Homework
                </p>
                <p className="mt-2 text-2xl font-bold">{homework.length}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                <p className="text-xs uppercase tracking-wide text-indigo-200">
                  Notes
                </p>
                <p className="mt-2 text-2xl font-bold">{notes.length}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Main */}
        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-6"
          >
            <div className="overflow-x-auto">
              <TabsList className="grid min-w-[720px] grid-cols-3 rounded-2xl border border-slate-200 bg-white p-1 shadow-sm">
                <TabsTrigger
                  value="activities"
                  data-testid="tab-activities"
                  className="rounded-xl py-3 text-sm font-semibold data-[state=active]:bg-indigo-900 data-[state=active]:text-white"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Daily Activities
                </TabsTrigger>

                <TabsTrigger
                  value="homework"
                  data-testid="tab-homework"
                  className="rounded-xl py-3 text-sm font-semibold data-[state=active]:bg-indigo-900 data-[state=active]:text-white"
                >
                  <BookOpen className="mr-2 h-4 w-4" />
                  Homework
                </TabsTrigger>

                <TabsTrigger
                  value="notes"
                  data-testid="tab-notes"
                  className="rounded-xl py-3 text-sm font-semibold data-[state=active]:bg-indigo-900 data-[state=active]:text-white"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Study Notes
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Activities */}
            <TabsContent value="activities" className="space-y-6">
              <motion.div
                {...cardMotion}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
              >
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
                    <ClipboardList className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      Add Daily Teaching Activity
                    </h3>
                    <p className="text-sm text-slate-500">
                      Record class teaching details for the day.
                    </p>
                  </div>
                </div>

                <form
                  onSubmit={handleActivitySubmit}
                  className="space-y-5"
                  data-testid="activity-form"
                >
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="activityDate">Activity Date *</Label>
                      <Input
                        id="activityDate"
                        type="date"
                        value={activityForm.activityDate}
                        onChange={(e) =>
                          setActivityForm({
                            ...activityForm,
                            activityDate: e.target.value,
                          })
                        }
                        required
                        className="h-11 rounded-xl border-slate-300 bg-slate-50 focus-visible:ring-2 focus-visible:ring-indigo-200"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Class *</Label>
                      <Select
                        value={activityForm.className}
                        onValueChange={(value) =>
                          setActivityForm({ ...activityForm, className: value })
                        }
                      >
                        <SelectTrigger className="h-11 rounded-xl border-slate-300 bg-slate-50">
                          <SelectValue placeholder="Select class" />
                        </SelectTrigger>
                        <SelectContent>
                          {CLASSES.map((item) => (
                            <SelectItem key={item} value={item}>
                              {item}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        value={activityForm.subject}
                        onChange={(e) =>
                          setActivityForm({
                            ...activityForm,
                            subject: e.target.value,
                          })
                        }
                        required
                        placeholder="e.g. Mathematics"
                        className="h-11 rounded-xl border-slate-300 bg-slate-50"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="topic">Topic *</Label>
                      <Input
                        id="topic"
                        value={activityForm.topic}
                        onChange={(e) =>
                          setActivityForm({
                            ...activityForm,
                            topic: e.target.value,
                          })
                        }
                        required
                        placeholder="e.g. Algebraic Expressions"
                        className="h-11 rounded-xl border-slate-300 bg-slate-50"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="duration">Duration (minutes) *</Label>
                      <Input
                        id="duration"
                        type="number"
                        min="1"
                        value={activityForm.duration}
                        onChange={(e) =>
                          setActivityForm({
                            ...activityForm,
                            duration: e.target.value,
                          })
                        }
                        required
                        placeholder="40"
                        className="h-11 rounded-xl border-slate-300 bg-slate-50"
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2 xl:col-span-3">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        rows={4}
                        value={activityForm.description}
                        onChange={(e) =>
                          setActivityForm({
                            ...activityForm,
                            description: e.target.value,
                          })
                        }
                        placeholder="Add a short note about what was taught in class..."
                        className="rounded-2xl border-slate-300 bg-slate-50"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    data-testid="submit-activity-btn"
                    className="h-11 rounded-xl bg-indigo-900 px-6 font-semibold text-white hover:bg-indigo-800"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Adding...
                      </>
                    ) : (
                      'Add Activity'
                    )}
                  </Button>
                </form>
              </motion.div>

              <motion.div
                {...cardMotion}
                transition={{ duration: 0.35, delay: 0.05 }}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
              >
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      Previous Activities
                    </h3>
                    <p className="text-sm text-slate-500">
                      Recently added classroom records.
                    </p>
                  </div>
                  <Badge className="rounded-full bg-indigo-100 px-3 py-1 text-indigo-700 hover:bg-indigo-100">
                    {activities.length} Records
                  </Badge>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-slate-200">
                  <Table>
                    <TableHeader className="bg-slate-50">
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Class</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Topic</TableHead>
                        <TableHead>Duration</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {activities.length > 0 ? (
                        activities.map((activity) => (
                          <TableRow key={activity.id} className="hover:bg-slate-50">
                            <TableCell>
                              {new Date(activity.activityDate).toLocaleDateString()}
                            </TableCell>
                            <TableCell>{activity.className}</TableCell>
                            <TableCell>{activity.subject}</TableCell>
                            <TableCell>{activity.topic}</TableCell>
                            <TableCell>{activity.duration} min</TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell
                            colSpan={5}
                            className="py-10 text-center text-slate-500"
                          >
                            No activities found
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </motion.div>
            </TabsContent>

            {/* Homework */}
            <TabsContent value="homework" className="space-y-6">
              <motion.div
                {...cardMotion}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
              >
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      Add Homework
                    </h3>
                    <p className="text-sm text-slate-500">
                      Create and assign work for students.
                    </p>
                  </div>
                </div>

                <form
                  onSubmit={handleHomeworkSubmit}
                  className="space-y-5"
                  data-testid="homework-form"
                >
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                    <div className="space-y-2">
                      <Label>Class *</Label>
                      <Select
                        value={homeworkForm.className}
                        onValueChange={(value) =>
                          setHomeworkForm({ ...homeworkForm, className: value })
                        }
                      >
                        <SelectTrigger className="h-11 rounded-xl border-slate-300 bg-slate-50">
                          <SelectValue placeholder="Select class" />
                        </SelectTrigger>
                        <SelectContent>
                          {CLASSES.map((item) => (
                            <SelectItem key={item} value={item}>
                              {item}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="hwSubject">Subject *</Label>
                      <Input
                        id="hwSubject"
                        value={homeworkForm.subject}
                        onChange={(e) =>
                          setHomeworkForm({
                            ...homeworkForm,
                            subject: e.target.value,
                          })
                        }
                        required
                        placeholder="e.g. Science"
                        className="h-11 rounded-xl border-slate-300 bg-slate-50"
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2 xl:col-span-3">
                      <Label htmlFor="hwTitle">Title *</Label>
                      <Input
                        id="hwTitle"
                        value={homeworkForm.title}
                        onChange={(e) =>
                          setHomeworkForm({
                            ...homeworkForm,
                            title: e.target.value,
                          })
                        }
                        required
                        placeholder="e.g. Chapter 3 Exercise"
                        className="h-11 rounded-xl border-slate-300 bg-slate-50"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="assignedDate">Assigned Date *</Label>
                      <Input
                        id="assignedDate"
                        type="date"
                        value={homeworkForm.assignedDate}
                        onChange={(e) =>
                          setHomeworkForm({
                            ...homeworkForm,
                            assignedDate: e.target.value,
                          })
                        }
                        required
                        className="h-11 rounded-xl border-slate-300 bg-slate-50"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dueDate">Due Date *</Label>
                      <Input
                        id="dueDate"
                        type="date"
                        value={homeworkForm.dueDate}
                        onChange={(e) =>
                          setHomeworkForm({
                            ...homeworkForm,
                            dueDate: e.target.value,
                          })
                        }
                        required
                        className="h-11 rounded-xl border-slate-300 bg-slate-50"
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2 xl:col-span-3">
                      <Label htmlFor="hwDescription">Description</Label>
                      <Textarea
                        id="hwDescription"
                        rows={4}
                        value={homeworkForm.description}
                        onChange={(e) =>
                          setHomeworkForm({
                            ...homeworkForm,
                            description: e.target.value,
                          })
                        }
                        placeholder="Write clear homework instructions..."
                        className="rounded-2xl border-slate-300 bg-slate-50"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    data-testid="submit-homework-btn"
                    className="h-11 rounded-xl bg-indigo-900 px-6 font-semibold text-white hover:bg-indigo-800"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Adding...
                      </>
                    ) : (
                      'Add Homework'
                    )}
                  </Button>
                </form>
              </motion.div>

              <motion.div
                {...cardMotion}
                transition={{ duration: 0.35, delay: 0.05 }}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
              >
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      Previous Homework
                    </h3>
                    <p className="text-sm text-slate-500">
                      Recently assigned homework list.
                    </p>
                  </div>
                  <Badge className="rounded-full bg-emerald-100 px-3 py-1 text-emerald-700 hover:bg-emerald-100">
                    {homework.length} Items
                  </Badge>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-slate-200">
                  <Table>
                    <TableHeader className="bg-slate-50">
                      <TableRow>
                        <TableHead>Class</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Assigned</TableHead>
                        <TableHead>Due Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {homework.length > 0 ? (
                        homework.map((hw) => (
                          <TableRow key={hw.id} className="hover:bg-slate-50">
                            <TableCell>{hw.className}</TableCell>
                            <TableCell>{hw.subject}</TableCell>
                            <TableCell>{hw.title}</TableCell>
                            <TableCell>
                              {new Date(hw.assignedDate).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              {new Date(hw.dueDate).toLocaleDateString()}
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell
                            colSpan={5}
                            className="py-10 text-center text-slate-500"
                          >
                            No homework found
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </motion.div>
            </TabsContent>

            {/* Notes */}
            <TabsContent value="notes" className="space-y-6">
              <motion.div
                {...cardMotion}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
              >
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-100 text-sky-700">
                    <NotebookPen className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      Upload Study Notes
                    </h3>
                    <p className="text-sm text-slate-500">
                      Upload useful study material for students.
                    </p>
                  </div>
                </div>

                <form
                  onSubmit={handleNoteUpload}
                  className="space-y-5"
                  data-testid="notes-form"
                >
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="noteTitle">Title *</Label>
                      <Input
                        id="noteTitle"
                        value={noteForm.title}
                        onChange={(e) =>
                          setNoteForm({ ...noteForm, title: e.target.value })
                        }
                        required
                        placeholder="e.g. Unit 2 Notes"
                        className="h-11 rounded-xl border-slate-300 bg-slate-50"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="noteSubject">Subject *</Label>
                      <Input
                        id="noteSubject"
                        value={noteForm.subject}
                        onChange={(e) =>
                          setNoteForm({ ...noteForm, subject: e.target.value })
                        }
                        required
                        placeholder="e.g. English"
                        className="h-11 rounded-xl border-slate-300 bg-slate-50"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Class *</Label>
                      <Select
                        value={noteForm.className}
                        onValueChange={(value) =>
                          setNoteForm({ ...noteForm, className: value })
                        }
                      >
                        <SelectTrigger className="h-11 rounded-xl border-slate-300 bg-slate-50">
                          <SelectValue placeholder="Select class" />
                        </SelectTrigger>
                        <SelectContent>
                          {CLASSES.map((item) => (
                            <SelectItem key={item} value={item}>
                              {item}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2 md:col-span-2 xl:col-span-3">
                      <Label htmlFor="noteFile">Upload File *</Label>
                      <Input
                        id="noteFile"
                        type="file"
                        required
                        data-testid="input-file"
                        onChange={(e) => setNoteFile(e.target.files?.[0] || null)}
                        className="h-11 rounded-xl border-slate-300 bg-slate-50 file:mr-4 file:rounded-lg file:border-0 file:bg-indigo-900 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-indigo-800"
                      />
                      {noteFile && (
                        <p className="text-sm text-slate-500">
                          Selected file: {noteFile.name}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2 md:col-span-2 xl:col-span-3">
                      <Label htmlFor="noteDescription">Description</Label>
                      <Textarea
                        id="noteDescription"
                        rows={4}
                        value={noteForm.description}
                        onChange={(e) =>
                          setNoteForm({
                            ...noteForm,
                            description: e.target.value,
                          })
                        }
                        placeholder="Add a short description for this study note..."
                        className="rounded-2xl border-slate-300 bg-slate-50"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    data-testid="submit-notes-btn"
                    className="h-11 rounded-xl bg-indigo-900 px-6 font-semibold text-white hover:bg-indigo-800"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Note
                      </>
                    )}
                  </Button>
                </form>
              </motion.div>

              <motion.div
                {...cardMotion}
                transition={{ duration: 0.35, delay: 0.05 }}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
              >
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      Uploaded Notes
                    </h3>
                    <p className="text-sm text-slate-500">
                      Notes shared with students.
                    </p>
                  </div>
                  <Badge className="rounded-full bg-sky-100 px-3 py-1 text-sky-700 hover:bg-sky-100">
                    {notes.length} Files
                  </Badge>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-slate-200">
                  <Table>
                    <TableHeader className="bg-slate-50">
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Class</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>File</TableHead>
                        <TableHead>Uploaded</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {notes.length > 0 ? (
                        notes.map((note) => (
                          <TableRow key={note.id} className="hover:bg-slate-50">
                            <TableCell>{note.title}</TableCell>
                            <TableCell>{note.className}</TableCell>
                            <TableCell>{note.subject}</TableCell>
                            <TableCell>{note.fileName}</TableCell>
                            <TableCell>
                              {new Date(note.uploadedAt).toLocaleDateString()}
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell
                            colSpan={5}
                            className="py-10 text-center text-slate-500"
                          >
                            No notes found
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default TeacherDashboard;