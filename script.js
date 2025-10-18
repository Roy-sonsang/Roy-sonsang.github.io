// 메모 데이터를 저장할 배열
let memos = [];

// 페이지 로드 시 저장된 메모 불러오기
window.addEventListener('DOMContentLoaded', function() {
    loadMemos();
    displayMemos();
});

// 폼 제출 이벤트 처리
document.getElementById('memoForm').addEventListener('submit', function(e) {
    e.preventDefault(); // 기본 폼 제출 방지
    
    const title = document.getElementById('memo-title').value.trim();
    const content = document.getElementById('memo-content').value.trim();
    
    if (title && content) {
        // 새 메모 객체 생성
        const newMemo = {
            id: Date.now(), // 고유 ID 생성
            title: title,
            content: content,
            date: new Date().toLocaleDateString('ko-KR')
        };
        
        // 메모 배열에 추가
        memos.push(newMemo);
        
        // 로컬 스토리지에 저장
        saveMemos();
        
        // 화면에 표시
        displayMemos();
        
        // 폼 초기화
        this.reset();
        
        // 성공 메시지
        alert('메모가 저장되었습니다!');
    } else {
        alert('제목과 내용을 모두 입력해주세요.');
    }
});

// 초기화 버튼 이벤트 처리
document.getElementById('resetBtn').addEventListener('click', function() {
    if (confirm('입력한 내용을 모두 지우시겠습니까?')) {
        document.getElementById('memoForm').reset();
    }
});

// 메모 삭제 함수
function deleteMemo(id) {
    if (confirm('이 메모를 삭제하시겠습니까?')) {
        memos = memos.filter(memo => memo.id !== id);
        saveMemos();
        displayMemos();
    }
}

// 메모 표시 함수
function displayMemos() {
    const memosContainer = document.getElementById('memos');
    
    if (memos.length === 0) {
        memosContainer.innerHTML = '<p class="empty-message">저장된 메모가 없습니다.</p>';
        return;
    }
    
    memosContainer.innerHTML = memos.map(memo => `
        <div class="memo-item">
            <h3 class="memo-title">${memo.title}</h3>
            <p class="memo-content">${memo.content}</p>
            <div class="memo-footer">
                <small class="memo-date">작성일: ${memo.date}</small>
                <button class="delete-btn" onclick="deleteMemo(${memo.id})">삭제</button>
            </div>
        </div>
    `).join('');
}

// 로컬 스토리지에 메모 저장
function saveMemos() {
    localStorage.setItem('memos', JSON.stringify(memos));
}

// 로컬 스토리지에서 메모 불러오기
function loadMemos() {
    const savedMemos = localStorage.getItem('memos');
    if (savedMemos) {
        memos = JSON.parse(savedMemos);
    }
}
