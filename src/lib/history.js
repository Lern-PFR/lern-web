import { createBrowserHistory } from 'history';
import { clearAlerts } from '../redux/actions/alerts';
import store from '../redux/store/configureStore';

const { dispatch } = store;

// Init applicationPathname
const history = createBrowserHistory();

history.listen(() => {
  dispatch(clearAlerts());
});

export default history;
