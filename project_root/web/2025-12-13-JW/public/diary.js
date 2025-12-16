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

// 전역 변수
let selectedQuestionOrder = [];
let isUnsaved = false;
let dateStr = '';
let diaryViewMode = 'markdown';
let diaryPhotos = [];

// 복구용 데이터
let originalSavedSelected = null;
let originalSavedPool = null;

function markAsUnsaved() {
    isUnsaved = true;
}

// 페이지 로드 시 초기화
window.onload = () => {
    const params = new URLSearchParams(location.search);
    dateStr = params.get('date') || getTodayDate();
    document.getElementById('dateText').textContent = dateStr;

    loadSavedDiary(dateStr);
    loadTodayQuestion(); 

    const titleInput = document.getElementById('diaryTitle');
    const noteInput = document.getElementById('note');
    if (titleInput) titleInput.addEventListener('input', markAsUnsaved);
    if (noteInput) noteInput.addEventListener('input', markAsUnsaved);

    // 새로고침 버튼
    const btnRefresh = document.getElementById('btnRefreshQuestions');
    if (btnRefresh) {
        btnRefresh.addEventListener('click', () => {
            const icon = btnRefresh.querySelector('i');
            if(icon) {
                icon.classList.add('spin-anim');
                setTimeout(() => icon.classList.remove('spin-anim'), 500);
            }
            loadTodayQuestion(true); // 랜덤 생성
            markAsUnsaved();
        });
    }

    // '처음 질문 받기' 버튼
    const btnRestore = document.getElementById('btnRestoreOriginal');
    if (btnRestore) {
        btnRestore.addEventListener('click', () => {
            if (originalSavedSelected || originalSavedPool) {
                restoreOriginalQuestions();
                markAsUnsaved();
            }
        });
    }

    // 이모지(기분)
    document.getElementById('moodList').addEventListener('click', (e) => {
        const emoEl = e.target.closest('.emoji-item:not(.emoji-photo-label)');
        if (!emoEl) return;
        const emo = emoEl.textContent;
        document.getElementById('moodNow').textContent = emo;
        localStorage.setItem(`ma_mood_${dateStr}`, emo);
        updateEmojiSelection('moodList', emo);
        document.getElementById('moodPhotoPreview').style.display = 'none';
        localStorage.removeItem(`ma_mood_photo_${dateStr}`);
        markAsUnsaved();
    });

    // 이모지(날씨)
    document.getElementById('weatherList').addEventListener('click', (e) => {
        const emoEl = e.target.closest('.emoji-item');
        if (!emoEl) return;
        const emo = emoEl.textContent;
        document.getElementById('weatherNow').textContent = emo;
        localStorage.setItem(`ma_weather_${dateStr}`, emo);
        updateEmojiSelection('weatherList', emo);
        markAsUnsaved();
    });

    // 기분 사진
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
                    markAsUnsaved();
                };
                reader.readAsDataURL(file);
            }
        });
    }
    const btnRemoveMoodPhoto = document.getElementById('btnRemoveMoodPhoto');
    if (btnRemoveMoodPhoto) {
        btnRemoveMoodPhoto.addEventListener('click', () => {
            document.getElementById('moodPhotoPreview').style.display = 'none';
            localStorage.removeItem(`ma_mood_photo_${dateStr}`);
            document.getElementById('moodNow').textContent = '—';
            markAsUnsaved();
        });
    }

    // 일기 사진
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
                    markAsUnsaved();
                };
                reader.readAsDataURL(file);
            }
        });
    }

    document.getElementById('btnSave').addEventListener('click', () => saveDiary(dateStr));

    // 뒤로가기
    document.getElementById('btnBack').addEventListener('click', (e) => {
        e.preventDefault();
        if (isUnsaved) {
            const confirmSave = confirm('변경사항이 저장되지 않았습니다!\n변경사항을 저장하겠습니까?');
            if (confirmSave) saveDiary(dateStr);
        } else {
            window.location.assign('index.html');
        }
    });

    // 리셋 버튼들
    document.getElementById('btnResetMood').addEventListener('click', () => {
        document.getElementById('moodNow').textContent = '—';
        localStorage.removeItem(`ma_mood_${dateStr}`);
        localStorage.removeItem(`ma_mood_photo_${dateStr}`);
        document.getElementById('moodPhotoPreview').style.display = 'none';
        updateEmojiSelection('moodList', null);
        markAsUnsaved();
    });

    document.getElementById('btnResetWeather').addEventListener('click', () => {
        document.getElementById('weatherNow').textContent = '—';
        localStorage.removeItem(`ma_weather_${dateStr}`);
        updateEmojiSelection('weatherList', null);
        markAsUnsaved();
    });

    // 뷰 모드
    const noteTextarea = document.getElementById('note');
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

