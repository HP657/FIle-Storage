# 📦 Upload Server

Express + Multer 기반의 **이미지/비디오 업로드 서버**입니다.
Docker / Docker Compose 환경에서 실행되며, 업로드된 파일은 정적 URL로 접근할 수 있습니다.

---

## ✨ 주요 기능

* 📤 이미지 / 비디오 파일 업로드
* 🗂️ 파일 타입별 디렉토리 분리 저장 (`img`, `video`)
* 🔗 업로드 후 접근 가능한 URL 반환
* 📁 다중 파일 업로드 지원
* 🐳 Docker / Docker Compose 기반 실행

---

## 📁 프로젝트 구조

```
project-root/
├─ docker/
│  ├─ Dockerfile
│  └─ docker-compose.yml
├─ src/
│  ├─ app.js
│  ├─ routes/
│  │  └─ upload.route.js
│  └─ configs/
│     └─ multer.config.js
├─ uploads/
│  ├─ img/
│  └─ video/
├─ package.json
└─ README.md
```

---

## 🚀 실행 방법

### 1️⃣ Docker & Docker Compose 실행 (권장)

```bash
cd docker
docker-compose up -d --build
```

서버 실행 후:

```
http://localhost:3000
```

---

## 📤 파일 업로드 API

### POST `/upload`

#### 요청

* **Content-Type**: `multipart/form-data`
* **Field name**: `media`
* **다중 파일 업로드 가능**

#### 예시 (curl)

```bash
curl -X POST http://localhost:3000/upload \
  -F "media=@test1.jpg" \
  -F "media=@test2.png"
```

#### 응답

```json
{
  "count": 2,
  "urls": [
    "http://localhost:3000/static/img/20260102_143012_12345.jpg",
    "http://localhost:3000/static/img/20260102_143012_67890.png"
  ]
}
```

---

## 🌐 정적 파일 접근

업로드된 파일은 아래 경로로 접근할 수 있습니다.

```
/static/img/파일명
/static/video/파일명
```

예시:

```
http://localhost:3000/static/img/example.jpg
```

---

## ⚙️ 환경 변수

| 변수명      | 설명    | 기본값        |
| -------- | ----- | ---------- |
| PORT     | 서버 포트 | 3000       |
| NODE_ENV | 실행 환경 | production |

---

## 🛠️ 사용 기술

* Node.js 18
* Express
* Multer
* Docker / Docker Compose

