import api from "./core";


// 토큰에서 뽑아오기

const apis = {
    //팀 게시판
    postInviteTeam: (data) => api.post(`/api/teams/auth-code`, data), //초대받은 팀 찾기
    postTeamJoin: (data) => api.post(`/api/teams/join`, data), //팀 참여하기 
    postTeam: (data) => api.post(`/api/teams`, data), // 팀만들기
    getTeam: () => api.get(`/api/teams`), // 팀선택페이지

    //meeting room
    postMeetingroom: (data) => api.post(`api/chat/meetings/${data.meetingId}/rooms`, data),
    getTeamMain: ({ teamId }) => api.get(`/api/teams/${teamId}`), // 팀 메인 게시판
    patchTeamImage: (data) => api.patch(`/api/teams/${data.teamId}/teamImage`, data.teamImage), //팀 이미지 수정
    patchTeamNick: (data) => api.patch(`/api/teams/${data.teamId}`, data), // 팀 닉네임 수정
    patchMeetProfile: (data) => api.patch(`/api/meetings/${data.meetId}`, data), // 미팅 프로필 수정
    deleteMeet: (data) => api.delete(`/api/meetings/${data.meetingId}`), // 미팅 삭제
    postReserveMeet: (data) => api.post(`/api/teams/${data.teamId}/meetings`, data), // 미팅 예약 만들기
    postStartMeet: (data) => api.post(`/api/teams/${data.teamId}/meetings/now`, data), // 미팅바로 시작하기
    getMeetList: ({ teamId }) => api.get(`/api/teams/${teamId}/meetings`), // 미팅 목록 가져오기
    getMeetSpecific: ({ meetingId }) => api.get(`/api/meetings/${meetingId}`), // 특정 미팅 조회
    postMeetReserveIssue: (data) => api.post(`/api/meetings/${data.meetingId}/issues`, data), // 미팅 예약하기 안건등록
    postMeetStartIssue: (data) => api.post(`/api/meetings/${data.meetingId}/issues/now`, data), // 미팅 바로 시작하기 안건 등록
    patchStartMeetIssue: (data) => api.patch(`/api/meetings/${data.meetingId}/issues/${data.issueId}/now`, data), // 미팅 바로시작하기 안건 수정
    patchReserveMeetIssue: (data) => api.patch(`/api/meetings/${data.meetingId}/issues/${data.issueId}`, data), // 예약 안건 수정
    deleteStartMeetIssue: (data) => api.delete(`/api/meetings/${data.meetingId}/issues/${data.issueId}/now`), // 미팅 바로시작하기 안건 삭제
    deleteReserveMeetIssue: (data) => api.delete(`/api/meetings/${data.meetingId}/issues/${data.issueId}`), // 예약 안건 삭제
    deleteTeamLeave: (data) => api.delete(`/api/teams/${data.teamId}/${data.userId}/exit`), //팀 탈퇴
    deleteTeamMember: (data) => api.delete(`/api/teams/${data.teamId}/${data.userId}/ban`), //팀원 추방
    postMeetRoom: () => api.post(`/api/teams/${teamId}/meetings`), // 미팅룸 만들기
    getMeetDetail: ({ teamId, meetingId }) => api.get(`/api/teams/${teamId}/meetings/${meetingId}`), // 미팅룸 상세조회
    getIssueList: ({ meetID }) => api.get(`/api/meetings/${meetID}/issues`),
    getReserve: ({ teamId }) => api.get(`/api/teams/${teamId}/meetings/yet`),
    getOnAir: ({ teamId }) => api.get(`/api/teams/${teamId}/meetings/now`),
    getPassed: ({ teamId }) => api.get(`/api/teams/${teamId}/meetings/done`),
    postLeader:(data)=>api.post(`/api/teams/${data.teamId}/manager`,data),

    // 경계
    postLogin: (data) => api.post(`/api/users/login`, data), // 로그인
    postEmailCheck: (data) => api.post(`/api/users/emails`, data), // 이메일 인증
    postAuth: (data) => api.post(`/api/users/emails/code`, data), // 이메일 코드인증
    postPassword: (data) => api.post(`/api/users/signup`, data), // 아이디 패스워드 생성
    postNickCheck: (data) => api.post(`/api/users/nickname`, data), // 닉네임 중복체크
    patchNickSave: (data) => api.patch(`/api/users/nickname/${data.userid}`, data), // 닉네임 저장
    postEmailCode: (data) => api.post(`/api/users/pwsearch`, data), // 이메일 코드 전송(비밀번호 찾기)
    postPasswordCode: (data) => api.post(`/api/users/pwsearch/code`, data), // 비밀번호 코드
    patchPasswordChange: (data) => api.patch(`/api/users/passwordChange`, data), // 비밀번호 변경
    postPicturePost: (data) => api.post(`/api/users/signup/${data.userid}`, data.profileImage), // 이미지 쏘기
    postPasswordChange: (data) => api.post(`/api/users/passwordCheck`, data) // 비밀번호 변경모달로 이동 버튼
}

export default apis;