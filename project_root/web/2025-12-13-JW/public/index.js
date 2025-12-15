// ====== 상태 ======
let view = new Date();
let viewYear = view.getFullYear();
let viewMonth = view.getMonth();
let selectedDate = null;

// ====== 명언 및 MBTI별 한마디 데이터 ======
const defaultQuotes = [
    "작은 발걸음이라도 매일 나아가면 결국 큰 길을 완성하게 된다.",
    "오늘 하루도 충분히 잘하고 있어요.",
    "당신의 존재 자체가 누군가에게 큰 힘이 됩니다.",
    "실패는 성공으로 가는 길의 일부일 뿐이에요.",
    "지금 이 순간에 집중하세요. 그것이 가장 소중한 선물입니다.",
    "힘든 날도 있지만, 그래서 좋은 날이 더 빛나는 거예요.",
    "당신은 생각보다 훨씬 강한 사람이에요.",
    "오늘의 노력이 내일의 나를 만들어요.",
    "잠시 쉬어가도 괜찮아요. 쉼도 성장의 일부니까요.",
    "당신의 가능성은 무한해요. 믿어보세요."
];

// MBTI별 친근한 위로/응원/조언 메시지
const mbtiMessages = {
    INTJ: [
        "계획대로 안 되는 날도 있어요. 그래도 당신의 통찰력은 빛나고 있어요.",
        "완벽하지 않아도 괜찮아요. 당신의 비전은 여전히 가치 있어요.",
        "혼자 고민하지 마세요. 때론 다른 시각이 새로운 해답을 줄 수 있어요."
    ],
    INTP: [
        "끊임없이 생각하는 당신, 가끔은 머리를 비우는 것도 좋아요.",
        "정답을 못 찾아도 괜찮아요. 질문 자체가 당신의 강점이에요.",
        "당신의 독특한 관점이 세상을 더 풍요롭게 만들어요."
    ],
    ENTJ: [
        "리더도 쉬어야 해요. 오늘은 자신을 위한 시간을 가져보세요.",
        "모든 걸 컨트롤할 수 없어도 괜찮아요. 당신은 이미 충분히 잘하고 있어요.",
        "가끔은 흐름에 맡기는 것도 좋은 전략이에요."
    ],
    ENTP: [
        "새로운 아이디어가 넘치는 당신! 하나씩 차근차근 해봐요.",
        "논쟁에서 지더라도 배운 게 있다면 그건 승리예요.",
        "당신의 열정이 주변 사람들에게 에너지를 줘요."
    ],
    INFJ: [
        "다른 사람 걱정도 좋지만, 오늘은 자신을 먼저 돌봐주세요.",
        "완벽한 조언자가 아니어도 돼요. 당신의 진심이면 충분해요.",
        "당신의 따뜻함이 누군가에게 큰 위로가 되고 있어요."
    ],
    INFP: [
        "감정의 파도가 거세도 괜찮아요. 그게 당신의 깊이예요.",
        "이상과 현실 사이에서 힘들 때, 잠시 쉬어가도 괜찮아요.",
        "당신의 감수성이 세상을 더 아름답게 만들어요."
    ],
    ENFJ: [
        "모두를 행복하게 할 수 없어도 괜찮아요. 당신도 소중하니까요.",
        "남을 돕기 전에 자신의 컵부터 채워주세요.",
        "당신의 따뜻한 리더십이 많은 사람들에게 빛이 돼요."
    ],
    ENFP: [
        "모든 가능성을 탐험할 필요 없어요. 지금 이 순간도 충분히 특별해요.",
        "에너지가 떨어지는 날도 있어요. 충전하는 시간을 가져보세요.",
        "당신의 밝은 에너지가 주변을 환하게 해요."
    ],
    ISTJ: [
        "계획대로 안 되어도 괜찮아요. 유연함도 강점이에요.",
        "당신의 성실함은 언제나 빛나요. 오늘도 수고했어요.",
        "완벽하지 않아도 당신의 노력은 가치 있어요."
    ],
    ISFJ: [
        "남을 챙기느라 지친 당신, 오늘은 자신을 챙겨주세요.",
        "거절해도 괜찮아요. 당신의 마음도 중요하니까요.",
        "당신의 세심한 배려가 주변을 따뜻하게 해요."
    ],
    ESTJ: [
        "통제할 수 없는 일도 있어요. 그래도 당신은 잘하고 있어요.",
        "가끔은 규칙을 벗어나는 것도 새로운 발견이 될 수 있어요.",
        "당신의 책임감이 팀을 든든하게 지탱해요."
    ],
    ESFJ: [
        "모두의 기대에 부응할 필요 없어요. 당신 자신으로 충분해요.",
        "갈등이 불편해도 괜찮아요. 당신의 평화 추구는 장점이에요.",
        "당신의 따뜻한 마음씨가 공동체를 하나로 묶어요."
    ],
    ISTP: [
        "말로 표현하지 않아도 괜찮아요. 당신의 행동이 말해줘요.",
        "혼자만의 시간이 필요하면 가져도 돼요. 그게 당신의 충전 방식이니까요.",
        "문제 해결 능력이 뛰어난 당신, 오늘도 멋져요."
    ],
    ISFP: [
        "예술적 감각이 빛나는 당신, 오늘도 아름다운 하루 보내세요.",
        "비교하지 않아도 돼요. 당신만의 색깔이 가장 아름다워요.",
        "조용히 자신만의 길을 가는 당신이 멋져요."
    ],
    ESTP: [
        "잠시 멈춰도 괜찮아요. 재충전 후 더 멀리 갈 수 있어요.",
        "모험도 좋지만, 가끔은 안전한 곳에서 쉬어가세요.",
        "당신의 에너지와 행동력이 주변에 활력을 줘요."
    ],
    ESFP: [
        "파티의 중심이 아니어도 괜찮아요. 조용한 하루도 소중해요.",
        "즐거움 뒤에 숨은 감정도 표현해도 돼요.",
        "당신의 밝은 에너지가 모두를 즐겁게 해요."
    ]
};

