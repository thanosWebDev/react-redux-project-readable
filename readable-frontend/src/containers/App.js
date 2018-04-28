import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCategories, closeModal } from '../actions';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import '../css/App.css';
import Header from '../components/Header';
import PostList from './PostList';
import PostForm from '../components/PostForm';
import ViewPost from './ViewPost';
import Modal from 'react-modal';
import Error from '../components/Error';
import * as readableAPI from '../utils/readableAPI';

class App extends Component {

  // Get all gategories from server and update Store
  componentDidMount() {
    readableAPI.categories().then( data => this.props.getCategories(data))
  }

  componentWillMount() {
    Modal.setAppElement('body');
  }

  render() {
    const {open, role, editPostId, activeCategory} = this.props.modal;
    return (
      <Router>
        <div>
          <div className="app-container">   
            <Header categories={this.props.categories} /> 
            <Switch>
              <Route exact path="/" render={(props) => (
                <main>
                  <PostList
                    category={""}
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
              <Route component={Error} />
            </Switch>
          </div>
          {/* <footer>
            <p>React / Redux - Test project</p>
          </footer> */}
          <Modal
            className='modal'
            overlayClassName='overlay'
            isOpen={open}
            onRequestClose={this.props.closeModal}
            contentLabel='Post form'
          >
            <PostForm
              modalRole={role}
              editPostId={editPostId}
              activeCategory={activeCategory}
            />
          </Modal>
        </div>
      </Router>
    );
  }
}

function mapStateToProps ({categories, modal}) {
  return {categories, modal}
}

function mapDispatchToProps (dispatch) {
  return {
    getCategories: (data) => dispatch(getCategories(data)),
    closeModal: () => dispatch(closeModal())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);