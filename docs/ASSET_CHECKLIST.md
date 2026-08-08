# Portfolio Asset Checklist

포트폴리오 구현 전 준비할 이미지 및 링크 목록.

---

# 1. Profile

필수는 아님.

선택지:

1. 깔끔한 증명/프로필 사진
2. 자연스러운 상반신 사진
3. 사진 없이 이름 + Typography Hero 구성

필요:
- [ ] profile.jpg 또는 profile.png

추천:
- 정사각형 또는 세로형
- 배경이 복잡하지 않은 이미지

---

# 2. AI Mental Care

## 반드시 있으면 좋은 이미지

- [ ] cover.png
  - 프로젝트 대표 화면
  - 포트폴리오 프로젝트 카드에 사용

- [ ] login.png
  - Google 로그인 화면

- [ ] chat.png
  - 감정 분석 / Chat / Routine 추천 화면

- [ ] routine.png
  - 추천 Routine Card 화면

- [ ] daily-report.png
  - Daily Report

- [ ] weekly-report.png
  - Weekly Report

- [ ] architecture.png
  - 전체 Architecture Diagram

## 선택

- [ ] database-erd.png
- [ ] cloud-architecture.png
- [ ] rag-flow.png

---

# 3. Multi-LLM Resume Generator

현재 이미지 자료 필요.

- [ ] cover.png
- [ ] main-screen.png
- [ ] result-screen.png
- [ ] architecture.png
- [ ] llm-pipeline.png

---

# 4. Link

- [ ] GitHub Profile URL
- [ ] AI Mental Care Repository URL
- [ ] Multi-LLM Repository URL
- [ ] Email
- [ ] Resume URL/PDF
- [ ] Blog
- [ ] LinkedIn (있다면)
- [ ] Demo URL (서비스가 아직 살아 있다면)

---

# 5. Diagram Rule

다이어그램은 스타일을 통일한다.

권장:
- 흰색 또는 매우 연한 배경
- 단순한 박스 구조
- 서비스/DB/Cloud 아이콘만 제한적으로 사용
- 화살표 방향 통일
- 지나친 세부 클래스/함수 레벨 표현 금지

Portfolio Diagram:
- 5~9개의 주요 컴포넌트

README Diagram:
- 필요하면 더 상세하게 표현

---

# 6. Image Folder Convention

```text
assets/
├── profile/
│   └── profile.png
│
└── projects/
    ├── mental-care/
    │   ├── cover.png
    │   ├── login.png
    │   ├── chat.png
    │   ├── routine.png
    │   ├── daily-report.png
    │   ├── weekly-report.png
    │   ├── architecture.png
    │   └── rag-flow.png
    │
    └── multi-llm/
        ├── cover.png
        ├── main-screen.png
        ├── result-screen.png
        ├── architecture.png
        └── pipeline.png
```

---

# 7. 이미지가 없어도 개발 가능?

가능하다.

처음에는 placeholder를 넣어 구조를 완성하고,
실제 이미지를 준비한 뒤 동일한 파일명으로 교체한다.

즉 이미지를 모두 준비한 뒤 개발을 시작할 필요는 없다.
