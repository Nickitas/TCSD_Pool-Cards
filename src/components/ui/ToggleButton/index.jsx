import { useAdminStatus } from '../../../hooks/useAdminStatus'
import cls from './toggle_button.module.scss'

const ToggleButton = ({ children, start, cb }) => {
  const isAdmin = useAdminStatus();

  const handleToggleClick = () => {
    if (isAdmin) {
      localStorage.removeItem('access_token');
      location.reload();
    } else {
      cb(true);
    };
  }

  const toggle_button = (
    <div className={cls.toggle_wrapper}>
      <label className={cls.toggle} onClick={handleToggleClick}>
          <input type='checkbox' 
            checked={isAdmin}
            readOnly
          />
          <span className={cls.slider}></span>
      </label>
      <>{ children }</>
    </div>
  );

  return toggle_button;
};

export { ToggleButton };