// [추가됨] 질문 출처 확인을 위한 데이터 (diary.js와 동일)
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

const mbtiQuestions = {
    INTJ: ["계획대로 된 것은?", "비효율적이었던 것은?", "오늘 얻은 통찰은?", "내일의 전략은?"],
    INTP: ["흥미로운 발견은?", "논리적으로 고민한 것은?", "새로운 아이디어는?", "깊게 파고든 주제는?"],
    ENTJ: ["오늘 이룬 성과는?", "리더십을 발휘한 순간은?", "효율적인 결정은?", "목표 달성률은?"],
    ENTP: ["새로운 시도는?", "논쟁이나 토론은?", "기발한 상상은?", "도전적인 순간은?"],
    INFJ: ["도움을 준 순간은?", "직감이 맞았던 일은?", "의미 있는 대화는?", "나만의 시간은?"],
    INFP: ["감동적인 순간은?", "나답게 행동한 일은?", "마음이 끌린 것은?", "상상했던 세계는?"],
    ENFJ: ["타인을 도운 일은?", "함께해서 좋았던 일은?", "분위기를 이끈 순간은?", "고마운 사람은?"],
    ENFP: ["신나는 일은?", "새로운 인연은?", "열정을 느낀 순간은?", "즉흥적인 즐거움은?"],
    ISTJ: ["책임감을 다한 일은?", "계획대로 마친 일은?", "정리정돈한 것은?", "기억에 남는 사실은?"],
    ISFJ: ["챙겨준 사람은?", "소소한 행복은?", "안정감을 느낀 일은?", "감사한 배려는?"],
    ESTJ: ["체계적으로 처리한 일은?", "규칙을 지킨 일은?", "리드한 경험은?", "실용적인 선택은?"],
    ESFJ: ["나눈 대화는?", "도움이 된 순간은?", "조화로웠던 일은?", "주변 반응은?"],
    ISTP: ["해결한 문제는?", "직접 만든 것은?", "효율적인 방법은?", "몰입한 순간은?"],
    ISFP: ["아름다운 순간은?", "감각적인 경험은?", "나만의 평화는?", "예술적인 영감은?"],
    ESTP: ["짜릿한 순간은?", "즉각적인 행동은?", "새로운 경험은?", "해결한 위기는?"],
    ESFP: ["즐거웠던 순간은?", "주목받은 일은?", "함께 웃은 일은?", "기분 전환은?"]
};

