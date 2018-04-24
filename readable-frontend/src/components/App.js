import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCategories } from '../actions';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import '../css/App.css';
import Header from './Header';
import PostListContainer from './PostListContainer';
import PostForm from './PostForm';
import Modal from 'react-modal';
import Error from './Error';
import * as readableAPI from '../utils/readableAPI';

class App extends Component {

  state = {
    modalOpen: false,
    modalRole: "",
    editPostId: "",
    activeCategory: ""
  }

  // Get all gategories from server and update Store
  componentDidMount() {
    const {getCategories} = this.props;
    readableAPI.categories().then( data => getCategories(data))
  }

  componentWillMount() {
    Modal.setAppElement('body');
  }

  //Open and setup modal form
  openModal = (role, id, activeCategory) => {
    this.setState(() => ({modalOpen: true, modalRole: role, editPostId: id, activeCategory}));
  }
  //Close modal form and reset settings
  closeModal = () => {
    this.setState(() => ({modalOpen: false, modalRole: "", editPostId: "", activeCategory: ""}))
  }

  render() {
    const {modalOpen} = this.state;
    return (
      <Router>
        <div>
          <div className="app-container">   
            <Header categories={this.props.categories} /> 
            <Switch>
              <Route exact path="/" render={(props) => (
                <main>
                  <PostListContainer
                    openModal={this.openModal}
                    category={""}
                    key={props.location.key}
                  />
                </main> 
              )}/>
              <Route exact path="/:category" render={(props) => (
                <main>
                  <PostListContainer
                    openModal={this.openModal}
                    category={props.match.params.category}
                    key={props.location.key}
                  />
                </main>
              )}/>
              <Route exact path="/:category/:post_id" render={() => (
                <main>
                  <Error />
                </main>
              )}/>
              <Route component={Error} />
            </Switch>
          </div>
          <footer>
            <p>React / Redux - Test project</p>
          </footer>
          <Modal
            className='modal'
            overlayClassName='overlay'
            isOpen={modalOpen}
            onRequestClose={this.closeModal}
            contentLabel='Post form'
          >
            <PostForm
              close={this.closeModal}
              modalRole={this.state.modalRole}
              editPostId={this.state.editPostId}
              category={this.state.activeCategory}
            />
          </Modal>
        </div>
      </Router>
    );
  }
}

function mapStateToProps ({ posts, categories}) {
  return {categories}
}

function mapDispatchToProps (dispatch) {
  return {
    getCategories: (data) => dispatch(getCategories(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);