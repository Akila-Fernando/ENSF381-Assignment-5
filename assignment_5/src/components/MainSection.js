import { useEffect, useState } from 'react';
import courses from '../data/courses';

const MainSection = () => {
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [randomTestimonials, setRandomTestimonials] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/courses/random')
    .then((response) => response.json())
    .then((data) => setFeaturedCourses(data))
    .catch((error) => console.error('Error fetching courses:', error));

    fetch('http://127.0.0.1:5000/testimonials')
    .then((response) => response.json())
    .then((data) => setRandomTestimonials(data))
    .catch((error) => console.error('Error fetching testimonials:', error));  }, []);
  return (
    <main>
      <section className="about">
        <h2>About LMS</h2>
        <p>Manage courses and track progress efficiently.</p>
      </section>

      <section className="featured-courses">
        <h3>Featured Courses</h3>
        {featuredCourses.map(course => (
          <div key={course.id}>
            <img src={course.image} alt={course.name} />
            <h4>{course.name}</h4>
          </div>
        ))}
      </section>

      <section className="testimonials">
        <h3>Student Testimonials</h3>
        {randomTestimonials.map((testimonial, idx) => (
          <div key={idx}>
            <p>{testimonial.studentName}</p>
            <p>{'★'.repeat(testimonial.rating)}</p>
            <p>{testimonial.review}</p>
          </div>
        ))}
      </section>
    </main>
  );
};

export default MainSection;