// 페이지 로드 시 초기화
window.onload = () => {
    const params = new URLSearchParams(location.search);
    const dateStr = params.get('date');

    // 1. 날짜 정보가 없으면 메인으로 이동
    if (!dateStr) {
        location.href = 'index.html';
        return;
    }

    // 수정 버튼 이벤트 연결
    const editBtn = document.getElementById('btnEdit');
    if (editBtn) {
        editBtn.addEventListener('click', () => {
            window.location.href = `diary.html?date=${dateStr}`;
        });
    }

    // 2. 데이터 존재 여부 확인
    const hasDiaryFlag = localStorage.getItem(`ma_has_diary_${dateStr}`);
    
    // 개별 데이터 로드
    const title = localStorage.getItem(`ma_title_${dateStr}`);
    const note = localStorage.getItem(`ma_note_${dateStr}`);
    const mood = localStorage.getItem(`ma_mood_${dateStr}`);
    const moodPhoto = localStorage.getItem(`ma_mood_photo_${dateStr}`);
    const weather = localStorage.getItem(`ma_weather_${dateStr}`);
    const notePhotos = localStorage.getItem(`ma_note_photos_${dateStr}`);
    const savedQuestions = localStorage.getItem(`ma_questions_${dateStr}`);

    // 플래그나 데이터가 하나라도 있으면 통과
    const hasData = hasDiaryFlag || title || note || mood || moodPhoto || weather || notePhotos || savedQuestions;

    if (!hasData) {
        location.href = `diary.html?date=${dateStr}`;
        return;
    }

    // 3. 화면 렌더링 시작
    try {
        document.getElementById('metaDate').textContent = dateStr;

        // 기분 표시
        if (moodPhoto && moodPhoto !== 'null') {
            const moodEl = document.getElementById('metaMood');
            const img = document.createElement('img');
            img.src = moodPhoto;
            img.style.width = '100px';
            img.style.height = '100px';
            img.style.borderRadius = '16px';
            img.style.objectFit = 'cover';
            img.style.display = 'inline-block';
            img.style.verticalAlign = 'middle';
            moodEl.textContent = '';
            moodEl.appendChild(img);
        } else {
            document.getElementById('metaMood').textContent = mood || '—';
        }

        document.getElementById('metaWeather').textContent = weather || '—';

        // 질문 표시 영역
        const qSection = document.getElementById('savedQuestionsSection');
        const qListEl = document.getElementById('savedQuestionsList');

        if (savedQuestions) {
            try {
                const qList = JSON.parse(savedQuestions);
                if (qList && qList.length > 0) {
                    qSection.style.display = 'block';
                    
                    // 질문 판별을 위한 설정 로드
                    const settings = JSON.parse(localStorage.getItem('ma_settings')) || {};
                    const mbti = settings.selectedMBTI;
                    const mbtiQuestionsArr = mbtiQuestions[mbti] || [];
                    const customQuestionsArr = JSON.parse(localStorage.getItem('ma_custom_questions')) || [];

                    qListEl.innerHTML = qList.map(q => {
                        let category = 'basic';
                        let badgeText = '기본 질문';

                        // 카테고리 판별 로직 (diary.js와 동일)
                        if (mbtiQuestionsArr.includes(q)) {
                            category = 'mbti';
                            badgeText = 'MBTI 질문';
                        } else if (customQuestionsArr.includes(q)) {
                            category = 'custom';
                            badgeText = '내 질문';
                        } else if (!defaultQuestions.includes(q)) {
                            // 기본 질문에도 없으면 삭제된 커스텀 질문으로 간주
                            category = 'custom';
                            badgeText = '나만의 질문';
                        }

                        // ✅ category에 따라 다른 클래스(question-mbti 등)가 적용됨
                        return `
                            <div class="saved-question-item question-${category}">
                                <span class="q-badge">${badgeText}</span>
                                <span class="q-text">${q}</span>
                            </div>
                        `;
                    }).join('');
                } else {
                    qSection.style.display = 'none';
                }
            } catch (e) { console.error('질문 로드 실패', e); }
        } else {
            qSection.style.display = 'none';
        }

        // 본문 제목
        const entryTitleEl = document.getElementById('entryTitle');
        if (title) {
            entryTitleEl.textContent = title;
            entryTitleEl.style.display = 'block';
        } else {
            entryTitleEl.style.display = 'none';
        }

        // 본문 내용
        const entryBodyEl = document.getElementById('entryBody');
        if (note) {
            if (typeof marked !== 'undefined') {
                entryBodyEl.innerHTML = marked.parse(note);
            } else {
                entryBodyEl.textContent = note;
            }
        } else {
            if (savedQuestions) {
                entryBodyEl.innerHTML = '<span style="color:#9ca3af; font-style:italic;">(질문 선택으로 기록된 하루입니다)</span>';
            } else {
                entryBodyEl.textContent = '내용이 없습니다.';
            }
        }

        // 사진 표시
        if (notePhotos) {
            try {
                const photos = JSON.parse(notePhotos);
                const photosContainer = document.getElementById('entrySavedPhotos');
                photos.forEach(photoData => {
                    const photoItem = document.createElement('div');
                    photoItem.className = 'entry-photo-item';
                    const img = document.createElement('img');
                    img.src = photoData;
                    photoItem.appendChild(img);
                    photosContainer.appendChild(photoItem);
                });
            } catch (e) { console.error('사진 로드 오류:', e); }
        }

        generateSummary(title, note, mood, moodPhoto, savedQuestions);
        renderLastYearDiary(dateStr);

    } catch (err) {
        console.error("렌더링 중 오류 발생:", err);
    }
};

