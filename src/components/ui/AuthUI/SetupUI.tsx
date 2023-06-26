import dynamic from 'next/dynamic';
import { useQuery } from 'react-query';
import { AnimatePresence } from 'framer-motion';
import React, { FC, useEffect, useState } from 'react';
import { AuthType } from './AuthType';
import { useAuth } from '../../../firebase/useAuth';
import { IsInformationHandler } from './IsInformationHandler';
import { IUserProfile } from '../../../mongodb/schema/Schema.UserProfile';
import { LoginPhoneAuthUIProps } from './Login/Login.PhoneAuthUI';
import { LoginEmailAuthUIProps } from './Login/Login.EmailAuthUI';
import { LoginOtherAccountAuthUIProps } from './Login/Login.OtherAccountAuthUI';
import { LoginOTPAuthUIProps } from './Login/Login.OTPAuthUI';
import { LoginPasswordAuthUIProps } from './Login/Login.PasswordAuthUI';
import { LoginForgotPasswordAuthUIProps } from './Login/Login.ForgotPasswordAuthUI';
import { RegisterNameAuthUIProps } from './Register/Register.NameAuthUI';
import { RegisterPhoneAuthUIProps } from './Register/Register.PhoneAuthUI';
import { RegisterOTPAuthUIProps } from './Register/Register.OTPAuthUI';
import { RegisterEmailAuthUIProps } from './Register/Register.EmailAuthUI';
import { RegisterPasswordAuthUIProps } from './Register/Register.PasswordAuthUI';
import { RegisterVerifyEmailAuthUIProps } from './Register/Register.VerifyEmailAuthUI';
import { RegisterProfilePictureAuthUIProps } from './Register/Register.ProfilePictureAuthUI';
import { RegisterBirthdayAuthUIProps } from './Register/Register.BirthdayAuthUI';
import { RegisterGenderAuthUIProps } from './Register/Register.GenderAuthUI';
import {
  getUserProfile,
  _userProfileEndURL as cacheKey,
} from '../../../mongodb/helper/Helper.UserProfile';
import AuthBodyContainer from '../../container/Auth/AuthBodyContainer';
import AuthContentContainer from '../../container/Auth/AuthContentContainer';

// Dynamic Imports
const LoginPhoneAuthUI = dynamic<LoginPhoneAuthUIProps>(() =>
  import('./Login/Login.PhoneAuthUI').then((x) => x.LoginPhoneAuthUI)
);

const LoginEmailAuthUI = dynamic<LoginEmailAuthUIProps>(() =>
  import('./Login/Login.EmailAuthUI').then((x) => x.LoginEmailAuthUI)
);

const LoginOtherAccountAuthUI = dynamic<LoginOtherAccountAuthUIProps>(() =>
  import('./Login/Login.OtherAccountAuthUI').then(
    (x) => x.LoginOtherAccountAuthUI
  )
);

const LoginOTPAuthUI = dynamic<LoginOTPAuthUIProps>(() =>
  import('./Login/Login.OTPAuthUI').then((x) => x.LoginOTPAuthUI)
);

const LoginPasswordAuthUI = dynamic<LoginPasswordAuthUIProps>(() =>
  import('./Login/Login.PasswordAuthUI').then((x) => x.LoginPasswordAuthUI)
);

const LoginForgotPasswordAuthUI = dynamic<LoginForgotPasswordAuthUIProps>(() =>
  import('./Login/Login.ForgotPasswordAuthUI').then(
    (x) => x.LoginForgotPasswordAuthUI
  )
);

const RegisterNameAuthUI = dynamic<RegisterNameAuthUIProps>(() =>
  import('./Register/Register.NameAuthUI').then((x) => x.RegisterNameAuthUI)
);

const RegisterPhoneAuthUI = dynamic<RegisterPhoneAuthUIProps>(() =>
  import('./Register/Register.PhoneAuthUI').then((x) => x.RegisterPhoneAuthUI)
);

const RegisterOTPAuthUI = dynamic<RegisterOTPAuthUIProps>(() =>
  import('./Register/Register.OTPAuthUI').then((x) => x.RegisterOTPAuthUI)
);

const RegisterEmailAuthUI = dynamic<RegisterEmailAuthUIProps>(() =>
  import('./Register/Register.EmailAuthUI').then((x) => x.RegisterEmailAuthUI)
);

const RegisterPasswordAuthUI = dynamic<RegisterPasswordAuthUIProps>(() =>
  import('./Register/Register.PasswordAuthUI').then(
    (x) => x.RegisterPasswordAuthUI
  )
);

