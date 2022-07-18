import React, { useEffect, useState, useRef, useReducer } from "react";
import styled from "styled-components";
import { useMutation } from "react-query";
import apis from "../api/main";
import { removeCookie, getCookie, setCookie } from '../Cookie';
import { useNavigate } from 'react-router'
import ImageModal from "../components/MypageModal/ImageModal";
import NickNameModal from "../components/MypageModal/NickNameModal";
import PasswordModal from "../components/MypageModal/PasswordModal";
import DefaultImg from "../img/DefaultImg.jpg"
import jwt_decode from "jwt-decode";
import Header from "../components/Header"

const Mypage = () => {

    // 토큰에서 가져와서 해석하고 userid 가져오기
    const ontoken = jwt_decode(getCookie('token'));
    // console.log(ontoken)
    const usersid = ontoken.userId
    const useremail = ontoken.USER_NAME
    const usernn = ontoken.USER_NICKNAME
    // 토큰에서 이미지 가져오기
    const usersimg = ontoken.USER_IMAGE



    const navigate = useNavigate();
    const [files, setFiles] = useState("");
    // 이미지 미리보기 값 state로박기 
    const [loadimg, setLoadimg] = useState(null);
    const [password, setPassword] = useState("");

    // 모달 열닫 보관
    const [imgmodalopen, setImgmodalopen] = useState(false);
    const [nicknamemodalopen, setNicknamemodalopen] = useState(false);
    const [passwordmodalopen, setPasswordmodalopen] = useState(false);

    //모달 열
    const ImgModalOpen = () => {
        setImgmodalopen(true);
    }

    const NicknameModalOpen = () => {
        setNicknamemodalopen(true);
    }

    const PasswordModalOpen = () => {
        setPasswordmodalopen(true);
    }

    //모달 닫
    const ImgModalCancel = () => {
        setImgmodalopen(false);
    }

    const NicknameModalCancel = () => {
        setNicknamemodalopen(false);
    }

    const PasswordModalCancel = () => {
        setPasswordmodalopen(false);
    }

    // 비밀번호 정규식
    const passwordlock = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{3,16}$/;
    const pwlock = (pw) => {
        return passwordlock.test(pw)
    }

    // 비밀번호모달이동 비활성화 버튼 false일때 활성화
    const DisableFunction = () => {
        if (Boolean(password) === false)
            return true;
        else if (pwlock(password) === false)
            return true;
        else return false;
    }



    // 이미지 등록
    // 이미지넣기  onchange={(e)=>setfiles(e.target.files)}와 같지만 콘솔찍기위해 
    const onLoadFile = (e) => {
        const file = e.target.files[0]
        console.log(file);
        setFiles(file) // state가 렌더링되지않기때문에 이함수중간에서 렌더링된다면 고칠수있는데 사실상 불가능해보인다
        // 미리보기 부분 > 파일이미지를 url변경후 state에 저장
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file)
        fileReader.onload = (e) => setLoadimg(e.target.result)
        // 이미지 업로드 비동기 문제발생
    }


    const exfunction = () => {
        picturePostFunction()
        ImgModalCancel()
    }



    // formdata 안에 넣기
    const formData = new FormData();
    formData.append('profileImage', files)
    // 사진 값보기
    // for (let key of formData.keys()) {
    //     console.log(key);
    // }
    // for (let value of formData.values()) {
    //     console.log(value);
    // }

    // 이미지 전송
    // FormData() 새로운 FormData 객체를 생성
    // formdata.append(key,value) 새로운 값을 추가해준다
    // 키값이 있으면 해당 키값으로 데이터만 넣어줌
    // formdata는 key랑 value 값을 확인할 수가 없다 > formdata넣는값은 확인가능
    const picturePost = (data) => {
        console.log(data)
        console.log(data.profileImage) // data.profileImage = formdata
        const formdataimg = apis.postPicturePost(data);
        console.log(formdataimg)
        return formdataimg;
    }

    // 토큰 삭제 재생성 받기
    // const tokenreceive = () => {
    // removeCookie('token')
    // setCookie("token", formdataimg.headers.authorization);
    // jwt_decode(formdataimg.headers.authorization);
    // }

    // 이미지 업로드
    const { mutate: pictureGo } = useMutation(picturePost, {
        onSuccess: () => {
            alert("이미지 업로드에 성공하셨니다")
        },
        onError: (error) => {
            alert("이미지 업로드에 실패하셨습니다")
        }
    })

    // 이미지 버튼
    const picturePostFunction = () => {
        pictureGo({
            profileImage: formData,
            userid: usersid,
        })
    }



    // 기본 이미지 전송
    const [nomalimg, setNomaling] = useState(null);

    const defaultFile = () => {
        setNomaling(DefaultImg);
        // 이미지 업로드
        defaultPostFunction()
        ImgModalCancel()
    }

    // 기본 이미지 전송
    const defaultPost = async (data) => {
        // const formData = new FormData();
        // formData.append('profileImage', data.profileImage)
        // console.log(data)
        // console.log(data.profileImage)
        // for (var value of formData.values()) {
        //     console.log(value);
        // }
        const fromdatadefault = await apis.postPicturePost(data);
        return fromdatadefault;
    }

    // 기본 이미지 업로드
    const { mutate: defaultGo } = useMutation(defaultPost, {
        onSuccess: () => {
            alert("이미지 업로드에 성공하셨니다")
        },
        onError: (error) => {
            alert("이미지 업로드에 실패하셨습니다")
        }
    })

    // 기본 이미지 버튼
    const defaultPostFunction = () => {
        defaultGo({
            profileImage: DefaultImg,
        })
    }



    // 비밀번호 변경모달로 이동
    const passwordPost = (data) => {
        console.log(data)
        return apis.postPasswordChange(data)
            .then((response) => {
                // response.data
                console.log(response.data);
                alert("비밀번호가 일치합니다")
                PasswordModalOpen();
            })
            .catch(error => {
                console.log(error)
                alert("비밀번호를 틀리셨습니다")
            })
    }

    const { mutate: passwordGo } = useMutation(passwordPost, {
        onSuccess: () => {
            // alert("비밀번호가 일치합니다")
        },
        onError: (error) => {
            // alert("비밀번호를 틀리셨습니다")
        }
    })
    const posswordPostFunction = () => {
        passwordGo({
            password: password,
        })
    }

    // useEffect(() => {
    //     if (Boolean(files) === true)
    //         picturePostFunction()
    //     ImgModalCancel()
    // });

    // 로그아웃
    const UserLogout = () => {
        removeCookie('token')
        navigate('/')
    }

    // 홈으로
    const gohome = () => navigate('/');

    return (
        <StWrap>
            <Header />
            <ImageModal
                open={imgmodalopen}
                select={onLoadFile}
                close={ImgModalCancel}
                save={exfunction}
            />
            <NickNameModal
                open={nicknamemodalopen}
                close={NicknameModalCancel}
            />
            <PasswordModal
                open={passwordmodalopen}
                close={PasswordModalCancel}
            />
            <StBigBox>
                <Stmybox>
                    <StTextBox>
                        <StMyTitle>
                            마이페이지
                        </StMyTitle>
                        <Sttext>
                            팀 관련 정보를 관리 및 수정할 수 있습니다.
                        </Sttext>
                    </StTextBox>
                </Stmybox>
                <StProfileBox>
                    <StprofileText>프로필</StprofileText>
                    <StprofileTextmini>프로필 이미지</StprofileTextmini>
                    <StProfile src={usersimg} />
                    <StImgChangeBtn onClick={ImgModalOpen}>
                        변경
                    </StImgChangeBtn>
                    {/* <StProfileInput type="file" accept='img/*'
                        onChange={onLoadFile}
                    >
                    </StProfileInput>
                    <StProfileBtn onClick={picturePostFunction}>
                        이미지 저장하기
                    </StProfileBtn> */}
                    <StprofileTextmini>
                        닉네임
                    </StprofileTextmini>
                    <StChangeBox>
                        <StChangeDiv>
                            <StEmailletter>
                                {usernn}
                            </StEmailletter>
                        </StChangeDiv>
                        <StChangeBtn onClick={NicknameModalOpen}>
                            변경
                        </StChangeBtn>
                    </StChangeBox>
                    <StStraightLine />
                    <StprofileText>개인정보</StprofileText>
                    <StprofileTextmini>
                        계정
                    </StprofileTextmini>
                    <StEmailDiv>
                        <StEmailletter>
                            {useremail}
                        </StEmailletter>
                    </StEmailDiv>
                    <StprofileTextmini>
                        비밀번호
                    </StprofileTextmini>
                    <StChangeBox>
                        <StChangeInput onChange={(e) => setPassword(e.target.value)}
                            placeholder="현재 비밀번호를 입력하세요"
                            type='password'
                        />
                        <StChangeBtn onClick={posswordPostFunction}
                            disabled={DisableFunction()}>
                            변경
                        </StChangeBtn>
                    </StChangeBox>
                    <StStraightLine />
                    <StLogoutTitle onClick={UserLogout}>
                        로그아웃
                    </StLogoutTitle>
                </StProfileBox>
            </StBigBox>
            <StBtnBox>
                <StCancelBtn onClick={gohome}>
                    취소
                </StCancelBtn>
                {/* <StConfirmBtn>
                        <p style={{ color: 'white' }}>변경</p>
                    </StConfirmBtn> */}
            </StBtnBox>
        </StWrap >
    );
}

