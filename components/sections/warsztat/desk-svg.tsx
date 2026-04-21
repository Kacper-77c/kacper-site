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
            opacity: 0.85;
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
        d="M 560 310 L 555 400 L 595 400 L 590 310 M 555 400 L 535 428 L 615 428 L 595 400"
      />

      <path className="hand-drawn" d="M 450 440 L 670 435 L 685 475 L 435 480 Z" />
      <path
        className="hand-drawn-thin"
        d="M 460 450 L 670 446 M 460 460 L 670 456 M 460 470 L 670 466"
        opacity="0.5"
      />
      <path
        className="hand-drawn-thin"
        d="M 490 447 L 490 472 M 530 446 L 530 472 M 570 445 L 570 471 
       M 610 444 L 610 470 M 650 443 L 650 469"
        opacity="0.3"
      />

      <path
        className="hand-drawn"
        d="M 238 370 L 235 425 Q 235 432 242 432 L 288 432 Q 295 432 295 425 L 292 370 Z"
      />
      <ellipse cx="265" cy="370" rx="28" ry="5" className="hand-drawn" />
      <path className="hand-drawn" d="M 295 382 Q 315 384 315 400 Q 315 416 295 418" />
      <ellipse cx="265" cy="374" rx="24" ry="3" className="coffee-spill" />

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
        d="M 170 445 Q 145 442 135 458 Q 125 475 150 485 Q 180 490 200 478 Q 215 465 200 448 Q 185 442 170 445 Z"
      />
      <ellipse cx="125" cy="482" rx="10" ry="5" className="coffee-spill" />
      <ellipse cx="220" cy="490" rx="5" ry="3" className="coffee-spill" opacity="0.6" />

      <g className="animate-coffee-drip" style={{ transformOrigin: "165px 448px" }}>
        <ellipse cx="165" cy="448" rx="3" ry="5" className="coffee-spill" />
      </g>

      <path className="hand-drawn" d="M 325 355 L 320 430 L 425 428 L 428 353 Z" />
      <path className="hand-drawn" d="M 376 354 L 374 429" />
      <path className="paper-tint" d="M 325 355 L 320 430 L 374 429 L 376 354 Z" />
      <path className="paper-tint" d="M 376 354 L 374 429 L 425 428 L 428 353 Z" />
      <path
        className="hand-drawn-thin"
        d="M 332 375 L 368 374 M 332 388 L 365 387 M 332 401 L 362 400 
       M 332 414 L 366 413"
        opacity="0.5"
      />
      <path
        className="hand-drawn-thin"
        d="M 384 373 L 420 371 M 384 386 L 418 385 M 384 399 L 422 397 
       M 384 412 L 416 411"
        opacity="0.5"
      />

      <path className="hand-drawn-thin" d="M 575 385 Q 580 410 570 420" opacity="0.5" />

      <path className="hand-drawn-thin" d="M 380 415 L 430 412" />
      <circle cx="378" cy="415" r="3" className="hand-drawn-thin" />
    </svg>
  );
}
