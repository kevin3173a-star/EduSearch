"use client";
import React, { useRef, useState } from 'react'
import styles2 from "../../detail.module.css";
import { Search,ArrowLeft, CircleQuestionMark  } from 'lucide-react';
import eduData from '@/app/edu.json';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Detail() {
  const [writeKeyword,setWriteKeyword]=useState('')/* 입력값 */
  const [enterKeyword,setEnterKeyword]=useState('')/* 엔터친 입력값(보내질 값) */
  const KWref=useRef();/* 키워드 선택시 커서 생기게  */

  const searchParams=useSearchParams();/* url뒤에 파라미터 찾아서 데이터 출력 */
  const title=searchParams.get('title');
  const category=searchParams.get('category');

  const data=eduData?.[category]?.[title];
  console.log(title)
  if (!data) {
  return <div>데이터를 불러오는 중...</div>;
  }
  const maxRate=Math.max(
    Number(data.fiveRate.replace("%",'')),
    Number(data.fourRate.replace("%",'')),
    Number(data.threeRate.replace("%",''))
  )

  const colors = [
    "#F8BBD0", // 핑크
    "#F48FB1",
    "#FFCCBC", // 코랄
    "#FFE0B2", // 오렌지
    "#FFF9C4", // 옐로우
    "#E6EE9C", // 라임
    "#C8E6C9", // 그린
    "#B2DFDB", // 민트
    "#B2EBF2", // 시안
    "#BBDEFB", // 스카이
    "#C5CAE9", // 인디고
    "#D1C4E9", // 퍼플
    "#E1BEE7", // 라벤더
    "#F3E5F5", // 연보라
    "#FCE4EC", // 로즈
    "#D7CCC8", // 브라운
    "#CFD8DC", // 블루그레이
    "#DCEDC8", // 연두
    "#FFE082", // 소프트 골드
    "#B3E5FC"  // 하늘
];

  const getColor = (name) => {
    let hash = 0;

    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }

    return colors[Math.abs(hash) % colors.length];
  };
  
  const router=useRouter();
  const [helpPopupOpen,setHelpPopupOpen]=useState();
  return (
    <div className={styles2.page}>
      <div className={styles2.mainContainer}>
        <main className={styles2.main}>
          <form>
            <input 
              type='text' 
              placeholder="키워드를 입력해주세요."
              value={writeKeyword}
              onChange={(e)=>setWriteKeyword(e.target.value)}
              onKeyDown={(e)=>{
                if(e.key==="Enter"){/* 엔터쳐야지 입력값 넘어가게 */
                  e.preventDefault();
                  setEnterKeyword(writeKeyword)
                  console.log(writeKeyword)
                  router.push(`/?keyword=${encodeURIComponent(writeKeyword)}`)
                }
                console.log(e.key)/* 누른 키보드 값 */
                /*console.log(e.target)
                console.log(e.target.value) */
              }}
              ref={KWref}/* ref로 input 잡기 */
            ></input>
            <Search 
            size={18} 
            onClick={()=>{
              setEnterKeyword(writeKeyword); console.log(writeKeyword)
              router.push(`/?keyword=${encodeURIComponent(writeKeyword)}`)
              }} style={{cursor:"pointer"}}/>
            <div className={styles2.helpContainer}>
              <CircleQuestionMark
                size={18}
                style={{cursor:"pointer"}}
                onMouseEnter={()=>setHelpPopupOpen(true)}
                onMouseLeave={()=>setHelpPopupOpen(false)}
              />

            </div>
            {helpPopupOpen && (
              <div className={styles2.helpPopup}>
                카테고리 뿐만 아니라 <b>실무, 취업, 기초, 프로젝트, 포트폴리오</b> 등의 키워드로도 강좌를 찾아볼 수 있습니다.
              </div>
            )}
          </form>
          <ArrowLeft  size={18} onClick={()=>{history.back()}} style={{cursor:"pointer"}}/>
        </main>
        <div className={styles2.info}>
          <div className={styles2.basicInfo}>
              <img src={data.src}/>
              <div className={styles2.basicInfoTitle}>
                <h3>{title}</h3>
                <p>{data.first}</p>
              </div>
              <div className={styles2.basicInfoConts}>
                  <div className={styles2.row}>
                    <span className={styles2.label}>평점</span>
                    <span className={styles2.value}>{data.rate}</span>
                  </div>

                  <div className={styles2.row}>
                    <span className={styles2.label}>수강생</span>
                    <span className={styles2.value}>{data.people}</span>
                  </div>

                  <div className={styles2.row}>
                    <span className={styles2.label}>교육기간</span>
                    <span className={styles2.value}>{data.period}</span>
                  </div>

                  <div className={styles2.row}>
                    <span className={styles2.label}>강의시간</span>
                    <span className={styles2.value}>{data.time}</span>
                  </div>

                  <div className={styles2.row}>
                    <span className={styles2.label}>최종 업데이트</span>
                    <span className={styles2.value}>{data.update}</span>
                  </div>    
              </div>
              <Link href={data.url} target="_blank">수강 신청하러가기</Link>
          </div>
          <div className={styles2.detailInfo}>
            <div className={styles2.detailInfo1}>
              <div className={styles2.detailInfo1Descript}>
                <h4>강좌설명</h4>
                <p>
                  {data.description}
                </p>
              </div>
              <div className={styles2.detailInfo1Curri}>
                <h4>커리큘럼</h4>
                <div className={styles2.detailInfo1CurriConts}>
                  {
                    data.curriculum.map((item,i)=>(
                      <div className={styles2.detailInfo1CurriCont} key={i}>
                        <p>섹션 {i+1}. {item.title}</p>
                        <p>{item.lectureCount}강 / {item.duration}</p>
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
            <div className={styles2.detailInfoTeacher}>
              <h4>강사 소개</h4>
              <div className={styles2.detailInfoTeacherContainer}>
                <div style={{
                      backgroundColor: getColor(data.teacher)
                    }}>
                {data.teacher[0]}
                </div>
                <div className={styles2.detailInfoTeacherCont}>
                  <b>{data.teacher}</b>
                  <p>{data.teacherDetail}</p>
                  <p>{data.teacherDetail2}</p>
                </div>
              </div>
            </div>
            <div className={styles2.detailInfoReview}>
              <h4>수강 후기</h4>
              <div className={styles2.detailInfoReviewContainer}>
                <div className={styles2.detailInfoReviewResult}>
                  <div className={styles2.detailInfoReviewResultAll}>
                    <b>{data.rate}</b>
                    <p>전체 평점</p>
                    <p>리뷰 {data.allRates}</p>
                  </div>
                  <div className={styles2.detailInfoReviewResultGraph}>
                    <div className={styles2.detailInfoReviewResultGraphScore}>
                      <p>5점</p>
                      <p>4점</p>
                      <p>3점</p>
                    </div>
                    <div className={styles2.detailInfoReviewResultGraphBar}>
                      <p style={{
                          width:data.fiveRate,
                          backgroundColor:
                            Number(data.fiveRate.replace('%', '')) === maxRate
                              ? '#4d79ff'
                              : '#d1d5db'
                        }}
                      ></p>
                      <p style={{
                          width:data.fourRate,
                          backgroundColor:
                            Number(data.fourRate.replace('%', '')) === maxRate
                              ? '#4d79ff'
                              : '#d1d5db'
                        }}
                      ></p>
                      <p style={{
                          width:data.threeRate,
                          backgroundColor:
                            Number(data.threeRate.replace('%', '')) === maxRate
                              ? '#4d79ff'
                              : '#d1d5db'
                        }}
                      ></p>
                    </div>
                    <div className={styles2.detailInfoReviewResultGraphPercent}>
                      <p>{data.fiveRate}</p>
                      <p>{data.fourRate}</p>
                      <p>{data.threeRate}</p>
                    </div>
                  </div>
                </div>
                <div className={styles2.detailInfoReviewCont1}>
                  <div 
                    className={styles2.detailInfoReviewCont1Name}
                    style={{
                      backgroundColor: getColor(data.review1Name)
                    }}
                  >
                    {data.review1Name[0]}
                  </div>
                  <div className={styles2.detailInfoReviewCont1Coment}>
                    <div>
                      <b>{data.review1Name}</b>
                      <p>{data.review1Date}</p>
                    </div>
                    <p>{data.review1}</p>
                  </div>
                </div>
                <div className={styles2.detailInfoReviewCont1}>
                  <div 
                    className={styles2.detailInfoReviewCont1Name}
                    style={{
                      backgroundColor: getColor(data.review2Name)
                    }}
                  >
                    {data.review2Name[0]}
                  </div>
                  <div className={styles2.detailInfoReviewCont1Coment}>
                    <div>
                      <b>{data.review2Name}</b>
                      <p>{data.review2Date}</p>
                    </div>
                    <p>{data.review2}</p>
                  </div>
                </div>
                <div className={styles2.detailInfoReviewCont1}>
                  <div 
                    className={styles2.detailInfoReviewCont1Name}
                    style={{
                      backgroundColor: getColor(data.review3Name)
                    }}
                  >
                    {data.review3Name[0]}
                  </div>
                  <div className={styles2.detailInfoReviewCont1Coment}>
                    <div>
                      <b>{data.review3Name}</b>
                      <p>{data.review3Date}</p>
                    </div>
                    <p>{data.review3}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}