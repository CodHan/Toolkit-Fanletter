import * as S from '../style/pagesStyle/Letter.style';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { __getLetters, addLetter } from '../../redux/modules/letters';
import Loding from './Loding';

function Letter({ selctName }) {
  const { isLoding, letters, error } = useSelector((state) => state.letters);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(__getLetters());
  }, []);
  if (isLoding) {
    return <Loding />;
  }
  if (error) {
    alert(error.message);
  }
  const filterdData = letters.filter((item) => item.writedTo === selctName);

  return (
    <>
      {filterdData.map((item) => {
        return (
          <S.BoxStyle key={item.id}>
            <div>
              {/*  cardbox굳이 써야하나 */}
              {/* 17번줄 안나옴 */}
              {item === null ? (
                <p>💪🏻빨리써라 덤벨들고 찾아 간다💪🏻</p>
              ) : (
                <S.Letter onClick={() => navigate(`/detail/${item.id}`)}>
                  <S.Writer>
                    <div>
                      <S.Img src={item.avatar} alt="유저이미지" />
                    </div>
                    <S.NameAndTime>
                      <div>{item.nickname}</div>
                      <div>{item.createdAt}</div>
                    </S.NameAndTime>
                  </S.Writer>
                  <S.BodyText>{item.content}</S.BodyText>
                </S.Letter>
              )}
            </div>
          </S.BoxStyle>
        );
      })}
    </>
  );
}

export default Letter;
