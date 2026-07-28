import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Calendar, Filter } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { noticeService } from '../services/api';
import { toast } from 'sonner';

const Notices = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchNotices();
  }, [page, search]);

  const fetchNotices = async () => {
    setLoading(true);
    try {
      const response = await noticeService.getAll(page, 10, search);
      if (response.success) {
        setNotices(response.data.content);
        setTotalPages(response.data.totalPages);
      }
    } catch (error) {
      console.error('Error fetching notices:', error);
      toast.error('Failed to load notices');
    } finally {
      setLoading(false);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'HIGH':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'MEDIUM':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'LOW':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'EXAM':
        return 'bg-purple-100 text-purple-700';
      case 'HOLIDAY':
        return 'bg-blue-100 text-blue-700';
      case 'EVENT':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="min-h-screen" data-testid="notices-page">
      {/* Header */}
      <section className="bg-indigo-950 text-white py-16 px-6 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl tracking-tighter font-bold mb-4">
              Notices
            </h1>
            <p className="text-lg text-slate-300 max-w-3xl">
              Stay updated with the latest announcements, events, and important information
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search Bar */}
      <section className="py-8 px-6 md:px-12 lg:px-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" strokeWidth={1.5} />
              <Input
                type="text"
                placeholder="Search notices..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                data-testid="search-notices"
                className="pl-10 bg-slate-50 border-slate-200"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Notices List */}
      <section className="py-16 px-6 md:px-12 lg:px-16 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="border border-slate-200 bg-white p-8 rounded-md animate-pulse">
                  <div className="h-6 bg-slate-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-slate-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-slate-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="space-y-6" data-testid="notices-list">
                {notices.map((notice, index) => (
                  <motion.div
                    key={notice.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="border border-slate-200 bg-white p-8 rounded-md hover:shadow-md transition-all"
                    data-testid={`notice-item-${notice.id}`}
                  >
                    <div className="flex flex-col md:flex-row md:items-start gap-6">
                      <div className="flex-shrink-0">
                        <div className="bg-orange-600 text-white px-4 py-3 rounded-md text-center min-w-[100px]">
                          <div className="text-2xl font-bold">
                            {new Date(notice.noticeDate).getDate()}
                          </div>
                          <div className="text-sm uppercase">
                            {new Date(notice.noticeDate).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}
                          </div>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap gap-2 mb-3">
                          {notice.priority && (
                            <Badge className={`${getPriorityColor(notice.priority)} border`}>
                              {notice.priority}
                            </Badge>
                          )}
                          {notice.category && (
                            <Badge className={getCategoryColor(notice.category)}>
                              {notice.category}
                            </Badge>
                          )}
                        </div>
                        <h3 className="text-xl md:text-2xl font-semibold text-indigo-950 mb-3">
                          {notice.title}
                        </h3>
                        <p className="text-base leading-relaxed text-slate-600">
                          {notice.content}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-12">
                  <Button
                    onClick={() => setPage(Math.max(0, page - 1))}
                    disabled={page === 0}
                    variant="outline"
                    data-testid="prev-page-btn"
                  >
                    Previous
                  </Button>
                  <div className="flex items-center gap-2 px-4">
                    <span className="text-sm text-slate-600">
                      Page {page + 1} of {totalPages}
                    </span>
                  </div>
                  <Button
                    onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
                    disabled={page >= totalPages - 1}
                    variant="outline"
                    data-testid="next-page-btn"
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Notices;