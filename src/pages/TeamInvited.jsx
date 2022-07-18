import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import apis from "../api/main";
import { useRef } from "react";
import styled from "styled-components";
import { useState } from "react";

const TeamInvited = () => {
    const uuidRef = useRef();
    const navigate = useNavigate();
    const [warning, setWarning] = useState(null);
    const [teamData, setTeamData] = useState(null);
    const [teamName, setTeamName] = useState(null);
    const [UUID, setUUID] = useState('');
    const [image, setImage] = useState(null);

    const findUUID = async (UUIDInfo) => {
        return apis.postInviteTeam(UUIDInfo);
    }


    const { mutate: findMutate } = useMutation(findUUID, {
        onSuccess: (resp) => {
            // try {
            //     console.log(data, "성공");
            //     setWarning(false);
            //     setTeamData(true);
            // }
            // catch {
            //     console.log(data, "error")
            //     setTeamData(false);
            //     setWarning(true);    
            // }
            console.log(resp, "성공");
            console.log(resp.data.teamImage)
            setTeamName(resp.data.teamname);
            setUUID(resp.data.uuid);
            setWarning(false);
            setTeamData(true);
            setImage(resp.data.teamImage)
        },
        onError: (data) => {
            console.log(data, "error")
            setTeamData(false);
            setWarning(true);
        }
    });
    const teamJoin = async (data) => {
        return apis.postTeamJoin(data);
    }
    const { mutate: joinMutate } = useMutation(teamJoin, {
        onSuccess: (data) => {
            console.log(data.data);
            () => navigate('/teamboard/1')
        },
        onError: (error) => {
            console.log(error);
            alert("오류가 발생했습니다");
        }
    })

    // const mutation = useMutation(findUUID);

    const teamFindHandler = () => {
        const data = {
            uuid: uuidRef.current.value
        }
        console.log(data);
        findMutate(data);
    }
    const teamJoinHandler = () => {
        const data = {
            uuid: UUID
        }
        console.log(data);
        joinMutate(data);
    }


    return (
        <>
            <StBox>
                <StContainer>
                    <StTitleBox>
                        <StTitle>메일로 전송된 초대 코드를 입력해주세요</StTitle>
                        <StTitleWrapper>
                            <StTitleInputBox>
                                <StTitleInput placeholder="초대 코드 입력" type={"text"} ref={uuidRef}>

                                </StTitleInput>
                                <StTitleButton onClick={teamFindHandler}>
                                    코드 확인
                                </StTitleButton>
                            </StTitleInputBox>
                            {warning
                                ? <StWarning>올바르지 않은 코드가 입력되었습니다. 다시 입력해주세요.</StWarning>
                                : <></>}
                        </StTitleWrapper>
                    </StTitleBox>
                    {teamData
                        ? <StTeamBox>
                            <StTeamDataBox>
                                <StTeamDataWrapper>
                                    <StTeamProfileImg src={image}>
                                        {/* <img src={data?.data?.teamImage}></img> */}
                                    </StTeamProfileImg>
                                    <StTeamTitleDiv>
                                        {/* {data?.data?.teamname} */}
                                    </StTeamTitleDiv>
                                </StTeamDataWrapper>
                                <StTeamJoinButton onClick={() => navigate('/teamboard')}>
                                    입장하기
                                </StTeamJoinButton>
                            </StTeamDataBox>
                        </StTeamBox>
                        : <></>}
                    {teamData
                        ? <StTeamBox>
                            <StTeamDataBox>
                                <StTeamDataWrapper>
                                    <StTeamProfileImg>
                                        {/* <img src={data?.data?.teamImage}></img> */}
                                    </StTeamProfileImg>
                                    <StTeamTitleDiv>
                                        {teamName}
                                    </StTeamTitleDiv>
                                </StTeamDataWrapper>
                                <StTeamJoinButton onClick={teamJoinHandler}>
                                    입장하기
                                </StTeamJoinButton>
                            </StTeamDataBox>
                        </StTeamBox>
                        : <></>}
                </StContainer>
            </StBox>
        </>
    )
}

const StBox = styled.div`
    width : 100%;
    height : 100vh;
    display: flex;
    flex-direction: row;
    margin: 0;
    padding : 0;
    justify-content: center;
    align-items: center;
    order: 1;
`
const StContainer = styled.div`
    /* Frame 270 */
    /* Auto layout */
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding: 0px;
    /* gap: 60px; */
    
    /* position: absolute; */
    width: 799px;
    height: 671px;
`
const StTitle = styled.div`
    /* 새로운 팀 정보를 입력해주세요 */
    width: 799px;
    height: 58px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 43px;
    line-height: 58px;
    /* identical to box height */
    text-align: center;
    color: #000000;
    /* Inside auto layout */
    flex: none;
    order: 0;
    flex-grow: 0;
`
const StTitleBox = styled.div`
    width: 799px;
    height: 197px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const StTitleWrapper = styled.div`
    /* background-color: blue; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 79px;
    margin-top: 60px;
    /* align-self: flex-start; */
    justify-content: flex-start;
`
const StTitleInputBox = styled.div`
    display: flex;
    flex-direction: row;
    height: 49px;
    
`
const StTitleInput = styled.input`
    width : 650px;
    height : 44px;
    border-radius: 6px;
    border: 1px solid #000000;
`
const StTitleButton = styled.button`
    width : 132px;
    height : 48px;
    border-radius : 6px;
    background-color: #000;
    margin-left: 6px;
    color: white;
`
const StWarning = styled.div`
    /* 이메일 형식에 맞게 입력해주세요 */
    width: 384px;
    height: 19px;

    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;

    color: #EF6A61;

    flex: none;
    order: 2;
    flex-grow: 0;

    align-self: flex-start;
    margin-top: 12px;
`
const StTeamBox = styled.div`
    /* Frame 277 */
    background: #F5F5F5;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding: 50px;


    width: 336px;
    height: 414px;

    border-radius: 8px;

    box-sizing: border-box;
    margin-top: 60px;

    /* Inside auto layout */

    flex: none;
    order: 1;
    flex-grow: 0;
`
const StTeamDataBox = styled.div`
    /* Frame 276 */
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0px;
    /* gap: 32px; */

    width: 236px;
    height: 314px;

    flex: none;
    order: 0;
    flex-grow: 0;
`
const StTeamDataWrapper = styled.div`
    /* Frame 196 */
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0px;
    /* align-self: flex-start; */

    width: 180px;
    height: 228px;

    flex: none;
    order: 0;
    flex-grow: 0;
`
const StTeamJoinButton = styled.div`
    /* Frame 36 */
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    /* padding: 15px; */
    /* gap: 10px; */

    width: 236px;
    height: 54px;

    background: #000000;
    border-radius: 6px;
    margin-top: 32px;
    color: white;

    /* Inside auto layout */

    flex: none;
    order: 0;
    flex-grow: 0;
    cursor: pointer;
`
const StTeamProfileImg = styled.img`
    background-color: #000;
    /* Rectangle 151 */
    width: 180px;
    height: 180px;

    background: #F1F1F1;
    border-radius: 87px;
    object-fit: cover;
`
const StTeamTitleDiv = styled.div`
    /* background-color: black; */
    /* 팀이름 */
    width: 56px;
    height: 24px;

    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    text-align: center;

    color: #000000;
    margin-top: 24px;

    flex: none;
    order: 0;
    flex-grow: 0;
`

export default TeamInvited;