function CourseSidebar({ courses, selectedCourseId, onCourseSelect, role }) {
  return (
    <aside className="sidebar-panel card">
      <div className="sidebar-header">
        <h2>Course Playlist</h2>
        <span>{role}</span>
      </div>
      <p className="helper-text">Click any course to load video and details.</p>

      <div className="sidebar-list">
        {courses.map((course, index) => (
          <button
            key={course.id}
            type="button"
            className={`playlist-item ${course.id === selectedCourseId ? 'active' : ''}`}
            onClick={() => onCourseSelect(course.id)}
          >
            <span className="playlist-index">{index + 1}</span>
            <span>
              <strong>{course.title}</strong>
              <small>{course.instructor}</small>
            </span>
          </button>
        ))}
      </div>
    </aside>
  )
}

export default CourseSidebar
