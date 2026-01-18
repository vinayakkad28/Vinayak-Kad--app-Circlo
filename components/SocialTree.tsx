
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
// Corrected: GRAPH_DATA is exported from utils/constants.ts
import { GRAPH_DATA } from '../utils/constants';
// Corrected: Node and IntentionMode are defined in types/index.ts
import { Node, IntentionMode } from '../types/index';

interface SocialTreeProps {
  onNodeClick: (nodeId: string) => void;
  activeMode: IntentionMode;
}

const SocialTree: React.FC<SocialTreeProps> = ({ onNodeClick, activeMode }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 800;
    const height = 800;

    const filteredNodes = GRAPH_DATA.nodes.filter((n: Node) => 
      n.id === 'me' || n.type === 'friend' || (n.intentions && n.intentions.includes(activeMode as any))
    );
    const nodeIds = new Set(filteredNodes.map(n => n.id));
    const filteredLinks = GRAPH_DATA.links.filter(l => 
      nodeIds.has(typeof l.source === 'string' ? l.source : (l.source as any).id) &&
      nodeIds.has(typeof l.target === 'string' ? l.target : (l.target as any).id)
    );

    const svg = d3.select(svgRef.current)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('width', '100%')
      .attr('height', '100%');

    svg.selectAll("*").remove();

    const simulation = d3.forceSimulation(filteredNodes as any)
      .force("link", d3.forceLink(filteredLinks as any).id((d: any) => d.id).distance(150))
      .force("charge", d3.forceManyBody().strength(-2000))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(80));

    const link = svg.append("g")
      .selectAll("line")
      .data(filteredLinks)
      .enter().append("line")
      .attr("stroke", "#e2e8f0")
      .attr("stroke-width", (d: any) => 2 + (d.recency * 4))
      .attr("opacity", 0.3)
      .attr("stroke-linecap", "round");

    const node = svg.append("g")
      .selectAll(".node")
      .data(filteredNodes)
      .enter().append("g")
      .attr("class", "node")
      .style("cursor", "pointer")
      .on("mouseover", (e, d: any) => setHoveredNode(d.name))
      .on("mouseout", () => setHoveredNode(null))
      .on("click", (e, d: any) => onNodeClick(d.id))
      .call(d3.drag<any, any>()
        .on("start", (event, d: any) => {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x; d.fy = d.y;
        })
        .on("drag", (event, d: any) => { d.fx = event.x; d.fy = event.y; })
        .on("end", (event, d: any) => {
          if (!event.active) simulation.alphaTarget(0);
          d.fx = null; d.fy = null;
        }));

    node.append("circle")
      .attr("r", (d: any) => d.id === 'me' ? 50 : d.type === 'match' ? 40 : 30)
      .attr("fill", "#fff")
      .attr("stroke", (d: any) => d.id === 'me' ? "#0f172a" : "#cbd5e1")
      .attr("stroke-width", (d: any) => d.id === 'me' ? 4 : 2)
      .style("filter", "drop-shadow(0 10px 10px rgba(0,0,0,0.05))");

    node.append("clipPath")
      .attr("id", (d: any) => `clip-${d.id}`)
      .append("circle")
      .attr("r", (d: any) => d.id === 'me' ? 46 : d.type === 'match' ? 36 : 26);

    node.append("image")
      .attr("xlink:href", (d: any) => d.avatar)
      .attr("x", (d: any) => d.id === 'me' ? -46 : d.type === 'match' ? -36 : -26)
      .attr("y", (d: any) => d.id === 'me' ? -46 : d.type === 'match' ? -36 : -26)
      .attr("width", (d: any) => d.id === 'me' ? 92 : d.type === 'match' ? 72 : 52)
      .attr("height", (d: any) => d.id === 'me' ? 92 : d.type === 'match' ? 72 : 52)
      .attr("clip-path", (d: any) => `url(#clip-${d.id})`);

    node.append("text")
      .text((d: any) => d.id === 'me' ? 'YOU' : d.name)
      .attr("dy", (d: any) => d.id === 'me' ? 70 : 60)
      .attr("text-anchor", "middle")
      .attr("font-size", "9px")
      .attr("font-weight", "800")
      .attr("fill", "#64748b")
      .attr("class", "uppercase tracking-widest");

    simulation.on("tick", () => {
      link.attr("x1", (d: any) => (d.source as any).x).attr("y1", (d: any) => (d.source as any).y)
          .attr("x2", (d: any) => (d.target as any).x).attr("y2", (d: any) => (d.target as any).y);
      node.attr("transform", (d: any) => `translate(${d.x},${d.y})`);
    });

  }, [onNodeClick, activeMode]);

  return (
    <div className="w-full h-full relative bg-white rounded-[3rem] overflow-hidden border border-slate-100 shadow-inner">
      <div className="absolute top-8 left-10 pointer-events-none z-10">
        <h3 className="label-sm text-slate-300 mb-1">Ego Network</h3>
        <p className="text-xl font-black text-slate-900">{hoveredNode || `Verified ${activeMode} Tree`}</p>
      </div>
      <svg ref={svgRef} className="w-full h-full" />
    </div>
  );
};

export default SocialTree;
