import { useState } from "react";

// 게시물 데이터
export const [originPosts, setOriginPosts] = useState(Posts);

export const Posts = [
  { 
    id : 1,
    title: "게시물 제목",
    content: "게시물 내용",
    img: null,
    tags: ["강아지", "간식", "일상"],
    profileNickName: "글쓴이 닉네임",
    postTime: "게시 시간",
    likeNumber: 0,
    scrapeNumber: 0,
    comments : [
      {
        profileNickName: '닉네임',
        content: '댓글내용',
        postTime: '2024-07-26'
      }
    ]
  },
  { 
    id : 2,
    title: "게시물 제목",
    content: "게시물 내용",
    img: null,
    tags: ["강아지", "간식", "일상", "QnA"],
    profileNickName: "글쓴이 닉네임",
    postTime: "게시 시간",
    likeNumber: 0,
    scrapeNumber: 0,
    comments : [
      {
        profileNickName: '닉네임',
        content: '댓글내용',
        postTime: '2024-07-26'
      }
    ]
  },
  { 
    id : 3,
    title: "사실 우리집 고양이 킬러임영웅 콘서트",
    content: "레옹이 아니라 냐옹이라는 유명한 킬러임 지금도 황태밀수 사업에서 손때고 짜져있으라고 권총으로 협박받고이써 ㅠㅠ 대충 더 추가적인 텍스트 야라라랍",
    img: { uri: "https://ac-p1.namu.la/20240528sac/48a02548e24db4bade8089a58d4b34244c48cfd0436b894097ec670bdcfd9bac.jpg?expires=1722017549&key=ZnAk61LlLLP9Qb30HFTLhA&type=orig" },
    tags: ["고양이", "QnA"],
    profileNickName: "괴문서맵게하는집",
    postTime: "2024-05-28 19:17:11",
    likeNumber: 15,
    scrapeNumber: 10,
    comments : [
      {
        profileNickName: '닉네임',
        content: '댓글내용',
        postTime: '2024-07-26'
      },
      {
        profileNickName: '개냥이',
        content: '저 킬러 이름이 야옹 이군요.',
        postTime: '2024-05-29 14:18:19'
      },
      {
        profileNickName: '얼죽패딩',
        content: '킬러군',
        postTime: '2024-05-30 17:17:43'
      },
    ]
  },
  {
    title: "사실 우리집 고양이 킬러임",
    content: "레옹이 아니라 냐옹이라는 유명한 킬러임 지금도 황태밀수 사업에서 손때고 짜져있으라고 권총으로 협박받고이써 ㅠㅠ",
    img: null,
    tags: ["강아지"],
    profileNickName: "괴문서맵게하는집",
    postTime: "2024-05-28 19:17:11",
    likeNumber: 13,
    scrapeNumber: 8,
    comments : [
      {
        profileNickName: '닉네임',
        content: '댓글내용',
        postTime: '2024-07-26'
      },
      {
        profileNickName: '개냥이',
        content: '저 킬러 이름이 야옹 이군요.',
        postTime: '2024-05-29 14:18:19'
      },
    ]
  },
  { 
    id : 4,
    title: "사실 우리집 고양이 킬러임",
    content: "레옹이 아니라 냐옹이라는 유명한 킬러임 지금도 황태밀수 사업에서 손때고 짜져있으라고 권총으로 협박받고이써 ㅠㅠ",
    img: null,
    tags: ["강아지"],
    profileNickName: "괴문서맵게하는집",
    postTime: "2024-05-28 19:17:11",
    likeNumber: 13,
    scrapeNumber: 8,
    comments : [
      {
        profileNickName: '닉네임',
        content: '댓글내용',
        postTime: '2024-07-26'
      },
      {
        profileNickName: '개냥이',
        content: '저 킬러 이름이 야옹 이군요.',
        postTime: '2024-05-29 14:18:19'
      },
    ]
  }
];