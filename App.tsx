import React, { useState, useMemo } from 'react';
import { GraduationCap } from 'lucide-react';
import { SearchBar } from './components/SearchBar';
import { CourseFilters } from './components/CourseFilters';
import { CourseGrid } from './components/CourseGrid';
import { CourseModal } from './components/CourseModal';
import { courses } from './data/courses';
import { Course } from './types/Course';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLevel = selectedLevel === 'All' || course.level === selectedLevel;
      return matchesSearch && matchesLevel;
    });
  }, [searchQuery, selectedLevel]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-2">
            <GraduationCap className="text-blue-600" size={32} />
            <h1 className="text-2xl font-bold text-gray-900">Analytics Vidhya Courses</h1>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-gradient-to-b from-blue-50 to-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Free Generative AI & Machine Learning Courses
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Enroll now and get into the world of AI for Free!
          </p>
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <CourseFilters 
          selectedLevel={selectedLevel}
          onLevelChange={setSelectedLevel}
        />
        <CourseGrid 
          courses={filteredCourses}
          onCourseClick={setSelectedCourse}
        />
      </main>

      {/* Course Modal */}
      {selectedCourse && (
        <CourseModal
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
        />
      )}
    </div>
  );
}

export default App;