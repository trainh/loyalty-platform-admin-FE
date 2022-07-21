import { loginWithGoogle } from 'src/fire/fireBaseConfi';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
// material
import { Stack, Button } from '@mui/material';
// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

export default function AuthSocial() {
//   const signInWithGoogle = () => {
//     const provider = new GoogleAuthProvider();
//     signInWithPopup(authentica, provider)
//       .then((re) => {
//         console.log(re);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
   

  return (
    <>
      <Stack direction="row" spacing={2}>
        <Button onClick={loginWithGoogle} fullWidth size="large" color="inherit" variant="outlined">
          <Iconify icon="eva:google-fill" color="#DF3E30" width={22} height={22} />
        </Button>
      </Stack>
    </>
  );
}
