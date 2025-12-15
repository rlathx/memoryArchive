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

// 2주간 데이터 분석 기반 질문 (간소화)
function getTwoWeekAnalysisQuestion() {
    return null;
}

// 선택한 질문의 순서를 기억할 전역 배열
let selectedQuestionOrder = [];

let dateStr = '';
let diaryViewMode = 'markdown';
let diaryPhotos = [];

// 페이지 로드 시 초기화
window.onload = () => {
    // 날짜 세팅
    const params = new URLSearchParams(location.search);
    dateStr = params.get('date') || getTodayDate();
    document.getElementById('dateText').textContent = dateStr;

    // 저장된 일기 로드
    loadSavedDiary(dateStr);

    // 초기 질문 로드
    loadTodayQuestion();

    // 새로고침 버튼 이벤트
    const btnRefresh = document.getElementById('btnRefreshQuestions');
    if (btnRefresh) {
        btnRefresh.addEventListener('click', () => {
            const icon = btnRefresh.querySelector('i');
            if(icon) {
                icon.classList.add('spin-anim');
                setTimeout(() => icon.classList.remove('spin-anim'), 500);
            }
            // 강제로 랜덤 질문 생성 (true 파라미터 전달)
            loadTodayQuestion(true);
        });
    }

    // 이모지(기분) 클릭
    document.getElementById('moodList').addEventListener('click', (e) => {
        const emoEl = e.target.closest('.emoji-item:not(.emoji-photo-label)');
        if (!emoEl) return;
        const emo = emoEl.textContent;
        document.getElementById('moodNow').textContent = emo;
        localStorage.setItem(`ma_mood_${dateStr}`, emo);
        updateEmojiSelection('moodList', emo);
        document.getElementById('moodPhotoPreview').style.display = 'none';
        localStorage.removeItem(`ma_mood_photo_${dateStr}`);
    });

    // 이모지(날씨) 클릭
    document.getElementById('weatherList').addEventListener('click', (e) => {
        const emoEl = e.target.closest('.emoji-item');
        if (!emoEl) return;
        const emo = emoEl.textContent;
        document.getElementById('weatherNow').textContent = emo;
        localStorage.setItem(`ma_weather_${dateStr}`, emo);
        updateEmojiSelection('weatherList', emo);
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
                    document.getElementById('moodNow').textContent = '📷';
                    localStorage.removeItem(`ma_mood_${dateStr}`);
                    updateEmojiSelection('moodList', null);
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // 기분 사진 제거
    const btnRemoveMoodPhoto = document.getElementById('btnRemoveMoodPhoto');
    if (btnRemoveMoodPhoto) {
        btnRemoveMoodPhoto.addEventListener('click', () => {
            document.getElementById('moodPhotoPreview').style.display = 'none';
            localStorage.removeItem(`ma_mood_photo_${dateStr}`);
            document.getElementById('moodNow').textContent = '—';
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

    // 기분 초기화
    document.getElementById('btnResetMood').addEventListener('click', () => {
        document.getElementById('moodNow').textContent = '—';
        localStorage.removeItem(`ma_mood_${dateStr}`);
        localStorage.removeItem(`ma_mood_photo_${dateStr}`);
        document.getElementById('moodPhotoPreview').style.display = 'none';
        updateEmojiSelection('moodList', null);
    });

    // 날씨 초기화
    document.getElementById('btnResetWeather').addEventListener('click', () => {
        document.getElementById('weatherNow').textContent = '—';
        localStorage.removeItem(`ma_weather_${dateStr}`);
        updateEmojiSelection('weatherList', null);
    });

    // 마크다운 뷰 모드 설정
    const noteTextarea = document.getElementById('note');
    const noteRendered = document.getElementById('noteRendered');
    const btnMd = document.getElementById('btnMarkdownView');
    const btnRender = document.getElementById('btnRenderedView');

    if (noteTextarea) {
        noteTextarea.addEventListener('input', () => {
            if (diaryViewMode === 'rendered') updateRenderedNote();
        });
    }
    if (btnMd && btnRender) {
        btnMd.addEventListener('click', () => setDiaryViewMode('markdown'));
        btnRender.addEventListener('click', () => setDiaryViewMode('rendered'));
    }
    setDiaryViewMode('markdown');
    updateRenderedNote();
};

// ---------------- 함수 정의 ----------------

// ✅ [수정됨] 질문 로드 함수
function loadTodayQuestion(forceNewRandom = false) {
    const listEl = document.getElementById('question-list');
    const sectionEl = document.querySelector('.question-section');
    if (!listEl) return;

    const savedQsJSON = localStorage.getItem(`ma_questions_${dateStr}`);
    const hasDiary = localStorage.getItem(`ma_has_diary_${dateStr}`);

    // [CASE 1] 이미 저장된 일기가 있고, 새로고침이 아닐 때
    if (!forceNewRandom && hasDiary) {
        if (savedQsJSON) {
            try {
                const savedQuestions = JSON.parse(savedQsJSON);
                if (savedQuestions && savedQuestions.length > 0) {
                    if (sectionEl) sectionEl.style.display = 'block';
                    
                    // 순서 배열 초기화
                    selectedQuestionOrder = [...savedQuestions];

                    // 설정 로드
                    const settings = JSON.parse(localStorage.getItem('ma_settings')) || {};
                    const mbti = settings.selectedMBTI;
                    const mbtiQuestionsArr = mbtiQuestions[mbti] || [];
                    const customQuestionsArr = JSON.parse(localStorage.getItem('ma_custom_questions')) || [];

                    listEl.innerHTML = savedQuestions.map(q => {
                        let category = 'basic';
                        
                        // 카테고리 판별 로직
                        if (mbtiQuestionsArr.includes(q)) {
                            category = 'mbti';
                        } else if (customQuestionsArr.includes(q)) {
                            category = 'custom';
                        } else if (!defaultQuestions.includes(q)) {
                            category = 'custom';
                        }

                        return `
                            <li class="question-item selected question-${category}">
                                <span class="q-badge">저장된 질문</span>
                                <span class="q-text">${q}</span>
                            </li>
                        `;
                    }).join('');
                    
                    attachClickEvents(listEl);
                    return;
                }
            } catch(e) { console.error(e); }
        }
    }

    // [CASE 2] 랜덤 질문 생성
    const settings = JSON.parse(localStorage.getItem('ma_settings')) || {};
    const mbti = settings.selectedMBTI;

    // 1. 설정된 개수
    const mbtiCount = (settings.mbtiCount !== undefined) ? parseInt(settings.mbtiCount) : 0;
    const basicCount = (settings.basicCount !== undefined) ? parseInt(settings.basicCount) : 3;
    const customCount = (settings.customCount !== undefined) ? parseInt(settings.customCount) : 0;

    // 2. 현재 선택된 질문 유지 (새로고침 시)
    let preserved = { mbti: [], basic: [], custom: [] };
    let allPreservedTexts = [];

    // forceNewRandom일 때만 유지 로직 동작
    if (forceNewRandom) {
        // 이미 저장된 순서(selectedQuestionOrder)가 있다면 그것을 우선시해야 하지만,
        // 현재 화면(DOM)에 표시된 순서를 기준으로 유지 리스트를 만듭니다.
        // 수정 모드 진입 직후에는 DOM 순서가 selectedQuestionOrder와 같습니다.
        listEl.querySelectorAll('.question-item.selected').forEach(item => {
            const text = item.querySelector('.q-text').textContent;
            allPreservedTexts.push(text);

            if (item.classList.contains('question-mbti')) preserved.mbti.push(text);
            else if (item.classList.contains('question-custom')) preserved.custom.push(text);
            else preserved.basic.push(text);
        });
    } else {
        selectedQuestionOrder = [];
    }

    // 3. 각 소스별 질문 배열 준비
    const mbtiQuestionsArr = mbtiQuestions[mbti] || [];
    const customQuestionsArr = JSON.parse(localStorage.getItem('ma_custom_questions')) || [];
    const defaultQuestionsArr = defaultQuestions;

    // 4. 부족한 개수만큼 새로 뽑기
    const needMbti = Math.max(0, mbtiCount - preserved.mbti.length);
    const needCustom = Math.max(0, customCount - preserved.custom.length);
    const needBasic = Math.max(0, basicCount - preserved.basic.length);

    // 풀에서 이미 선택된 질문 제외
    const poolMbti = mbtiQuestionsArr.filter(q => !preserved.mbti.includes(q));
    const poolCustom = customQuestionsArr.filter(q => !preserved.custom.includes(q));
    
    let poolBasic = defaultQuestionsArr.filter(q => !preserved.basic.includes(q));
    let newBasicSet = [];
    
    // 2주 분석 질문
    const twoWeekQ = getTwoWeekAnalysisQuestion();
    let twoWeekUsed = false;

    if (twoWeekQ && allPreservedTexts.includes(twoWeekQ)) {
        twoWeekUsed = true;
    }

    if (needBasic > 0 && twoWeekQ && !twoWeekUsed && !poolBasic.includes(twoWeekQ)) { 
         if (!allPreservedTexts.includes(twoWeekQ)) {
             newBasicSet.push(twoWeekQ);
             poolBasic = poolBasic.filter(q => q !== twoWeekQ);
         }
    }

    const remainingBasicNeed = Math.max(0, needBasic - newBasicSet.length);
    const randomBasics = pickRandom(poolBasic, remainingBasicNeed);
    newBasicSet = [...newBasicSet, ...randomBasics];

    // 5. 최종 조합: 새로 뽑은 질문들
    const newMbti = pickRandom(poolMbti, needMbti);
    const newCustom = pickRandom(poolCustom, needCustom);
    const newBasic = newBasicSet;

    // ✅ [핵심 수정] 선택된 질문(순서 유지) + 새로 뽑은 질문(뒤에 추가)
    // 기존에는 카테고리별로 다시 묶어서 정렬했기 때문에 순서가 섞였음.
    // 여기서는 allPreservedTexts(선택된 질문들)을 맨 앞에 그대로 둠.
    let finalQuestions = [
        ...allPreservedTexts,
        ...newMbti,
        ...newBasic,
        ...newCustom
    ];

    // 6. 렌더링
    if (finalQuestions.length === 0) {
        if (sectionEl) sectionEl.style.display = 'block';
        listEl.innerHTML = `
            <li class="question-empty-msg">
                질문을 추가하시면 일기 작성에 도움이 될 수 있어요! ✨
            </li>
        `;
        return;
    }

    if (sectionEl) sectionEl.style.display = 'block';

    listEl.innerHTML = finalQuestions.map(q => {
        let category = 'basic'; 
        let label = '기본 질문';
        
        // 카테고리 판별
        if (mbtiQuestionsArr.includes(q)) { category = 'mbti'; label = 'MBTI 질문'; }
        else if (customQuestionsArr.includes(q)) { category = 'custom'; label = '나만의 질문'; }
        else if (!defaultQuestions.includes(q)) { category = 'custom'; label = '나만의 질문'; }
        
        const isSelected = allPreservedTexts.includes(q) ? 'selected' : '';

        return `
            <li class="question-item question-${category} ${isSelected}">
                <span class="q-badge">${label}</span>
                <span class="q-text">${q}</span>
            </li>
        `;
    }).join('');

    attachClickEvents(listEl);
}

// 클릭 이벤트 연결 함수
function attachClickEvents(listEl) {
    const items = listEl.querySelectorAll('.question-item');
    items.forEach(item => {
        item.addEventListener('click', () => {
            const textSpan = item.querySelector('.q-text');
            if (!textSpan) return;
            const text = textSpan.textContent;

            item.classList.toggle('selected');

            if (item.classList.contains('selected')) {
                if (!selectedQuestionOrder.includes(text)) {
                    selectedQuestionOrder.push(text);
                }
            } else {
                selectedQuestionOrder = selectedQuestionOrder.filter(q => q !== text);
            }
        });
    });
}

function pickRandom(arr, count) {
    if (!arr || arr.length === 0) return [];
    if (count <= 0) return [];
    const shuffled = [...arr].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}

function loadSavedDiary(dateStr) {
    const savedTitle = localStorage.getItem(`ma_title_${dateStr}`);
    if (savedTitle) document.getElementById('diaryTitle').value = savedTitle;

    const savedNote = localStorage.getItem(`ma_note_${dateStr}`);
    if (savedNote) document.getElementById('note').value = savedNote;

    const savedMood = localStorage.getItem(`ma_mood_${dateStr}`);
    if (savedMood) {
        document.getElementById('moodNow').textContent = savedMood;
        updateEmojiSelection('moodList', savedMood);
    }

    const savedMoodPhoto = localStorage.getItem(`ma_mood_photo_${dateStr}`);
    if (savedMoodPhoto) {
        displayMoodPhoto(savedMoodPhoto);
        document.getElementById('moodNow').textContent = '📷';
        updateEmojiSelection('moodList', null);
    }

    const savedWeather = localStorage.getItem(`ma_weather_${dateStr}`);
    if (savedWeather) {
        document.getElementById('weatherNow').textContent = savedWeather;
        updateEmojiSelection('weatherList', savedWeather);
    }

    const savedPhotos = localStorage.getItem(`ma_note_photos_${dateStr}`);
    if (savedPhotos) {
        try {
            diaryPhotos = JSON.parse(savedPhotos);
            diaryPhotos.forEach(photo => addNotePhotoPreview(photo));
        } catch (e) { console.error(e); }
    }
}

// 일기 저장 함수
function saveDiary(dateStr) {
    const title = document.getElementById('diaryTitle').value.trim();
    const content = document.getElementById('note').value.trim();

    if (title) localStorage.setItem(`ma_title_${dateStr}`, title);
    else localStorage.removeItem(`ma_title_${dateStr}`);

    if (content) localStorage.setItem(`ma_note_${dateStr}`, content);
    else localStorage.removeItem(`ma_note_${dateStr}`);

    if (diaryPhotos.length > 0) localStorage.setItem(`ma_note_photos_${dateStr}`, JSON.stringify(diaryPhotos));
    else localStorage.removeItem(`ma_note_photos_${dateStr}`);

    // 화면 순서가 아닌, 클릭한 순서(selectedQuestionOrder)대로 저장
    if (selectedQuestionOrder.length > 0) {
        localStorage.setItem(`ma_questions_${dateStr}`, JSON.stringify(selectedQuestionOrder));
    } else {
        localStorage.removeItem(`ma_questions_${dateStr}`);
    }

    // 일기 존재 여부 플래그 업데이트
    const hasDiary =
        !!title ||
        !!content ||
        diaryPhotos.length > 0 ||
        !!localStorage.getItem(`ma_mood_${dateStr}`) ||
        !!localStorage.getItem(`ma_mood_photo_${dateStr}`) ||
        !!localStorage.getItem(`ma_weather_${dateStr}`) ||
        selectedQuestionOrder.length > 0;

    if (hasDiary) {
        localStorage.setItem(`ma_has_diary_${dateStr}`, '1');
    } else {
        localStorage.removeItem(`ma_has_diary_${dateStr}`);
    }

    alert('일기가 저장되었습니다! 📝');
    window.location.href = 'index.html';
}

function getTodayDate() {
    const today = new Date();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${today.getFullYear()}-${mm}-${dd}`;
}

function updateEmojiSelection(listId, selectedEmoji) {
    const items = document.querySelectorAll(`#${listId} .emoji-item:not(.emoji-photo-label)`);
    items.forEach(item => {
        if (selectedEmoji && item.textContent === selectedEmoji) item.classList.add('selected');
        else item.classList.remove('selected');
    });
}

function displayMoodPhoto(imageData) {
    const preview = document.getElementById('moodPhotoPreview');
    const img = document.getElementById('moodPhotoImg');
    img.src = imageData;
    preview.style.display = 'block';
}

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

function updateRenderedNote() {
    const textarea = document.getElementById('note');
    const rendered = document.getElementById('noteRendered');
    if (!textarea || !rendered) return;
    if (typeof marked !== 'undefined') rendered.innerHTML = marked.parse(textarea.value || '');
    else rendered.textContent = textarea.value || '';
}

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
        updateRenderedNote();
        textarea.style.display = 'none';
        rendered.style.display = 'block';
        btnMd.classList.remove('active');
        btnRender.classList.add('active');
    }
}