const RegisterVerifyEmailAuthUI = dynamic<RegisterVerifyEmailAuthUIProps>(() =>
  import('./Register/Register.VerifyEmailAuthUI').then(
    (x) => x.RegisterVerifyEmailAuthUI
  )
);

const RegisterProfilePictureAuthUI = dynamic<RegisterProfilePictureAuthUIProps>(
  () =>
    import('./Register/Register.ProfilePictureAuthUI').then(
      (x) => x.RegisterProfilePictureAuthUI
    )
);

const RegisterBirthdayAuthUI = dynamic<RegisterBirthdayAuthUIProps>(() =>
  import('./Register/Register.BirthdayAuthUI').then(
    (x) => x.RegisterBirthdayAuthUI
  )
);

const RegisterGenderAuthUI = dynamic<RegisterGenderAuthUIProps>(() =>
  import('./Register/Register.GenderAuthUI').then((x) => x.RegisterGenderAuthUI)
);

interface IProps {}

/**
 * @author
 * @function @SetupUI
 **/

export const SetupUI: FC<IProps> = (props) => {
  const { FirebaseUser, FirebaseLoading } = useAuth();
  const [InitialSlide, setInitialSlide] = useState(0);
  const [SkipDialog, setSkipDialog] = useState(false);
  const [Finish, setFinish] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [InformationCheckLoading, setInformationCheckLoading] = useState(true);
  const [Toast, setToast] = useState(false);
  const [ToastSetting, setToastSetting] = useState({
    Title: '',
    Description: '',
    Type: '',
  });
  const [Screen, setScreen] = useState<AuthType>('register-profile-picture');

  const { isLoading, data } = useQuery([cacheKey, FirebaseUser?.uid], () =>
    getUserProfile(FirebaseUser?.uid)
  );
  const userProfile = data as IUserProfile;

  // Extra State
  const [FullName, setFullName] = useState('');
  const [EmailAddress, setEmailAddress] = useState('');
  const [PhoneNumber, setPhoneNumber] = useState('');
  const [DateOfBirth, setDateOfBirth] = useState('');
  const [Gender, setGender] = useState('');
  const [ResetCaptcha, setResetCaptcha] = useState(false);

  const SkipDialogClose = () => setSkipDialog(false);

  const VerifyEmailAddress = FirebaseUser?.emailVerified || false;

  const ShowToast = (
    title: string,
    desccription: string,
    type: string,
    show: boolean
  ) => {
    setToast(show);
    setToastSetting({
      Title: title,
      Description: desccription,
      Type: type,
    });
  };

  const handleIsInformationContent = (Screen: AuthType) => {
    setInitialSlide(0);
    setScreen(Screen);
    setLoading(false);
    setInformationCheckLoading(false);
  };

  const handleIsformationProps = {
    FirebaseUser: FirebaseUser,
    userProfile: userProfile,
    FirebaseLoading: FirebaseLoading,
    isuserProfileLoading: isLoading,
    handleIsInformationContent: handleIsInformationContent,
    setInitialSlide: setInitialSlide,
    setFinish: setFinish,
    setLoading: setLoading,
    setInformationCheckLoading: setInformationCheckLoading,
    ShowToast: ShowToast,
  };

  const IsInformation_IsNewUser = (data: IUserProfile) => {
    IsInformationHandler({
      AfterScreen: 'after-login',
      FirebaseUser: FirebaseUser,
      userProfile: data,
      FirebaseLoading: FirebaseLoading,
      isuserProfileLoading: isLoading,
      handleIsInformationContent: handleIsInformationContent,
      setInitialSlide: setInitialSlide,
      setFinish: setFinish,
      setLoading: setLoading,
      setInformationCheckLoading: setInformationCheckLoading,
      ShowToast: ShowToast,
    });
  };

  const IsInformation_AfterLogin = () => {
    IsInformationHandler({
      AfterScreen: 'after-login',
      ...handleIsformationProps,
    });
  };

  const IsInformation_AfterName = () => {
    IsInformationHandler({
      AfterScreen: 'after-name',
      ...handleIsformationProps,
    });
  };

  const IsInformation_AfterPhoneAndOTP = () => {
    IsInformationHandler({
      AfterScreen: 'after-phone',
      ...handleIsformationProps,
    });
  };

  const IsInformation_AfterEmailAndPassword = () => {
    IsInformationHandler({
      AfterScreen: 'after-email',
      ...handleIsformationProps,
    });
  };

  const IsInformation_AfterVerifyEmail = () => {
    IsInformationHandler({
      AfterScreen: 'after-verify-email',
      ...handleIsformationProps,
    });
  };

  const IsInformation_AfterProfilePhoto = () => {
    IsInformationHandler({
      AfterScreen: 'after-profile-picture',
      ...handleIsformationProps,
    });
  };

  const IsInformation_AfterBirthday = () => {
    IsInformationHandler({
      AfterScreen: 'after-date-of-birth',
      ...handleIsformationProps,
    });
  };

  useEffect(() => {
    if (!FirebaseLoading && !isLoading) {
      if (FirebaseUser) {
        IsInformation_AfterLogin();
      } else {
        handleIsInformationContent('login-phone');
      }
    }
  }, [FirebaseLoading, isLoading]); // eslint-disable-line react-hooks/exhaustive-deps

  // Class
  const BodyClassName = 'h-full md:h-[652px] ';
  const ContentClassName = 'h-[300px]';
  const ContainerClassName = 'h-[350px]';

  return (
    <AuthBodyContainer
      ClassName={BodyClassName}
      InitialSlide={InitialSlide}
      SkipDialogOpen={SkipDialog}
      SkipDialogClose={SkipDialogClose}
      Finish={Finish}
      InformationCheckLoading={InformationCheckLoading}
      Loading={Loading}
      AuthScreen={Screen}
      Toast={{
        Open: Toast,
        onClose: setToast,
        MessageTitle: ToastSetting.Title,
        MessageDescription: ToastSetting.Description,
        Type: ToastSetting.Type,
      }}
    >
      <AuthContentContainer ClassName={ContainerClassName} AuthScreen={Screen}>
        <AnimatePresence mode="wait" initial={true}>
          {Screen === 'login-phone' && (
            <LoginPhoneAuthUI
              ClassName={ContentClassName}
              PhoneNumber={PhoneNumber}
              setPhoneNumber={setPhoneNumber}
              ResetCaptcha={ResetCaptcha}
              setResetCaptcha={setResetCaptcha}
              Toast={Toast}
              Loading={Loading}
              setAuthScreen={setScreen}
              setLoading={setLoading}
              setToast={setToast}
              setToastSetting={setToastSetting}
            />
          )}
          {Screen === 'login-email' && (
            <LoginEmailAuthUI
              ClassName={ContentClassName}
              EmailAddress={EmailAddress}
              setEmailAddress={setEmailAddress}
              Toast={Toast}
              Loading={Loading}
              setAuthScreen={setScreen}
              setLoading={setLoading}
              setToast={setToast}
              setToastSetting={setToastSetting}
            />
          )}
          {Screen === 'login-others' && (
            <LoginOtherAccountAuthUI
              Toast={Toast}
              Loading={Loading}
              setAuthScreen={setScreen}
              setLoading={setLoading}
              setToast={setToast}
              setToastSetting={setToastSetting}
              IsInformation={IsInformation_IsNewUser}
            />
          )}
          {Screen === 'login-otp' && (
            <LoginOTPAuthUI
              ClassName={ContentClassName}
              PhoneNumber={PhoneNumber}
              Toast={Toast}
              Loading={Loading}
              setResetCaptcha={setResetCaptcha}
              setAuthScreen={setScreen}
              setLoading={setLoading}
              setToast={setToast}
              setToastSetting={setToastSetting}
              IsInformation={IsInformation_IsNewUser}
            />
          )}
          {Screen === 'login-password' && (
            <LoginPasswordAuthUI
              ClassName={ContentClassName}
              EmailAddress={EmailAddress}
              Toast={Toast}
              Loading={Loading}
              setAuthScreen={setScreen}
              setLoading={setLoading}
              setToast={setToast}
              setToastSetting={setToastSetting}
            />
          )}
          {Screen === 'login-forgot-password' && (
            <LoginForgotPasswordAuthUI
              ClassName={ContentClassName}
              EmailAddress={EmailAddress}
              Toast={Toast}
              Loading={Loading}
              setAuthScreen={setScreen}
              setLoading={setLoading}
              setToast={setToast}
              setToastSetting={setToastSetting}
            />
          )}
          {Screen === 'register-name' && (
            <RegisterNameAuthUI
              ClassName={ContentClassName}
              setSkipDialog={setSkipDialog}
              Toast={Toast}
              Loading={Loading}
              setAuthScreen={setScreen}
              setLoading={setLoading}
              setToast={setToast}
              setToastSetting={setToastSetting}
              FullName={FullName}
              setFullName={setFullName}
              IsInformationAfterName={IsInformation_AfterName}
            />
          )}
          {Screen === 'register-phone' && (
            <RegisterPhoneAuthUI
              ClassName={ContentClassName}
              PhoneNumber={PhoneNumber}
              setPhoneNumber={setPhoneNumber}
              ResetCaptcha={ResetCaptcha}
              setResetCaptcha={setResetCaptcha}
              setSkipDialog={setSkipDialog}
              Toast={Toast}
              Loading={Loading}
              setAuthScreen={setScreen}
              setLoading={setLoading}
              setToast={setToast}
              setToastSetting={setToastSetting}
              IsInformationBeforePhoneAndOTP={IsInformation_AfterLogin}
              IsInformationAfterPhoneAndOTP={IsInformation_AfterPhoneAndOTP}
            />
          )}
          {Screen === 'register-otp' && (
            <RegisterOTPAuthUI
              ClassName={ContentClassName}
              PhoneNumber={PhoneNumber}
              Toast={Toast}
              Loading={Loading}
              setResetCaptcha={setResetCaptcha}
              setAuthScreen={setScreen}
              setLoading={setLoading}
              setToast={setToast}
              setToastSetting={setToastSetting}
              IsInformationAfterPhoneAndOTP={IsInformation_AfterPhoneAndOTP}
            />
          )}
          {Screen === 'register-email' && (
            <RegisterEmailAuthUI
              ClassName={ContentClassName}
              setSkipDialog={setSkipDialog}
              EmailAddress={EmailAddress}
              setEmailAddress={setEmailAddress}
              Toast={Toast}
              Loading={Loading}
              setAuthScreen={setScreen}
              setLoading={setLoading}
              setToast={setToast}
              setToastSetting={setToastSetting}
              IsInformationBeforeEmailAndPassword={IsInformation_AfterLogin}
              IsInformationAfterEmailAndPassword={
                IsInformation_AfterEmailAndPassword
              }
            />
          )}
          {Screen === 'register-password' && (
            <RegisterPasswordAuthUI
              ClassName={ContentClassName}
              EmailAddress={EmailAddress}
              Toast={Toast}
              Loading={Loading}
              setAuthScreen={setScreen}
              setLoading={setLoading}
              setToast={setToast}
              setToastSetting={setToastSetting}
              IsInformationAfterEmailAndPassword={
                IsInformation_AfterEmailAndPassword
              }
            />
          )}
          {Screen === 'register-verify-email' && (
            <RegisterVerifyEmailAuthUI
              ClassName={ContentClassName}
              isEmailVerified={VerifyEmailAddress}
              Toast={Toast}
              Loading={Loading}
              setAuthScreen={setScreen}
              setLoading={setLoading}
              setToast={setToast}
              setToastSetting={setToastSetting}
              IsInformationBeforeVerifyEmail={IsInformation_AfterLogin}
              IsInformationAfterVerifyEmail={IsInformation_AfterVerifyEmail}
            />
          )}
          {Screen === 'register-profile-picture' && (
            <RegisterProfilePictureAuthUI
              ClassName={ContentClassName}
              setSkipDialog={setSkipDialog}
              Toast={Toast}
              setAuthScreen={setScreen}
              setToast={setToast}
              setToastSetting={setToastSetting}
              IsInformationBeforeProfilePhoto={IsInformation_AfterLogin}
              IsInformationAfterProfilePhoto={IsInformation_AfterProfilePhoto}
            />
          )}
          {Screen === 'register-date-of-birth' && (
            <RegisterBirthdayAuthUI
              ClassName={ContentClassName}
              setSkipDialog={setSkipDialog}
              Toast={Toast}
              setLoading={setLoading}
              setAuthScreen={setScreen}
              setToast={setToast}
              setToastSetting={setToastSetting}
              DateOfBirth={DateOfBirth}
              setDateOfBirth={setDateOfBirth}
              IsInformationBeforeBirthday={IsInformation_AfterLogin}
              IsInformationAfterBirthday={IsInformation_AfterBirthday}
            />
          )}
          {Screen === 'register-gender' && (
            <RegisterGenderAuthUI
              ClassName={ContentClassName}
              setSkipDialog={setSkipDialog}
              Toast={Toast}
              setFinish={setFinish}
              setLoading={setLoading}
              setAuthScreen={setScreen}
              setToast={setToast}
              setToastSetting={setToastSetting}
              Gender={Gender}
              setGender={setGender}
              IsInformationBeforeGender={IsInformation_AfterLogin}
            />
          )}
        </AnimatePresence>
      </AuthContentContainer>
    </AuthBodyContainer>
  );
};