function loadTodayQuestion(forceNewRandom = false) {
    const listEl = document.getElementById('question-list');
    const sectionEl = document.querySelector('.question-section');
    const btnRestore = document.getElementById('btnRestoreOriginal');
    if (!listEl) return;

    // 저장된 데이터 로드
    const savedSelectedJSON = localStorage.getItem(`ma_questions_${dateStr}`);
    const savedPoolJSON = localStorage.getItem(`ma_question_pool_${dateStr}`);
    const hasDiary = localStorage.getItem(`ma_has_diary_${dateStr}`);

    // [CASE 1] 이미 저장된 일기가 있고, 새로고침이 아닐 때
    if (!forceNewRandom && hasDiary) {
        if (savedSelectedJSON) {
            try {
                const savedSelected = JSON.parse(savedSelectedJSON);
                
                // 1. 전체 풀(Pool) 백업 (화면엔 안 뿌림)
                if (savedPoolJSON) {
                    originalSavedPool = JSON.parse(savedPoolJSON);
                } else {
                    originalSavedPool = null;
                }

                // 2. 선택된 질문 백업
                originalSavedSelected = [...savedSelected];

                // 버튼 표시
                if (btnRestore) btnRestore.style.display = 'inline-block';
                if (sectionEl) sectionEl.style.display = 'block';
                
                // 현재 선택 상태 초기화
                selectedQuestionOrder = [...savedSelected];
                
                // ✅ [핵심 수정] 초기 로드 시에는 '선택된 질문'만 보여줌
                renderQuestionList(listEl, savedSelected, selectedQuestionOrder);
                return;

            } catch(e) { console.error(e); }
        }
    }

    // [CASE 2] 랜덤 질문 생성 (일기가 없거나, 새로고침 시)
    const settings = JSON.parse(localStorage.getItem('ma_settings')) || {};
    const mbti = settings.selectedMBTI;

    const mbtiCount = (settings.mbtiCount !== undefined) ? parseInt(settings.mbtiCount) : 0;
    const basicCount = (settings.basicCount !== undefined) ? parseInt(settings.basicCount) : 3;
    const customCount = (settings.customCount !== undefined) ? parseInt(settings.customCount) : 0;

    let preserved = { mbti: [], basic: [], custom: [] };
    let allPreservedTexts = [];

    if (forceNewRandom) {
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

    const mbtiQuestionsArr = mbtiQuestions[mbti] || [];
    const customQuestionsArr = JSON.parse(localStorage.getItem('ma_custom_questions')) || [];
    
    // 부족한 개수 계산
    const needMbti = Math.max(0, mbtiCount - preserved.mbti.length);
    const needCustom = Math.max(0, customCount - preserved.custom.length);
    const needBasic = Math.max(0, basicCount - preserved.basic.length);

    const poolMbti = mbtiQuestionsArr.filter(q => !preserved.mbti.includes(q));
    const poolCustom = customQuestionsArr.filter(q => !preserved.custom.includes(q));
    
    let poolBasic = defaultQuestions.filter(q => !preserved.basic.includes(q));
    let newBasicSet = [];
    
    const twoWeekQ = getTwoWeekAnalysisQuestion();
    if (needBasic > 0 && twoWeekQ && !allPreservedTexts.includes(twoWeekQ) && !poolBasic.includes(twoWeekQ)) { 
         newBasicSet.push(twoWeekQ);
         poolBasic = poolBasic.filter(q => q !== twoWeekQ);
    }

    const remainingBasicNeed = Math.max(0, needBasic - newBasicSet.length);
    const randomBasics = pickRandom(poolBasic, remainingBasicNeed);
    newBasicSet = [...newBasicSet, ...randomBasics];

    const newMbti = pickRandom(poolMbti, needMbti);
    const newCustom = pickRandom(poolCustom, needCustom);
    const newBasic = newBasicSet;

    let finalQuestions = [
        ...allPreservedTexts,
        ...newMbti,
        ...newBasic,
        ...newCustom
    ];

    if (finalQuestions.length === 0) {
        if (sectionEl) sectionEl.style.display = 'block';
        listEl.innerHTML = `<li class="question-empty-msg">질문을 추가하시면 일기 작성에 도움이 될 수 있어요! ✨</li>`;
        return;
    }

    if (sectionEl) sectionEl.style.display = 'block';
    
    if (forceNewRandom) {
        selectedQuestionOrder = [...allPreservedTexts];
    }

    renderQuestionList(listEl, finalQuestions, selectedQuestionOrder);
}

// ✅ [복구 버튼] 누르면 '전체 Pool'을 보여줌
function restoreOriginalQuestions() {
    const listEl = document.getElementById('question-list');
    if (!listEl) return;

    let poolToRender = [];
    let selectedToMark = [];

    // Pool이 있으면 전체 목록 복구
    if (originalSavedPool && originalSavedPool.length > 0) {
        poolToRender = [...originalSavedPool];
    } else if (originalSavedSelected) {
        // Pool 데이터가 없는 옛날 일기라면 선택된 것만이라도 보여줌
        poolToRender = [...originalSavedSelected];
    }

    if (originalSavedSelected) {
        selectedToMark = [...originalSavedSelected];
    }

    // 전역 상태(선택 순서) 복구
    selectedQuestionOrder = [...selectedToMark];
    
    // 렌더링
    renderQuestionList(listEl, poolToRender, selectedToMark);
}

// 질문 리스트 렌더링 함수
function renderQuestionList(listEl, pool, selectedList) {
    const settings = JSON.parse(localStorage.getItem('ma_settings')) || {};
    const mbti = settings.selectedMBTI;
    const mbtiQuestionsArr = mbtiQuestions[mbti] || [];
    const customQuestionsArr = JSON.parse(localStorage.getItem('ma_custom_questions')) || [];

    listEl.innerHTML = pool.map(q => {
        let category = 'basic';
        
        // 카테고리 판별
        if (mbtiQuestionsArr.includes(q)) {
            category = 'mbti';
        } else if (customQuestionsArr.includes(q)) {
            category = 'custom';
        } else if (!defaultQuestions.includes(q)) {
            category = 'custom';
        }

        // 선택 여부 확인
        const isSelected = selectedList.includes(q) ? 'selected' : '';

        return `
            <li class="question-item ${isSelected} question-${category}">
                <span class="q-badge">저장된 질문</span>
                <span class="q-text">${q}</span>
            </li>
        `;
    }).join('');

    attachClickEvents(listEl);
}

function attachClickEvents(listEl) {
    const items = listEl.querySelectorAll('.question-item');
    items.forEach(item => {
        item.addEventListener('click', () => {
            const textSpan = item.querySelector('.q-text');
            if (!textSpan) return;
            const text = textSpan.textContent;

            item.classList.toggle('selected');

            if (item.classList.contains('selected')) {
                // 선택: 배열 끝에 추가 (순서 기록)
                if (!selectedQuestionOrder.includes(text)) {
                    selectedQuestionOrder.push(text);
                }
            } else {
                // 해제: 배열에서 제거
                selectedQuestionOrder = selectedQuestionOrder.filter(q => q !== text);
            }
            markAsUnsaved();
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
            diaryPhotos.forEach(photo => addNotePhotoPreview(photo, false));
        } catch (e) { console.error(e); }
    }
}

function saveDiary(dateStr) {
    const title = document.getElementById('diaryTitle').value.trim();
    const content = document.getElementById('note').value.trim();

    if (title) localStorage.setItem(`ma_title_${dateStr}`, title);
    else localStorage.removeItem(`ma_title_${dateStr}`);

    if (content) localStorage.setItem(`ma_note_${dateStr}`, content);
    else localStorage.removeItem(`ma_note_${dateStr}`);

    if (diaryPhotos.length > 0) localStorage.setItem(`ma_note_photos_${dateStr}`, JSON.stringify(diaryPhotos));
    else localStorage.removeItem(`ma_note_photos_${dateStr}`);

    // 1. 선택된 질문 저장 (Selected)
    if (selectedQuestionOrder.length > 0) {
        localStorage.setItem(`ma_questions_${dateStr}`, JSON.stringify(selectedQuestionOrder));
    } else {
        localStorage.removeItem(`ma_questions_${dateStr}`);
    }

    // 2. 현재 화면에 떠 있는 모든 질문 저장 (Pool)
    const listEl = document.getElementById('question-list');
    if (listEl) {
        const allQuestions = Array.from(listEl.querySelectorAll('.q-text')).map(el => el.textContent);
        if (allQuestions.length > 0) {
            localStorage.setItem(`ma_question_pool_${dateStr}`, JSON.stringify(allQuestions));
        } else {
            localStorage.removeItem(`ma_question_pool_${dateStr}`);
        }
    }

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
    isUnsaved = false;
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

function addNotePhotoPreview(imageData, markChange = true) {
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
        markAsUnsaved();
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