// 기본 질문 목록
const defaultQuestions = [
    "오늘 가장 감사했던 순간은?",
    "오늘 나를 웃게 만든 것은?",
    "오늘 새롭게 배운 것이 있다면?",
    "오늘 가장 힘들었던 순간은?",
    "내일 꼭 하고 싶은 일은?",
    "오늘 나에게 해주고 싶은 말은?",
    "오늘 만난 사람 중 기억에 남는 사람은?",
    "오늘 가장 맛있게 먹은 음식은?",
    "오늘 하루를 색으로 표현한다면?",
    "오늘 나의 컨디션은 몇 점?",
    "오늘 나를 가장 성장시켰다고 느낀 순간은?",
    "오늘 놓치고 지나간 순간 중 다시 돌아보고 싶은 일은?",
    "오늘 나를 도와준 사람 혹은 고마운 사람은?",
    "오늘 스스로에게 칭찬해주고 싶은 점은?",
    "오늘 아쉬웠던 점이나 다음에 더 잘하고 싶은 점은?",
    "오늘 가장 많이 떠올렸던 생각이나 고민은?",
    "오늘 머릿속을 스쳐 지나간 작은 소원이나 바람은?",
    "오늘 휴식이나 쉬는 시간은 어떻게 보냈나요?",
    "오늘 나의 감정 변화를 한 줄로 정리한다면?",
    "오늘의 나에게 한 문장으로 제목을 붙인다면?"
];

