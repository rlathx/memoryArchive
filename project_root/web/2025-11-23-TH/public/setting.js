let currentSettings = {};
let customQuestions = [];

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

// 페이지 로드 시 초기화
window.onload = () => {
    loadSettings();
    loadCustomQuestions();
    renderCustomQuestions();
    setupEventListeners();
};

// 이벤트 리스너 설정
function setupEventListeners() {
    document.getElementById('mbtiSelect').addEventListener('change', saveSettings);
    document.getElementById('qSource').addEventListener('change', () => {
        updateQuestionVisibility();
        saveSettings();
    });
    document.getElementById('quoteMode').addEventListener('change', saveSettings);
    document.getElementById('btnAddMyQ').addEventListener('click', addCustomQuestion);
    document.getElementById('btnSave').addEventListener('click', () => {
        saveSettings();
        showSavedBadge();
    });
    // Enter 키로 질문 추가
    document.getElementById('myQInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addCustomQuestion();
    });
}

// 설정 로드 (localStorage 기반)
function loadSettings() {
    const saved = localStorage.getItem('ma_settings');
    currentSettings = saved ? JSON.parse(saved) : {
        questionType: 'default',
        quoteMode: 'quote',
        selectedMBTI: ''
    };

    document.getElementById('mbtiSelect').value = currentSettings.selectedMBTI || '';
    document.getElementById('qSource').value = currentSettings.questionType || 'default';
    document.getElementById('quoteMode').value = currentSettings.quoteMode || 'quote';

    updateQuestionVisibility();
}

// 사용자 정의 질문 로드 (localStorage 기반)
function loadCustomQuestions() {
    const saved = localStorage.getItem('ma_custom_questions');
    customQuestions = saved ? JSON.parse(saved) : [];
}

// 질문 유형에 따른 표시/숨김
function updateQuestionVisibility() {
    const qSource = document.getElementById('qSource').value;
    const customWrap = document.getElementById('customQsWrap');
    customWrap.style.display = (qSource === 'custom') ? 'block' : 'none';
}

// 설정 저장 (localStorage 기반)
function saveSettings() {
    currentSettings = {
        questionType: document.getElementById('qSource').value,
        quoteMode: document.getElementById('quoteMode').value,
        selectedMBTI: document.getElementById('mbtiSelect').value
    };
    localStorage.setItem('ma_settings', JSON.stringify(currentSettings));
}

// 저장 완료 표시
function showSavedBadge() {
    const badge = document.getElementById('savedOk');
    badge.classList.add('show');
    setTimeout(() => badge.classList.remove('show'), 2000);
}

// 사용자 정의 질문 추가 (localStorage 기반)
function addCustomQuestion() {
    const input = document.getElementById('myQInput');
    const question = input.value.trim();

    if (!question) {
        alert('질문을 입력해주세요!');
        return;
    }

    customQuestions.push(question);
    localStorage.setItem('ma_custom_questions', JSON.stringify(customQuestions));
    input.value = '';
    renderCustomQuestions();
}

// 사용자 정의 질문 삭제
function deleteCustomQuestion(index) {
    if (!confirm('이 질문을 삭제하시겠습니까?')) return;
    customQuestions.splice(index, 1);
    localStorage.setItem('ma_custom_questions', JSON.stringify(customQuestions));
    renderCustomQuestions();
}

// 사용자 정의 질문 렌더링
function renderCustomQuestions() {
    const listEl = document.getElementById('myQList');

    if (customQuestions.length === 0) {
        listEl.innerHTML = '<li class="list-group-item text-muted">아직 추가된 질문이 없습니다.</li>';
        return;
    }

    listEl.innerHTML = customQuestions.map((q, i) => `
        <li class="list-group-item d-flex justify-content-between align-items-center">
            <span>${q}</span>
            <button class="btn btn-sm btn-outline-danger" onclick="deleteCustomQuestion(${i})">삭제</button>
        </li>
    `).join('');
}