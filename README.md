# 📚 EduSearch - 교육 강좌 검색 플랫폼

<p>
<b>EduSearch</b>는 쏟아지는 교육 정보 속 구직활동을 하는 청년들을 위해 원하는 교육 강좌 정보를 검색하여 탐색하고 수강신청까지 이뤄질 수 있도록 연계한 웹 서비스 입니다.
JSON 기반의 데이터를 통해 <b>프론트엔드, 디자인, 데이터 분석, 비즈니스</b>로 분류된 카테고리별 교육 강좌 정보를 제공합니다.
</p>

---------

## 💡 1. 주제
기초부터 취업을 위한 **포트폴리오, 실무, 실전, 국비교육, 부트캠프** 등의 키워드 위주의 교육 강좌 정보를 제공하여 탐색부터 수강신청까지 이어지는 경험을 제공하는 서비스입니다.

## 📱 2. 핵심 기능
- **랜덤 카테고리**: 키워드 검색 전 4가지 카테고리 중 랜덤으로 강좌 출력 
- **카테고리 검색**: 상시로 떠있는 카테고리 버튼을 클릭하여 강좌 탐색
- **키워드 검색**: 포트폴리오, 실무 등의 키워드를 활용하여 강좌 탐색 
- **강좌 자세히 보기**: 강좌 설명과 커리큘럼, 강사소개, 수강후기 등의 정보 제공
- **수강 신청하러가기**: 인프런 웹사이트에 연계된 강좌 url로 이동하여 이어서 수강신청 가능
- **반응형 지원**: 모바일, 태블릿, 데스크탑 등 다양한 기기 환경 최적화

## 💻 3. 주요 기술
- **Front-End**: ![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white) ![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)
- **데이터관리**: ![JSON](https://img.shields.io/badge/JSON-000000?style=flat-square\&logo=json\&logoColor=white)
- **환경**: ![VSCode](https://img.shields.io/badge/VSCode-007ACC?style=flat-square\&logo=visualstudiocode\&logoColor=white), ![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat-square\&logo=github\&logoColor=white)
- **디자인**: ![Figma](https://img.shields.io/badge/Figma-F24E1E?style=flat-square\&logo=figma\&logoColor=white)
- **배포**: ![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)

------------------

## 🔗 배포 URL
**EduSearch** https://edu-search-beige.vercel.app/

---------------

## 📅 개발 기간 및 인원
* 2026.05 ~ 2026.06 
* 개인 프로젝트

---------

## 🗂️ 폴더 구조

```
📂src/
┣━━ 📂app/
┃   ┣━━ 📂(pages)/                   
┃   ┃   ┣━━ 📂detail/                  # 교육 강좌 상세 페이지
┃   ┣━━ 📄layout.js                    # 전체 레이아웃 
┃   ┣━━ 📄page.js                      # 메인 페이지(교육 강좌 리스트 페이지) 
┃   ┣━━ 📄basic.module.css             # 메인 페이지 module.css
┃   ┗━━ 📄detail.module.css            # 교육 강좌 상세 페이지 module.css           
```

-------

## 💥 트러블슈팅 (Trouble Shooting)

### 📌 1. 카테고리 의존 검색 구조 개선 및 통합 키워드 검색 구현
> **❗ 문제**: 카테고리별로 분리된 `JSON`으로 데이터를 가져오다보니 `const filterData=eduData[enterKeyword]`로 정해진 키워드 검색만 가능하여 검색의 의미가 상실되는 문제 발생

- **✅ 해결 방안 (Solution)**
  - **전체 배열로 변경**:  `JSON`을 `Object.entries(eduData).flatMap(([category, courses])`로 하나의 전체배열로 만들어 `allCourses`에 담음. 
  - **기존 filterData에 추가**: `allCourses.filter(item=>item.title.includes(enterKeyword) || item.description.includes(enterKeyword))`로 제목 및 내용까지 훑을 수 있게 일반 키워드 검색도 `filterData`에 추가. 

---

### 📌 2. Auto-fit 기반 Grid 레이아웃의 과도한 확장 문제 해결
> **❗ 문제**: `grid-template-columns:repeat(auto-fit,minmax(300px,1fr))`로 하니 `list`가 1개면 이 한칸이 `1fr`을 전부 먹어서 좌우로 꽉차게 넓어지는 문제 발생

- **✅ 해결 방안 (Solution)**
  - **열 개수 고정**: `grid-template-columns:repeat(3,300px)`로 `auto-fit`이 아닌 `3`으로 열 개수를 고정
  - **반응형 적용**:  반응형에서는 분기마다 `(3,300px), (2,300px)..`이런식으로 직접 열수를 바꿔주는 방식을 채택

---

### 📌 3. Suspense 적용을 통한 useSearchParams 빌드 이슈 해결
> **❗ 문제**: `Next` 배포 시 미리 페이지를 만들어두려고 하지만 `useSearchParams`가 브라우저 실행 전이라 `url`를 읽을 수 없는 문제로 배포 오류 발생

- **✅ 해결 방안 (Solution)**
  - **suspense 적용**: 준비되면 실행할거다라고 알려주는 `suspense`를 제일 바깥쪽 `layout.js`에 적용하여 `useSearchParams`를 포함한 전체가 `suspense`의 영향을 받도록 하여 브라우저가 열리고 `url`이 생긴 후로부터 `useSearchParams`가 작동되도록 하여 정상 배포 가능

---

### 📌 4. Fixed 레이아웃 적용 시 발생하는 레이아웃 붕괴 문제 해결
> **❗ 문제**: 주요정보를 스크롤되어도 제자리에 고정되도록 `position: fixed`를 적용하였으나, 요소가 문서 흐름에서 제거되면서 주변 콘텐츠가 해당 영역을 인식하지 못해 레이아웃이 틀어지는 문제 발생

- **✅ 해결 방안 (Solution)**
  - **애니메이션 시간 확보 (Delayed Unmounting)**: `fixed`된 요소가 차지하는 공간만큼 좌측 여백을 확보하고, 나머지 콘텐츠를 우측으로 이동시켜 레이아웃이 유지되도록 개선하였습니다.

---
