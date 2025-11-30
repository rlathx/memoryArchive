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
    "오늘 나의 컨디션은 몇 점?"
];

// MBTI별 질문
const mbtiQuestions = {
    INTJ: ["오늘 세운 계획 중 가장 효율적이었던 것은?", "오늘 해결한 문제가 있다면?", "장기 목표를 위해 오늘 한 일은?"],
    INTP: ["오늘 새롭게 알게 된 흥미로운 사실은?", "오늘 깊이 생각해본 주제는?", "오늘 떠오른 아이디어가 있다면?"],
    ENTJ: ["오늘 리더십을 발휘한 순간은?", "오늘 달성한 목표는?", "팀에서 가장 잘한 일은?"],
    ENTP: ["오늘 새로운 시도를 했다면?", "오늘 나눈 흥미로운 토론은?", "오늘 영감을 준 것은?"],
    INFJ: ["오늘 누군가를 도운 일이 있다면?", "오늘 깨달은 인생의 의미는?", "오늘 마음이 따뜻해진 순간은?"],
    INFP: ["오늘 나의 가치관과 맞았던 순간은?", "오늘 창작 활동을 했다면?", "오늘 감정적으로 울림이 있었던 것은?"],
    ENFJ: ["오늘 누군가에게 긍정적 영향을 준 일은?", "오늘 관계에서 감사한 점은?", "오늘 조화를 이룬 순간은?"],
    ENFP: ["오늘 가장 신났던 순간은?", "오늘 만난 흥미로운 사람은?", "오늘 영감을 받은 것은?"],
    ISTJ: ["오늘 책임감 있게 완수한 일은?", "오늘 지킨 약속이나 루틴은?", "오늘 꼼꼼하게 처리한 일은?"],
    ISFJ: ["오늘 가족/친구를 위해 한 일은?", "오늘 감사한 일상의 소소함은?", "오늘 누군가를 배려한 순간은?"],
    ESTJ: ["오늘 효율적으로 처리한 업무는?", "오늘 팀을 이끈 경험은?", "오늘 규칙을 잘 지킨 일은?"],
    ESFJ: ["오늘 주변 사람들과 나눈 따뜻한 대화는?", "오늘 누군가를 돌본 일은?", "오늘 조화를 위해 노력한 점은?"],
    ISTP: ["오늘 손으로 만들거나 고친 것은?", "오늘 문제를 분석해 해결한 일은?", "오늘 새로 익힌 기술은?"],
    ISFP: ["오늘 아름다움을 느낀 순간은?", "오늘 자유롭게 표현한 것은?", "오늘 나만의 시간에 한 일은?"],
    ESTP: ["오늘 가장 스릴 있었던 순간은?", "오늘 즉흥적으로 한 일은?", "오늘 활동적으로 보낸 시간은?"],
    ESFP: ["오늘 가장 즐거웠던 순간은?", "오늘 사람들과 함께한 재미있는 일은?", "오늘 웃음을 준 것은?"]
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
        const emoEl = e.target.closest('.emoji-item');
        if (!emoEl) return;
        const emo = emoEl.textContent;
        document.getElementById('moodNow').textContent = emo;
        localStorage.setItem(`ma_mood_${dateStr}`, emo);
        updateEmojiSelection('moodList', emo);
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

    // 날씨 이모지
    const savedWeather = localStorage.getItem(`ma_weather_${dateStr}`);
    if (savedWeather) {
        document.getElementById('weatherNow').textContent = savedWeather;
        updateEmojiSelection('weatherList', savedWeather);
    }
}

// 이모지 선택 상태 업데이트 (배경색 변경)
function updateEmojiSelection(listId, selectedEmoji) {
    const items = document.querySelectorAll(`#${listId} .emoji-item`);
    items.forEach(item => {
        if (selectedEmoji && item.textContent === selectedEmoji) {
            item.classList.add('selected');
        } else {
            item.classList.remove('selected');
        }
    });
}

// 오늘의 질문 로드 (설정 + 감정/날씨 + 2주간 분석)
function loadTodayQuestion() {
    const listEl = document.getElementById('question-list');
    const settings = JSON.parse(localStorage.getItem('ma_settings') || '{}');
    const qType = settings.questionType || 'default';
    const mbti = settings.selectedMBTI || '';

    // 현재 감정/날씨 가져오기
    const mood = localStorage.getItem(`ma_mood_${dateStr}`);
    const weather = localStorage.getItem(`ma_weather_${dateStr}`);

    let baseQuestions = [];

    if (qType === 'custom') {
        const customQs = JSON.parse(localStorage.getItem('ma_custom_questions') || '[]');
        baseQuestions = customQs.length > 0 ? customQs : defaultQuestions;
    } else if (qType === 'mbti' && mbti && mbtiQuestions[mbti]) {
        baseQuestions = mbtiQuestions[mbti];
    } else {
        baseQuestions = defaultQuestions;
    }

    // 감정 기반 질문 추가
    let extraQuestions = [];
    if (mood) {
        const positiveMoods = ['😊', '😍', '🥳', '😎'];
        const neutralMoods = ['🤔', '😴'];
        const negativeMoods = ['😢', '😭', '😡'];

        if (positiveMoods.includes(mood)) {
            extraQuestions = extraQuestions.concat(moodBasedQuestions.positive);
        } else if (neutralMoods.includes(mood)) {
            extraQuestions = extraQuestions.concat(moodBasedQuestions.neutral);
        } else if (negativeMoods.includes(mood)) {
            extraQuestions = extraQuestions.concat(moodBasedQuestions.negative);
        }
    }

    // 날씨 기반 질문 추가
    if (weather) {
        const sunnyWeather = ['☀️', '🌤️', '🌈'];
        const cloudyWeather = ['⛅', '💨'];
        const rainyWeather = ['🌧️', '⛈️'];
        const snowyWeather = ['❄️', '🌨️'];

        if (sunnyWeather.includes(weather)) {
            extraQuestions = extraQuestions.concat(weatherBasedQuestions.sunny);
        } else if (cloudyWeather.includes(weather)) {
            extraQuestions = extraQuestions.concat(weatherBasedQuestions.cloudy);
        } else if (rainyWeather.includes(weather)) {
            extraQuestions = extraQuestions.concat(weatherBasedQuestions.rainy);
        } else if (snowyWeather.includes(weather)) {
            extraQuestions = extraQuestions.concat(weatherBasedQuestions.snowy);
        }
    }

    // 2주간 데이터 분석 기반 질문
    const twoWeekQuestion = getTwoWeekAnalysisQuestion();

    // 질문 선택 (기본 1개 + 오늘 감정/날씨 1개 + 2주 분석 1개)
    const dayIndex = parseInt(dateStr.replace(/-/g, '')) % baseQuestions.length;
    const selectedQs = [];

    // 기본 질문 1개
    selectedQs.push(baseQuestions[dayIndex % baseQuestions.length]);

    // 오늘 감정/날씨 기반 질문 1개
    if (extraQuestions.length > 0) {
        const extraIndex = dayIndex % extraQuestions.length;
        selectedQs.push(extraQuestions[extraIndex]);
    } else if (baseQuestions.length > 1) {
        selectedQs.push(baseQuestions[(dayIndex + 1) % baseQuestions.length]);
    }

    // 2주간 분석 기반 질문 1개
    selectedQs.push(twoWeekQuestion);

    listEl.innerHTML = selectedQs.map(q => `<li>${q}</li>`).join('');
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
    const content = document.getElementById('note').value.trim(); // ✅ 마크다운 원본 그대로 저장

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
