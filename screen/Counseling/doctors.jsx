import Hospital from "../Hospital";

const doctors = [
    {
        id : "dr1",
        name : "문경하",
        imgUri : require('../../assets/doctorImg/dr1.png'),
        star : "4.6",
        review : "10",
        adopt : '65',
        explain : `중성화수술/스케일링/슬개골탈구/자궁축농증/유선종양/결석제거/피부과/등등
수술전문`,
        time : "09:00 ~ 18:00",
        hospitalId : "개포별빛동물병원",
        animal : ["강아지", "고양이", "햄스터"],
        Price : "30,000",
        Career : `2008년 수의사면허취득
~2009년 D동물병원 진료수의사
~2010년 G동물병원 진료수의사
~2011년 I동물병원 진료수의사
~2012년 DS동물병원 원장
~현 개포별빛동물병원 공동 원장

2008년 수의사면허취득
제주대 수의학 석사학위 취득
~2011년 축산물HACCP기준원 안전관리 담당수의사
~2014년 JEJU WILDLIFE RESCUE CENTER  진료수의사
~현 개포별빛동물병원 공동 원장`
    },
    {
        id : "dr2",
        name : "김진혁",
        imgUri : require('../../assets/doctorImg/dr2.png'),
        star : "4.4",
        review : "20",
        adopt : '90',
        explain : `정성껏 진료하는 수의사입니다.
정성껏 진료하는 수의사입니다.
정성껏 진료하는 수의사입니다.정성껏 진료하는 수의사입니다.`,
        time : "09:00 ~ 18:00",
        hospitalId : "개포별빛동물병원",
        animal : ["강아지", "고양이"],
        Price : "30,000",
        Career : ``
    },
    {
        id : "dr3",
        name : "김의선",
        imgUri : '',
        star : "4.6",
        review : "30",
        adopt : '40',
        explain : `정성껏 진료하는 수의사입니다.
정성껏 진료하는 수의사입니다.
정성껏 진료하는 수의사입니다.정성껏 진료하는 수의사입니다.`,
        time : "09:00 ~ 18:00",
        hospitalId : "이리온",
        animal : ["강아지", "고양이"],
        Price : "30,000",
        Career : `전남대학교 수의과대학 졸업
강남동물병원 인턴
방배동물병원 진료수의사
쿨펫동물병원 잠실점 원장
현)이리온 동물병원 양재점 원장`
    },
    {
        id : "dr4",
        name : "장혁주",
        imgUri : require('../../assets/doctorImg/dr4.png'),
        star : "4.9",
        review : "40",
        adopt : '70',
        explain : `건강한 반려동물과 함께 하는 행복한 삶,
에이블 동물병원이 함께 합니다.`,
        time : "09:00 ~ 18:00",
        hospitalId : "에이블 동물병원",
        animal : ["강아지", "고양이"],
        Price : "30,000",
        Career : `現 에이블 동물병원 원장
前 이리온 양재점 원장
前 이리온 청담본원 근무
前 분당 해마루 2차진료 동물병원 근무
前 경북 군위군청 공중방역수의사 복무`
    },
    {
        id : "dr5",
        name : "양소희",
        imgUri : require('../../assets/doctorImg/dr5.png'),
        star : "4.8",
        review : "50",
        adopt : '60',
        explain : `건강한 반려동물과 함께 하는 행복한 삶,
에이블 동물병원이 함께 합니다.`,
        time : "09:00 ~ 18:00",
        hospitalId : "에이블 동물병원",
        animal : ["강아지", "고양이"],
        Price : "30,000",
        Career : `現 에이블 동물병원 진료수의사`
    },
]
export default doctors;