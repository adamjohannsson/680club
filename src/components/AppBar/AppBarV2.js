import logoMonoBlackSvg from "../../assets/borderpass/logo-mono-black.svg";
import { getAuth, signOut } from "firebase/auth";

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
  return (
    <>
      <div className='flex justify-between background-grayscale-0 padding-sm'>
        <div className='pointer' style={{ width: '174px', overflow: 'hidden' }}><img src={logoMonoBlackSvg} width={512} alt='back' onClick={() => window.location.href = '/dashboard'} /></div>
        <div className='flex column center gap-sm' style={{ width: '36px' }} onClick={logoutUser}>
          <div style={{ width: '100%', height: '3px', backgroundColor: '#000000' }}></div>
          <div style={{ width: '100%', height: '3px', backgroundColor: '#000000' }}></div>
          <div style={{ width: '100%', height: '3px', backgroundColor: '#000000' }}></div>
        </div>
      </div>

      <div className='line'></div>
    </>
  )
};

export default AppBarV2;
