import React, { useEffect, useRef, useState } from "react";
import styles from "./Projects.module.css";

const API_BASE = "https://www.rcccabling.com.ph/api";

interface Project {
  id: string;
  title: string;
  details: string;
  image: string; // URL or base64 string
}

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const slidingBlocked = useRef(false);
  const slidingAT = 1300; // animation time in ms

  // Fetch project data from the API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`${API_BASE}/projects.php`);
        const data = await res.json();
        if (data && data.length > 0) {
          setProjects(data);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Slider functionality (updated to keep image & text in sync)
  useEffect(() => {
    if (projects.length === 0) return;

    const slides = Array.from(document.querySelectorAll(`.${styles.slide}`));
    const controls = Array.from(
      document.querySelectorAll(`.${styles.slider__control}`)
    );

    slides.forEach(($el, i) => {
      $el.classList.add(styles[`slide-${i + 1}`]);
      $el.setAttribute("data-slide", (i + 1).toString());
    });

    const controlClickHandler = function (this: Element) {
      if (slidingBlocked.current) return;
      slidingBlocked.current = true;

      const isRight = this.classList.contains(styles["m--right"]);
      const $curActive = document.querySelector(
        `.${styles.slide}.${styles["s--active"]}`
      );
      if (!$curActive) return;

      let index = Number($curActive.getAttribute("data-slide") ?? 1);
      index = isRight ? index + 1 : index - 1;

      const numOfSlides = slides.length;
      if (index < 1) index = numOfSlides;
      if (index > numOfSlides) index = 1;

      const $newActive = slides[index - 1]; // keep DOM order consistent
      if (!$newActive) return;

      // Reset all slides first
      slides.forEach((s) => {
        s.classList.remove(
          styles["s--active"],
          styles["s--active-prev"],
          styles["s--prev"]
        );
      });

      // Activate new slide
      $newActive.classList.add(styles["s--active"]);
      if (!isRight) $newActive.classList.add(styles["s--active-prev"]);

      // Mark previous slide properly
      let prevIndex = index - 1;
      if (prevIndex < 1) prevIndex = numOfSlides;
      slides[prevIndex - 1].classList.add(styles["s--prev"]);

      setTimeout(() => {
        slidingBlocked.current = false;
      }, slidingAT * 0.75);
    };

    controls.forEach(($el) => {
      $el.addEventListener("click", controlClickHandler);
    });

    return () => {
      controls.forEach(($el) => {
        $el.removeEventListener("click", controlClickHandler);
      });
    };
  }, [projects]);

  return (
    <div className={styles.slider} id="projects">
      <div className={styles.slider__slides}>
        {loading ? (
          <div className={styles.slide}>
            <div className={styles.slide__inner}>
              <div className={styles.slide__content}>
                <h2 className={styles.slide__heading}>Loading Projects...</h2>
                <p className={styles.slide__text}>Please wait</p>
              </div>
            </div>
          </div>
        ) : (
          projects.map((project, index) => (
            <div
              key={project.id}
              className={`${styles.slide} ${
                index === 0 ? styles["s--active"] : ""
              }`}
              data-slide={index + 1}
            >
              <div className={styles.slide__inner}>
                <div
                  className={styles.slide__bg}
                  style={{
                    backgroundImage: `url(${project.image})`,
                  }}
                ></div>
                <div className={styles.slide__content}>
                  <h2 className={styles.slide__heading}>{project.title}</h2>
                  <p className={styles.slide__text}>
                    Projects. Precision. Performance.
                  </p>
                  <p className={styles.attribution}>{project.details}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Left Control */}
      <div className={styles.slider__control}>
        <div className={styles.slider__control_line}></div>
        <div className={styles.slider__control_line}></div>
      </div>

      {/* Right Control */}
      <div
        className={`${styles.slider__control} ${styles["slider__control--right"]} ${styles["m--right"]}`}
      >
        <div className={styles.slider__control_line}></div>
        <div className={styles.slider__control_line}></div>
      </div>
    </div>
  );
};

export default Projects;
