import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import CourseItem from './CourseItem';
import EnrollmentList from './EnrollmentList';
import { useAuth } from '../context/AuthContext';

const CoursesPage = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {
    // Fetch all available courses
    fetch('http://127.0.0.1:5000/courses')
      .then(response => response.json())
      .then(data => setCourses(data))
      .catch(error => console.error('Error fetching courses:', error));

      fetch(`http://127.0.0.1:5000/student_courses/${user.studentId}`)
    .then(response => response.json())
    .then(data => setEnrolledCourses(data))
    .catch(error => console.error('Error fetching enrolled courses:', error));

  }, [user]);

  const handleEnroll = (course) => {
    if (!user) {
      alert('Please log in to enroll in courses.');
      return;
    }

    fetch(`http://127.0.0.1:5000/enroll/${user.studentId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(course)
    })
      .then(response => response.json())
      .then(data => {
        if (data.message) {
          // Update UI only if success
          setEnrolledCourses(prev => [...prev, {
            ...course,
            enrollmentId: Date.now()
          }]);
          alert(data.message);
        } else {
          alert('Failed to enroll. Please try again.');
        }
      })
      .catch(error => {
        console.error('Error enrolling in course:', error);
        alert('An error occurred. Please try again.');
      });
  };

  const handleRemove = (enrollmentId) => {
    if (!user) {
      alert('Please log in to remove a course.');
      return;
    }

    const course = enrolledCourses.find(c => c.enrollmentId === enrollmentId);
    if (!course) return;

    fetch(`http://127.0.0.1:5000/drop/${user.studentId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: course.id })
    })
      .then(response => response.json())
      .then(data => {
        if (data.message) {
          // Update UI after successful removal
          setEnrolledCourses(prev => 
            prev.filter(c => c.enrollmentId !== enrollmentId)
          );
          alert(data.message);
        } else {
          alert('Failed to drop course. Please try again.');
        }
      })
      .catch(error => {
        console.error('Error dropping course:', error);
        alert('An error occurred. Please try again.');
      });
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column' 
    }}>
      <Header />
      
      <div style={{ 
        flex: 1,
        display: 'flex',
        padding: '20px',
        gap: '30px'
      }}>
        <div style={{ flex: 3 }}>
          <h2 style={{ color: '#004080' }}>Available Courses</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '20px'
          }}>
            {courses.map(course => (
              <CourseItem 
                key={course.id} 
                course={course} 
                onEnroll={handleEnroll}
              />
            ))}
          </div>
        </div>
        
        <EnrollmentList 
          enrolledCourses={enrolledCourses}
          onRemove={handleRemove}
        />
      </div>
  
      <div style={{ padding: '20px', borderTop: '1px solid #ccc' }}>
        <h2 style={{ color: '#004080' }}>Enrolled Courses</h2>
        {enrolledCourses.length === 0 ? (
          <p>You are not enrolled in any courses.</p>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '20px'
          }}>
            {enrolledCourses.map(course => (
              <CourseItem 
                key={course.enrollmentId || course.id}
                course={course}
                isEnrolled={true} 
                onEnroll={() => {}} 
              />
            ))}
          </div>
        )}
      </div>
  
      <Footer />
    </div>
  );
  
};

export default CoursesPage;
