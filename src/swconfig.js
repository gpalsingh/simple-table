import { toast } from 'react-toastify';

import { markSwWaiting } from "./redux/actions";

const onSuccess = () => {
  toast.info('Ready to work offline', {
    position: "bottom-center",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
  });
}

function createConfig(dispatch) {
  return {
    onUpdate: () => dispatch(markSwWaiting()),
    onSuccess: () => onSuccess(),
  }
}

export default createConfig;