// 감정 기반 추가 메시지
const moodBasedMessages = {
    positive: [
        "오늘 기분이 좋으시네요! 이 좋은 에너지 오래 간직하세요.",
        "행복한 하루를 보내고 계시네요. 이 순간을 기억해두세요!",
        "긍정적인 에너지가 느껴져요. 오늘 하루도 빛나세요!"
    ],
    neutral: [
        "평온한 하루네요. 가끔은 이런 날도 필요해요.",
        "조용한 하루도 의미 있어요. 천천히 가도 괜찮아요.",
        "생각이 많은 날이네요. 좋은 아이디어가 떠오를 거예요."
    ],
    negative: [
        "힘든 하루였나요? 괜찮아요, 내일은 더 나아질 거예요.",
        "우울한 날도 있어요. 자신을 너무 몰아붙이지 마세요.",
        "감정을 느끼는 것도 용기예요. 천천히 회복하세요."
    ]
};

// 날씨 기반 추가 메시지
const weatherBasedMessages = {
    sunny: [
        "화창한 날씨처럼 마음도 맑아지길 바라요!",
        "좋은 날씨네요. 잠깐이라도 바깥 공기를 마셔보세요."
    ],
    cloudy: [
        "흐린 날씨에도 구름 위에는 항상 태양이 있어요.",
        "바람이 부는 날이네요. 새로운 변화의 바람일지도 몰라요."
    ],
    rainy: [
        "비 오는 날도 운치 있어요. 따뜻한 음료 한 잔 어떠세요?",
        "빗소리를 들으며 잠시 쉬어가는 것도 좋아요."
    ],
    snowy: [
        "눈 오는 날이네요. 포근하게 보내세요!",
        "겨울 날씨에는 따뜻함이 더 소중해져요."
    ]
};

