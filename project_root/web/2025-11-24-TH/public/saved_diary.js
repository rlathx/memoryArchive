// 페이지 로드 시 초기화
window.onload = () => {
    const params = new URLSearchParams(location.search);
    const dateStr = params.get('date');

    if (!dateStr) {
        // 날짜 없으면 메인으로
        location.href = 'index.html';
        return;
    }

    // 일기 데이터 확인
    const title = localStorage.getItem(`ma_title_${dateStr}`);
    const note = localStorage.getItem(`ma_note_${dateStr}`);
    const mood = localStorage.getItem(`ma_mood_${dateStr}`);
    const weather = localStorage.getItem(`ma_weather_${dateStr}`);

    // 데이터가 하나도 없으면 작성 페이지로 이동
    if (!title && !note && !mood && !weather) {
        location.href = `diary.html?date=${dateStr}`;
        return;
    }

    // 메타 정보 표시
    document.getElementById('metaDate').textContent = dateStr;
    document.getElementById('metaMood').textContent = mood || '—';
    document.getElementById('metaWeather').textContent = weather || '—';

    // 본문 표시
    if (title) {
        document.getElementById('entryTitle').textContent = title;
        document.getElementById('entryTitle').style.display = 'block';
    } else {
        document.getElementById('entryTitle').style.display = 'none';
    }

    if (note) {
        document.getElementById('entryBody').textContent = note;
    } else {
        document.getElementById('entryBody').textContent = '내용이 없습니다.';
    }

    // 한 줄 요약 생성
    generateSummary(title, note, mood);

    // 작년 오늘 표시
    renderLastYearDiary(dateStr);

    // ✅ 수정 버튼은 더 이상 사용하지 않음 (HTML에서도 제거했지만, 혹시 남아있을 경우 대비)
    const editBtn = document.getElementById('btnEdit');
    if (editBtn) {
        editBtn.style.pointerEvents = 'none';
        editBtn.style.opacity = '0.6';
        editBtn.textContent = '읽기 전용 모드';
    }
};

// 한 줄 요약 생성
function generateSummary(title, note, mood) {
    const summaryEl = document.getElementById('summaryText');

    if (!note && !title) {
        summaryEl.textContent = '기록된 내용이 없습니다.';
        return;
    }

    // 기분에 따른 요약 prefix
    let prefix = '';
    const positiveMoods = ['😊', '😍', '🥳', '😎'];
    const negativeMoods = ['😢', '😭', '😡'];

    if (mood) {
        if (positiveMoods.includes(mood)) {
            prefix = '행복한 하루! ';
        } else if (negativeMoods.includes(mood)) {
            prefix = '힘들었지만 기록한 하루. ';
        }
    }

    // 제목이 있으면 제목 기반, 없으면 내용 앞부분
    if (title) {
        summaryEl.textContent = prefix + title;
    } else if (note) {
        const shortNote = note.length > 50 ? note.substring(0, 50) + '...' : note;
        summaryEl.textContent = prefix + shortNote;
    }
}

// 작년 오늘 일기 표시
function renderLastYearDiary(currentDateStr) {
    const entryEl = document.getElementById('lastyearEntry');
    const emptyEl = document.getElementById('lastyearEmpty');

    // 작년 날짜 계산
    const [year, month, day] = currentDateStr.split('-');
    const lastYear = parseInt(year) - 1;
    const lastYearDateStr = `${lastYear}-${month}-${day}`;

    // 작년 데이터 확인
    const title = localStorage.getItem(`ma_title_${lastYearDateStr}`);
    const note = localStorage.getItem(`ma_note_${lastYearDateStr}`);
    const mood = localStorage.getItem(`ma_mood_${lastYearDateStr}`);
    const weather = localStorage.getItem(`ma_weather_${lastYearDateStr}`);

    // 하나라도 있으면 표시
    if (title || note || mood || weather) {
        // 작년 일기 있음
        entryEl.style.display = 'block';
        emptyEl.style.display = 'none';

        document.getElementById('lastyearMood').textContent = mood || '—';
        document.getElementById('lastyearWeather').textContent = weather || '—';
        document.getElementById('lastyearDate').textContent = lastYearDateStr;

        if (title) {
            document.getElementById('lastyearTitle').textContent = title;
            document.getElementById('lastyearTitle').style.display = 'block';
        } else {
            document.getElementById('lastyearTitle').style.display = 'none';
        }

        // 내용 미리보기 (100자)
        if (note) {
            const preview = note.length > 100 ? note.substring(0, 100) + '...' : note;
            document.getElementById('lastyearBody').textContent = preview;
        } else {
            document.getElementById('lastyearBody').textContent = '내용이 없습니다.';
        }

        // saved_diary.html로 링크 (작년 일기도 저장된 일기이므로)
        document.getElementById('lastyearLink').href = `saved_diary.html?date=${lastYearDateStr}`;
    } else {
        // 작년 일기 없음
        entryEl.style.display = 'none';
        emptyEl.style.display = 'block';
    }
}
