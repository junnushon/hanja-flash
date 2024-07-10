# Hanja Flashcards for Korean Language Learners

![GitHub repo size](https://img.shields.io/github/repo-size/junnushon/hanja-flash)
![GitHub issues](https://img.shields.io/github/issues/junnushon/hanja-flash)
![GitHub forks](https://img.shields.io/github/forks/junnushon/hanja-flash)
![GitHub stars](https://img.shields.io/github/stars/junnushon/hanja-flash)
![GitHub license](https://img.shields.io/github/license/junnushon/hanja-flash)

## 소개
이 프로젝트는 한국어 학습자를 위한 급수별 한자 플래시카드 웹 애플리케이션입니다. 사용자는 다양한 급수의 한자를 학습하고 테스트할 수 있습니다.

## 기능
- 다양한 급수별 한자 학습 (8급, 7급, 6급, 5급, 4급, 3급, 2급, 1급)
- 사용자가 입력한 답안을 확인하고, 올바른 답안을 제공
- 최근에 표시된 한자를 추적하여 학습 효율성 향상

## 사용 방법
1. 저장소를 클론하거나 다운로드합니다.
    ```bash
    git clone https://github.com/junnushon/hanja-flash.git
    ```
2. 프로젝트 디렉토리로 이동합니다.
    ```bash
    cd hanja-flash
    ```
3. `index.html` 파일을 브라우저에서 엽니다.

## 개발자 가이드
### 프로젝트 구조
- `index.html`: 메인 HTML 파일
- `styles.css`: 스타일시트 파일
- `script.js`: 주요 JavaScript 파일
- `data/`: 한자 데이터를 포함한 JSON 파일들이 위치한 디렉토리

### 로컬 개발 환경 설정
로컬에서 개발할 때 JSON 파일을 제대로 로드하기 위해 간단한 로컬 서버를 사용할 수 있습니다. Python을 사용하여 로컬 서버를 시작하는 방법은 다음과 같습니다:
1. 터미널을 열고 프로젝트 디렉토리로 이동합니다.
2. 다음 명령어를 실행하여 로컬 서버를 시작합니다:
    ```bash
    python -m http.server 8000
    ```
3. 브라우저에서 `http://localhost:8000`을 통해 파일에 접근할 수 있습니다.

## 기여
프로젝트에 기여하고 싶다면, 풀 리퀘스트를 제출하거나 이슈를 열어주세요. 기여해주셔서 감사합니다!

## 라이선스
이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 LICENSE 파일을 참고하세요.

## 링크
프로젝트 링크
