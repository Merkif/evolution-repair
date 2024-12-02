import { gsap } from 'gsap';

/**
 * Animate elements on scroll using GSAP fromTo and IntersectionObserver.
 *
 * @param {string} selector - CSS selector for the elements to observe.
 * @param {object} animationOptions - GSAP animation options (e.g., stagger, duration).
 * @param {object} observerOptions - IntersectionObserver options (e.g., threshold).
 */
export function animateOnScroll(selector, animationOptions = {}, observerOptions = { threshold: 0.3 }) {
  const defaultAnimation = {
    from: { opacity: 0, scale: 0.92, },
    to: { opacity: 1, scale: 1, stagger: 0.2, ease: 'power1.out' },
  };

  // Merge user-defined options with defaults
  const gsapOptions = { ...defaultAnimation, ...animationOptions };

  // Set initial state for elements to prevent flickering
  const elements = gsap.utils.toArray(selector);
  elements.forEach(el => {
    gsap.set(el, gsapOptions.from); // Устанавливаем начальное состояние
  });

  // Create IntersectionObserver
  const observer = new IntersectionObserver((entries, observerInstance) => {
    const targets = entries
      .filter(entry => entry.isIntersecting)
      .map(entry => {
        observerInstance.unobserve(entry.target); // Останавливаем наблюдение за элементом после анимации
        return entry.target;
      });

    if (targets.length > 0) {
      // Use GSAP fromTo animation
      gsap.fromTo(
        targets,
        gsapOptions.from, // Start state
        gsapOptions.to    // End state
      );
    }
  }, observerOptions);

  // Observe elements
  elements.forEach(el => {
    observer.observe(el);
  });
}
