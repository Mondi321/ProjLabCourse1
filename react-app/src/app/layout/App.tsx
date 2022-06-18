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

function App() {
  const location = useLocation();
  const {commonStore, userStore} = useStore();

  useEffect(() => {
    if (commonStore.token){
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    }else{
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore])
  
  if(!commonStore.appLoaded) return <LoadingComponent />

  return (
    <>
      <ToastContainer position='bottom-right' hideProgressBar/>
      <Switch>
        <Route 
          path="(/sign-in|/sign-up)"
          render={() => (
            <Forms/>
          )}  
        />
        <Route exact path='/' component={HomePage}/>
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
                <Route path='/errors' component={TestErrors}/>
                <Route path='/server-error' component={ServerError}/>
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