function generateSummary(title, note, mood, moodPhoto, savedQuestions) {
    const summaryEl = document.getElementById('summaryText');

    if (!note && !title && !moodPhoto) {
        if (savedQuestions) {
            summaryEl.textContent = '질문을 선택하며 하루를 정리했어요.';
            return;
        }
        summaryEl.textContent = '기록된 내용이 없습니다.';
        return;
    }

    let prefix = '';
    const positiveMoods = ['😊', '😍', '🥳', '😎'];
    const negativeMoods = ['😢', '😭', '😡'];

    if (moodPhoto) {
        prefix = '사진으로 표현한 하루. ';
    } else if (mood) {
        if (positiveMoods.includes(mood)) {
            prefix = '행복한 하루! ';
        } else if (negativeMoods.includes(mood)) {
            prefix = '힘들었지만 기록한 하루. ';
        }
    }

    if (title) {
        summaryEl.textContent = prefix + title;
    } else if (note) {
        let plain = note;
        if (typeof marked !== 'undefined') {
            const tmp = document.createElement('div');
            tmp.innerHTML = marked.parse(note);
            plain = tmp.textContent || tmp.innerText || '';
        }
        const shortNote = plain.length > 50 ? plain.substring(0, 50) + '...' : plain;
        summaryEl.textContent = prefix + shortNote;
    } else if (moodPhoto) {
        summaryEl.textContent = prefix || '사진으로 표현한 하루.';
    }
}

function renderLastYearDiary(currentDateStr) {
    const entryEl = document.getElementById('lastyearEntry');
    const emptyEl = document.getElementById('lastyearEmpty');

    const [year, month, day] = currentDateStr.split('-');
    const lastYear = parseInt(year) - 1;
    const lastYearDateStr = `${lastYear}-${month}-${day}`;

    const hasLastYear = localStorage.getItem(`ma_has_diary_${lastYearDateStr}`);
    
    const title = localStorage.getItem(`ma_title_${lastYearDateStr}`);
    const note = localStorage.getItem(`ma_note_${lastYearDateStr}`);
    const mood = localStorage.getItem(`ma_mood_${lastYearDateStr}`);
    const moodPhoto = localStorage.getItem(`ma_mood_photo_${lastYearDateStr}`);
    const weather = localStorage.getItem(`ma_weather_${lastYearDateStr}`);
    const savedQs = localStorage.getItem(`ma_questions_${lastYearDateStr}`);

    if (hasLastYear || title || note || mood || moodPhoto || weather || savedQs) {
        entryEl.style.display = 'block';
        emptyEl.style.display = 'none';

        if (moodPhoto) {
            const moodEl = document.getElementById('lastyearMood');
            const img = document.createElement('img');
            img.src = moodPhoto;
            img.style.width = '20px';
            img.style.height = '20px';
            img.style.borderRadius = '3px';
            img.style.verticalAlign = 'middle';
            moodEl.textContent = '';
            moodEl.appendChild(img);
        } else {
            document.getElementById('lastyearMood').textContent = mood || '—';
        }

        document.getElementById('lastyearWeather').textContent = weather || '—';
        document.getElementById('lastyearDate').textContent = lastYearDateStr;

        if (title) {
            document.getElementById('lastyearTitle').textContent = title;
            document.getElementById('lastyearTitle').style.display = 'block';
        } else {
            document.getElementById('lastyearTitle').style.display = 'none';
        }

        if (note) {
            let plain = note;
            if (typeof marked !== 'undefined') {
                const tmp = document.createElement('div');
                tmp.innerHTML = marked.parse(note);
                plain = tmp.textContent || tmp.innerText || '';
            }
            const preview = plain.length > 100 ? plain.substring(0, 100) + '...' : plain;
            document.getElementById('lastyearBody').textContent = preview;
        } else {
            if(savedQs) {
                document.getElementById('lastyearBody').textContent = '(질문 선택만 있는 기록)';
            } else {
                document.getElementById('lastyearBody').textContent = '내용이 없습니다.';
            }
        }

        document.getElementById('lastyearLink').href = `saved_diary.html?date=${lastYearDateStr}`;
    } else {
        entryEl.style.display = 'none';
        emptyEl.style.display = 'block';
    }
}