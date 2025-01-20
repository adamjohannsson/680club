import ButtonV2 from "../Form/ButtonV2";
import logoMonoBlackSvg from "../../assets/borderpass/logo-mono-black.svg";
import { useState } from "react";
import { auth } from "../../utils/firebase.init";
import { getAuth, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

const logoutUser = () => {
  const auth = getAuth();

  signOut(auth)
    .then(() => {})
    .catch((error) => {
      /** @TODO handle this */
      console.log({ error });
    });
};

const AppBarV2 = () => {
  const [authUser, isLoading] = useAuthState(auth);
  const [shouldShowMenu, setShouldShowMenu] = useState(false);

  return (
    <>
      <div className='flex justify-between background-grayscale-0 padding-sm'>
        <div className='pointer' style={{ width: '174px', overflow: 'hidden' }}><img src={logoMonoBlackSvg} width={512} alt='back' onClick={() => window.location.href = '/dashboard'} /></div>
        <div className='flex column center gap-sm' style={{ width: '36px' }} onClick={() => setShouldShowMenu(!shouldShowMenu)}>
          <div style={{ width: '100%', height: '3px', backgroundColor: '#000000' }}></div>
          <div style={{ width: '100%', height: '3px', backgroundColor: '#000000' }}></div>
          <div style={{ width: '100%', height: '3px', backgroundColor: '#000000' }}></div>
        </div>
      </div>

      <div className='line'></div>

      {shouldShowMenu && (
        <div className='flex column gap-md background-grayscale-0 padding-lg' style={{ position: 'absolute', top: 65, right: 0, width: '50%', boxShadow: '-2px 2px 6px rgba(70, 70, 70, 0.3)' }}>
          <div className='text center size-md'>{authUser.email}</div>

          <ButtonV2 onClick={logoutUser}>Logout</ButtonV2>
        </div>
      )}
    </>
  )
};

export default AppBarV2;