// MBTI별 질문
const mbtiQuestions = {
    INTJ: [
        "오늘 세운 계획 중 가장 효율적이었던 것은?",
        "오늘 해결한 문제가 있다면?",
        "장기 목표를 위해 오늘 한 일은?",
        "오늘 전략적으로 잘 판단한 순간은?",
        "오늘 시스템적으로 개선하면 좋겠다고 느낀 부분은?",
        "오늘 가장 논리적으로 생각한 순간은?",
        "오늘 비효율적이라고 느낀 것은?",
        "오늘 미래를 위해 준비한 것은?",
        "오늘 목표 달성에 가까워진 순간은?",
        "오늘 분석적으로 바라본 사건은?",
        "오늘 혼자 깊이 고민한 주제는?",
        "오늘 가장 냉정하게 판단한 일은?",
        "오늘 통찰을 얻은 순간은?",
        "오늘 생각이 가장 선명했던 순간은?",
        "오늘 구조적으로 이해한 개념은?",
        "오늘 장기적으로 중요하다고 느낀 일은?",
        "오늘 스스로 뿌듯했던 판단은?",
        "오늘 합리적으로 선택한 것은?",
        "오늘 불필요하다고 느낀 요소는?",
        "오늘 가장 지적 자극을 준 순간은?"
    ],

    INTP: [
        "오늘 새롭게 알게 된 흥미로운 사실은?",
        "오늘 깊이 생각해본 주제는?",
        "오늘 떠오른 아이디어가 있다면?",
        "오늘 가장 호기심이 생긴 것은?",
        "오늘 논리적으로 의문이 들었던 것은?",
        "오늘 새로운 관점으로 본 문제는?",
        "오늘 가장 재미있게 탐구한 것은?",
        "오늘 스스로에게 던진 질문은?",
        "오늘 생각이 확장된 순간은?",
        "오늘 이론적으로 이해한 개념은?",
        "오늘 엉뚱하게 떠오른 상상은?",
        "오늘 가장 복잡하게 고민한 주제는?",
        "오늘 분석하며 즐거웠던 순간은?",
        "오늘 논리 퍼즐처럼 느껴진 일은?",
        "오늘 가장 지적인 대화를 나눈 순간은?",
        "오늘 개념적으로 정리한 생각은?",
        "오늘 의미 있다고 느낀 질문은?",
        "오늘 기존 생각이 바뀐 순간은?",
        "오늘 가장 자유롭게 사고한 순간은?",
        "오늘 지적 만족을 느낀 순간은?"
    ],

    ENTJ: [
        "오늘 리더십을 발휘한 순간은?",
        "오늘 달성한 목표는?",
        "팀에서 가장 잘한 일은?",
        "오늘 주도적으로 결정한 일은?",
        "오늘 성과를 냈다고 느낀 순간은?",
        "오늘 방향성을 잡아준 선택은?",
        "오늘 사람들을 이끈 순간은?",
        "오늘 조직적으로 움직인 순간은?",
        "오늘 책임지고 마무리한 일은?",
        "오늘 가장 강단 있게 행동한 순간은?",
        "오늘 추진력을 발휘한 장면은?",
        "오늘 성과 중심으로 판단한 일은?",
        "오늘 타인을 설득한 순간은?",
        "오늘 목표 설정이 명확했던 순간은?",
        "오늘 결단을 내린 순간은?",
        "오늘 가장 승부욕이 생긴 순간은?",
        "오늘 리더로서 배운 점은?",
        "오늘 효율을 극대화한 선택은?",
        "오늘 가장 영향력을 발휘한 순간은?",
        "오늘 조직을 위해 한 결정은?"
    ],

    ENTP: [
        "오늘 새로운 시도를 했다면?",
        "오늘 나눈 흥미로운 토론은?",
        "오늘 영감을 준 것은?",
        "오늘 가장 기발한 생각은?",
        "오늘 즉흥적으로 떠오른 아이디어는?",
        "오늘 새로운 관점으로 본 일은?",
        "오늘 가장 재밌게 논쟁한 주제는?",
        "오늘 상상력이 폭발한 순간은?",
        "오늘 새로운 가능성을 느낀 순간은?",
        "오늘 다양한 아이디어가 쏟아진 주제는?",
        "오늘 말로 사람을 설득한 순간은?",
        "오늘 반전 매력을 느낀 상황은?",
        "오늘 가장 자유롭게 말한 순간은?",
        "오늘 변화를 원했던 순간은?",
        "오늘 틀을 깨고 싶었던 순간은?",
        "오늘 창의적으로 해결한 문제는?",
        "오늘 지루함을 느낀 순간은?",
        "오늘 가장 에너지가 넘쳤던 순간은?",
        "오늘 웃음이 나왔던 대화는?",
        "오늘 새로운 도전을 떠올린 순간은?"
    ],

    INFJ: [
        "오늘 누군가를 도운 일이 있다면?",
        "오늘 깨달은 인생의 의미는?",
        "오늘 마음이 따뜻해진 순간은?",
        "오늘 직감이 맞았던 순간은?",
        "오늘 깊이 공감한 장면은?",
        "오늘 타인의 감정을 느낀 순간은?",
        "오늘 나 자신을 돌아본 순간은?",
        "오늘 의미 있게 느껴진 대화는?",
        "오늘 조용히 생각에 잠긴 시간은?",
        "오늘 이상과 현실의 차이를 느낀 순간은?",
        "오늘 누군가에게 위로를 준 순간은?",
        "오늘 나의 신념을 느낀 순간은?",
        "오늘 영적으로 충만했던 순간은?",
        "오늘 스스로를 이해한 순간은?",
        "오늘 진심으로 바라본 사람은?",
        "오늘 내면이 성장했다고 느낀 순간은?",
        "오늘 마음이 울렸던 말은?",
        "오늘 가치관이 드러난 순간은?",
        "오늘 조용히 감사한 순간은?",
        "오늘 삶의 방향을 떠올린 순간은?"
    ],

    INFP: [
        "오늘 나의 가치관과 맞았던 순간은?",
        "오늘 창작 활동을 했다면?",
        "오늘 감정적으로 울림이 있었던 것은?",
        "오늘 나 자신에게 솔직했던 순간은?",
        "오늘 마음이 가장 예민했던 순간은?",
        "오늘 이상과 현실이 충돌한 순간은?",
        "오늘 누군가의 말에 깊이 감동한 순간은?",
        "오늘 혼자만의 세계에 빠진 순간은?",
        "오늘 가장 '나다운' 행동을 한 순간은?",
        "오늘 감정이 요동친 순간은?",
        "오늘 순수하게 기뻤던 순간은?",
        "오늘 나 자신을 위로한 순간은?",
        "오늘 타인의 진심을 느낀 순간은?",
        "오늘 상상에 빠졌던 시간은?",
        "오늘 마음을 다친 순간은?",
        "오늘 나의 이상이 떠오른 순간은?",
        "오늘 감정이 복잡했던 이유는?",
        "오늘 가장 소중하게 느낀 감정은?",
        "오늘 나를 표현한 방법은?",
        "오늘 내 마음이 향한 곳은?"
    ],

    ENFJ: [
        "오늘 누군가에게 긍정적 영향을 준 일은?",
        "오늘 관계에서 감사한 점은?",
        "오늘 조화를 이룬 순간은?",
        "오늘 누군가를 격려한 순간은?",
        "오늘 사람들 사이를 연결한 순간은?",
        "오늘 타인의 성장을 도운 순간은?",
        "오늘 공감이 잘 되었던 순간은?",
        "오늘 리더로서 배운 점은?",
        "오늘 사람을 움직인 대화는?",
        "오늘 누군가를 이해하게 된 순간은?",
        "오늘 관계가 더 깊어진 순간은?",
        "오늘 주변을 따뜻하게 만든 순간은?",
        "오늘 감정적으로 교류한 순간은?",
        "오늘 팀워크가 빛났던 순간은?",
        "오늘 사람들에게 고마웠던 순간은?",
        "오늘 타인을 위해 선택한 일은?",
        "오늘 사회적 역할을 느낀 순간은?",
        "오늘 중심을 잡아준 대화는?",
        "오늘 영향력을 실감한 순간은?",
        "오늘 모두가 웃었던 이유는?"
    ],

    ENFP: [
        "오늘 가장 신났던 순간은?",
        "오늘 만난 흥미로운 사람은?",
        "오늘 영감을 받은 것은?",
        "오늘 웃음이 터진 순간은?",
        "오늘 즉흥적으로 결정한 일은?",
        "오늘 자유로웠다고 느낀 순간은?",
        "오늘 에너지가 최고였던 순간은?",
        "오늘 다양한 생각이 떠오른 순간은?",
        "오늘 긍정적으로 전환된 사건은?",
        "오늘 좋아하는 것을 다시 느낀 순간은?",
        "오늘 설렘을 느낀 순간은?",
        "오늘 모험하고 싶었던 순간은?",
        "오늘 새로운 가능성을 느낀 순간은?",
        "오늘 사람들과 불꽃 튀긴 대화는?",
        "오늘 감정이 폭발한 순간은?",
        "오늘 재미에 빠졌던 순간은?",
        "오늘 하고 싶은 게 많아진 이유는?",
        "오늘 자유롭게 웃은 순간은?",
        "오늘 기분이 확 좋아진 이유는?",
        "오늘 나를 설레게 한 말은?"
    ],

    ISTJ: [
        "오늘 책임감 있게 완수한 일은?",
        "오늘 지킨 약속이나 루틴은?",
        "오늘 꼼꼼하게 처리한 일은?",
        "오늘 계획대로 잘 흘러간 일은?",
        "오늘 실수를 줄이기 위해 한 행동은?",
        "오늘 규칙을 지켜서 편안했던 순간은?",
        "오늘 맡은 역할을 충실히 수행한 순간은?",
        "오늘 가장 체계적으로 처리한 업무는?",
        "오늘 안정감을 느낀 순간은?",
        "오늘 성실함이 드러난 순간은?",
        "오늘 반복 작업 속에서 느낀 감정은?",
        "오늘 기준을 지킨 결정은?",
        "오늘 원칙을 우선한 순간은?",
        "오늘 신뢰를 준 행동은?",
        "오늘 묵묵히 해낸 일은?",
        "오늘 기본을 지켰다고 느낀 순간은?",
        "오늘 기록해두고 싶은 사실은?",
        "오늘 정확함이 필요했던 순간은?",
        "오늘 정직함이 빛난 순간은?",
        "오늘 차분하게 해결한 문제는?"
    ],

    ISFJ: [
        "오늘 가족/친구를 위해 한 일은?",
        "오늘 감사한 일상의 소소함은?",
        "오늘 누군가를 배려한 순간은?",
        "오늘 조용히 누군가를 도운 순간은?",
        "오늘 따뜻한 말을 건넨 순간은?",
        "오늘 누군가에게 힘이 된 순간은?",
        "오늘 타인을 먼저 생각한 선택은?",
        "오늘 정성을 쏟은 행동은?",
        "오늘 일상의 안정감을 느낀 순간은?",
        "오늘 책임감을 느낀 순간은?",
        "오늘 고마움을 느낀 사람은?",
        "오늘 누군가의 부탁을 들어준 순간은?",
        "오늘 소소한 행복을 느낀 순간은?",
        "오늘 베풀었다고 느낀 순간은?",
        "오늘 다정함을 표현한 순간은?",
        "오늘 마음이 편안해진 순간은?",
        "오늘 헌신했다고 느낀 순간은?",
        "오늘 보호하고 싶다고 느낀 순간은?",
        "오늘 신뢰를 준 행동은?",
        "오늘 상냥함을 느낀 순간은?"
    ],

    ESTJ: [
        "오늘 효율적으로 처리한 업무는?",
        "오늘 팀을 이끈 경험은?",
        "오늘 규칙을 잘 지킨 일은?",
        "오늘 결단력 있게 처리한 순간은?",
        "오늘 일정 관리가 완벽했던 순간은?",
        "오늘 목표 대비 성과는 어땠는가?",
        "오늘 책임지고 정리한 일은?",
        "오늘 주도적으로 관리한 일은?",
        "오늘 조직이 잘 돌아간 순간은?",
        "오늘 문제를 단호하게 해결한 순간은?",
        "오늘 권한과 책임을 느낀 순간은?",
        "오늘 가장 실무적으로 판단한 순간은?",
        "오늘 시간 관리를 잘한 순간은?",
        "오늘 결과 중심으로 행동한 순간은?",
        "오늘 단호한 결정이 필요했던 순간은?",
        "오늘 규율이 중요했던 순간은?",
        "오늘 업무 분장이 잘 되었던 순간은?",
        "오늘 실적이 눈에 보인 순간은?",
        "오늘 냉정하지만 옳았던 결정은?",
        "오늘 관리자로 성장했다고 느낀 순간은?"
    ],

    ESFJ: [
        "오늘 주변 사람들과 나눈 따뜻한 대화는?",
        "오늘 누군가를 돌본 일은?",
        "오늘 조화를 위해 노력한 점은?",
        "오늘 누군가의 기분을 살핀 순간은?",
        "오늘 사람들 사이에서 중심을 잡은 순간은?",
        "오늘 관계가 더 가까워진 순간은?",
        "오늘 배려가 빛난 순간은?",
        "오늘 누군가를 챙겨준 순간은?",
        "오늘 함께 웃었던 이유는?",
        "오늘 감사를 표현한 순간은?",
        "오늘 사람을 기쁘게 한 행동은?",
        "오늘 공동체 의식을 느낀 순간은?",
        "오늘 분위기를 살린 순간은?",
        "오늘 사람들을 연결한 순간은?",
        "오늘 관계를 정리한 순간은?",
        "오늘 친구를 위해 움직인 순간은?",
        "오늘 타인의 감정에 공감한 순간은?",
        "오늘 협력이 잘 된 순간은?",
        "오늘 소속감을 느낀 순간은?",
        "오늘 친절함을 실천한 순간은?"
    ],

    ISTP: [
        "오늘 손으로 만들거나 고친 것은?",
        "오늘 문제를 분석해 해결한 일은?",
        "오늘 새로 익힌 기술은?",
        "오늘 도구를 능숙하게 다룬 순간은?",
        "오늘 직접 부딪혀 해결한 문제는?",
        "오늘 효율적인 방법을 찾은 순간은?",
        "오늘 현실적으로 판단한 순간은?",
        "오늘 시행착오가 있었던 순간은?",
        "오늘 실험처럼 느껴진 순간은?",
        "오늘 손이 바빴던 순간은?",
        "오늘 즉각적으로 대응한 상황은?",
        "오늘 스스로 뿌듯했던 작업은?",
        "오늘 원인을 파악한 사건은?",
        "오늘 기계를 다룬 순간은?",
        "오늘 단순하지만 강력한 해결책은?",
        "오늘 실용성이 드러난 순간은?",
        "오늘 빠르게 판단한 순간은?",
        "오늘 현장에서 배운 점은?",
        "오늘 도전적으로 시도한 작업은?",
        "오늘 기술적으로 성장한 순간은?"
    ],

    ISFP: [
        "오늘 아름다움을 느낀 순간은?",
        "오늘 자유롭게 표현한 것은?",
        "오늘 나만의 시간에 한 일은?",
        "오늘 감각이 예민해진 순간은?",
        "오늘 자연이 인상 깊었던 순간은?",
        "오늘 색이나 소리에 집중한 순간은?",
        "오늘 감정이 잔잔했던 순간은?",
        "오늘 혼자만의 힐링 시간은?",
        "오늘 스스로에게 솔직한 순간은?",
        "오늘 감성적으로 만족한 순간은?",
        "오늘 예술적으로 영감을 받은 순간은?",
        "오늘 직관이 이끈 선택은?",
        "오늘 기분이 편안했던 순간은?",
        "오늘 조용한 즐거움을 느낀 순간은?",
        "오늘 아름다움을 기록하고 싶은 순간은?",
        "오늘 나만의 속도로 보낸 순간은?",
        "오늘 마음이 부드러워진 순간은?",
        "오늘 감정이 풍부했던 순간은?",
        "오늘 나를 가장 위로한 순간은?",
        "오늘 온전히 나답다고 느낀 순간은?"
    ],

    ESTP: [
        "오늘 가장 스릴 있었던 순간은?",
        "오늘 즉흥적으로 한 일은?",
        "오늘 활동적으로 보낸 시간은?",
        "오늘 몸으로 부딪혀 해결한 일은?",
        "오늘 속도감이 느껴진 순간은?",
        "오늘 경쟁심이 생긴 순간은?",
        "오늘 재빠르게 움직인 순간은?",
        "오늘 위험을 감수한 선택은?",
        "오늘 아드레날린이 솟은 순간은?",
        "오늘 직감으로 결정한 일은?",
        "오늘 현장에서 빛난 순간은?",
        "오늘 에너지가 폭발한 순간은?",
        "오늘 모험을 느낀 순간은?",
        "오늘 가장 짜릿했던 선택은?",
        "오늘 즉시 행동한 결정은?",
        "오늘 몸으로 배운 교훈은?",
        "오늘 액션이 많았던 하루는?",
        "오늘 활동량이 최고였던 순간은?",
        "오늘 긴박했던 순간은?",
        "오늘 순간의 판단이 중요한 장면은?"
    ],

    ESFP: [
        "오늘 가장 즐거웠던 순간은?",
        "오늘 사람들과 함께한 재미있는 일은?",
        "오늘 웃음을 준 것은?",
        "오늘 분위기를 띄운 순간은?",
        "오늘 주목을 받은 순간은?",
        "오늘 무대의 주인공 같았던 순간은?",
        "오늘 감정 표현이 풍부했던 순간은?",
        "오늘 사람들을 웃게 만든 순간은?",
        "오늘 즉흥 파티 같은 순간은?",
        "오늘 밝게 빛났던 순간은?",
        "오늘 추억으로 남기고 싶은 순간은?",
        "오늘 친구들과 떠들었던 순간은?",
        "오늘 감정이 폭발한 순간은?",
        "오늘 즐거움이 극대화된 순간은?",
        "오늘 장난기가 발동한 순간은?",
        "오늘 신나서 몸이 먼저 움직인 순간은?",
        "오늘 소리 내 웃었던 순간은?",
        "오늘 주위가 환해진 순간은?",
        "오늘 가장 인기 있었던 순간은?",
        "오늘 행복이 넘쳤던 순간은?"
    ]
};

