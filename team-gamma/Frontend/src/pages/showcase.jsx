import "../styles/showcase.css";

const projects = [
  {
    title: "Restaurant Website",
    category: "Food & Beverage",
    image: "/samples/restaurant.jpg",
    demo: "https://restaurant-demo.vercel.app"
  },
  {
    title: "Dental Clinic",
    category: "Healthcare",
    image: "/samples/dental.jpg",
    demo: "https://dental-demo.vercel.app"
  },
  {
    title: "Gym Landing Page",
    category: "Fitness",
    image: "/samples/gym.jpg",
    demo: "https://gym-demo.vercel.app"
  },
  {
    title: "Fashion Store",
    category: "E-Commerce",
    image: "/samples/fashion.jpg",
    demo: "https://fashion-demo.vercel.app"
  },
  {
    title: "Real Estate",
    category: "Business",
    image: "/samples/realestate.jpg",
    demo: "https://realestate-demo.vercel.app"
  },
  {
    title: "Portfolio",
    category: "Personal Brand",
    image: "/samples/portfolio.jpg",
    demo: "https://portfolio-demo.vercel.app"
  }
];

export default function Showcase() {
    return (
      
        <div className="showcase-page">
            <section className="showcase-hero">

    <span className="hero-badge">
        Premium Portfolio
    </span>

    <h1>
        Websites That <span>Convert.</span>
    </h1>

    <p>
        Explore high-performance websites crafted for startups,
        local businesses and growing brands.
    </p>

    <div className="hero-buttons">
        <a href="#projects" className="primary-btn">
            Explore Projects
        </a>

        <a href="/checkout" className="secondary-btn">
            Start Your Project
        </a>
    </div>

</section>

      <div className="showcase-header">
        <h1>Our Website Portfolio</h1>
        <p>
          Explore sample websites built by Vivid Nexus.
        </p>
      </div>

      <div className="showcase-grid">

        {projects.map((project) => (

          <div className="showcase-card" key={project.title}>

            <img
              src={project.image}
              alt={project.title}
              className="showcase-image"
            />

            <div className="showcase-content">

              <div className="showcase-category">
                {project.category}
              </div>

              <div className="showcase-title">
                {project.title}
              </div>

              <p className="showcase-description">
                Modern responsive website designed for businesses.
              </p>

              <div className="showcase-features">
                <span className="feature-pill">Responsive</span>
                <span className="feature-pill">SEO</span>
                <span className="feature-pill">Fast</span>
                <span className="feature-pill">Modern UI</span>
              </div>

              <div className="showcase-buttons">

                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="showcase-btn showcase-btn-primary"
                >
                  Live Demo
                </a>

               

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}