import type { TimelineItem } from '../types/portfolio'

export const experiences: TimelineItem[] = [
  {
    id: 'network-lab',
    title: '지능형 네트워크 연구실',
    organization: '학부연구생',
    period: '대학교 3학년 1학기 · 약 5개월',
    description: '논문을 구조적으로 읽고 발표했으며, 네트워크 구조를 이해하기 위한 기초 시뮬레이션을 경험했습니다.',
    details: [
      {
        title: 'NeuroScaler Paper Review',
        items: [
          'NeuroScaler: Neural Video Enhancement at Scale의 문제 정의, 기존 방식의 한계, 시스템 아키텍처와 실험 결과를 분석했습니다.',
          '분석 내용을 정리해 연구실에서 발표했습니다.',
        ],
      },
      {
        title: 'Network Simulation with ns-3',
        items: [
          '네트워크 논문에서 설명하는 구조를 이해하기 위해 ns-3 기초 실습을 진행했습니다.',
          '개념적인 네트워크 구조를 단순화해 노드와 통신 구조로 구성하고 시뮬레이션을 실행했습니다.',
        ],
      },
    ],
    learning: '논문의 문제 정의, 기존 방식의 한계, 제안 방식과 실험 결과의 관계를 파악하는 관점을 배웠습니다.',
  },
]
