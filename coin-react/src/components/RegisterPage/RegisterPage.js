import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode.react';
import * as KlipAPI from '../../api/UseKlip';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { addUser } from '../../commons/firestore';

function RegisterPage() {
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: 'onChange' });
  let navigate = useNavigate();
  const [errorFromSubmit, setErrorFromSubmit] = useState('');
  const [loading, setLoading] = useState(false);
  let [searchParams, setSearchParams] = useSearchParams();

  const password = useRef();
  password.current = watch('password');
  console.log(watch('email'));
  const onSubmit = async (data) => {
    try {
      console.log('test', data);
      setLoading(true);

      if (data.uid) {
        // 이미 가입된 계정이 있는 경우
        const res = await addUser(
          data.uid,
          data.email,
          data.user_name,
          UserAddress
        );
        console.log('addUser finish', res);
      } else {
        const auth = getAuth();
        let createdUser = await createUserWithEmailAndPassword(
          auth,
          data.email,
          data.password
        );

        await addUser(
          createdUser.user.uid,
          data.email,
          data.user_name,
          UserAddress
        );
      }
      setLoading(false);

      navigate('/');
    } catch (error) {
      setErrorFromSubmit(error.message);
      setLoading(false);
      setTimeout(() => {
        setErrorFromSubmit('');
      }, 5000);
    }
  };

  const DEFAULT_QR_CODE = 'DEFAULT';
  const DEFAULT_ADDRESS = '0x00000000000000000000000000000';
  const [qrvalue, setQrvalue] = useState(DEFAULT_QR_CODE);
  const [UserAddress, setUserAddress] = useState(DEFAULT_ADDRESS);
  const [AddressCheck, setAddressCheck] = useState(false);

  const getUserAddress = () => {
    KlipAPI.getAddress(setQrvalue, async (address) => {
      setUserAddress(address);
      console.log(address);
    });
  };
  return (
    <div>
      <div className="register-form">
        <div className="register-head">Coin-Tube</div>
        <div className="baseline"></div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="regisInfo-box">
            <div className="acinput-container">
              <input
                type="email"
                name="email"
                className="text-field"
                placeholder="email"
                value={searchParams.get('email')}
                {...register('email', {
                  required: true,
                  pattern: /^\S+@\S+$/i,
                })}
              />
              {errors.email && errors.email.type === 'required' && (
                <p>This name field is required</p>
              )}
              {errors.email && errors.email.type === 'maxLength' && (
                <p>알맞는 이메일 형식이 아닙니다</p>
              )}

              <input
                type="text"
                name="user_name"
                className="text-field"
                placeholder="name"
                {...register('user_name', { required: true, maxLength: 10 })}
              />
              {errors.user_name && errors.user_name.type === 'required' && (
                <p>This name field is required</p>
              )}
              {errors.user_name && errors.user_name.type === 'maxLength' && (
                <p>Your input exceed maximum length</p>
              )}

              {searchParams.get('token') == null ? (
                <input
                  type="password"
                  name="password"
                  className="text-field"
                  placeholder="password"
                  {...register('password', { required: true, minLength: 6 })}
                />
              ) : null}

              {errors.password && errors.password.type === 'required' && (
                <p>This password field is required</p>
              )}
              {errors.password && errors.password.type === 'minLength' && (
                <p>Password must have at least 6 characters</p>
              )}

              {searchParams.get('token') == null ? (
                <input
                  type="password"
                  name="password_check"
                  className="text-field"
                  placeholder="password_check"
                  {...register('password_check', {
                    required: true,
                    validate: (value) => value === password.current,
                  })}
                />
              ) : null}
              {errors.password_check &&
                errors.password_check.type === 'required' && (
                  <p>This password confirm field is required</p>
                )}
              {errors.password_check &&
                errors.password_check.type === 'validate' && (
                  <p>The passwords do not match</p>
                )}

              <input
                type="hidden"
                name="uid"
                value={searchParams.get('uid')}
                {...register('uid')}
              />
              <input
                type="hidden"
                name="token"
                value={searchParams.get('token')}
                {...register('token')}
              />
            </div>
            <div className="qr-container">
              <QRCode value={qrvalue} size={150} style={{ margin: 'auto' }} />
              <div className="qr-check-container">
                {AddressCheck == true ? (
                  'Success'
                ) : (
                  <Button
                    variant="Success"
                    className="qr_button"
                    onClick={getUserAddress}
                  >
                    <div className="qr_load">QR_LOAD</div>
                  </Button>
                )}
              </div>
            </div>
          </div>
          <input type="submit" value="Signup" className="signup-btn" />
        </form>
        <div className="line"> info </div>
        <div className="links">
          {errorFromSubmit && <p>{errorFromSubmit}</p>}
          <a href="#">QR체크를 꼭 해주세요</a>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
