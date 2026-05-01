"use client";

import { useEffect, useState } from "react";

interface TypedEmailProps {
  email: string;
  charDelay?: number;
  startDelay?: number;
}

export default function TypedEmail({
  email,
  charDelay = 50,
  startDelay = 0,
}: TypedEmailProps) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let mounted = true;
    let interval: ReturnType<typeof setInterval> | undefined;

    const timeout = setTimeout(() => {
      if (!mounted) return;

      let index = 0;
      interval = setInterval(() => {
        if (!mounted) {
          if (interval) clearInterval(interval);
          return;
        }

        index += 1;
        setDisplayed(email.slice(0, index));

        if (index >= email.length && interval) {
          clearInterval(interval);
        }
      }, charDelay);
    }, startDelay);

    return () => {
      mounted = false;
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [email, charDelay, startDelay]);

  return (
    <a
      href={`mailto:${email}`}
      className="font-mono hover:text-stamp transition-colors duration-200"
      aria-label={`Wyślij email do ${email}`}
    >
      {displayed}
      <span aria-hidden="true" className="opacity-0">
        {email.slice(displayed.length)}
      </span>
    </a>
  );
}
