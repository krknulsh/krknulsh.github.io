type ArchitectureDiagramProps = {
  project: 'daseo' | 'mental-care'
  focus: string[]
  storyId: string
  title: string
}

type Node = { id: string; x: number; y: number; width: number; label: string[] }
type Edge = { from: string; to: string; path: string }

const diagrams: Record<ArchitectureDiagramProps['project'], { nodes: Node[]; edges: Edge[] }> = {
  daseo: {
    nodes: [
      { id: 'frontend', x: 30, y: 145, width: 145, label: ['React', 'Frontend'] },
      { id: 'google', x: 30, y: 28, width: 145, label: ['Google', 'OAuth'] },
      { id: 'api', x: 250, y: 145, width: 155, label: ['FastAPI', 'REST API'] },
      { id: 'user', x: 490, y: 28, width: 155, label: ['PostgreSQL', '사용자 데이터'] },
      { id: 'jwt', x: 490, y: 145, width: 155, label: ['서비스 JWT', '인증'] },
      { id: 'mypage', x: 735, y: 145, width: 180, label: ['My Page', '보호 API'] },
      { id: 'generation', x: 490, y: 260, width: 155, label: ['HyperCLOVA X', '초안 생성'] },
      { id: 'feedback', x: 735, y: 260, width: 180, label: ['GPT · Gemini · Claude', '순차 피드백'] },
    ],
    edges: [
      { from: 'frontend', to: 'google', path: 'M102 145 V92' },
      { from: 'google', to: 'api', path: 'M175 60 L250 177' },
      { from: 'frontend', to: 'api', path: 'M175 177 H250' },
      { from: 'api', to: 'user', path: 'M405 160 L490 60' },
      { from: 'api', to: 'jwt', path: 'M405 177 H490' },
      { from: 'jwt', to: 'mypage', path: 'M645 177 H735' },
      { from: 'api', to: 'generation', path: 'M405 193 L490 292' },
      { from: 'generation', to: 'feedback', path: 'M645 292 H735' },
    ],
  },
  'mental-care': {
    nodes: [
      { id: 'frontend', x: 25, y: 145, width: 140, label: ['Expo Web · Native', 'Firebase Hosting'] },
      { id: 'api', x: 210, y: 145, width: 150, label: ['FastAPI', 'Cloud Run'] },
      { id: 'analysis', x: 420, y: 20, width: 145, label: ['Gemini', '감정·상황 분석'] },
      { id: 'gate', x: 630, y: 20, width: 145, label: ['정보 충분성', '판단'] },
      { id: 'question', x: 815, y: 20, width: 125, label: ['추가 질문', '반환'] },
      { id: 'embedding', x: 420, y: 145, width: 145, label: ['text-embedding', '004'] },
      { id: 'vector', x: 630, y: 145, width: 145, label: ['pgvector', '루틴 검색'] },
      { id: 'recommendation', x: 815, y: 145, width: 125, label: ['루틴 추천', '응답'] },
      { id: 'database', x: 420, y: 265, width: 145, label: ['Cloud SQL', 'PostgreSQL'] },
      { id: 'redis', x: 630, y: 265, width: 145, label: ['Memorystore', 'Redis 상태'] },
    ],
    edges: [
      { from: 'frontend', to: 'api', path: 'M165 177 H210' },
      { from: 'api', to: 'analysis', path: 'M360 160 L420 52' },
      { from: 'analysis', to: 'gate', path: 'M565 52 H630' },
      { from: 'gate', to: 'question', path: 'M775 52 H815' },
      { from: 'gate', to: 'embedding', path: 'M675 84 L565 165' },
      { from: 'embedding', to: 'vector', path: 'M565 177 H630' },
      { from: 'vector', to: 'recommendation', path: 'M775 177 H815' },
      { from: 'api', to: 'database', path: 'M330 209 L420 297' },
      { from: 'api', to: 'redis', path: 'M360 205 L630 297' },
      { from: 'database', to: 'vector', path: 'M565 297 L650 209' },
    ],
  },
}

export function ArchitectureDiagram({ project, focus, storyId, title }: ArchitectureDiagramProps) {
  const { nodes, edges } = diagrams[project]
  const arrowId = `arrow-${storyId}`
  const activeArrowId = `active-arrow-${storyId}`
  const titleId = `diagram-title-${storyId}`

  return (
    <div className="architecture-diagram__scroll">
      <svg className="architecture-diagram" viewBox="0 0 970 350" role="img" aria-labelledby={titleId}>
        <title id={titleId}>{title} — 전체 아키텍처에서 관련 경로를 파란색으로 표시</title>
        <defs>
          <marker id={arrowId} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0 0 L8 4 L0 8 Z" fill="#64717d" />
          </marker>
          <marker id={activeArrowId} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0 0 L8 4 L0 8 Z" fill="#91adff" />
          </marker>
        </defs>
        {edges.map((edge) => {
          const active = focus.includes(edge.from) && focus.includes(edge.to)
          return (
            <path
              key={edge.path}
              className={`architecture-diagram__edge${active ? ' architecture-diagram__edge--active' : ''}`}
              d={edge.path}
              markerEnd={`url(#${active ? activeArrowId : arrowId})`}
            />
          )
        })}
        {nodes.map((node) => (
          <g key={node.id} className={`architecture-diagram__node${focus.includes(node.id) ? ' architecture-diagram__node--active' : ''}`}>
            <rect x={node.x} y={node.y} width={node.width} height="64" rx="13" />
            <text x={node.x + node.width / 2} y={node.y + (node.label.length === 1 ? 32 : 24)} textAnchor="middle">
              {node.label.map((line, index) => <tspan key={line} x={node.x + node.width / 2} dy={index === 0 ? 0 : 18}>{line}</tspan>)}
            </text>
          </g>
        ))}
      </svg>
    </div>
  )
}
