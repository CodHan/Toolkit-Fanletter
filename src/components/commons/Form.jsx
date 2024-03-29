import React, { useEffect, useState } from 'react';
import * as S from '../style/commonsStyle/Form.style';
import { useDispatch, useSelector } from 'react-redux';
import { __addLetter } from '../../redux/modules/letters';
import { __getUser } from '../../redux/modules/authSlice';
import { useNavigate } from 'react-router-dom';
import Loding from './Loding';

function Form() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [member, setMember] = useState('김강민');
  const { user, isLoding, error } = useSelector((state) => state.authSlice);
  //새로고침, error대응
  useEffect(() => {
    dispatch(__getUser());
  }, [dispatch]);
  if (isLoding) {
    <Loding />;
  }
  if (error) {
    alert(error.response.data.message);
    navigate('/');
    localStorage.removeItem('token');
  }

  const contentValue = (e) => {
    setContent(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (!content) {
      alert('내용을 입력해주세요');
    } else {
      const date = new Date();
      const newLetter = {
        email: user.id,
        nickname: user.nickname,
        createdAt: date.toLocaleString(),
        avatar: user.avatar
          ? user.avatar
          : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0-wIQzJerlC3TiH7jCDnO_iJa58qLPCCl5GsYWNdQHu7AGJhxM1vYT6cpbQ&s',
        content: content,
        writedTo: member,
      };
      dispatch(__addLetter(newLetter));
      setContent('');
    }
  };
  const selectMember = (e) => {
    setMember(e.target.value);
  };

  return (
    <>
      <S.FormParent onSubmit={onSubmit}>
        <S.Formdiv>닉네임:{user.nickname}</S.Formdiv>
        <S.Formdiv>
          내용 :
          <S.ContentInputStyle
            value={content}
            type="text"
            placeholder="최대 100글자까지 작성할 수 있습니다."
            onChange={contentValue}
          />
        </S.Formdiv>
        <S.Formdiv>
          <label>누구에게 보낼까요</label>
          <select onChange={selectMember}>
            <option value={'김강민'}>김강민</option>
            <option value={'김건우'}>김건우</option>
            <option value={'박재훈'}>박재훈</option>
            <option value={'장성엽'}>장성엽</option>
          </select>
        </S.Formdiv>
        <S.FormStyledButton type="submit">팬레터 등록</S.FormStyledButton>
      </S.FormParent>
    </>
  );
}

export default Form;
