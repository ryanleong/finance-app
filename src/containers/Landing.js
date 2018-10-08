import React from 'react';
import { Link } from 'react-router-dom';
import { Jumbotron, Button, Container } from 'reactstrap';

import Navigation from '../components/Navigation';

const Home = () => (

    <React.Fragment>
        <Navigation />

        <Container>
            <Jumbotron>
                <h1 className="display-3">Fi-app</h1>
                <p className="lead">
                    {'A barebones finance app for those who don\'t require all the extra fluff.'}
                </p>
                <p className="lead">
                    <Button color="primary" tag={Link} to="/signup">Sign up</Button>
                    <Button color="primary" tag={Link} to="/signin">Sign in</Button>
                </p>
            </Jumbotron>
        </Container>

    </React.Fragment>

);


export default Home;
