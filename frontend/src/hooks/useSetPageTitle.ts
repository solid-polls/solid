import { useEffect } from 'react';

export default function useSetPageTitle(title: string) {
  useEffect(() => {
    const oldTitle = document.title;
    setPageTitle(title);
    return () => {
      document.title = oldTitle;
    };
  }, [title]);
}

export function setPageTitle(title: string) {
  document.title = title + ' | SolidPolls';
}