// 감정 기반 질문
const moodBasedQuestions = {
    positive: [ // 😊😍🥳😎
        "오늘의 행복을 더 크게 만든 것은?",
        "이 좋은 기분을 누구와 나누고 싶나요?",
        "오늘 가장 감사한 순간은?"
    ],
    neutral: [ // 🤔😴
        "오늘 마음을 차분하게 만든 것은?",
        "지금 가장 하고 싶은 것은?",
        "오늘 자신에게 주고 싶은 선물은?"
    ],
    negative: [ // 😢😭😡
        "오늘 힘들었던 감정을 말로 표현한다면?",
        "지금 당장 자신을 위해 해줄 수 있는 작은 것은?",
        "오늘 하루 중 그나마 괜찮았던 순간은?"
    ]
};

// 날씨 기반 질문
const weatherBasedQuestions = {
    sunny: ["맑은 날씨처럼 마음도 맑았나요?", "오늘 햇살 아래서 한 일은?"],
    cloudy: ["흐린 날씨에 어울리는 생각이 있었나요?", "오늘 차분하게 보낸 시간은?"],
    rainy: ["비 오는 날의 감성은 어땠나요?", "오늘 실내에서 즐긴 것은?"],
    snowy: ["눈 오는 날의 추억이 생겼나요?", "오늘 따뜻하게 보낸 시간은?"]
};