const StStraightLine = styled.div`
  background-color: #D9D9D9;
  width : 100%;
  height : 1px;
  margin-bottom: 37.25px;
`;

const StLogoutTitle = styled.div`
                font-weight: 400;
                font-size: 16px;
                cursor: pointer;
`
const StEmailletter = styled.div`
display: flex;
align-items: center;
height: 49px;
font-weight: 500;
font-size: 16px;
line-height: 19px;
`

const StEmailDiv = styled.div`
                width: 526px;
                height: 49px;
                border: 1px solid #000000;
                border-radius: 6px;
                // placeholder 앞간격
                padding-left: 10px;
                `


const StWrap = styled.div`
                display: flex;
                justify-content: center;
                flex-direction: column;
                align-items: center;
                width : 100vw;
                height : 100%;
                `

const StBigBox = styled.div`
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                width: 850px;
                height: 1000px;
                `

const Stmybox = styled.div`
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                padding: 30px 0px 30px 30px;
                width : 820px;
                height : 84px;
                background: #EAEAEA;
                border-radius: 16px;
                margin-top: 48px;
                `

const StTextBox = styled.div`
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                padding: 0px;
                gap: 30px;
                width: 284px;
                height: 84px;
                `

const StMyTitle = styled.div`
                text-align: center;
                font-size: 24px;
                font-weight: 600;
                width: 121px;
                height: 29px;
                `

