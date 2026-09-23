"use client";

import { useId } from "react";

/** A lightweight, articulated studio mascot. Every moving part stays vector-sharp. */
export function NoerongBot({ compact = false }: { compact?: boolean }) {
  const id = useId().replaceAll(":", "");
  const paint = (name: string) => `url(#${id}-${name})`;
  return <svg className={`noerong-bot${compact ? " noerong-bot-compact" : ""}`} viewBox="0 0 240 280" fill="none" aria-hidden="true" focusable="false">
    <defs>
      <linearGradient id={`${id}-ceramic`} x1="65" y1="85" x2="185" y2="234" gradientUnits="userSpaceOnUse"><stop stopColor="var(--bot-shell-light,#fffdf7)" /><stop offset=".4" stopColor="var(--bot-shell-mid,#eee9dd)" /><stop offset=".78" stopColor="var(--bot-shell-shade,#d8d1c2)" /><stop offset="1" stopColor="var(--bot-shell-dark,#aaa598)" /></linearGradient>
      <linearGradient id={`${id}-head`} x1="65" y1="46" x2="165" y2="137" gradientUnits="userSpaceOnUse"><stop stopColor="var(--bot-head-light,#fffefa)" /><stop offset=".52" stopColor="var(--bot-head-mid,#f0ece2)" /><stop offset="1" stopColor="var(--bot-head-dark,#b8b2a6)" /></linearGradient>
      <linearGradient id={`${id}-glass`} x1="78" y1="65" x2="149" y2="125" gradientUnits="userSpaceOnUse"><stop stopColor="#41443f" /><stop offset=".45" stopColor="#222721" /><stop offset="1" stopColor="#111710" /></linearGradient>
      <linearGradient id={`${id}-arm`} x1="152" y1="94" x2="199" y2="173" gradientUnits="userSpaceOnUse"><stop stopColor="var(--bot-arm-light,#fffdf6)" /><stop offset=".56" stopColor="var(--bot-arm-mid,#e8e1d2)" /><stop offset="1" stopColor="var(--bot-arm-dark,#bab3a6)" /></linearGradient>
      <linearGradient id={`${id}-accent`} x1="91" y1="147" x2="153" y2="203" gradientUnits="userSpaceOnUse"><stop stopColor="#d67a52" /><stop offset=".6" stopColor="#bc4a2a" /><stop offset="1" stopColor="#843e2b" /></linearGradient>
      <radialGradient id={`${id}-shadow`}><stop stopColor="#39392c" stopOpacity=".23" /><stop offset="1" stopColor="#39392c" stopOpacity="0" /></radialGradient>
    </defs>
    <ellipse className="bot-ground-shadow" cx="118" cy="262" rx="75" ry="11" fill={paint("shadow")} />
    <g className="bot-float">
      <g className="bot-left-arm">
        <path d="M72 142C59 142 44 170 39 194C36 209 42 220 49 211C63 194 74 168 79 153C81 148 78 144 72 142Z" fill={paint("ceramic")} stroke="#b3ad9e" strokeWidth="1.1" />
        <path d="M67 151C56 166 48 184 44 200" stroke="#fffefa" strokeOpacity=".8" strokeWidth="2.5" strokeLinecap="round" />
      </g>
      <path d="M96 127L96 147H143L139 126" fill="#7d7c70" />
      <path d="M74 143C82 134 100 134 119 134C138 134 155 136 165 146C174 162 173 199 161 225C150 247 92 247 79 225C66 200 64 161 74 143Z" fill={paint("ceramic")} stroke="#aaa696" strokeWidth="1.2" />
      <path d="M80 151C79 174 80 212 91 226" stroke="#fffefa" strokeOpacity=".85" strokeWidth="4" strokeLinecap="round" />
      <path d="M96 232C111 238 138 237 149 231" stroke="#9e998c" strokeOpacity=".55" strokeWidth="1.5" strokeLinecap="round" />
      <rect x="89" y="161" width="62" height="42" rx="14" fill={paint("accent")} stroke="#aa512f" strokeWidth="1" />
      <path d="M101 175V188M101 179C102 173 113 173 113 180V188" stroke="#fff6e4" strokeWidth="4" strokeLinecap="round" />
      <circle cx="139" cy="181" r="3" fill="#f8d9ad" />
      <path d="M96 214H106M114 214H124" stroke="#948e81" strokeWidth="2" strokeLinecap="round" />
      <circle className="bot-heart" cx="144" cy="214" r="2.6" fill="#bb4c30" />
      <g className="bot-wave-arm">
        <g transform="translate(236 0) scale(-1 1)">
          <path d="M72 142C59 142 44 170 39 194C36 209 42 220 49 211C63 194 74 168 79 153C81 148 78 144 72 142Z" fill={paint("ceramic")} stroke="#b3ad9e" strokeWidth="1.1" />
          <path d="M67 151C56 166 48 184 44 200" stroke="#fffefa" strokeOpacity=".8" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      </g>
      <g className="bot-head">
        <path d="M55 87C55 58 79 41 117 41C155 41 180 59 180 87C180 117 157 138 117 138C78 138 55 117 55 87Z" fill={paint("head")} stroke="#b5afa1" strokeWidth="1.1" />
        <path d="M70 59C85 51 103 50 119 50" stroke="#fffefa" strokeWidth="3" strokeLinecap="round" />
        <path d="M67 80C69 65 87 61 118 61C149 61 164 67 167 81L166 105C163 120 147 126 117 126C87 126 70 119 67 105Z" fill={paint("glass")} stroke="#676a5c" strokeWidth="1.4" />
        <path d="M76 76C87 68 101 67 114 67" stroke="#faf6df" strokeOpacity=".14" strokeWidth="3" strokeLinecap="round" />
        <g className="bot-eyes">
          <path d="M84 93C84 80 99 80 99 93" stroke="#f3c395" strokeWidth="6" strokeLinecap="round" />
          <path d="M135 93C135 80 150 80 150 93" stroke="#f3c395" strokeWidth="6" strokeLinecap="round" />
        </g>
        <path className="bot-smile" d="M105 107C112 116 124 116 131 106" stroke="#f3c395" strokeWidth="3.5" strokeLinecap="round" />
        <ellipse cx="84" cy="106" rx="7" ry="3" fill="#b45b3f" opacity=".5" /><ellipse cx="151" cy="106" rx="7" ry="3" fill="#b45b3f" opacity=".5" />
        <circle cx="61" cy="97" r="2.5" fill="#a99b85" /><circle cx="173" cy="97" r="2.5" fill="#a99b85" />
      </g>
      <g className="bot-hello-marks" stroke="#bd4c2c" strokeWidth="2.5" strokeLinecap="round">
        <path d="M214 56L219 49M223 66L232 64M207 47L207 39" />
      </g>
    </g>
  </svg>;
}
