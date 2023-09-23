import React, { useState, useEffect } from 'react';
import logo from './logo.png'; // Import the logo image
import './App.css';

function App() {
  const [courses, setCourses] = useState([]);
  const [showFullDescription, setShowFullDescription] = useState({});
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {
    // Fetch course data from the JSON file
    fetch('/courses.json') // Adjust the path if needed
      .then((response) => response.json())
      .then((data) => setCourses(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const toggleDescription = (courseId) => {
    setShowFullDescription((prev) => ({
      ...prev,
      [courseId]: !prev[courseId],
    }));
  };

  const enrollCourse = (courseId) => {
    setEnrolledCourses((prevEnrolledCourses) => {
      if (prevEnrolledCourses.includes(courseId)) {
        // If already enrolled, remove from enrolled courses
        return prevEnrolledCourses.filter((id) => id !== courseId);
      } else {
        // If not enrolled, add to enrolled courses
        return [...prevEnrolledCourses, courseId];
      }
    });
  };

  return (
    <div className="App">
     <header className="App-header">
        <div className="header-content">
          <img src={logo} alt="DecentralEdu Logo" className="logo" />
          <h1>Welcome to DecentralEdu</h1>
        </div>
      </header>
      <main className="App-main">
        <h2>Available Courses</h2>
        <ul className="course-grid">
          {courses.map((course) => (
            <li key={course.id} className="course-item">
              <img
                src={process.env.PUBLIC_URL + '/' + course.image}
                alt={course.title}
                className="course-image"
              />
              <div className="course-info">
                <h3>{course.title}</h3>
                <p>{course.price}</p>
                <p>
                  {showFullDescription[course.id] || course.about.length <= 200
                    ? course.about
                    : course.about.slice(0, 200) + '...'}
                  {course.about.length > 200 && (
                    <a
                      className={`see-more-link ${
                        showFullDescription[course.id] ? 'less' : ''
                      }`}
                      onClick={() => toggleDescription(course.id)}
                    >
                      {showFullDescription[course.id] ? 'See Less' : 'See More'}
                    </a>
                  )}
                </p>
              </div>
              <button
                className={`enroll-button ${
                  enrolledCourses.includes(course.id) ? 'enrolled' : ''
                }`}
                onClick={() => enrollCourse(course.id)}
              >
                {enrolledCourses.includes(course.id)
                  ? 'Enrolled'
                  : 'Enroll the Course'}
              </button>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
