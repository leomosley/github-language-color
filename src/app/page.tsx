"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [language, setLanguage] = useState('');
  const [color, setColor] = useState('');

  useEffect(() => {
    const lang = searchParams.get('language') || '';
    setLanguage(lang);
  }, [searchParams]);

  useEffect(() => {
    async function fetchLanguage() {
      let res = await fetch(`https://github-language-color.shuttleapp.rs/${language}`);
      let data = await res.json();
      setColor(data);
    }
  }, [language]);

  const updateSearchParam = () => {
    router.push(`?language=${encodeURIComponent(language)}`);
  };

  return (
    <div className="flex justify-center items-center h-screen p-4">
      <div className="border border-neutral-400 shadow-lg p-4 rounded-lg">
        <input
          className="bg-transparent"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          onBlur={updateSearchParam}
          type="text"
          autoFocus
          autoCorrect="false"
          autoCapitalize="false"
          autoComplete="false"
        />
      </div>
      {color}
    </div>
  );
}
