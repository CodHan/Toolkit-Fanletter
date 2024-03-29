import { useEffect, useState } from 'react';
import * as S from '../style/pagesStyle/SignupPage.style';
import { useNavigate } from 'react-router-dom';
import { MainStyle } from '../style/pagesStyle/LoginPage.style';
import jwt from '../../axios/jwt';

function SignUpPage() {
  const [emailTxt, setEmailTxt] = useState('');
  const [selectEmail, setSelectEmail] = useState('naver.com');
  const [customEmail, setCustomEmail] = useState(false);
  const [email, setEmail] = useState('');
  const [nickName, setNickName] = useState('');
  const [pw, setPw] = useState('');
  const [pwCheck, setPwCheck] = useState('');

  const [emailValid, setEmailValid] = useState(false);
  const [nickNameValid, setNickNameValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [pwCheckValid, setPwCheckValid] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const navigate = useNavigate();

  const emailTextHandler = (e) => {
    setEmailTxt(e.target.value);
    if (e.target.value.length > 0) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  };

  const emailHandler = (e) => {
    const selctEmail = e.target.value;
    if (selctEmail === '직접입력') {
      setCustomEmail(true);
    } else {
      setSelectEmail(selctEmail);
    }
  };

  const nickNameHandler = (e) => {
    setNickName(e.target.value);
    if (e.target.value.length > 1) {
      setNickNameValid(true);
    } else {
      setNickNameValid(false);
    }
  };

  const pwChangeHandler = (e) => {
    setPw(e.target.value);
    const regex =
      /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
    if (regex.test(e.target.value)) {
      setPwValid(true);
    } else {
      setPwValid(false);
    }
  };

  const pwCheckHandler = (e) => {
    setPwCheck(e.target.value);
  };
  useEffect(() => {
    if (pw === pwCheck) {
      setPwCheckValid(true);
    } else {
      setPwCheckValid(false);
    }
  }, [pw, pwCheck]);
  useEffect(() => {
    if (emailValid && nickNameValid && pwValid && pwCheckValid) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [emailValid, nickNameValid, pwValid, pwCheckValid]);

  const subBtn = async (e) => {
    e.preventDefault();
    const postUser = async () => {
      try {
        await jwt
          .post('/register', {
            id: email,
            password: pw,
            nickname: nickName,
          })
          .then((response) => {
            console.log(response);
            navigate('/');
          });
      } catch (error) {
        console.error('에러가 발생하였습니다.', error);
      }
    };
    postUser();
  };

  useEffect(() => {
    setEmail(`${emailTxt}@${selectEmail}`);
  }, [emailTxt, selectEmail]);

  return (
    <>
      <MainStyle>
        <S.Section>
          <S.Parents>
            <S.Title>JOIN</S.Title>
            <S.Form>
              <S.BorderTop>
                <S.EmailForm>
                  <S.EmailLabel>E-mail</S.EmailLabel>
                  <S.EmailInput
                    value={emailTxt}
                    onChange={emailTextHandler}
                    type="text"
                  />
                  @
                  {!customEmail ? (
                    <S.EmailSelect name="domain" onChange={emailHandler}>
                      <option value={'naver.com'}>naver.com</option>
                      <option value={'gmail.com'}>gmail.com</option>
                      <option value={'daum.net'}>daum.net</option>
                      <option value={'nate.com'}>nate.com</option>
                      <option value={'직접입력'}>직접입력</option>
                    </S.EmailSelect>
                  ) : (
                    <S.CustomInput onChange={(e) => setEmail(e.target.value)} />
                  )}
                </S.EmailForm>
                {!emailValid && (
                  <S.ValidationJoin>*이메일을 입력해주세요.</S.ValidationJoin>
                )}
              </S.BorderTop>
              <S.UserBorder>
                <S.Block>
                  <S.StyleP>
                    <S.Label>닉네임</S.Label>
                    <S.LabelInput
                      type="text"
                      value={nickName}
                      onChange={nickNameHandler}
                    />
                  </S.StyleP>
                  {!nickNameValid && (
                    <S.ValidationJoin>
                      *두 글자 이상 입력해주세요.
                    </S.ValidationJoin>
                  )}
                </S.Block>
              </S.UserBorder>
              <S.BorderBottom>
                <S.Block>
                  <S.StyleP>
                    <S.Label>비밀번호</S.Label>
                    <S.LabelInput
                      type="password"
                      value={pw}
                      onChange={pwChangeHandler}
                    />
                  </S.StyleP>
                  {!pwValid && (
                    <S.ValidationJoin>
                      *영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.
                    </S.ValidationJoin>
                  )}
                  <S.StyleP>
                    <S.Label>비밀번호 확인</S.Label>
                    <S.LabelInput
                      type="password"
                      value={pwCheck}
                      onChange={pwCheckHandler}
                    />
                  </S.StyleP>
                  {!pwCheckValid && (
                    <S.ValidationJoin>
                      *비밀번호를 확인해주세요.
                    </S.ValidationJoin>
                  )}
                </S.Block>
              </S.BorderBottom>
              <S.JoinBtn disabled={disabled} onClick={subBtn}>
                회원가입
              </S.JoinBtn>
            </S.Form>
          </S.Parents>
        </S.Section>
      </MainStyle>
    </>
  );
}

export default SignUpPage;