// 2주간 데이터 분석 기반 질문
const twoWeekAnalysisQuestions = {
    // 기분 트렌드 기반
    mostlyPositive: [
        "최근 2주간 기분이 좋은 날이 많았네요! 이 행복의 비결은 무엇인가요?",
        "요즘 긍정적인 에너지가 넘치시네요. 이 기분을 유지하는 나만의 방법이 있나요?",
        "최근 행복했던 순간들 중 가장 기억에 남는 것은?"
    ],
    mostlyNegative: [
        "최근 힘든 날이 좀 있었네요. 자신을 위해 쉬어가는 시간을 가져보는 건 어떨까요?",
        "요즘 마음이 무거웠다면, 오늘 자신에게 해주고 싶은 위로의 말은?",
        "힘든 시기를 지나고 있다면, 작은 것이라도 나를 웃게 만든 것이 있었나요?"
    ],
    mixed: [
        "최근 기분의 변화가 있었네요. 기분에 가장 영향을 준 것은 무엇이었나요?",
        "좋은 날도 힘든 날도 있었던 2주였네요. 오늘은 어떤 하루로 만들고 싶나요?",
        "감정의 롤러코스터를 탄 요즘, 나를 안정시켜주는 것은?"
    ],
    noData: [
        "오늘부터 기분을 기록해보세요. 2주 후 나의 감정 패턴을 발견할 수 있어요!",
        "매일 기분을 기록하면 나를 더 잘 이해할 수 있어요. 오늘의 기분은 어떤가요?"
    ],
    // 날씨 트렌드 기반
    rainyWeek: [
        "최근 비 오는 날이 많았네요. 실내에서 즐긴 활동이 있었나요?",
        "비 오는 날들 속에서 발견한 소소한 행복은?"
    ],
    sunnyWeek: [
        "화창한 날이 이어졌네요. 야외에서 특별히 한 일이 있나요?",
        "좋은 날씨를 만끽한 순간이 있다면?"
    ],
    // 기분-날씨 상관관계
    weatherAffectsMood: [
        "날씨가 기분에 영향을 주는 편인가요? 최근 그런 경험이 있었나요?",
        "비 오는 날과 맑은 날, 나의 감정은 어떻게 달라지나요?"
    ]
};

