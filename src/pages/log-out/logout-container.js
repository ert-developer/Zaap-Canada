import {useDispatch} from 'react-redux';
import {removeAsyncData} from '../../utils/asyncServices/asyncHelper';
import LogOut from './logout-screen';
import {logoutSuccess} from '../../redux/auth/action';

const LogoutContainer = ({navigation}) => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    removeAsyncData();
    dispatch(logoutSuccess());
  };
  return <LogOut navigation={navigation} handleLogout={handleLogout} />;
};

export default LogoutContainer;
