import React from 'react';
import './Payment.scss';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
  const navigate = useNavigate();

  const gomain = () => {
    navigate('/');
  };

  return (
    <div className="paymentMain">
      <h1>페이지 미구현 입니다. 마지막 페이지입니다.</h1>
      <button type="button" onClick={gomain}>
        메인으로 돌아가기
      </button>
    </div>
  );
};

export default Payment;