let dateStr = '';

// 마크다운 뷰 모드 상태
let diaryViewMode = 'markdown';

// 저장된 일기 사진들 (Base64 배열)
let diaryPhotos = [];

// 마크다운 → HTML 렌더링 함수
function updateRenderedNote() {
    const textarea = document.getElementById('note');
    const rendered = document.getElementById('noteRendered');
    if (!textarea || !rendered) return;

    const markdown = textarea.value || '';

    if (typeof marked !== 'undefined') {
        rendered.innerHTML = marked.parse(markdown);
    } else {
        rendered.textContent = markdown;
    }
}

// 뷰 모드 전환 (Markdown / 렌더링)
function setDiaryViewMode(mode) {
    const textarea = document.getElementById('note');
    const rendered = document.getElementById('noteRendered');
    const btnMd = document.getElementById('btnMarkdownView');
    const btnRender = document.getElementById('btnRenderedView');
    if (!textarea || !rendered || !btnMd || !btnRender) return;

    diaryViewMode = mode;

    if (mode === 'markdown') {
        textarea.style.display = 'block';
        rendered.style.display = 'none';
        btnMd.classList.add('active');
        btnRender.classList.remove('active');
    } else {
        // 렌더링 모드일 때는 미리보기 갱신 후 토글
        updateRenderedNote();
        textarea.style.display = 'none';
        rendered.style.display = 'block';
        btnMd.classList.remove('active');
        btnRender.classList.add('active');
    }
}

