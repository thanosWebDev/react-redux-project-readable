import React, { Component } from 'react';
import { connect } from 'react-redux';
import { closeModal, fetchCategories } from '../actions';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import '../css/App.css';
import Header from '../components/Header';
import PostList from './PostList';
import PostForm from '../containers/PostForm';
import ViewPost from './ViewPost';
import Modal from 'react-modal';
import Page404 from '../components/Page404';

class App extends Component {

  // Get all gategories from server and update Store
  componentDidMount() {
    this.props.fetchCategories();
  }

  componentWillMount() {
    Modal.setAppElement('body');
  }

  render() {
    return (
      <Router>
        <div>
          <div className="app-container">   
            <Header categories={this.props.categories} /> 
            <Switch>
              <Route exact path="/" render={(props) => (
                <main>
                  <PostList
                    category={'all'}
                    key={props.location.key}
                  />
                </main> 
              )}/>
              <Route exact path="/:category" render={(props) => (
                <main>
                  <PostList
                    category={props.match.params.category}
                    key={props.location.key}
                  />
                </main>
              )}/>
              <Route exact path="/:category/:post_id" render={({match, history}) => (
                <main>
                  <ViewPost post_id={match.params.post_id}
                            {...history}
                  />
                </main>
              )}/>
              <Route component={Page404} />
            </Switch>
          </div>
          <Modal
            className='modal'
            overlayClassName='overlay'
            isOpen={this.props.modal.open}
            onRequestClose={this.props.closeModal}
            contentLabel='Post form'
          >
            <PostForm />
          </Modal>
        </div>
      </Router>
    );
  }
}

function mapStateToProps ({categories, modal}) {
  return {categories, modal}
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCategories: () => dispatch(fetchCategories()),
    closeModal: () => dispatch(closeModal())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);