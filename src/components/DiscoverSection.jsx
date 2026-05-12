const roleBuckets = [
  {
    title: "Data Roles",
    colorClass: "role-card data",
    items: [
      {
        name: "Data Analyst",
        instructor: "Microsoft",
        description:
          "Analyze real datasets using Excel, SQL, and visualization tools.",
        videoUrl: "https://www.youtube.com/watch?v=r-uOLxNrNk8",
        imageUrl: "https://placehold.co/96x64/CFFAFE/155E75.png?text=DA",
      },
      {
        name: "Business Intelligence",
        instructor: "IBM",
        description: "Create BI dashboards and reporting workflows end-to-end.",
        videoUrl: "https://www.youtube.com/watch?v=AGrl-H87pRU",
        imageUrl: "https://placehold.co/96x64/A5F3FC/0E7490.png?text=BI",
      },
      {
        name: "SQL Developer",
        instructor: "Oracle",
        description: "Master SQL querying, optimization, and schema design.",
        videoUrl: "https://www.youtube.com/watch?v=HXV3zeQKqGY",
        imageUrl: "https://placehold.co/96x64/BAE6FD/075985.png?text=SQL",
      },
    ],
  },
  {
    title: "Tech Roles",
    colorClass: "role-card tech",
    items: [
      {
        name: "Front-End Developer",
        instructor: "Meta",
        description: "Build modern responsive apps with React and JavaScript.",
        videoUrl: "https://www.youtube.com/watch?v=w7ejDZ8SWv8",
        imageUrl: "https://placehold.co/96x64/DDD6FE/5B21B6.png?text=FE",
      },
      {
        name: "Cloud Engineer",
        instructor: "AWS",
        description: "Understand cloud architecture, services, and deployment.",
        videoUrl: "https://www.youtube.com/watch?v=SOTamWNgDKc",
        imageUrl: "https://placehold.co/96x64/E9D5FF/6B21A8.png?text=CE",
      },
      {
        name: "Cybersecurity Analyst",
        instructor: "Google",
        description: "Learn threat detection, response, and security basics.",
        videoUrl: "https://www.youtube.com/watch?v=U_P23SqJaDc",
        imageUrl: "https://placehold.co/96x64/F3E8FF/7E22CE.png?text=CS",
      },
    ],
  },
  {
    title: "Business Roles",
    colorClass: "role-card business",
    items: [
      {
        name: "Digital Marketing",
        instructor: "Meta",
        description:
          "Build campaigns, content strategy, and growth fundamentals.",
        videoUrl: "https://www.youtube.com/watch?v=nU-IIXBWlS4",
        imageUrl: "https://placehold.co/96x64/BFE6FF/0C4A6E.png?text=DM",
      },
    ],
  },
];

function DiscoverSection({ onRoleSelect, searchQuery = "" }) {
  const term = searchQuery.trim().toLowerCase();
  const filteredBuckets = roleBuckets
    .map((bucket) => ({
      ...bucket,
      items: bucket.items.filter((item) =>
        item.name.toLowerCase().includes(term),
      ),
    }))
    .filter((bucket) => bucket.items.length > 0 || !term);

  return (
    <section className="discover-shell">
      <h2>Prepare for an in-demand career</h2>
      <p className="helper-text">
        Discover guided learning paths inspired by EduNexa categories.
      </p>
      <div className="role-grid">
        {filteredBuckets.map((bucket) => (
          <article key={bucket.title} className={bucket.colorClass}>
            <h3>{bucket.title}</h3>
            {bucket.items.map((item) => (
              <button
                key={item.name}
                type="button"
                className="role-item"
                onClick={() => onRoleSelect(item)}
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="role-thumb"
                />
                <span>
                  <strong>{item.name}</strong>
                  <small>Professional Certificate • 4.7</small>
                </span>
              </button>
            ))}
          </article>
        ))}
      </div>
    </section>
  );
}

export default DiscoverSection;
