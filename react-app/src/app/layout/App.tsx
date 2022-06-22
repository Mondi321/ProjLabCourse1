import React, { useEffect } from 'react';
import NavBar from './NavBar';
import { Container } from 'react-bootstrap';
import UshqimiDashboard from '../../features/ushqimet/dashboard/UshqimiDashboard';
import { observer } from 'mobx-react-lite';
import { Route, Switch, useLocation } from 'react-router-dom';
import UshqimiForm from '../../features/ushqimet/form/UshqimiForm';
import UshqimiDetail from '../../features/ushqimet/details/UshqimiDetail';
import Forms from '../../features/users/Forms';
import HomePage from './HomePage';
import TestErrors from '../../features/errors/TestError';
import { ToastContainer } from 'react-toastify';
import NotFound from '../../features/errors/NotFound';
import ServerError from '../../features/errors/ServerError';
import ComponentOne from '../../features/home/ComponentOne';
import ComponentTwo from '../../features/menu/ComponentTwo';
import ContactForm from '../../features/contact/ContactForm';
import HomeNavbar from './HomeNavbar';
import ComponentThree from '../../features/about/ComponentThree';
import { useStore } from '../stores/store';
import LoadingComponent from './LoadingComponent';
import PijeDashboard from '../../features/pijet/dashboard/PijeDashboard';
import PijeDetail from '../../features/pijet/details/PijeDetail';
import PijeForm from '../../features/pijet/form/PijeForm';
import EmbelsiraDashboard from '../../features/embelsirat/dashboard/EmbelsiraDashboard';
import EmbelsiraDetail from '../../features/embelsirat/details/EmbelsiraDetail';
import EmbelsiraForm from '../../features/embelsirat/form/EmbelsiraForm';
import ContactDashboard from '../../features/contact/dashboard/ContactDashboard';
import ContactFormEdit from '../../features/contact/form/ContactFormEdit';
import ShtetiDashboard from '../../features/shtetet/dashboard/ShtetiDashboard';
import ShtetiForm from '../../features/shtetet/form/ShtetiForm';
import QytetiDashboard from '../../features/qytetet/dashboard/QytetiDashboard';
import QytetiForm from '../../features/qytetet/form/QytetiForm';
import GjiniaDashboard from '../../features/gjinite/dashboard/GjiniaDashboard';
import GjiniaForm from '../../features/gjinite/form/GjiniaForm';
import BankaDashboard from '../../features/bankat/dashboard/BankaDashboard';
import BankaForm from '../../features/bankat/form/BankaForm';


//protected route
function App() {
  const location = useLocation();
  const { commonStore, userStore } = useStore();

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore])

  if (!commonStore.appLoaded) return <LoadingComponent />

  return (
    <>
      <ToastContainer position='bottom-right' hideProgressBar />
      <Switch>
        <Route
          path="(/sign-in|/sign-up)"
          render={() => (
            <Forms />
          )}
        />
        <Route exact path='/' component={HomePage} />
        <Route
          path='/home' component={ComponentOne}
        />

        <Route
          path='/menu' component={ComponentTwo}
        />

        <Route
          path='/contact' render={() => (
            <>
              <HomeNavbar />
              <ContactForm />
            </>
          )}
        />

        <Route
          path='/about' component={ComponentThree}
        />

        <Route
          path={'/(ushqimet|createUshqimi|manage|errors|server-error)'}
          render={() => (
            <>
              <NavBar />
              <Container>
                <Route exact path='/ushqimet' component={UshqimiDashboard} />
                <Route path='/ushqimet/:id' component={UshqimiDetail} />
                <Route key={location.key} path={['/createUshqimi', '/manage/:id']} component={UshqimiForm} />
                <Route path='/errors' component={TestErrors} />
                <Route path='/server-error' component={ServerError} />
              </Container>
            </>
          )}
        />

        <Route
          path={'/(pijet|createPije|managePije)'}
          render={() => (
            <>
              <NavBar />
              <Container>
                <Route exact path='/pijet' component={PijeDashboard} />
                <Route path='/pijet/:id' component={PijeDetail} />
                <Route key={location.key} path={['/createPije', '/managePije/:id']} component={PijeForm} />
              </Container>
            </>
          )}
        />

        <Route
          path={'/(embelsirat|createEmbelsira|manageEmbelsira)'}
          render={() => (
            <>
              <NavBar />
              <Container>
                <Route exact path='/embelsirat' component={EmbelsiraDashboard} />
                <Route path='/embelsirat/:id' component={EmbelsiraDetail} />
                <Route key={location.key} path={['/createEmbelsira', '/manageEmbelsira/:id']} component={EmbelsiraForm} />
              </Container>
            </>
          )}
        />

        <Route
          path={'/(contacts|manageContact)'}
          render={() => (
            <>
              <NavBar />
              <Container>
                <Route exact path='/contacts' component={ContactDashboard} />
                <Route path='/manageContact/:id' component={ContactFormEdit} />
              </Container>
            </>
          )}
        />

        <Route
          path={'/(shtetet|manageShteti|createShteti)'}
          render={() => (
            <>
              <NavBar />
              <Container>
                <Route exact path='/shtetet' component={ShtetiDashboard} />
                <Route key={location.key} path={['/createShteti', '/manageShteti/:id']} component={ShtetiForm} />
              </Container>
            </>
          )}
        />

        <Route
          path={'/(qytetet|manageQyteti|createQyteti)'}
          render={() => (
            <>
              <NavBar />
              <Container>
                <Route exact path='/qytetet' component={QytetiDashboard} />
                <Route key={location.key} path={['/createQyteti', '/manageQyteti/:id']} component={QytetiForm} />
              </Container>
            </>
          )}
        />

        <Route
          path={'/(gjinite|manageGjinia|createGjinia)'}
          render={() => (
            <>
              <NavBar />
              <Container>
                <Route exact path='/gjinite' component={GjiniaDashboard} />
                <Route key={location.key} path={['/createGjinia', '/manageGjinia/:id']} component={GjiniaForm} />
              </Container>
            </>
          )}
        />

        <Route
          path={'/(bankat|manageBanka|createBanka)'}
          render={() => (
            <>
              <NavBar />
              <Container>
                <Route exact path='/bankat' component={BankaDashboard} />
                <Route key={location.key} path={['/createBanka', '/manageBanka/:id']} component={BankaForm} />
              </Container>
            </>
          )}
        />

        <Route component={NotFound} />
      </Switch>
    </>
  );
}

export default observer(App);
