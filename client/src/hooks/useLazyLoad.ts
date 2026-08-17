import { useEffect, useRef, useState } from 'react';

interface UseLazyLoadOptions {
  threshold?: number;
  rootMargin?: string;
}

/**
 * Hook personalizado para lazy loading de imágenes usando Intersection Observer
 * Mejora el rendimiento cargando imágenes solo cuando están cerca de ser visibles
 */
export function useLazyLoad(options: UseLazyLoadOptions = {}) {
  const { threshold = 0.1, rootMargin = '50px' } = options;
  const ref = useRef<HTMLImageElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold, rootMargin]);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  return {
    ref,
    isVisible,
    isLoaded,
    onLoad: handleImageLoad,
  };
}
