import { markSwWaiting, markSwNotWaiting } from "./redux/actions";

function createConfig(dispatch) {
  return {
    onUpdate: () => dispatch(markSwWaiting()),
    onSuccess: () => dispatch(markSwNotWaiting())
  }
}

export default createConfig;