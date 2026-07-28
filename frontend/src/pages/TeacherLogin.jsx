// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { Lock, User, ArrowLeft } from 'lucide-react';
// import { Input } from '../components/ui/input';
// import { Label } from '../components/ui/label';
// import { Button } from '../components/ui/button';
// import { authService } from '../services/api';
// import { useAuth } from '../context/AuthContext';
// import { toast } from 'sonner';

// const TeacherLogin = () => {
//   const navigate = useNavigate();
//   const { login } = useAuth();

//   const [loading, setLoading] = useState(false);
//   const [credentials, setCredentials] = useState({
//     username: '',
//     password: '',
//   });

//   const handleChange = (e) => {
//     setCredentials({ ...credentials, [e.target.name]: e.target.value });
//   };

//  const handleSubmit = async (e) => {
//   e.preventDefault();
//   setLoading(true);

//   try {
//     const response = await authService.login(credentials);

//    console.log("RESPONSE.DATA:", response.data);
// console.log("USER DATA:", response.data.data);

//     // 🔥 FIX HERE
//     const userData = response.data.data;

//    if (response.data.success && response.data.data?.token) {
//   const userData = response.data.data;

//   login(userData, userData.token);

//   toast.success(`Welcome back, ${userData.fullName || userData.username}!`);
//   navigate('/teacher/dashboard');
// } else {
//   console.log("FAILED RESPONSE:", response.data); // 🔥 important
//   toast.error(response.data.message || 'Login failed');
// }

//   } catch (error) {
//     console.log("ERROR:", error.response);
//     toast.error(error.response?.data?.message || 'Invalid username or password');
//   } finally {
//     setLoading(false);
//   }
// };

//   return (
//     <div
//       className="min-h-screen flex items-center justify-center p-6"
//       style={{
//         backgroundImage: `url(https://static.prod-images.emergentagent.com/jobs/17e4a968-4874-48c0-8afa-781fc5997026/images/0676cbca2094df9c0eab55c7735e96269b97d3738492735fbe7cf9cce3b27e54.png)`,
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//       }}
//       data-testid="teacher-login-page"
//     >
//       <div className="absolute inset-0 bg-indigo-950/70"></div>

//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="relative z-10 w-full max-w-md"
//       >
//         <Link
//           to="/"
//           className="inline-flex items-center gap-2 text-white mb-6 hover:text-orange-400 transition-colors"
//         >
//           <ArrowLeft className="w-5 h-5" />
//           <span>Back to Home</span>
//         </Link>

//         <div className="border bg-white p-8 md:p-12 rounded-md shadow-xl">
//           <div className="text-center mb-8">
//             <div className="w-16 h-16 bg-indigo-600 text-white rounded-md flex items-center justify-center mx-auto mb-4">
//               <Lock className="w-8 h-8" />
//             </div>

//             <h1 className="text-3xl font-bold text-indigo-950 mb-2">
//               Teacher Login
//             </h1>

//             <p className="text-slate-600">
//               Sign in to access your dashboard
//             </p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-6">
            
//             {/* Username */}
//             <div>
//               <Label htmlFor="username">Username</Label>

//               <div className="relative mt-2">
//                 <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

//                 <Input
//                   id="username"
//                   name="username"
//                   type="text"
//                   value={credentials.username}
//                   onChange={handleChange}
//                   required
//                   className="pl-10 bg-slate-50"
//                   placeholder="Enter your username"
//                 />
//               </div>
//             </div>

//             {/* Password */}
//             <div>
//               <Label htmlFor="password">Password</Label>

//               <div className="relative mt-2">
//                 <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

//                 <Input
//                   id="password"
//                   name="password"
//                   type="password"
//                   value={credentials.password}
//                   onChange={handleChange}
//                   required
//                   className="pl-10 bg-slate-50"
//                   placeholder="Enter your password"
//                 />
//               </div>
//             </div>

//             {/* Button */}
//             <Button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-md"
//             >
//               {loading ? 'Signing in...' : 'Sign In'}
//             </Button>

//           </form>

//           <div className="mt-6 text-center text-sm text-slate-600">
//             Demo: <br />
//             <strong>teacher1 / teacher123</strong>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default TeacherLogin;

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, User, ArrowLeft } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';
import { authService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

const TeacherLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  // Handle input change
  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  // Handle login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await authService.login(credentials);

      console.log("FULL RESPONSE:", response);
      console.log("RESPONSE.DATA:", response.data);

      // ✅ Handle multiple backend formats safely
      const userData = response.data?.data || response.data;

      // ✅ Check token only (most reliable)
      if (userData?.token) {
        login(userData, userData.token);

        toast.success(
          `Welcome back, ${userData.fullName || userData.username}!`
        );

        navigate('/teacher/dashboard');
      } else {
        console.log("FAILED RESPONSE:", response.data);
        toast.error(response.data?.message || 'Login failed');
      }

    } catch (error) {
      console.log("ERROR:", error);

      toast.error(
        error.response?.data?.message ||
        error.message ||
        'Invalid username or password'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{
        backgroundImage: `url(https://static.prod-images.emergentagent.com/jobs/17e4a968-4874-48c0-8afa-781fc5997026/images/0676cbca2094df9c0eab55c7735e96269b97d3738492735fbe7cf9cce3b27e54.png)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-indigo-950/70"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-white mb-6 hover:text-orange-400 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Home</span>
        </Link>

        {/* Card */}
        <div className="border bg-white p-8 md:p-12 rounded-md shadow-xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-indigo-600 text-white rounded-md flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8" />
            </div>

            <h1 className="text-3xl font-bold text-indigo-950 mb-2">
              Teacher Login
            </h1>

            <p className="text-slate-600">
              Sign in to access your dashboard
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Username */}
            <div>
              <Label htmlFor="username">Username</Label>

              <div className="relative mt-2">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

                <Input
                  id="username"
                  name="username"
                  type="text"
                  value={credentials.username}
                  onChange={handleChange}
                  required
                  className="pl-10 bg-slate-50"
                  placeholder="Enter your username"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="password">Password</Label>

              <div className="relative mt-2">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={credentials.password}
                  onChange={handleChange}
                  required
                  className="pl-10 bg-slate-50"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            {/* Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-md"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>

          </form>

          {/* Demo */}
          <div className="mt-6 text-center text-sm text-slate-600">
            Demo: <br />
            <strong>teacher1 / teacher123</strong>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TeacherLogin;