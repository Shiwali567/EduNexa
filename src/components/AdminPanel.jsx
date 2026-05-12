function AdminPanel({
  courseForm,
  setCourseForm,
  onAddCourse,
  onResetCourses,
  courses = [],
  onRemoveCourse,
}) {
  return (
    <section className="card admin-card">
      <h2>Admin Panel</h2>
      <p className="helper-text">
        Create courses and attach YouTube video links for students. Added courses also show in
        student dashboard playlist.
      </p>
      <form onSubmit={onAddCourse} className="form-grid">
        <label>
          Course Title
          <input
            type="text"
            value={courseForm.title}
            onChange={(event) =>
              setCourseForm((current) => ({ ...current, title: event.target.value }))
            }
            placeholder="e.g. Advanced React Patterns"
          />
        </label>
        <label>
          Instructor
          <input
            type="text"
            value={courseForm.instructor}
            onChange={(event) =>
              setCourseForm((current) => ({ ...current, instructor: event.target.value }))
            }
            placeholder="e.g. John Doe"
          />
        </label>
        <label>
          YouTube Video Link
          <input
            type="url"
            value={courseForm.videoUrl}
            onChange={(event) =>
              setCourseForm((current) => ({ ...current, videoUrl: event.target.value }))
            }
            placeholder="https://www.youtube.com/watch?v=..."
          />
        </label>
        <label>
          Description
          <textarea
            value={courseForm.description}
            onChange={(event) =>
              setCourseForm((current) => ({ ...current, description: event.target.value }))
            }
            placeholder="A short description of the course"
            rows={3}
          />
        </label>
        <button type="submit" className="primary-btn">
          Add Course
        </button>
      </form>
      <button type="button" className="secondary-btn" onClick={onResetCourses}>
        Reset to Default 10 Courses
      </button>

      <div className="remove-block">
        <h3>Remove From Dashboard</h3>
        <div className="remove-list">
          {courses.map((course) => (
            <button
              key={course.id}
              type="button"
              className="remove-item"
              onClick={() => onRemoveCourse?.(course.id)}
            >
              <span>{course.title}</span>
              <span>Remove</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AdminPanel
