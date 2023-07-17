import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './App.css'
// import ListItem from './components/ListItem'

const categoriesList = [
  {id: 'ALL', displayText: 'All'},
  {id: 'STATIC', displayText: 'Static'},
  {id: 'RESPONSIVE', displayText: 'Responsive'},
  {id: 'DYNAMIC', displayText: 'Dynamic'},
  {id: 'REACT', displayText: 'React'},
]

class App extends Component {
  state = {
    activeTab: categoriesList[0].id,
    projectsData: [],
    dataStatus: 'initial',
  }

  componentDidMount() {
    this.getProjectsData()
  }

  selectOption = event => {
    this.setState({activeTab: event.target.value}, this.getProjectsData)
    const {activeTab} = this.state
    console.log(activeTab)
  }

  getProjectsData = async () => {
    this.setState({dataStatus: 'loading'})
    const {activeTab} = this.state
    console.log(activeTab)
    const url = `https://apis.ccbp.in/ps/projects?category=${activeTab}`
    const response = await fetch(url)
    if (response.ok === true) {
      const data = await response.json()

      const formattedData = data.projects.map(i => ({
        id: i.id,
        imageUrl: i.image_url,
        name: i.name,
      }))
      console.log(formattedData)
      this.setState(
        {projectsData: formattedData, dataStatus: 'success'},
        this.renderProjectsView,
      )
    } else {
      this.setState({dataStatus: 'failure'})
    }
  }

  retry = () => {
    this.getProjectsData()
  }

  renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button onClick={this.retry} type="button">
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader />
    </div>
  )

  renderProjectsView = () => {
    const {projectsData} = this.state

    return (
      <ul>
        {projectsData.map(k => (
          <li key={k.id}>
            <div>
              <img src={k.imageUrl} alt={k.name} />
              <p>{k.name}</p>
            </div>
          </li>
        ))}
      </ul>
    )
  }

  renderProjects = () => {
    const {dataStatus} = this.state
    switch (dataStatus) {
      case 'success':
        return this.renderProjectsView()
      case 'failure':
        return this.renderFailureView()
      case 'loading':
        return this.renderLoadingView()

      default:
        return null
    }
  }

  render() {
    // const {} = this.state

    return (
      <div>
        <header>
          <img
            src="https://assets.ccbp.in/frontend/react-js/projects-showcase/website-logo-img.png"
            alt="website logo"
          />
        </header>
        <select onChange={this.selectOption}>
          {categoriesList.map(i => (
            <option value={i.id} key={i.id}>
              {i.displayText}
            </option>
          ))}
        </select>
        {this.renderProjects()}
      </div>
    )
  }
}

export default App
