내가 작성한 ALOM 랜딩 페이지의 CSS에서 'ALOM'이 'ALpha to OMega'로 펼쳐지는 타이포그래피 애니메이션에 렌더링 버벅거림(Jank) 현상이 발생하고 있어.

현재 문제 원인:
숨겨진 글자(.hero-intro**rest)와 접속어(.hero-intro**connector)를 펼치기 위해 `max-width`와 `margin`에 `transition`을 사용했음. 이로 인해 브라우저의 리플로우(Reflow)가 매 프레임 발생하여 퍼포먼스가 크게 떨어짐.

요구사항:

1. 60fps의 매우 부드러운 애니메이션이 보장되도록 코드를 리팩토링해 줘.
2. CPU에서 처리하는 레이아웃 재계산(Reflow/Repaint)을 피하고, GPU 가속을 활용할 수 있는 속성(`transform: translateX`, `opacity` 등)으로 움직임을 제어해 줘.
3. 요소가 밀려나는 효과를 위해 CSS Grid의 `0fr` -> `1fr` 트랜지션 기법이나 `clip-path` 등 하드웨어 가속에 유리한 최신 기법을 도입해 줘.
4. 글자의 디센더(g, p 등의 꼬리)가 잘리지 않도록 이전에 수정한 `padding-bottom: 0.4em`, `margin-bottom: -0.4em` 보정 기법은 구조가 바뀌더라도 꼭 유지해 줘.
5. 최적화된 마크업(HTML 구조 변경이 필요하다면)과 CSS 코드를 모두 작성해 줘.