// ====== 초기화 ======
window.addEventListener('DOMContentLoaded', () => {
    const t = new Date();
    const mm = String(t.getMonth() + 1).padStart(2, '0');
    const dd = String(t.getDate()).padStart(2, '0');
    selectedDate = `${t.getFullYear()}-${mm}-${dd}`;

    renderCalendar();
    updateMbtiBadge();
    renderTodayQuote();
    renderLastYearToday();
    renderWeatherWeek();

    // 이전달
    document.getElementById('btnPrev').addEventListener('click', () => {
        if (viewMonth === 0) { viewMonth = 11; viewYear--; }
        else viewMonth--;
        renderCalendar();
    });

    // 다음달
    document.getElementById('btnNext').addEventListener('click', () => {
        if (viewMonth === 11) { viewMonth = 0; viewYear++; }
        else viewMonth++;
        renderCalendar();
    });

    // 오늘 버튼
    document.getElementById('btnToday').addEventListener('click', () => {
        const t = new Date();
        viewYear = t.getFullYear();
        viewMonth = t.getMonth();
        const mm = String(t.getMonth() + 1).padStart(2, '0');
        const dd = String(t.getDate()).padStart(2, '0');
        selectedDate = `${t.getFullYear()}-${mm}-${dd}`;
        renderCalendar();
    });
});

// ====== 유틸 ======
function toISO(y, m, d) {
    const mm = String(m).padStart(2, '0');
    const dd = String(d).padStart(2, '0');
    return `${y}-${mm}-${dd}`;
}

function updateSelection() {
    document.querySelectorAll('#calendarGrid .cell.selected')
        .forEach(c => c.classList.remove('selected'));

    const grid = document.getElementById('calendarGrid');
    const todayIso = new Date().toISOString().slice(0, 10);

    if (selectedDate && selectedDate !== todayIso) {
        grid.classList.add('suppress-today');
    } else {
        grid.classList.remove('suppress-today');
    }

    if (!selectedDate) return;
    const cell = document.querySelector(`#calendarGrid .cell[data-date="${selectedDate}"]`);
    if (cell) cell.classList.add('selected');
}

// ====== 달력 렌더링 ======
function renderCalendar() {
    const grid = document.getElementById('calendarGrid');
    const title = document.getElementById('monthTitle');

    title.textContent = `${viewYear}년 ${viewMonth + 1}월`;
    grid.innerHTML = '';

    const first = new Date(viewYear, viewMonth, 1);
    const last = new Date(viewYear, viewMonth + 1, 0);
    const firstDay = first.getDay();
    const daysInMonth = last.getDate();

    // 이전달 여백
    for (let i = 0; i < firstDay; i++) {
        const div = document.createElement('div');
        div.className = 'cell muted';
        grid.appendChild(div);
    }

    // 날짜 채우기
    const todayIso = new Date().toISOString().slice(0, 10);
    for (let d = 1; d <= daysInMonth; d++) {
        const dateStr = toISO(viewYear, viewMonth + 1, d);
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.setAttribute('data-date', dateStr);

        const num = document.createElement('div');
        num.className = 'date-num';
        num.textContent = String(d);
        cell.appendChild(num);

        if (dateStr === todayIso) {
            cell.classList.add('today');
        }

        // ====== 이 날짜의 저장 데이터 읽기 ======
        const title = localStorage.getItem(`ma_title_${dateStr}`);
        const note = localStorage.getItem(`ma_note_${dateStr}`);
        const emo = localStorage.getItem(`ma_mood_${dateStr}`);
        const weather = localStorage.getItem(`ma_weather_${dateStr}`);
        const moodPhoto = localStorage.getItem(`ma_mood_photo_${dateStr}`);
        const notePhotos = localStorage.getItem(`ma_note_photos_${dateStr}`);
        
        // ✅ [추가됨] 질문 데이터 확인
        const questions = localStorage.getItem(`ma_questions_${dateStr}`);

        const hasTitle = !!(title && title.trim() !== '');
        const hasNote = !!(note && note.trim() !== '');
        const hasMood = !!(emo && emo.trim() !== '');
        const hasWeather = !!(weather && weather.trim() !== '');
        const hasMoodPhoto = !!moodPhoto;
        const hasNotePhotos = !!notePhotos && notePhotos !== '[]';
        // ✅ 질문이 있으면 체크
        const hasQuestions = !!questions;

        // 1) 기분 이모지가 있으면 → 이모지 뱃지
        if (hasMood) {
            const badge = document.createElement('span');
            badge.className = 'mood-emoji';
            badge.textContent = emo;
            cell.appendChild(badge);
            cell.classList.add('has-emoji');
        }
        // 2) 기분 사진이 있으면 → 카메라 이모지 📷
        else if (hasMoodPhoto) {
            const cam = document.createElement('span');
            cam.className = 'mood-emoji mood-photo-icon';
            cam.textContent = '📷';
            cell.appendChild(cam);
            cell.classList.add('has-emoji');
        }
        // 3) 그 외 기록(제목/내용/사진/**질문**)이 하나라도 있으면 → 체크 표시 ✓
        else if (
            !hasMood &&
            !hasWeather &&
            !hasMoodPhoto &&
            (hasTitle || hasNote || hasNotePhotos || hasQuestions) // ✅ 여기에 hasQuestions 추가!
        ) {
            const check = document.createElement('span');
            check.className = 'check-mark';
            check.textContent = '✓';
            cell.appendChild(check);
            cell.classList.add('has-check');
        }

        attachHandlers(cell, dateStr);
        grid.appendChild(cell);
    }

    // 다음달 빈칸
    const totalCells = firstDay + daysInMonth;
    const tail = (7 - (totalCells % 7)) % 7;
    for (let i = 0; i < tail; i++) {
        const div = document.createElement('div');
        div.className = 'cell muted';
        grid.appendChild(div);
    }

    updateSelection();
}

