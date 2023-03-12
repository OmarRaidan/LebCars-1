import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { Container, Segment, Button, Divider } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';
import LoginForm from '../users/LoginForm';
import RegisterForm from '../users/RegisterForm';
import './homeStyle.css';

export default observer(function HomePage() {
    const { userStore, modalStore } = useStore();
    return (
        <div className="ui two column stackable grid container" style={{width:'100%'}}>
            <Segment className="column" style={{
                backgroundImage: `url("/assets/background_half.png")`,
                backgroundSize: "cover",
                height: "54.7em",
                marginBottom: "0"
            }} />
            <Segment className=' masthead column'>
                <Container text>
                    {userStore.isLoggedIn ? (
                        <>
                            <img className='ui medium image' src='/assets/logo.png' alt='logo' style={{ marginTop: "10em" }} />
                            <Button id="homeButton" as={Link} to='/rides' size='huge' style={{ marginTop: "4em", marginLeft: "2em" }}>
                                Check the Rides!
                            </Button>
                        </>
                    ) : (
                        <>
                            <img className='ui medium image' src='/assets/logo.png' alt='logo' style={{ marginTop: "10em" }} />
                            <button className="ui button medium" id="homeButton" 
                            onClick={() => modalStore.openModal(<LoginForm />)} style={{paddingLeft:"2.2em", paddingRight:"2.2em", marginTop:'2em'}}>
                                Login!
                            </button>
                            <button className="ui button medium" id="homeButton" 
                            onClick={() => modalStore.openModal(<RegisterForm />)} style={{ marginTop:"2em" }}>
                                Register!
                            </button>
                            <Divider horizontal>Or</Divider>
                            <Button
                                loading={userStore.fbLoading}
                                size='medium'
                                inverted
                                color='facebook'
                                content='Login with Facebook'
                                onClick={userStore.facebookLogin}>
                            </Button>
                        </>
                    )}
                </Container>
            </Segment>
        </div>
    )
})