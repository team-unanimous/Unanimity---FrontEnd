import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useGetTeamInfo } from "../Hooks/useGetTeamInfo"
import styled from "styled-components"
import apis from "../api/main"
import { useMutation } from "react-query"

const TeamSelect = () => {
    //key, vector img, team img box
    const navigate = useNavigate();
    // const [selectedTeam, setSelectedTeam] = useState(null);
    const teamJoin = async (data) => {
        return apis.postTeamJoin(data);
    }
    const { mutate: joinMutate } = useMutation(teamJoin, {
        onSuccess: (data) => {
            console.log(data)
            console.log(data.data);
            () => navigate('/teamboard/1')
        },
        onError: (error) => {
            console.log(error);
        }
    })

    const unaTeamJoinHandler = () => {
        const data = {
            uuid: "ff4ca7ab-5e9a-491b-a90d-70b200fe41d2"
        }
        console.log(data.data)
        joinMutate(data);
    }

    const { data } = useGetTeamInfo();
    console.log()

    if (!data) {
        return <>Something wrong!</>
    }
    // console.log(data);
    return (
        <>
            <StBox>
                <StContainer>
                    <StTitleWrapper>
                        <StTitle>접속할 팀 페이지를 선택해주세요</StTitle>
                        <StUnanimousTeamJoin
                            onClick={unaTeamJoinHandler}
                        >Unanimous팀에 참여하시겠습니까?</StUnanimousTeamJoin>
                    </StTitleWrapper>
                    <StTeamBox>
                        {data.map((team) => (
                            <>
                                <StTeamItemBox >
                                    <StTeamItem
                                        key={team.teamId}
                                        className="team-title"
                                        onClick={() => { navigate(`/teamboard/${team.teamId}`) }}
                                        src={{ data }.data[0].teamImage}
                                    >
                                    </StTeamItem>
                                    <StTeamName>
                                        {team.teamname}
                                    </StTeamName>
                                </StTeamItemBox>
                            </>
                        ))}
                    </StTeamBox>
                    <StButtonWrapper>
                        <StInvitedButton onClick={() => navigate("/teaminvited")}>
                            이미 초대된 팀 페이지에 접속하고 싶으신가요?
                        </StInvitedButton>
                        <StTeamMakeButton onClick={() => navigate("/teammake")}>
                            새로운 팀 페이지를 만들고 싶으신가요?
                        </StTeamMakeButton>
                    </StButtonWrapper>
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
  `;

const StContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center; 
    
    /* position: relative; */
    width: 1028px;
    height: 562px;
    /* left: 446px;
    top: 352px; */
    `
const StTitleWrapper = styled.div`
    /* Frame 318 */
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0px;
    
    width: 654px;
    height: 101px;
    
    flex: none;
    order: 0;
    flex-grow: 0;
    `
const StTitle = styled.div`
    width: 800px;
    height: 58px;
    margin-bottom: 24px;
    
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 43px;
    line-height: 58px;
    /* identical to box height */
    
    text-align: center;
    
    color: #000000;
    
    flex: none;
    order: 0;
    flex-grow: 0;
    `
const StUnanimousTeamJoin = styled.div`
    /* Unanimous팀에 참여하시겠습니까? */
    width: 300px;
    height: 19px;
    
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    line-height: 19px;
    text-align: center;
    
    margin-bottom: 20px;
    
    color: #000000;
    
    flex: none;
    order: 1;
    flex-grow: 0;
    cursor: pointer;
    `
const StTeamBox = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-around;
    margin-top: 60px;
    `

const StTeamItemBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    `
const StTeamItem = styled.img`
    width: 180px;
    height: 180px;
    
    background-color: #D9D9d9;
    border-radius: 87px;
    object-fit: cover;
    `
const StTeamName = styled.div`
    /* 팀이름 */
    
    width: 100px;
    height: 24px;
    
    margin-top: 24px;
    
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    text-align: center;
    
    color: #000000;
    
    /* Inside auto layout */
    
    flex: none;
    order: 0;
    flex-grow: 0;
    `
const StButtonWrapper = styled.div`
    /* Frame 282 */
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0px;
    /* gap: 290px; */
    
    width: 1028px;
    height: 53px;
    
    flex: none;
    order: 1;
    align-self: stretch;
    flex-grow: 0;
    
    margin-top: 120px;
`
const StInvitedButton = styled.div`
    /* Frame 281 */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    padding: 18px 25px;
    /* gap: 10px; */
    box-sizing: border-box;

    width: 353px;
    height: 53px;

    background: #F5F5F5;
    border-radius: 100px;

    /* Inside auto layout */
    font-size: 14px;

    flex: none;
    order: 0;
    flex-grow: 0;
    cursor: pointer;
`
const StTeamMakeButton = styled.div`
    /* Frame 282 */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    padding: 18px 25px;
    gap: 10px;
    box-sizing: border-box;

    width: 309px;
    height: 53px;

    background: #F5F5F5;
    border-radius: 100px;
    font-size: 14px;

    /* Inside auto layout */

    flex: none;
    order: 1;
    flex-grow: 0;
    cursor: pointer;
`


export default TeamSelect;