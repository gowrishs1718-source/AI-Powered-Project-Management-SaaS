


import "./App.css";

function App() {
  const projects = [
    {
      id: 1,
      name: "Website Redesign",
      category: "Design",
      progress: 75,
      color: "#7c5cff",
    },
    {
      id: 2,
      name: "SaaS Dashboard",
      category: "Development",
      progress: 45,
      color: "#159d91",
    },
    {
      id: 3,
      name: "AI Integration",
      category: "Artificial Intelligence",
      progress: 25,
      color: "#e6a23c",
    },
  ];

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <h2 className="brand">TaskFlow<span>.</span></h2>

        <p className="menu-label">WORKSPACE</p>

        <nav>
          <a className="nav-link active" href="#overview">
            ◫ Overview
          </a>
          <a className="nav-link" href="#projects">
            ▣ Projects
          </a>
          <a className="nav-link" href="#tasks">
            ✓ My Tasks
          </a>
          <a className="nav-link" href="#team">
            ♧ Team
          </a>
        </nav>

        <div className="sidebar-bottom">
          <div className="avatar">G</div>
          <div>
            <strong>My Workspace</strong>
            <p>Free Plan</p>
          </div>
        </div>
      </aside>

      <main className="main-content" id="overview">
        <header className="topbar">
          <div>
            <p className="eyebrow">WORKSPACE / OVERVIEW</p>
            <h1>Good evening! 👋</h1>
            <p className="subtitle">
              Here's what's happening with your projects.
            </p>
          </div>

          <button className="primary-button">
            + New Project
          </button>
        </header>

        <section className="stats-grid" id="tasks">
          <div className="stat-card">
            <p>Total Projects</p>
            <h2>12</h2>
            <span>Across your workspace</span>
          </div>

          <div className="stat-card">
            <p>Active Tasks</p>
            <h2>24</h2>
            <span>Tasks in progress</span>
          </div>

          <div className="stat-card">
            <p>Completed</p>
            <h2>86</h2>
            <span>Tasks finished</span>
          </div>

          <div className="stat-card">
            <p>Team Members</p>
            <h2>08</h2>
            <span>Collaborating together</span>
          </div>
        </section>

        <section className="projects-section" id="projects">
          <div className="section-heading">
            <div>
              <h2>Your Projects</h2>
              <p>Track progress across your workspace.</p>
            </div>
            <a href="#projects">View all →</a>
          </div>

          <div className="projects-grid">
            {projects.map((project) => (
              <article className="project-card" key={project.id}>
                <div className="project-top">
                  <span
                    className="project-icon"
                    style={{ color: project.color }}
                  >
                    ◆
                  </span>
                  <span className="project-status">In progress</span>
                </div>

                <p className="category">{project.category}</p>
                <h3>{project.name}</h3>

                <div className="progress-label">
                  <span>Progress</span>
                  <strong>{project.progress}%</strong>
                </div>

                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${project.progress}%`,
                      backgroundColor: project.color,
                    }}
                  />
                </div>
              </article>
            ))}
          </div>
        </section>

        <footer>
          TaskFlow © 2026 · Built with React
        </footer>
      </main>
    </div>
  );
}

export default App;
