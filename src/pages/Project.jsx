import React from "react";

const projects = [
  {
    id: 1,
    image:
      "/assets/project1.jpeg",
    title: "Residential Interior Design",
    description:
      "Elegant and personalized interiors crafted to enhance comfort, functionality, and modern living.",
  },
  {
    id: 2,
    image:
      "/assets/project2.jpeg",
    title: "Luxury Villa & Bungalow Design",
    description:
      "Sophisticated spaces designed with timeless aesthetics, premium finishes, and architectural harmony.",
  },
  {
    id: 3,
    image:
      "/assets/project3.jpeg",
    title: "Commercial Office Design",
    description:
      "Modern and functional office spaces designed to boost productivity and create a positive work environment.",
  },
  {
    id: 4,
    image:
      "/assets/project4.jpeg",
    title: "Space Planing & Layout Design",
    description:
      "Optimized space planning and layout design solutions that maximize functionality and flow for residential and commercial spaces.",
  },
  {
    id: 5,
    image:
      "/assets/project5.jpeg",
    title: "3D Visualization & Rendering",
    description:
      "Immersive 3D visualizations and high-quality renderings that bring design concepts to life.",
  },
  {
    id: 6,
    image:
      "/assets/project6.jpeg",
    title: "Turnkey Interior Design",
    description:
      "Complete interior design solutions from concept to completion, ensuring a seamless and stress-free experience.",
  },
  
];

const Project = () => {
  return (
    <>
      <section className="project-section">
        <div className="project-header">
          <span className="project-tag">
            FEATURED WORK
          </span>

          <h2>Signature Projects</h2>

          <h4>
            Designing Experiences That Make Brands Stand Out
          </h4>

          <p>
            Take a look at projects created to leave a lasting
            impression and drive results.
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((project) => (
            <div
              key={project.id}
              className="project-card"
            >
              <div className="image-wrapper">
                <img
                  src={project.image}
                  alt={project.title}
                />
              </div>

              <div className="project-content">
                <h3>{project.title}</h3>

                <p>{project.description}</p>

                <button>
                  View Project →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <style>{`
        .project-section {
          width: 100%;
          padding: 120px 8%;
          background: #f8f8f8;
        }

        .project-header {
          text-align: center;
          max-width: 800px;
          margin: 0 auto 80px;
        }

        .project-tag {
          display: inline-block;
          letter-spacing: 3px;
          font-size: 12px;
          color: #888;
          margin-bottom: 15px;
        }

        .project-header h2 {
          font-size: 64px;
          font-weight: 300;
          color: #111;
          margin-bottom: 20px;
        }

        .project-header h4 {
          font-size: 24px;
          color: #222;
          margin-bottom: 15px;
          font-weight: 500;
        }

        .project-header p {
          color: #666;
          font-size: 18px;
          line-height: 1.8;
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 50px;
        }

        .project-card {
          transition: 0.5s ease;
        }

        .project-card:hover {
          transform: translateY(-10px);
        }

        .image-wrapper {
          overflow: hidden;
          border-radius: 28px;
        }

        .image-wrapper img {
          width: 100%;
          height: 550px;
          object-fit: cover;
          display: block;
          transition: 0.8s ease;
        }

        .project-card:hover img {
          transform: scale(1.08);
        }

        .project-content {
          padding-top: 25px;
        }

        .project-content h3 {
          font-size: 34px;
          font-weight: 300;
          margin-bottom: 15px;
          color: #222;
        }

        .project-content p {
          font-size: 17px;
          line-height: 1.8;
          color: #666;
          margin-bottom: 20px;
        }

        .project-content button {
          border: none;
          background: transparent;
          font-size: 14px;
          letter-spacing: 2px;
          text-transform: uppercase;
          cursor: pointer;
          color: #111;
          position: relative;
        }

        .project-content button::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -5px;
          width: 0;
          height: 1px;
          background: #111;
          transition: 0.4s;
        }

        .project-content button:hover::after {
          width: 100%;
        }

        @media(max-width: 992px) {
          .projects-grid {
            grid-template-columns: 1fr;
          }

          .project-header h2 {
            font-size: 42px;
          }

          .project-header h4 {
            font-size: 20px;
          }

          .image-wrapper img {
            height: 400px;
          }

          .project-content h3 {
            font-size: 28px;
          }
        }
      `}</style>
    </>
  );
};

export default Project;