import fs from 'node:fs';
import path from 'node:path';

const panelLogo = path.resolve(
  '../hamravesh-etemadmelal/etemadmelal-frontend/components/logo/index.tsx',
);
const src = fs.readFileSync(panelLogo, 'utf8');
const start = src.indexOf('const LogoIcon =');
const svgStart = src.indexOf('<svg', start);
const svgEnd = src.indexOf('</svg>', svgStart) + 6;

let svg = src.slice(svgStart, svgEnd);
svg = svg
  .replace(/width=\{size\}/g, 'width="48"')
  .replace(/height=\{size\}/g, 'height="48"')
  .replace(/className=\{`[^`]*`\}/g, '')
  .replace(/\{\.\.\.props\}/g, '')
  .replace(/fill="currentColor"/, 'fill="none"')
  // Panel auth on dark (auth-parallax-shell): readable on #0b1219 backgrounds
  .replace(/stopColor=\{startColor\}/g, 'stop-color="#f0d78c"')
  .replace(/stopColor=\{stopColor\}/g, 'stop-color="#d4a853"');

const header = '<?xml version="1.0" encoding="UTF-8"?>\n';
fs.mkdirSync(path.resolve('public/media'), { recursive: true });
fs.writeFileSync(path.resolve('public/media/etemadmelal-logo.svg'), header + svg);
fs.writeFileSync(
  path.resolve('public/favicon.svg'),
  header + svg.replace('width="48"', 'width="32"').replace('height="48"', 'height="32"'),
);
console.log('Exported panel LogoIcon');
