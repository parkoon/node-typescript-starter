# Express Typescript Starter

서버는 `Express` 로 구현되어 있습니다. 언어는 `Typescript` 로 작성되어 있습니다. 화면은 `Handlebars` 로 세팅되어 있습니다.

## 주요 기술 스펙

---

-   HTTP 서버 구성을 위한 `Express`
-   타입 제한을 위한 `Typescript`
-   서버 사이드 렌더링 템플릿 엔진으로 `Handlebars`
-   클라이언트 스크립트 빌드를 위한 `Webpack`
-   서버 코드 자동 적용을 위한 `Nodemon`
-   일관된 코딩을 위한 `Prettier & Eslint`
-   서버 환경 설정을 위한 `Dotenv`

## 폴더 구조

---

| Name                | Description                                                                         |
| ------------------- | ----------------------------------------------------------------------------------- |
| **build**           | `npm run build` 결과물                                                              |
| **node_modules**    | npm dependency                                                                      |
| **src**             | 전체 코드                                                                           |
| **views**           | 핸들바스 코드                                                                       |
| **src/command**     | API 통신 할 때의 Request Body, `class-validator` 패키지를 이용해 유효성 검증을 진행 |
| **src/controllers** | 요청에 대한 처리 부분                                                               |
| **src/models**      | 처리에 대한 결과물, 클라이언트에 전달될 객체 구조                                   |
| **src/public**      | 클라이언트 사이드에서 사용 될 Static assets                                         |
| **src**/server.ts   | Entry point                                                                         |
| .env.example        | .env 파일은 형상관리 하지 않고 .env 에 들어갈 데이터의 키 값을 명시                 |
| package.json        | 디페던시, 스크립트 등 프로젝트 정보를 담고 있는 파일                                |
| tsconfig.json       | 서버 타입스크립트 코드를 정의하고 설정 팡일                                         |
| .eslintrc           | ESLint code style 을 정의하고 있는 설정파일                                         |
| .eslintignore       | ESLint 적용가 적용 되지 않을 파일을 명한 파일                                       |
| .prettierrc         | 코드 정렬                                                                           |
| webpack.config.js   | 클라이언트 사이드이 스크립트를 빌드 할 웹펙 설정 파일                               |

## 어떻게 실행할 수 있을까?

---

> 개발 할 땐 아래 커맨드 실행

```
npm run dev
```

> 배포 할 땐 아래 커맨드 실행

```
npm run build
npm run start
```

## 서버만 사용하고 싶다면?

---

클라이언트는 `React` `Vue` 와 같은 라이브러리 / 프레임워크를 사용한다면 아래와 같이 수정하면 됩니다.

### 삭제 할 파일들

-   webpack.config.js
-   views/
-   src/public
-   src/routes/view.route.ts
-   src/controllers/view.controller.ts

### 코드 수정

#### package.json

```
{
    ...
    "scripts": {
        "dev": "NODE_ENV=development nodemon",
        "build": "tsc",
        "start": "NODE_ENV=production node build/src/server.js",
        "clean": "rimraf build"
    },
}
```

#### app.ts

```
...
// Router
import viewRouter from '@Routes/view.route'; <-- remove this code
import userRouter from '@Routes/user.route';
import errorMiddleware from '@Middleware/error.middleware';

...
// ROUTES
app.use('/', viewRouter); <-- remove this code
app.use('/api/v1/users', userRouter);
```

## License

---

Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT License.
