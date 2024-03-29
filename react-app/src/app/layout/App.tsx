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
import StafiDashboard from '../../features/stafi/dashboard/StafiDashboard';
import StafiForm from '../../features/stafi/form/StafiForm';
import RezervimiDashboard from '../../features/rezervimet/dashboard/RezervimiDashboard';
import RezervimiForm from '../../features/rezervimet/form/RezervimiForm';
import Rezervimet from '../../features/rezervimet/Rezervimet';
import RezervimetInfo from '../../features/rezervimet/RezervimetInfo';
import EventiDashboard from '../../features/eventet/dashboard/EventiDashboard';
import EventiDetail from '../../features/eventet/details/EventiDetail';
import EventiForm from '../../features/eventet/form/EventiForm';
import ChangePhoto from '../../features/users/ChangePhoto';
import ReviewDashboard from '../../features/reviews/dashboard/ReviewDashboard';
import ReviewForm from '../../features/reviews/form/ReviewForm';
import Porosia from '../../features/porosite/Porosia';
import PrivateRoute from './PrivateRoute';
import Porosite from '../../features/porosite/Porosite';


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
          path='/rezervimiForm' component={Rezervimet}
        />
        <Route
          path='/reservations' component={RezervimetInfo}
        />

        <Route
          path='/changePhoto' component={ChangePhoto}
        />

        <Route
          path='/porosia' component={Porosia}
        />

        <Route
          path='/porosite' component={Porosite}
        />


        <Route
          path={'/(ushqimet|createUshqimi|manage|errors|server-error)'}
          render={() => (
            <>
              <NavBar />
              <Container>
                <PrivateRoute exact path='/ushqimet' component={UshqimiDashboard} />
                <PrivateRoute path='/ushqimet/:id' component={UshqimiDetail} />
                <PrivateRoute key={location.key} path={['/createUshqimi', '/manage/:id']} component={UshqimiForm} />
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
                <PrivateRoute exact path='/pijet' component={PijeDashboard} />
                <PrivateRoute path='/pijet/:id' component={PijeDetail} />
                <PrivateRoute key={location.key} path={['/createPije', '/managePije/:id']} component={PijeForm} />
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
                <PrivateRoute exact path='/embelsirat' component={EmbelsiraDashboard} />
                <PrivateRoute path='/embelsirat/:id' component={EmbelsiraDetail} />
                <PrivateRoute key={location.key} path={['/createEmbelsira', '/manageEmbelsira/:id']} component={EmbelsiraForm} />
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
                <PrivateRoute exact path='/contacts' component={ContactDashboard} />
                <PrivateRoute path='/manageContact/:id' component={ContactFormEdit} />
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
                <PrivateRoute exact path='/shtetet' component={ShtetiDashboard} />
                <PrivateRoute key={location.key} path={['/createShteti', '/manageShteti/:id']} component={ShtetiForm} />
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
                <PrivateRoute exact path='/qytetet' component={QytetiDashboard} />
                <PrivateRoute key={location.key} path={['/createQyteti', '/manageQyteti/:id']} component={QytetiForm} />
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
                <PrivateRoute exact path='/gjinite' component={GjiniaDashboard} />
                <PrivateRoute key={location.key} path={['/createGjinia', '/manageGjinia/:id']} component={GjiniaForm} />
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
                <PrivateRoute exact path='/bankat' component={BankaDashboard} />
                <PrivateRoute key={location.key} path={['/createBanka', '/manageBanka/:id']} component={BankaForm} />
              </Container>
            </>
          )}
        />

        <Route
          path={'/(stafi|manageStafi|createStafi)'}
          render={() => (
            <>
              <NavBar />
              <Container>
                <PrivateRoute exact path='/stafi' component={StafiDashboard} />
                <PrivateRoute key={location.key} path={['/createStafi', '/manageStafi/:id']} component={StafiForm} />
              </Container>
            </>
          )}
        />

        <Route
          path={'/(rezervimet|manageRezervimi|createRezervimi)'}
          render={() => (
            <>
              <NavBar />
              <Container>
                <PrivateRoute exact path='/rezervimet' component={RezervimiDashboard} />
                <PrivateRoute key={location.key} path={['/createRezervimi', '/manageRezervimi/:id']} component={RezervimiForm} />
              </Container>
            </>
          )}
        />

        <Route
          path={'/(eventet|createEventi|manageEventi)'}
          render={() => (
            <>
              <NavBar />
              <Container>
                <PrivateRoute exact path='/eventet' component={EventiDashboard} />
                <PrivateRoute path='/eventet/:id' component={EventiDetail} />
                <PrivateRoute key={location.key} path={['/createEventi', '/manageEventi/:id']} component={EventiForm} />
              </Container>
            </>
          )}
        />

        <Route
          path={'/(reviews|manageReview|createReview)'}
          render={() => (
            <>
              <NavBar />
              <Container>
                <PrivateRoute exact path='/reviews' component={ReviewDashboard} />
                <PrivateRoute key={location.key} path={['/createReview', '/manageReview/:id']} component={ReviewForm} />
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
