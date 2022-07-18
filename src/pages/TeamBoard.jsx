import React, { useState } from 'react'
import styled from 'styled-components';
import Header from '../components/Header';
import { useNavigate, useParams } from 'react-router-dom';
import TeamboardHome from '../components/TeamboardHome';
import MeetingManage from '../components/MeetingManage';
import TeamSetting from '../components/TeamSetting';
import useGetTeamMain from '../Hooks/useGetTeamMain';
import home from '../img/home.png';
import homeselect from '../img/homeselect.png';
import meeting from '../img/meeting.png';
import meetingselect from '../img/meetingselect.png';
import setting from '../img/setting.png';
import settingselect from '../img/settingselect.png';
import jwt_decode from "jwt-decode";
import { getCookie } from '../Cookie';
import { useGetTeamInfo } from "../Hooks/useGetTeamInfo"


const TeamBoard = () => {

  const navigate = useNavigate();

  const [page, setPage] = useState(1);

  const teamId = useParams().teamid;

  const { data: main } = useGetTeamMain({ teamId });
  const decoded = jwt_decode(getCookie('token'));
  const nickname = decoded.USER_NICKNAME;

  const { data } = useGetTeamInfo();
  console.log(main?.teamManager)


  return (
    <StBox>
      <Header teamname={main?.teamname} />
      <StDownBox>
        <StLeft>
          <StSmallBox>
            <StTeamInfoBox>
              <StTeamImg src={data[0].teamImage} />
              <StInfoBox>
                <StTeamName>{main?.teamname}</StTeamName>
                {main?.teamManager == nickname ? <StTeamClass>Leader</StTeamClass> : <StTeamClass>member</StTeamClass>}
              </StInfoBox>
            </StTeamInfoBox>
            <StBtBox>
              <StButton1 page={page} onClick={() => { setPage(1) }}> {page == 1 ? <StImg src={homeselect} /> : <StImg src={home} />}홈 </StButton1>
              <StButton2 page={page} onClick={() => { setPage(2) }}> {page == 2 ? <StImg src={meetingselect} /> : <StImg src={meeting} />}미팅 관리 </StButton2>
              <StButton3 page={page} onClick={() => { setPage(3) }}> {page == 3 ? <StImg src={settingselect} /> : <StImg src={setting} />}환경설정 </StButton3>
            </StBtBox>
          </StSmallBox>
        </StLeft>
        {page == 1 ? <TeamboardHome /> : <></>}
        {page == 2 ? <MeetingManage /> : <></>}
        {page == 3 ? <TeamSetting teamLeader={main?.teamManager} prop={main?.user} /> : <></>}
      </StDownBox>
      {page == 1 ? <StMeetMake onClick={() => { navigate(`/teamboard/${teamId}/meetmakeone`) }}>+</StMeetMake> : <></>}
    </StBox>
  );
};

const StImg = styled.img`
  width : 24px;
  height : 24px;
  margin : 0 16px 0 16px;
`;

const StButton3 = styled.div`
    display: flex;
    align-items: center;
    width : 286px;
    height : 44px;
    border-radius: 8px;
    background-color: ${props => (props.page == 3 ? "#E2E2E2;" : "none")};
`;

const StButton2 = styled.div`
    display: flex;
    align-items: center;
    width : 286px;
    height : 44px;
    border-radius: 8px;
    background-color: ${props => (props.page == 2 ? "#E2E2E2;" : "none")};
`;

const StButton1 = styled.div`
    display: flex;
    align-items: center;
    width : 286px;
    height : 44px;
    border-radius: 8px;
    background-color: ${props => (props.page == 1 ? "#E2E2E2;" : "none")};
`;

const StBtBox = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: space-between;
    width : 286px;
    height : 156px;
    margin : auto 0 0 0;
`;

const StTeamClass = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width : 88px;
    height : 25px;
    margin : auto 0 0 0 ;
    border-radius: 100px;
    background: #636363;
`;

const StTeamName = styled.div`
    width : 134px;
    height : 24px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;
    text-align: center;
`;

const StInfoBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width : 134px;
    height: 61px;
    margin : 0 0 0 24px;
`;

const StTeamImg = styled.img`
    width : 60px;
    height : 60px;
    border-radius: 60px;
    background: #8C8C8C;
    object-fit: cover;
`;

const StTeamInfoBox = styled.div`
    display: flex;
    align-items: center;
    width :286px;
    height : 93px;
`;

const StSmallBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width : 286px;
    height : 297px;
    margin : 42px 25px 0 25px;
`;

const StLeft = styled.div`
  width : 336px;
  height : 91.2vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #EFEFEF;
`;

const StMeetMake = styled.div`
  position: fixed;
  bottom :50px;
  right : 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  width :56px;
  height : 56px;
  border-radius: 56px;
  background-color: black;
  color : white;
  font-size: 50px;
  cursor: pointer;
`;

const StDownBox = styled.div`
  display: flex;
  justify-content: center;
  height : 100%;
`;

const StBox = styled.div`
  width : 100%;
  height : 100%;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding : 0;
`;

export default TeamBoard;