let currentSettings = {};
let customQuestions = [];

// 기본 질문 목록 (향후 확장용)
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

// 페이지 로드 시 초기화
window.onload = () => {
    loadSettings();
    loadCustomQuestions();
    renderCustomQuestions();
    setupEventListeners();
};

// 이벤트 리스너 설정
function setupEventListeners() {
    // MBTI, 질문 소스, 오늘의 한마디 모드 변경 시 설정 저장
    document.getElementById('mbtiSelect').addEventListener('change', saveSettings);
    document.getElementById('qSource').addEventListener('change', () => {
        updateQuestionVisibility();
        saveSettings();
    });
    document.getElementById('quoteMode').addEventListener('change', saveSettings);

    // ✅ 질문 개수 변경 시 자동 저장
    const qCountInput = document.getElementById('questionCount');
    if (qCountInput) {
        qCountInput.addEventListener('change', saveSettings);
        qCountInput.addEventListener('blur', saveSettings); // 포커스 빠질 때도 저장되게 하면 안정적
    }

    // 사용자 정의 질문 추가/엔터 입력
    document.getElementById('btnAddMyQ').addEventListener('click', addCustomQuestion);
    document.getElementById('myQInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addCustomQuestion();
    });

    // 설정 저장 버튼: 저장 후 자동으로 메인으로 이동
    document.getElementById('btnSave').addEventListener('click', () => {
        saveSettings();
        showSavedBadge();
        // 약간의 딜레이 후 메인으로 이동 (사용자가 "저장됨"을 볼 수 있게)
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 600);
    });

    // 백업 / 복원
    const btnExport = document.getElementById('btnExport');
    const btnImport = document.getElementById('btnImport');
    const fileInput = document.getElementById('backupFile');

    if (btnExport) {
        btnExport.addEventListener('click', exportBackup);
    }
    if (btnImport && fileInput) {
        btnImport.addEventListener('click', () => fileInput.click());
        fileInput.addEventListener('change', handleBackupFile);
    }

    // 전체 데이터 초기화
    const btnReset = document.getElementById('btnReset');
    if (btnReset) {
        btnReset.addEventListener('click', resetAllData);
    }
}


// 설정 로드
function loadSettings() {
    const saved = localStorage.getItem('ma_settings');
    currentSettings = saved ? JSON.parse(saved) : {
        questionType: 'default',
        quoteMode: 'quote',
        selectedMBTI: '',
        questionCount: 3
    };

    document.getElementById('mbtiSelect').value = currentSettings.selectedMBTI || '';
    document.getElementById('qSource').value = currentSettings.questionType || 'default';
    document.getElementById('quoteMode').value = currentSettings.quoteMode || 'quote';

    // 질문 개수(없으면 3으로)
    const qCountInput = document.getElementById('questionCount');
    if (qCountInput) {
        qCountInput.value = currentSettings.questionCount || 3;
    }
        updateQuestionVisibility();
    }

// 사용자 정의 질문 로드
function loadCustomQuestions() {
    const saved = localStorage.getItem('ma_custom_questions');
    customQuestions = saved ? JSON.parse(saved) : [];
}

// 질문 유형에 따른 UI 표시/숨김
function updateQuestionVisibility() {
    const qSource = document.getElementById('qSource').value;
    const customWrap = document.getElementById('customQsWrap');
    customWrap.style.display = (qSource === 'custom') ? 'block' : 'none';
}

// 설정 저장
function saveSettings() {
    const rawCount = parseInt(document.getElementById('questionCount').value, 10);
    let questionCount = isNaN(rawCount) ? 3 : rawCount;

    // 1~10 사이로 강제
    if (questionCount < 1) questionCount = 1;
    if (questionCount > 10) questionCount = 10;

    currentSettings = {
        questionType: document.getElementById('qSource').value,
        quoteMode: document.getElementById('quoteMode').value,
        selectedMBTI: document.getElementById('mbtiSelect').value,
        questionCount: questionCount
    };
    localStorage.setItem('ma_settings', JSON.stringify(currentSettings));
}


// 저장 완료 뱃지
function showSavedBadge() {
    const badge = document.getElementById('savedOk');
    badge.classList.add('show');
    setTimeout(() => badge.classList.remove('show'), 2000);
}

// 사용자 정의 질문 추가
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

    listEl.innerHTML = customQuestions
        .map((q, i) => `
        <li class="list-group-item d-flex justify-content-between align-items-center">
            <span>${q}</span>
            <button class="btn btn-sm btn-outline-danger" onclick="deleteCustomQuestion(${i})">삭제</button>
        </li>
    `).join('');
}

/* ------------------------------------------------------------------
   백업 / 복원 기능
   - 백업: localStorage의 ma_* 키들을 모두 JSON 파일로 다운로드
   - 복원: JSON 파일을 읽어 ma_* 영역을 초기화 후 해당 내용으로 덮어쓰기
------------------------------------------------------------------- */

// 백업 내보내기
function exportBackup() {
    const data = {};
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (!key) continue;
        if (key.startsWith('ma_')) {
            data[key] = localStorage.getItem(key);
        }
    }

    const backup = {
        meta: {
            app: 'MemoryArchive',
            version: 1,
            exportedAt: new Date().toISOString()
        },
        data
    };

    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    const ss = String(now.getSeconds()).padStart(2, '0');
    const filename = `memoryArchive_backup_${y}${m}${d}_${hh}${mm}${ss}.json`;

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();

    URL.revokeObjectURL(url);
}

// 백업 파일 선택 처리
function handleBackupFile(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const text = e.target.result;
            const json = JSON.parse(text);

            if (!json || typeof json !== 'object' || !json.data) {
                alert('올바르지 않은 백업 파일입니다.');
                return;
            }

            if (!confirm('백업을 복원하면 현재 저장된 Memory Archive 데이터(ma_*)는 모두 덮어쓰기 됩니다.\n계속하시겠습니까?')) {
                return;
            }

            restoreBackup(json);
            alert('백업 복원이 완료되었습니다.\n페이지를 새로고침합니다.');
            location.reload();
        } catch (err) {
            console.error(err);
            alert('백업 파일을 읽는 중 오류가 발생했습니다.');
        } finally {
            // 같은 파일을 다시 선택해도 change 이벤트가 동작하도록 초기화
            event.target.value = '';
        }
    };
    reader.readAsText(file, 'utf-8');
}

// 백업 내용으로 localStorage 복원
function restoreBackup(backupJson) {
    const data = backupJson.data || {};

    // 1) 기존 ma_* 키 모두 제거
    const removeKeys = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (!key) continue;
        if (key.startsWith('ma_')) {
            removeKeys.push(key);
        }
    }
    removeKeys.forEach((k) => localStorage.removeItem(k));

    // 2) 백업 데이터 쓰기
    Object.keys(data).forEach((key) => {
        localStorage.setItem(key, data[key]);
    });
}

/* ------------------------------------------------------------------
   전체 데이터 초기화
   - ma_*로 시작하는 모든 localStorage 키 삭제
   - 주의: 되돌릴 수 없음
------------------------------------------------------------------- */

function resetAllData() {
    if (!confirm('정말 전체 데이터를 초기화하시겠습니까?\n모든 일기, 기분, 날씨, 설정 등이 삭제되며 되돌릴 수 없습니다.')) {
        return;
    }

    const removeKeys = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (!key) continue;
        if (key.startsWith('ma_')) {
            removeKeys.push(key);
        }
    }
    removeKeys.forEach((k) => localStorage.removeItem(k));

    alert('전체 데이터가 초기화되었습니다.\n메인 화면으로 이동합니다.');
    window.location.href = 'index.html';
}
