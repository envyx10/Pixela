'use client'

import { useEffect } from 'react';

export default function CleanVerifiedParam() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has('verified')) {
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  return null;
}