const Sttext = styled.div`
                justify-content: center;
                width: 280px;
                height: 17px;
                font-family: 'Inter';
                font-weight: 500;
                font-size: 14px;
                line-height: 17px;
                `

const StProfileBox = styled.div`
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                width: 573px;
                height: 769px;
                margin-top: 60px;
                `

const StProfile = styled.img`
                width: 117px;
                height: 117px;
                border-radius: 100px;
                background: #E5E7EB;
                `
const StProfileInput = styled.input`
                display: flex;
                justify-content: center;
                width: 120px;
                height: 25px;
                background: #FFFFFF;
                border: 1px solid #000000;
                border-radius: 5px;
                margin-top: 5px;
                cursor: pointer;
                `


const StProfileBtn = styled.button`
                display: flex;
                justify-content: center;
                width: 120px;
                height: 25px;
                background: #FFFFFF;
                border: 1px solid #000000;
                border-radius: 5px;
                margin-top: 5px;
                cursor: pointer;
                `

const StBtnBox = styled.div`
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: flex-start;
                width: 418px;
                height: 54px;
                margin-top: 0px;
                `

const StCancelBtn = styled.button`
                display: flex;
                justify-content: center;
                align-items: center;
                width: 200px;
                height: 54px;
                border: 1px solid #000000;
                border-radius: 6px;
                background-color: white;
                cursor: pointer;
                `

const StCanceltitle = styled.div`
                width: 37px;
                height: 24px;
                font-weight: 700;
                font-size: 20px;
                line-height: 24px;
                text-align: center;
                color: #000000;
                `

const StConfirmBtn = styled.button`
                display: flex;
                justify-content: center;
                align-items: center;
                width: 200px;
                height: 54px;
                border: 1px solid #000000;
                border-radius: 6px;
                background-color: black;
                cursor: pointer;
                `

const StConfrimtitle = styled.div`
                width: 37px;
                height: 24px;
                font-weight: 700;
                font-size: 20px;
                color: #ffffff;
                `

const StChangeBox = styled.div`
                display: flex;
                flex-direction: row;
                align-items: flex-start;
                width: 541px;
                height: 89.75px;
                `

const StChangeInput = styled.input`
width: 400px;
height: 49px;
border: 1px solid #000000;
border-radius: 6px;
// placeholder 앞간격
padding-left: 10px;
`

const StChangeDiv = styled.div`
                width: 400px;
                height: 49px;
                border: 1px solid #000000;
                border-radius: 6px;
                // placeholder 앞간격
                padding-left: 10px;
                `

const StImgChangeBtn = styled.button`
                width : 132px;
                height : 54px;
                background-color: black;
                color : white;
                border-radius: 6px;
                margin-top: 12px;
                cursor: pointer;
                `

const StChangeBtn = styled.button`
                width : 132px;
                height : 54px;
                margin : 0 0 0 9px;
                background-color: black;
                color : white;
                border-radius: 6px;
                cursor: pointer;
                `

const StprofileText = styled.div`
                font-weight: 700;
                font-size: 16px;
                `

const StprofileTextmini = styled.div`
                font-weight: 500;
                font-size: 14px;
                margin-top: 16px;
                margin-bottom: 12px;
                `

export default Mypage;