// ✅ [핵심 수정] 클릭 핸들러 (이동 로직 단순화)
function attachHandlers(cell, dateStr) {
    cell.addEventListener('click', () => {
        selectedDate = dateStr;
        updateSelection();
    });

    // 더블클릭 시 이동 로직
    cell.addEventListener('dblclick', () => {
        // diary.js에서 저장할 때 만들어둔 'ma_has_diary_' 플래그를 확인합니다.
        // 이 플래그는 질문만 있어도, 내용만 있어도 항상 '1'로 저장되므로 믿을 수 있습니다.
        const hasDiaryFlag = !!localStorage.getItem(`ma_has_diary_${dateStr}`);

        if (hasDiaryFlag) {
            // 일기가 있으면 보기 페이지로
            window.location.href = `saved_diary.html?date=${dateStr}`;
        } else {
            // 없으면 작성 페이지로
            window.location.href = `diary.html?date=${dateStr}`;
        }
    });
}

// ====== MBTI 뱃지 ======
function updateMbtiBadge() {
    const settings = JSON.parse(localStorage.getItem('ma_settings') || '{}');
    const mbti = settings.selectedMBTI || '';
    const badge = document.getElementById('mbtiBadge');
    if (badge) {
        badge.textContent = mbti ? `MBTI: ${mbti}` : 'MBTI: 미설정';
    }
}

