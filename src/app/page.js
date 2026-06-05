"use client";
import Image from "next/image";
import { Search, Star ,CalendarRange,CircleQuestionMark  } from "lucide-react";
import styles from "./basic.module.css";
import { useEffect, useRef, useState } from "react";
import eduData from '@/app/edu.json';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
/* console.log(eduData) */

export default function Home() {
  const [writeKeyword,setWriteKeyword]=useState('')/* 입력값 */
  const [enterKeyword,setEnterKeyword]=useState(null)/* 엔터친 입력값(보내질 값) */

  const KWref=useRef();/* 키워드 선택시 커서 생기게  */
 
  /* const filterData=eduData[enterKeyword]; filterData그대로는 배열이 아닌 객체라 map을 못돌림 */
  
  const allCourses = Object.entries(eduData).flatMap(([category, courses]) =>
    Object.entries(courses).map(([title, item]) => ({
      ...item,
      title,
      category
    }))
  );

  let filterData = [];
  
  if (enterKeyword?.trim()===""){
    filterData=[];
  }
  else if (eduData[enterKeyword]) {
    // 프론트엔드, 디자인 같은 카테고리 검색
    filterData = Object.entries(eduData[enterKeyword]).map(([title, item]) => ({
      ...item,
      title,
      category: enterKeyword
    }));
  } else {
    // 일반 키워드 검색
    filterData = allCourses.filter(item =>
      item.title.includes(enterKeyword) ||
      item.description.includes(enterKeyword)
    );
  }

  const router=useRouter();

  const searchParams=useSearchParams();

   //처음에 키워드 4개중 랜덤 하나 출력
  const CTGR=['프론트엔드', '디자인', '데이터 분석', '비즈니스']
  
  useEffect(()=>{
    const keyword = searchParams.get('keyword');
    if(keyword || keyword===""){
      setWriteKeyword(keyword);
      setEnterKeyword(keyword)
    } else{
      const randomCTGR = CTGR[Math.floor(Math.random()*CTGR.length)]
      setWriteKeyword(randomCTGR);
      setEnterKeyword(randomCTGR)
    }

  },[searchParams])
  
  const [helpPopupOpen,setHelpPopupOpen]=useState();

  return (
    <div className={styles.page}>
      <div className={styles.circle}></div>
      <div className={styles.mainContainer}>
        <main className={styles.main}>
          <p 
            className={styles.gradientText} 
            onClick={()=>location.href='/'}
            style={{cursor:"pointer"}}
            >
            원하는 교육자료를 바로 찾아보세요!
          </p>
          <form>
            <input 
              type='text' 
              placeholder="키워드를 입력해주세요."
              value={writeKeyword}
              onChange={(e)=>setWriteKeyword(e.target.value)}
              onKeyDown={(e)=>{
                if(e.key==="Enter"){/* 엔터쳐야지 입력값 넘어가게 */
                  e.preventDefault();
                  const KW=writeKeyword?.trim();
                  setEnterKeyword(KW)
                  console.log(KW)
                  router.push(`/?keyword=${encodeURIComponent(KW)}`)
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
                setEnterKeyword(writeKeyword);console.log(writeKeyword)
                router.push(`/?keyword=${encodeURIComponent(writeKeyword)}`)
                }} style={{cursor:"pointer"}}/>
            <div className={styles.helpContainer}>
              <CircleQuestionMark
                size={18}
                style={{cursor:"pointer"}}
                onMouseEnter={()=>setHelpPopupOpen(true)}
                onMouseLeave={()=>setHelpPopupOpen(false)}
              />

            </div>
            {helpPopupOpen && (
              <div className={styles.helpPopup}>
                카테고리 뿐만 아니라 <b>실무, 취업, 기초, 프로젝트, 포트폴리오</b> 등의 키워드로도 강좌를 찾아볼 수 있습니다.
              </div>
            )}
          </form>
          <div className={styles.keyword}>{/* 잡은 input에 현재포커스->바로 커서 깜빡이게 */}
            <button onClick={()=>{setWriteKeyword('프론트엔드');KWref.current.focus();}}>프론트엔드</button>
            <button onClick={()=>{setWriteKeyword('디자인');KWref.current.focus();}}>디자인</button>
            <button onClick={()=>{setWriteKeyword('데이터 분석');KWref.current.focus();}}>데이터 분석</button>
            <button onClick={()=>{setWriteKeyword('비즈니스');KWref.current.focus();}}>비즈니스</button>
          </div>
        </main>
          {
          enterKeyword && (
              <ul className={styles.listBox}>
                { //map을 돌리기 위해 Object.entries로 배열 만들어주고 fD가 없을때는 빈배열 넣어주기                 title                  item
                  filterData.map((item,i)=>(                              /* 배열로 되고 (배열 안의 배열 [["프론트엔드 개발 국비교육",{id,rate,first...}]] ) 구조분해(제목,내용)해야하므로 ([]) 여야함.*/
                    <li className={styles.list} key={i}>
                      <Link href={`/detail?category=${encodeURIComponent(item.category)}&title=${encodeURIComponent(item.title)}&id=${item.id}`}>{/* title에 한글/공백있으므로 url안깨지게 encode~ 넣음 */}
                        <img src={item.src}></img>
                        <h3>{item.title}</h3>
                        <p className={styles.type}>{item.first}</p>
                        <div className={styles.ratePeriod}>
                          <p className={styles.rate}><Star/> {item.rate}</p>
                          <p className={styles.period}><CalendarRange/> {item.period}</p>
                        </div>  
                      </Link>
                    </li>
                  ))
                }
              </ul>
            )
          }
          {
            enterKeyword !==null && !filterData.length && (
              <div className={styles.noResult}>
                <h3>'{enterKeyword}' 에 대한 검색 결과가 없습니다.</h3>
                <p>
                  상단 검색창의 키워드와 도움말을 참고하세요.
                </p>
              </div>
            )
          }
      </div>
    </div>
  );
}
