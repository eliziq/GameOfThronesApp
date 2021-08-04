import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';
import {CharacterPage, BookPage, HousePage, BookItem} from '../pages';
import gotService from '../../services/gotService';
import {BrowserRouter as Router, Route} from 'react-router-dom';

export default class App extends Component {

    gotService = new gotService();

    constructor(props) {
        super(props);
        this.state = {
            visibleRCh: true,
            error: false
        }
    };

    componentDidCatch() {
        console.log('error');
        this.setState({
            error: true
        })
    }
    
    onToggleVisible = () => {
       this.setState({
            visibleRCh: !this.state.visibleRCh
       })
    };

    render() {
        const contentRCh = this.state.visibleRCh ? <RandomChar/> : null;

        if(this.state.error) {
            return <ErrorMessage/>
        }
    return (
        <Router>
            <div className='app'> 
                <Container>
                    <Header />
                </Container>
                <Container>
                    <Row>
                        <Col lg={{size: 5, offset: 0}}>
                            {contentRCh}
                            <p>
                                <button
                                    className='btn btn-toggle'
                                    onClick={this.onToggleVisible}>Toggle</button>
                            </p>
                        </Col>
                    </Row>

                    <Route path='/characters' component={CharacterPage}/>
                    <Route path='/houses' component={HousePage}/>
                    <Route path='/books' exact component={BookPage}/>
                    <Route path='/books/:id' render={
                        ({match}) => {
                            const {id} = match.params;

                        return <BookItem bookId={id}/>
                        }
                    }/>
                    
                </Container>
            </div>
        </Router>
        );
    }
};