// ====== 오늘의 한마디 (감정/날씨/MBTI 기반) ======
function renderTodayQuote() {
    const quoteEl = document.getElementById('quoteText');
    if (!quoteEl) return;

    const todayStr = new Date().toISOString().slice(0, 10);
    const mood = localStorage.getItem(`ma_mood_${todayStr}`);
    const weather = localStorage.getItem(`ma_weather_${todayStr}`);
    const settings = JSON.parse(localStorage.getItem('ma_settings') || '{}');
    const mbti = settings.selectedMBTI || '';
    const quoteMode = settings.quoteMode || 'quote';

    let quote = '';

    // MBTI 모드일 경우
    if (quoteMode === 'mbti' && mbti && mbtiMessages[mbti]) {
        const msgs = mbtiMessages[mbti];
        quote = msgs[Math.floor(Math.random() * msgs.length)];
    } else {
        // 기본 명언 + 감정/날씨 기반 메시지
        const dayIndex = new Date().getDate() % defaultQuotes.length;
        quote = defaultQuotes[dayIndex];

        // 감정 기반 추가
        if (mood) {
            const positiveMoods = ['😊', '😍', '🥳', '😎'];
            const neutralMoods = ['🤔', '😴'];
            const negativeMoods = ['😢', '😭', '😡'];

            let moodMsgs = [];
            if (positiveMoods.includes(mood)) moodMsgs = moodBasedMessages.positive;
            else if (neutralMoods.includes(mood)) moodMsgs = moodBasedMessages.neutral;
            else if (negativeMoods.includes(mood)) moodMsgs = moodBasedMessages.negative;

            if (moodMsgs.length > 0) {
                quote = moodMsgs[Math.floor(Math.random() * moodMsgs.length)];
            }
        }

        // 날씨 기반 (감정이 없을 경우)
        if (!mood && weather) {
            const sunnyWeather = ['☀️', '🌤️', '🌈'];
            const cloudyWeather = ['⛅', '💨'];
            const rainyWeather = ['🌧️', '⛈️'];
            const snowyWeather = ['❄️', '🌨️'];

            let weatherMsgs = [];
            if (sunnyWeather.includes(weather)) weatherMsgs = weatherBasedMessages.sunny;
            else if (cloudyWeather.includes(weather)) weatherMsgs = weatherBasedMessages.cloudy;
            else if (rainyWeather.includes(weather)) weatherMsgs = weatherBasedMessages.rainy;
            else if (snowyWeather.includes(weather)) weatherMsgs = weatherBasedMessages.snowy;

            if (weatherMsgs.length > 0) {
                quote = weatherMsgs[Math.floor(Math.random() * weatherMsgs.length)];
            }
        }
    }

    quoteEl.innerHTML = `"${quote}"`;
}

