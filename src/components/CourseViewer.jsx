const getEmbedUrl = (url) => {
  if (!url) return ''

  try {
    const parsed = new URL(url)
    if (parsed.hostname.includes('youtu.be')) {
      const id = parsed.pathname.replace('/', '')
      return `https://www.youtube.com/embed/${id}`
    }

    if (parsed.hostname.includes('youtube.com')) {
      const id = parsed.searchParams.get('v')
      if (id) return `https://www.youtube.com/embed/${id}`
    }
  } catch {
    return ''
  }

  return ''
}

function CourseViewer({ selectedCourse, role }) {
  const embedUrl = getEmbedUrl(selectedCourse?.videoUrl)

  if (!selectedCourse) {
    return (
      <section className="viewer-panel card">
        <h2>No course selected</h2>
      </section>
    )
  }

  return (
    <section className="viewer-panel card">
      <div className="video-wrapper">
        {embedUrl ? (
          <iframe
            src={embedUrl}
            title={selectedCourse.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <div className="video-fallback">Invalid YouTube link</div>
        )}
      </div>

      <div className="viewer-content">
        <h2>{selectedCourse.title}</h2>
        <p className="course-meta">
          {role === 'admin' ? 'Admin Preview' : 'Student View'} • Instructor: {selectedCourse.instructor}
        </p>
        <p>{selectedCourse.description}</p>
        <a href={selectedCourse.videoUrl} target="_blank" rel="noreferrer" className="video-link">
          Open Video Link
        </a>
      </div>
    </section>
  )
}

export default CourseViewer
