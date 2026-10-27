import React from 'react';
import './styles/PipelineDiagram.css';

const BOX_W = 200;
const BOX_H = 70;

function Box({ x, y, title, sub }) {
  return (
    <g transform={`translate(${x - BOX_W / 2}, ${y - BOX_H / 2})`}>
      <rect className="pd-box" width={BOX_W} height={BOX_H} />
      <text className="pd-title" x={BOX_W / 2} y={BOX_H / 2 - 3} textAnchor="middle">{title}</text>
      <text className="pd-sub" x={BOX_W / 2} y={BOX_H / 2 + 19} textAnchor="middle">{sub}</text>
    </g>
  );
}

function Arrow({ x1, y1, x2, y2, label, lx, ly, anchor = 'middle', head }) {
  return (
    <g>
      <line className="pd-line" x1={x1} y1={y1} x2={x2} y2={y2} markerEnd={`url(#${head})`} />
      {label && <text className="pd-label" x={lx} y={ly} textAnchor={anchor}>{label}</text>}
    </g>
  );
}

const Head = ({ id }) => (
  <defs>
    <marker id={id} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto">
      <path d="M0,0 L10,5 L0,10 z" className="pd-headpath" />
    </marker>
  </defs>
);

export default function PipelineDiagram() {
  return (
    <figure className="pd">
      {/* Wide layout: matches the sketch */}
      <svg className="pd-wide" viewBox="0 0 1080 300" role="img" aria-label="The teacher’s notes on student needs and the teacher’s guidelines guide Claude Code, which drafts materials into the Vault; build.py turns them into student and teacher copies.">
        <Head id="pd-head-w" />
        <Box x={150} y={60} title="Student needs" sub="noted by the teacher" />
        <Box x={450} y={60} title="Claude Code" sub="drafting assistant" />
        <Box x={750} y={60} title="Guidelines" sub="the teacher’s approach" />
        <Box x={450} y={235} title="Vault" sub="Markdown · the only editable copy" />
        <Box x={690} y={235} title="build.py" sub="pandoc → XeLaTeX" />
        <Box x={930} y={235} title="Materials" sub="student + teacher copies" />

        <Arrow head="pd-head-w" x1={252} y1={60} x2={346} y2={60} label="informs" lx={299} ly={50} />
        <Arrow head="pd-head-w" x1={648} y1={60} x2={554} y2={60} label="guides" lx={601} ly={50} />
        <Arrow head="pd-head-w" x1={450} y1={97} x2={450} y2={196} label="writes" lx={462} ly={152} anchor="start" />
        <Arrow head="pd-head-w" x1={552} y1={235} x2={586} y2={235} />
        <Arrow head="pd-head-w" x1={792} y1={235} x2={826} y2={235} />
      </svg>

      {/* Narrow layout: same picture, stacked */}
      <svg className="pd-narrow" viewBox="0 0 440 660" role="img" aria-label="The teacher’s notes on student needs and the teacher’s guidelines guide Claude Code, which drafts materials into the Vault; build.py turns them into student and teacher copies.">
        <Head id="pd-head-n" />
        <Box x={110} y={50} title="Student needs" sub="noted by the teacher" />
        <Box x={330} y={50} title="Guidelines" sub="the teacher’s approach" />
        <Box x={220} y={200} title="Claude Code" sub="drafting assistant" />
        <Box x={220} y={340} title="Vault" sub="the only editable copy" />
        <Box x={220} y={470} title="build.py" sub="pandoc → XeLaTeX" />
        <Box x={220} y={600} title="Materials" sub="student + teacher copies" />

        <Arrow head="pd-head-n" x1={130} y1={87} x2={190} y2={162} label="informs" lx={150} ly={135} anchor="end" />
        <Arrow head="pd-head-n" x1={310} y1={87} x2={250} y2={162} label="guides" lx={292} ly={135} anchor="start" />
        <Arrow head="pd-head-n" x1={220} y1={237} x2={220} y2={302} label="writes" lx={232} ly={275} anchor="start" />
        <Arrow head="pd-head-n" x1={220} y1={377} x2={220} y2={432} />
        <Arrow head="pd-head-n" x1={220} y1={507} x2={220} y2={562} />
      </svg>
    </figure>
  );
}