// 페이지 로드 시 초기화
window.onload = () => {
    // 날짜 세팅 (URL ?date=YYYY-MM-DD 없으면 오늘)
    const params = new URLSearchParams(location.search);
    dateStr = params.get('date') || getTodayDate();
    document.getElementById('dateText').textContent = dateStr;

    // 저장된 일기 로드
    loadSavedDiary(dateStr);

    // 질문 로드
    loadTodayQuestion();

    // 이모지(기분) 클릭 이벤트
    document.getElementById('moodList').addEventListener('click', (e) => {
        const emoEl = e.target.closest('.emoji-item:not(.emoji-photo-label)');
        if (!emoEl) return;
        const emo = emoEl.textContent;
        document.getElementById('moodNow').textContent = emo;
        localStorage.setItem(`ma_mood_${dateStr}`, emo);
        updateEmojiSelection('moodList', emo);
        // 사진 있으면 제거
        document.getElementById('moodPhotoPreview').style.display = 'none';
        localStorage.removeItem(`ma_mood_photo_${dateStr}`);
        // 질문 업데이트
        loadTodayQuestion();
    });

    // 이모지(날씨) 클릭 이벤트
    document.getElementById('weatherList').addEventListener('click', (e) => {
        const emoEl = e.target.closest('.emoji-item');
        if (!emoEl) return;
        const emo = emoEl.textContent;
        document.getElementById('weatherNow').textContent = emo;
        localStorage.setItem(`ma_weather_${dateStr}`, emo);
        updateEmojiSelection('weatherList', emo);
        // 질문 업데이트
        loadTodayQuestion();
    });

    // 기분 사진 업로드
    const moodPhotoInput = document.getElementById('moodPhotoInput');
    if (moodPhotoInput) {
        moodPhotoInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const imageData = event.target.result;
                    localStorage.setItem(`ma_mood_photo_${dateStr}`, imageData);
                    displayMoodPhoto(imageData);
                    // 기분 텍스트 지우기
                    document.getElementById('moodNow').textContent = '📷';
                    localStorage.removeItem(`ma_mood_${dateStr}`);
                    updateEmojiSelection('moodList', null);
                    loadTodayQuestion();
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // 기분 사진 제거 버튼
    const btnRemoveMoodPhoto = document.getElementById('btnRemoveMoodPhoto');
    if (btnRemoveMoodPhoto) {
        btnRemoveMoodPhoto.addEventListener('click', () => {
            document.getElementById('moodPhotoPreview').style.display = 'none';
            localStorage.removeItem(`ma_mood_photo_${dateStr}`);
            document.getElementById('moodNow').textContent = '—';
            loadTodayQuestion();
        });
    }

    // 일기 사진 업로드
    const notePhotoInput = document.getElementById('notePhotoInput');
    if (notePhotoInput) {
        notePhotoInput.addEventListener('change', (e) => {
            const files = e.target.files;
            for (let file of files) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const imageData = event.target.result;
                    diaryPhotos.push(imageData);
                    addNotePhotoPreview(imageData);
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // 저장 버튼
    document.getElementById('btnSave').addEventListener('click', () => saveDiary(dateStr));

    // 뒤로가기 버튼
    document.getElementById('btnBack').addEventListener('click', (e) => {
        e.preventDefault();
        window.location.assign('index.html');
    });

    // 기분 초기화 버튼
    document.getElementById('btnResetMood').addEventListener('click', () => {
        document.getElementById('moodNow').textContent = '—';
        localStorage.removeItem(`ma_mood_${dateStr}`);
        localStorage.removeItem(`ma_mood_photo_${dateStr}`);
        document.getElementById('moodPhotoPreview').style.display = 'none';
        updateEmojiSelection('moodList', null);
        loadTodayQuestion();
    });

    // 날씨 초기화 버튼
    document.getElementById('btnResetWeather').addEventListener('click', () => {
        document.getElementById('weatherNow').textContent = '—';
        localStorage.removeItem(`ma_weather_${dateStr}`);
        updateEmojiSelection('weatherList', null);
        loadTodayQuestion();
    });

    // 마크다운 관련 요소 셋업
    const noteTextarea = document.getElementById('note');
    const noteRendered = document.getElementById('noteRendered');
    const btnMd = document.getElementById('btnMarkdownView');
    const btnRender = document.getElementById('btnRenderedView');

    if (noteTextarea && noteRendered) {
        // 입력 시마다 렌더링 내용 갱신 (렌더링 모드일 때 즉시 반영)
        noteTextarea.addEventListener('input', () => {
            if (diaryViewMode === 'rendered') {
                updateRenderedNote();
            }
        });
    }

    if (btnMd && btnRender) {
        btnMd.addEventListener('click', () => setDiaryViewMode('markdown'));
        btnRender.addEventListener('click', () => setDiaryViewMode('rendered'));
    }

    // 기본은 Markdown 모드
    setDiaryViewMode('markdown');
    // 저장된 내용 기반으로 최초 렌더링 준비
    updateRenderedNote();
};

// 저장된 일기 로드
function loadSavedDiary(dateStr) {
    // 일기 제목
    const savedTitle = localStorage.getItem(`ma_title_${dateStr}`);
    if (savedTitle) {
        document.getElementById('diaryTitle').value = savedTitle;
    }

    // 일기 내용 (마크다운 원본)
    const savedNote = localStorage.getItem(`ma_note_${dateStr}`);
    if (savedNote) {
        document.getElementById('note').value = savedNote;
    }

    // 기분 이모지
    const savedMood = localStorage.getItem(`ma_mood_${dateStr}`);
    if (savedMood) {
        document.getElementById('moodNow').textContent = savedMood;
        updateEmojiSelection('moodList', savedMood);
    }

    // 기분 사진
    const savedMoodPhoto = localStorage.getItem(`ma_mood_photo_${dateStr}`);
    if (savedMoodPhoto) {
        displayMoodPhoto(savedMoodPhoto);
        document.getElementById('moodNow').textContent = '📷';
        updateEmojiSelection('moodList', null);
    }

    // 날씨 이모지
    const savedWeather = localStorage.getItem(`ma_weather_${dateStr}`);
    if (savedWeather) {
        document.getElementById('weatherNow').textContent = savedWeather;
        updateEmojiSelection('weatherList', savedWeather);
    }

    // 일기 사진들
    const savedPhotos = localStorage.getItem(`ma_note_photos_${dateStr}`);
    if (savedPhotos) {
        try {
            diaryPhotos = JSON.parse(savedPhotos);
            diaryPhotos.forEach(photo => addNotePhotoPreview(photo));
        } catch (e) {
            console.error('사진 로드 오류:', e);
        }
    }
}

// 기분 사진 표시
function displayMoodPhoto(imageData) {
    const preview = document.getElementById('moodPhotoPreview');
    const img = document.getElementById('moodPhotoImg');
    img.src = imageData;
    preview.style.display = 'block';
}

// 일기 사진 미리보기 추가
function addNotePhotoPreview(imageData) {
    const previewContainer = document.getElementById('notePhotoPreview');
    const photoItem = document.createElement('div');
    photoItem.className = 'note-photo-item';

    const img = document.createElement('img');
    img.src = imageData;

    const removeBtn = document.createElement('button');
    removeBtn.className = 'note-photo-remove';
    removeBtn.textContent = '✕';
    removeBtn.type = 'button';
    removeBtn.addEventListener('click', () => {
        photoItem.remove();
        diaryPhotos = diaryPhotos.filter(p => p !== imageData);
    });

    photoItem.appendChild(img);
    photoItem.appendChild(removeBtn);
    previewContainer.appendChild(photoItem);
}

// 이모지 선택 상태 업데이트 (배경색 변경)
function updateEmojiSelection(listId, selectedEmoji) {
    const items = document.querySelectorAll(`#${listId} .emoji-item:not(.emoji-photo-label)`);
    items.forEach(item => {
        if (selectedEmoji && item.textContent === selectedEmoji) {
            item.classList.add('selected');
        } else {
            item.classList.remove('selected');
        }
    });
}

// 오늘의 질문 로드 (초기 설정 없을 시 기본 3개 나오도록 수정)
function loadTodayQuestion() {
    const settings = JSON.parse(localStorage.getItem('ma_settings')) || {};
    const mbti = settings.selectedMBTI;

    // 1. 설정된 개수 가져오기
    // ★ 수정됨: settings.basicCount가 undefined(초기상태)면 3으로 설정
    const mbtiCount = (settings.mbtiCount !== undefined) ? parseInt(settings.mbtiCount) : 0;
    const basicCount = (settings.basicCount !== undefined) ? parseInt(settings.basicCount) : 3;
    const customCount = (settings.customCount !== undefined) ? parseInt(settings.customCount) : 0;

    // 2. 각 소스별 질문 배열 준비
    const mbtiQuestionsArr = mbtiQuestions[mbti] || [];
    const customQuestionsArr = JSON.parse(localStorage.getItem('ma_custom_questions')) || [];
    const defaultQuestionsArr = defaultQuestions;

    // 3. 질문 뽑기
    
    // (1) MBTI 질문 뽑기
    const mbtiSet = pickRandom(mbtiQuestionsArr, mbtiCount);

    // (2) 사용자 질문 뽑기
    const customSet = pickRandom(customQuestionsArr, customCount);

    // (3) 기본 질문 뽑기 (2주 분석 질문 포함 로직)
    let basicSet = [];
    
    // 2주 분석 질문 가져오기
    const twoWeekQuestion = getTwoWeekAnalysisQuestion();

    if (twoWeekQuestion && basicCount > 0) {
        // 분석 질문 1개 추가
        basicSet.push(twoWeekQuestion);
        
        // 남은 개수만큼 랜덤 기본 질문 추가
        const remainingCount = basicCount - 1;
        if (remainingCount > 0) {
            const randomBasics = pickRandom(defaultQuestionsArr, remainingCount);
            basicSet = [...basicSet, ...randomBasics];
        }
    } else {
        // 분석 질문 없거나 개수 0이면 그냥 랜덤 뽑기
        basicSet = pickRandom(defaultQuestionsArr, basicCount);
    }

    // 4. 질문 합치기
    let finalQuestions = [...mbtiSet, ...basicSet, ...customSet];

    // 만약 질문이 하나도 없다면(모든 설정 0) 기본 질문 1개 표시
    if (finalQuestions.length === 0) {
        finalQuestions.push(defaultQuestionsArr[0]);
    }

    // 5. 화면에 렌더링
    const listEl = document.getElementById('question-list');
    if (!listEl) return;

    listEl.innerHTML = finalQuestions.map(q => {
        let category = 'basic'; 
        let label = '기본 질문';

        if (mbtiQuestionsArr.includes(q)) {
            category = 'mbti';
            label = 'MBTI 질문';
        } else if (customQuestionsArr.includes(q)) {
            category = 'custom';
            label = '나만의 질문';
        } else {
            category = 'basic';
            label = '기본 질문';
        }
        
        return `
            <li class="question-item question-${category}">
                <span class="q-badge">${label}</span>
                <span class="q-text">${q}</span>
            </li>
        `;
    }).join('');
}

// 2주간 데이터 분석 및 질문 생성
function getTwoWeekAnalysisQuestion() {
    const positiveMoods = ['😊', '😍', '🥳', '😎'];
    const negativeMoods = ['😢', '😭', '😡'];
    const rainyWeathers = ['🌧️', '⛈️', '🌨️'];
    const sunnyWeathers = ['☀️', '🌤️', '🌈'];

    // 2주간 데이터 수집
    const today = new Date();
    let positiveCount = 0;
    let negativeCount = 0;
    let neutralCount = 0;
    let rainyCount = 0;
    let sunnyCount = 0;
    let totalMoodDays = 0;
    let totalWeatherDays = 0;

    for (let i = 0; i < 14; i++) {
        const d = new Date(today);
        d.setDate(today.getDate() - i);
        const ds = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

        const mood = localStorage.getItem(`ma_mood_${ds}`);
        const weather = localStorage.getItem(`ma_weather_${ds}`);

        if (mood) {
            totalMoodDays++;
            if (positiveMoods.includes(mood)) positiveCount++;
            else if (negativeMoods.includes(mood)) negativeCount++;
            else neutralCount++;
        }

        if (weather) {
            totalWeatherDays++;
            if (rainyWeathers.includes(weather)) rainyCount++;
            else if (sunnyWeathers.includes(weather)) sunnyCount++;
        }
    }

    const dayIndex = parseInt(dateStr.replace(/-/g, ''));

    // 데이터가 없으면
    if (totalMoodDays < 3) {
        const qs = twoWeekAnalysisQuestions.noData;
        return qs[dayIndex % qs.length];
    }

    // 기분 트렌드 분석
    const positiveRatio = positiveCount / totalMoodDays;
    const negativeRatio = negativeCount / totalMoodDays;

    let moodQuestions = [];
    if (positiveRatio >= 0.6) {
        moodQuestions = twoWeekAnalysisQuestions.mostlyPositive;
    } else if (negativeRatio >= 0.5) {
        moodQuestions = twoWeekAnalysisQuestions.mostlyNegative;
    } else {
        moodQuestions = twoWeekAnalysisQuestions.mixed;
    }

    // 날씨 트렌드 분석 (보조)
    if (totalWeatherDays >= 5) {
        if (rainyCount / totalWeatherDays >= 0.5) {
            moodQuestions = moodQuestions.concat(twoWeekAnalysisQuestions.rainyWeek);
        } else if (sunnyCount / totalWeatherDays >= 0.5) {
            moodQuestions = moodQuestions.concat(twoWeekAnalysisQuestions.sunnyWeek);
        }
    }

    return moodQuestions[dayIndex % moodQuestions.length];
}

// 일기 저장 (localStorage 기반)
function saveDiary(dateStr) {
    const title = document.getElementById('diaryTitle').value.trim();
    const content = document.getElementById('note').value.trim(); // 마크다운 원본 그대로 저장

    // 일기 제목 저장
    if (title) {
        localStorage.setItem(`ma_title_${dateStr}`, title);
    } else {
        localStorage.removeItem(`ma_title_${dateStr}`);
    }

    // 일기 내용 저장
    if (content) {
        localStorage.setItem(`ma_note_${dateStr}`, content);
    } else {
        localStorage.removeItem(`ma_note_${dateStr}`);
    }

    // 일기 사진들 저장
    if (diaryPhotos.length > 0) {
        localStorage.setItem(`ma_note_photos_${dateStr}`, JSON.stringify(diaryPhotos));
    } else {
        localStorage.removeItem(`ma_note_photos_${dateStr}`);
    }

    // "이 날짜에 일기가 있다" 플래그 (제목/내용/일기사진/기분/기분사진/날씨 중 하나라도 있으면 true) //수정
    const hasDiary =
        !!title ||
        !!content ||
        diaryPhotos.length > 0 ||
        !!localStorage.getItem(`ma_mood_${dateStr}`) ||
        !!localStorage.getItem(`ma_mood_photo_${dateStr}`) ||
        !!localStorage.getItem(`ma_weather_${dateStr}`); //수정

    if (hasDiary) {
        localStorage.setItem(`ma_has_diary_${dateStr}`, '1'); //수정
    } else {
        localStorage.removeItem(`ma_has_diary_${dateStr}`); //수정
    }

    alert('일기가 저장되었습니다! 📝');
    window.location.href = 'index.html';
}

// 오늘 날짜 가져오기 (YYYY-MM-DD 형식)
function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function pickRandom(arr, count) {
    const shuffled = [...arr].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}