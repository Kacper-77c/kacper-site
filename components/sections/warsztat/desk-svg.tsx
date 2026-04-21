"use client";

export function DeskSVG() {
  return (
    <svg
      viewBox="0 0 800 600"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-hidden="true"
    >
      <defs>
        <style>{`
          .hand-drawn {
            fill: none;
            stroke: var(--color-earth);
            stroke-width: 2.5;
            stroke-linecap: round;
            stroke-linejoin: round;
          }
          .hand-drawn-thin {
            fill: none;
            stroke: var(--color-earth);
            stroke-width: 1.5;
            stroke-linecap: round;
            stroke-linejoin: round;
          }
          .hand-drawn-bold {
            fill: none;
            stroke: var(--color-earth);
            stroke-width: 3;
            stroke-linecap: round;
            stroke-linejoin: round;
          }
          .coffee-spill {
            fill: var(--color-earth);
            opacity: 0.5;
          }
          .paper-tint {
            fill: var(--color-earth);
            opacity: 0.08;
          }
        `}</style>
      </defs>

      <path className="hand-drawn-bold" d="M 80 430 L 720 425 L 750 460 L 50 465 Z" />
      <path className="hand-drawn" d="M 80 430 L 50 465" />
      <path className="hand-drawn" d="M 720 425 L 750 460" />

      <path className="hand-drawn" d="M 110 465 L 108 570 M 145 465 L 147 570" />
      <path className="hand-drawn" d="M 650 465 L 652 570 M 685 465 L 687 570" />
      <path
        className="hand-drawn-thin"
        d="M 40 575 L 760 572"
        strokeDasharray="4 6"
        opacity="0.5"
      />

      <rect x="460" y="140" width="230" height="170" className="hand-drawn-bold" rx="4" />
      <path className="hand-drawn" d="M 450 150 Q 440 225 450 305 L 460 310" />
      <path className="hand-drawn" d="M 690 150 Q 700 225 690 305 L 680 310" />
      <path className="hand-drawn" d="M 450 150 L 460 140" />
      <path className="hand-drawn" d="M 690 150 L 680 140" />
      <path className="hand-drawn" d="M 450 305 L 460 310" />
      <path className="hand-drawn" d="M 690 305 L 680 310" />

      <path
        className="hand-drawn"
        d="M 560 310 L 555 370 L 595 370 L 590 310 M 555 370 L 540 385 L 610 385 L 595 370"
      />

      <path className="hand-drawn" d="M 420 395 L 650 390 L 660 420 L 410 425 Z" />
      <path
        className="hand-drawn-thin"
        d="M 430 402 L 645 398 M 430 410 L 645 406 M 430 418 L 645 414"
        opacity="0.4"
      />

      <path
        className="hand-drawn"
        d="M 230 340 L 225 420 Q 225 428 233 428 L 297 428 Q 305 428 305 420 L 300 340 Z"
      />
      <ellipse cx="265" cy="340" rx="37" ry="6" className="hand-drawn" />
      <path className="hand-drawn" d="M 305 355 Q 330 358 330 380 Q 330 402 305 405" />
      <ellipse cx="265" cy="345" rx="32" ry="4" className="coffee-spill" />

      <g className="animate-steam" style={{ transformOrigin: "265px 340px" }}>
        <path
          className="hand-drawn-thin"
          d="M 245 325 Q 250 315 245 305 Q 240 295 248 285"
          opacity="0.4"
        />
        <path
          className="hand-drawn-thin"
          d="M 270 320 Q 275 310 270 300 Q 265 290 273 280"
          opacity="0.3"
        />
        <path
          className="hand-drawn-thin"
          d="M 285 325 Q 290 315 285 305 Q 280 295 288 285"
          opacity="0.35"
        />
      </g>

      <path
        className="coffee-spill"
        d="M 200 435 Q 180 432 170 445 Q 160 458 175 470 Q 195 478 215 465 Q 225 450 210 438 Q 205 434 200 435 Z"
      />
      <ellipse cx="155" cy="462" rx="8" ry="4" className="coffee-spill" />

      <g className="animate-coffee-drip" style={{ transformOrigin: "195px 435px" }}>
        <ellipse cx="195" cy="435" rx="2.5" ry="4" className="coffee-spill" />
      </g>

      <path className="hand-drawn" d="M 340 370 L 335 430 L 415 428 L 420 368 Z" />
      <path className="hand-drawn" d="M 378 369 L 377 429" />
      <path className="paper-tint" d="M 340 370 L 335 430 L 377 429 L 378 369 Z" />
      <path className="paper-tint" d="M 378 369 L 377 429 L 415 428 L 420 368 Z" />
      <path
        className="hand-drawn-thin"
        d="M 345 385 L 372 384 M 345 395 L 370 393 M 345 405 L 368 404"
        opacity="0.5"
      />
      <path
        className="hand-drawn-thin"
        d="M 385 383 L 410 381 M 385 393 L 408 392 M 385 403 L 412 401 M 385 413 L 405 411"
        opacity="0.5"
      />

      <path className="hand-drawn-thin" d="M 575 385 Q 580 410 570 420" opacity="0.5" />

      <path className="hand-drawn-thin" d="M 380 415 L 430 412" />
      <circle cx="378" cy="415" r="3" className="hand-drawn-thin" />
    </svg>
  );
}