// ====== 작년의 오늘 ======
function renderLastYearToday() {
    const dateEl = document.getElementById('lastYearDate');
    const previewEl = document.getElementById('lastYearPreview');
    const linkEl = document.getElementById('lastYearLink');

    if (!dateEl || !previewEl || !linkEl) return;

    const today = new Date();
    const lastYear = today.getFullYear() - 1;
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const lastYearDateStr = `${lastYear}-${mm}-${dd}`;

    dateEl.textContent = `${lastYear}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;

    // 작년 일기 확인
    const hasDiaryFlag = !!localStorage.getItem(`ma_has_diary_${lastYearDateStr}`);
    
    // 혹시 몰라 개별 데이터도 확인 (하위 호환성)
    const title = localStorage.getItem(`ma_title_${lastYearDateStr}`);
    const note = localStorage.getItem(`ma_note_${lastYearDateStr}`);
    const mood = localStorage.getItem(`ma_mood_${lastYearDateStr}`);
    const weather = localStorage.getItem(`ma_weather_${lastYearDateStr}`);
    const savedQs = localStorage.getItem(`ma_questions_${lastYearDateStr}`); // 질문도 확인

    if (hasDiaryFlag || title || note || mood || weather || savedQs) {
        let preview = '';

        // 이모지 표시
        if (mood || weather) {
            preview += '<span class="lastyear-emojis">';
            if (mood) preview += mood;
            if (weather) preview += ' ' + weather;
            preview += '</span> ';
        }

        // 제목 표시
        if (title) {
            preview += `<strong>${title}</strong>`;
        } else if (note) {
            preview += note.length > 30 ? note.substring(0, 30) + '...' : note;
        } else if (savedQs) {
            preview += '질문으로 남긴 기록이 있어요!';
        } else {
            preview += '기록이 있어요!';
        }

        previewEl.innerHTML = preview;
        // 작년 오늘도 읽기 전용 페이지로 이동
        linkEl.href = `saved_diary.html?date=${lastYearDateStr}`;
        linkEl.style.display = 'inline-block';
    } else {
        previewEl.textContent = '기록이 없습니다.';
        linkEl.style.display = 'none';
    }
}

// ====== 이번주 날씨 (실제 날씨 API) ======
async function renderWeatherWeek() {
    const weatherEl = document.getElementById('weatherWeek');
    if (!weatherEl) return;

    // 로딩 표시
    weatherEl.innerHTML = '<div class="weather-loading">날씨 정보 로딩 중...</div>';

    const dayLabels = ['일', '월', '화', '수', '목', '금', '토'];
    const today = new Date();
    const todayStr = today.toISOString().slice(0, 10);

    // 이번 주 일요일 찾기
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());

    try {
        // 사용자 위치 가져오기 (기본값: 서울)
        let lat = 37.5665;
        let lon = 126.9780;

        // Geolocation API 시도
        if (navigator.geolocation) {
            try {
                const position = await new Promise((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 5000 });
                });
                lat = position.coords.latitude;
                lon = position.coords.longitude;
            } catch (e) {
                console.log('위치 정보를 가져올 수 없어 서울 기준으로 표시합니다.');
            }
        }

        // Open-Meteo API 호출 (무료, API 키 불필요)
        const startDate = toISO(startOfWeek.getFullYear(), startOfWeek.getMonth() + 1, startOfWeek.getDate());
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        const endDate = toISO(endOfWeek.getFullYear(), endOfWeek.getMonth() + 1, endOfWeek.getDate());

        const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=Asia/Seoul&start_date=${startDate}&end_date=${endDate}`;

        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.daily) {
            let html = '';
            for (let i = 0; i < 7; i++) {
                const d = new Date(startOfWeek);
                d.setDate(startOfWeek.getDate() + i);
                const dateStr = toISO(d.getFullYear(), d.getMonth() + 1, d.getDate());
                const isToday = dateStr === todayStr;

                const weatherCode = data.daily.weather_code[i];
                const tempMax = Math.round(data.daily.temperature_2m_max[i]);
                const tempMin = Math.round(data.daily.temperature_2m_min[i]);
                const weatherEmoji = getWeatherEmoji(weatherCode);

                html += `
                    <div class="weather-day${isToday ? ' today' : ''}">
                        <span class="weather-day-label">${dayLabels[i]}</span>
                        <span class="weather-day-emoji">${weatherEmoji}</span>
                        <span class="weather-day-temp">${tempMax}°</span>
                        <span class="weather-day-temp-min">${tempMin}°</span>
                    </div>
                `;
            }
            weatherEl.innerHTML = html;
        } else {
            throw new Error('날씨 데이터 없음');
        }
    } catch (error) {
        console.error('날씨 API 오류:', error);
        // 오류 시 기본 표시
        weatherEl.innerHTML = '<div class="weather-error">날씨 정보를 불러올 수 없습니다.</div>';
    }
}

// 날씨 코드를 이모지로 변환 (WMO 코드 기준)
function getWeatherEmoji(code) {
    if (code === 0) return '☀️'; // 맑음
    if (code === 1 || code === 2) return '🌤️'; // 대체로 맑음
    if (code === 3) return '⛅'; // 흐림
    if (code >= 45 && code <= 48) return '🌫️'; // 안개
    if (code >= 51 && code <= 55) return '🌧️'; // 이슬비
    if (code >= 56 && code <= 57) return '🌧️'; // 진눈깨비
    if (code >= 61 && code <= 65) return '🌧️'; // 비
    if (code >= 66 && code <= 67) return '🌧️'; // 진눈깨비
    if (code >= 71 && code <= 77) return '❄️'; // 눈
    if (code >= 80 && code <= 82) return '🌧️'; // 소나기
    if (code >= 85 && code <= 86) return '🌨️'; // 눈 소나기
    if (code >= 95 && code <= 99) return '⛈️'; // 뇌우
    return '🌥️'; // 기본값
}