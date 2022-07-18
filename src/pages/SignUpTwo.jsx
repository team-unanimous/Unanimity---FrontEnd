import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import apis from '../api/main'
import api from '../api/core'
import { useDispatch } from 'react-redux'
import { tossUserId } from '../redux/modules/user'



const SignUpTwo = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [warning, setWarning] = useState(false);
  const [warningmsg, setWarningmsg] = useState(false);
  const [codein, setCodein] = useState(false);



  // 이메일 정규식
  //  상우님const reg_email = /^[_a-z0-9-]+(.[_a-z0-9-]+)*@(?:\\w+\\.)+\\w+$/;
  const reg_email = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{1,8}$/i;
  const rockemail = (id) => {
    return reg_email.test(id)
  }



  // 페이지 이동 비활성화 함수
  const disableFunction = () => {
    if (rockemail(email) === false)
      return true;
    else if (codein === false)
      return true;
    else
      return false;
  }

  console.log()

  // 이메일 전송
  const emailPost = async (data) => {
    return await apis.postEmailCheck(data) // api > error 
      .then((response) => {
        console.log(response)
        setWarning(response.data)
        alert("이메일 생성에 성공했습니다")
        setCodein(true)
      })
      .catch((error) => {
        console.log(error)
        setWarningmsg(true)
        alert("이메일 생성에 실패했습니다")
      })
  }


  const { mutate: emailgo } = useMutation(emailPost, {
    onSuccess: () => {
      alert("성공")
    },
    onError: (error) => {
      console.log(error)
      alert("실패")
    },
  })

  const EmailFunction = () => {
    emailgo({
      username: email,
    })
  }


  // 코드 전송
  const codePost = async (data) => {
    console.log(data)
    const datas = await apis.postAuth(data);
    console.log(datas)
    return datas;
  }

  const { mutate: codego } = useMutation(codePost, {
    onSuccess: () => {
      dispatch(tossUserId({ email }))
      alert("코드 인증에 성공했습니다")
      navigate('/signupthree');
    },
    onError: (error) => {
      alert("코드 인증에 실패했습니다")
      navigate('/signuptwo');
    },
  })

  const CodeFunction = () => {
    codego
      ({
        code: code
      })
  }



  // 로그인으로 
  const Caencelbtn = () => {
    navigate('/login')
  }

  return (
    <StBox>
      <StContentBox>
        <StTitle>이메일을 입력해주세요</StTitle>
        <StInfo>
          <StEmailBox>
            <StEmailTitle>이메일</StEmailTitle>
            <StEmailInputBox>
              <StEmailInput onChange={(e) => setEmail(e.target.value)} placeholder='이메일 입력' />
              <StEmailButton onClick={EmailFunction}>
                코드 전송
              </StEmailButton>

            </StEmailInputBox>
            {/* {warning
              ? <StWarningTitle> 이메일 형식에 맞게 입력해주세요</StWarningTitle>
              : warningmsg
                ? <StWarningTitle> 이미 사용중인 이메일 입니다</StWarningTitle>
                : <StWarningTitle></StWarningTitle>
            } */}
            {<StWarningTitle>{warning}</StWarningTitle>}
          </StEmailBox>
          <StEmailBox>
            <StEmailTitle>회원가입 코드</StEmailTitle>
            <StEmailInputBox>
              <StlongEmailInput onChange={(e) => setCode(e.target.value)} placeholder='코드입력' />
            </StEmailInputBox>
            <StEmailWarnning>
            </StEmailWarnning>
          </StEmailBox>
        </StInfo>
        <StBtBox>
          <StNotAgree onClick={Caencelbtn}>
            취소
          </StNotAgree>
          <StAgree onClick={CodeFunction}
            disabled={disableFunction()}>
            다음
          </StAgree>
        </StBtBox>
      </StContentBox>
    </StBox>
  )
}

const StlongEmailInput = styled.input`
  width : 540px;
  height : 44px;
  border-radius: 6px;
  border: 1px solid #000000;
  // placeholder 앞간격
  padding-left: 10px;
`;

const StNotAgree = styled.button`
  width : 200px;
  height : 54px;
  background-color: white;
  font-weight: 700;
  font-size: 20px;
  color : black;
  border-radius: 0.375rem;
  border: 1px solid #000000;
  cursor: pointer;
`;

const StAgree = styled.button`
  width : 200px;
  height : 54px;
  background-color: black;
  font-weight: 700;
  font-size: 20px;
  color : white;
  border-radius: 0.375rem;
  border: 1px solid #000000;
  cursor: pointer;
  &:disabled{
  background-color: #cccccc;
  color: black;
}
`;

const StBtBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 418px;
  height: 54px;
  margin : 3.75rem 0 0 0;
`;

const StEmailWarnning = styled.div`
  height : 19px;
  font-weight: 500;
  font-size: 16px;
`;

const StEmailButton = styled.button`
  width : 132px;
  height : 49px;
  margin : 0 0 0 9px;
  background-color: black;
  color : white;
  border-radius: 6px;
`;

const StEmailInput = styled.input`
  width : 390px;
  height : 44px;
  border-radius: 6px;
  border: 1px solid #000000;
  // placeholder 앞간격
  padding-left: 10px;
`;

const StEmailInputBox = styled.div`
  display: flex;
  justify-content: column;
  align-items: center;
  width : 541px;
  height : 49px;
`;

const StEmailTitle = styled.div`
  width : 200px;
  height : 19px;
  font-weight: 700;
  font-size: 15px;
  margin-bottom: 12px;
`;

const StWarningTitle = styled.div`
  width : 400px;
  height : 19px;
  font-weight: 700;
  font-size: 15px;
  margin-top: 10px;
`

const StEmailBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width : 541px;
  height: 150px;
  margin : 0 0 0 0;
`;

const StInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width : 541px;
  height : 519px;
  margin : 3.75rem 0 0 0;
`;

const StTitle = styled.div`
  display: flex;
  justify-content: center;
  font-weight: 600;
  font-size: 46px;
`;

const StContentBox = styled.div`
  width : 541px;
  height : 480px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width : 100vw;
  height : 100vh;
`;

export default SignUpTwo