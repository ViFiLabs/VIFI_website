import { useEffect, useState } from 'react';

/**
 * Detects whether the viewport is at least Tailwind's lg breakpoint (1024px).
 * Falls back to true during SSR so layout renders in an expanded state.
 */
export default function useIsLargeScreen() {
  const [isLarge, setIsLarge] = useState<boolean | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const query = window.matchMedia('(min-width: 1024px)');
    const update = () => setIsLarge(query.matches);

    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  return isLarge ?? true;
}
