import React, { useEffect, useRef } from "react";
import styles from './Projects.module.css';

const Slider: React.FC = () => {
  const slidingBlocked = useRef(false);
  const slidingAT = 1300; // animation time in ms

  useEffect(() => {
    const slides = Array.from(document.querySelectorAll(`.${styles.slide}`));
    const controls = Array.from(document.querySelectorAll(`.${styles.slider__control}`));

    slides.forEach(($el, i) => {
      $el.classList.add(styles[`slide-${i + 1}`]);
      $el.setAttribute("data-slide", (i + 1).toString());
    });

    const controlClickHandler = function (this: Element) {
      if (slidingBlocked.current) return;
      slidingBlocked.current = true;

      const $control = this;
      const isRight = $control.classList.contains(styles["m--right"]);
      const $curActive = document.querySelector(`.${styles.slide}.${styles["s--active"]}`);
      if (!$curActive) return;
      let index = Number($curActive.getAttribute("data-slide") ?? 1);

      index = isRight ? index + 1 : index - 1;
      const numOfSlides = slides.length;
      if (index < 1) index = numOfSlides;
      if (index > numOfSlides) index = 1;

      const $newActive = document.querySelector(`.${styles[`slide-${index}`]}`);
      if (!$newActive) return;

      $control.classList.add(styles["a--rotation"]);
      $curActive.classList.remove(styles["s--active"], styles["s--active-prev"]);
      const prevSlide = document.querySelector(`.${styles.slide}.${styles["s--prev"]}`);
      if (prevSlide) prevSlide.classList.remove(styles["s--prev"]);

      $newActive.classList.add(styles["s--active"]);
      if (!isRight) $newActive.classList.add(styles["s--active-prev"]);

      let prevIndex = index - 1;
      if (prevIndex < 1) prevIndex = numOfSlides;

      const $prev = document.querySelector(`.${styles[`slide-${prevIndex}`]}`);
      if ($prev) $prev.classList.add(styles["s--prev"]);

      setTimeout(() => {
        $control.classList.remove(styles["a--rotation"]);
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
  }, [styles]);

  return (
    <div className={styles.slider} id="projects">
      <div className={styles.slider__slides}>
        <div className={`${styles.slide} ${styles["s--active"]}`}>
          <div className={styles.slide__inner}>
            <div className={styles.slide__content}>
              <h2 className={styles.slide__heading}>RCC PROJECTS</h2>
              <p className={styles.slide__text}>Projects. Precision. Performance.</p>
            </div>
          </div>
        </div>
        <div className={styles.slide}>
          <div className={styles.slide__inner}>
            <div className={styles.slide__content}>
              <h2 className={styles.slide__heading}>Wind Farm</h2>
              <p className={styles.slide__text}>Projects. Precision. Performance.</p>
            </div>
          </div>
        </div>
        {/* <div className={styles.slide}>
          <div className={styles.slide__inner}>
            <div className={styles.slide__content}>
              <h2 className={styles.slide__heading}>Tanawon</h2>
              <p className={styles.slide__text}>Projects. Precision. Performance.</p>
            </div>
          </div>
        </div> */}
      </div>

      <div className={styles.slider__control}>
        <div className={styles.slider__control_line}></div>
        <div className={styles.slider__control_line}></div>
      </div>

      <div className={`${styles.slider__control} ${styles["slider__control--right"]} ${styles["m--right"]}`}>
        <div className={styles.slider__control_line}></div>
        <div className={styles.slider__control_line}></div>
      </div>
    </div>
  );
};

export default Slider;
