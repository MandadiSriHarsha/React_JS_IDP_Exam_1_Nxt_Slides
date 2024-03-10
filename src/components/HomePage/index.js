import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import SidebarItem from '../SidebarItem'

import './index.css'

const initialSlidesList = [
  {
    id: uuidv4(),
    heading: 'Welcome',
    description: 'Rahul',
    slide_no: 1,
  },
  {
    id: uuidv4(),
    heading: 'Agenda',
    description: 'Technologies in focus',
    slide_no: 2,
  },
  {
    id: uuidv4(),
    heading: 'Cyber Security',
    description: 'Ethical Hacking',
    slide_no: 3,
  },
  {
    id: uuidv4(),
    heading: 'IoT',
    description: 'Wireless Technologies',
    slide_no: 4,
  },
  {
    id: uuidv4(),
    heading: 'AI-ML',
    description: 'Cutting-Edge Technology',
    slide_no: 5,
  },
  {
    id: uuidv4(),
    heading: 'Blockchain',
    description: 'Emerging Technology',
    slide_no: 6,
  },
  {
    id: uuidv4(),
    heading: 'XR Technologies',
    description: 'AR/VR Technologies',
    slide_no: 7,
  },
]

const HeadingInput = props => {
  const {data, onChangeHeadingInput, changeHeadingType} = props
  const changeHeading = event => {
    onChangeHeadingInput(event, data.id)
  }
  return (
    <input
      type="text"
      value={data.heading}
      className="heading-input"
      onChange={changeHeading}
      onBlur={changeHeadingType}
      id={data.id}
    />
  )
}

const DescriptionInput = props => {
  const {data, onChangeDescriptionInput, changeDescriptionType} = props
  const changeDescription = event => {
    onChangeDescriptionInput(event, data.id)
  }
  return (
    <input
      type="text"
      value={data.description}
      className="description-input"
      onChange={changeDescription}
      onBlur={changeDescriptionType}
      id={data.id}
    />
  )
}

const Navbar = () => (
  <nav className="navbar">
    <img
      src="https://assets.ccbp.in/frontend/react-js/nxt-slides/nxt-slides-logo.png"
      alt="nxt slides logo"
      className="navbar-logo"
    />
    <h1 className="navbar-heading">Nxt Slides</h1>
  </nav>
)

class HomePage extends Component {
  state = {
    slidesList: initialSlidesList,
    selectedItem: initialSlidesList[0].id,
    isHeadingElementSelected: false,
    isDescriptionElementSelected: false,
  }

  onChangeSlideItem = id => {
    this.setState({selectedItem: id})
  }

  onAddNewSlide = () => {
    const {slidesList, selectedItem} = this.state
    const id = uuidv4()
    const getSlideItem = slidesList.filter(
      eachitem => eachitem.id === selectedItem,
    )
    const newSlideItem = {
      id,
      heading: 'Heading',
      description: 'Description',
      slide_no: getSlideItem[0].slide_no + 1,
    }
    const modifiedListOne = slidesList.map(eachitem => {
      if (eachitem.slide_no >= newSlideItem.slide_no) {
        const updatedData = {...eachitem, slide_no: eachitem.slide_no + 1}
        return updatedData
      }
      return eachitem
    })
    const index = modifiedListOne.findIndex(
      eachitem => eachitem.id === getSlideItem[0].id,
    )
    console.log(index)
    modifiedListOne.splice(index + 1, 0, newSlideItem)
    console.log(modifiedListOne)
    this.setState({slidesList: modifiedListOne, selectedItem: newSlideItem.id})
  }

  onChangeHeadingInput = (event, id) => {
    const updatedHeading = event.target.value
    const {slidesList} = this.state
    const updatedList = slidesList.map(eachitem => {
      if (eachitem.id === id) {
        const updatedData = {
          id: eachitem.id,
          slide_no: eachitem.slide_no,
          description: eachitem.description,
          heading: updatedHeading,
        }
        return updatedData
      }
      return eachitem
    })
    this.setState({slidesList: updatedList})
  }

  onChangeDescriptionInput = (event, id) => {
    const updatedDescription = event.target.value
    const {slidesList} = this.state
    const updatedList = slidesList.map(eachitem => {
      if (eachitem.id === id) {
        const updatedData = {
          id: eachitem.id,
          slide_no: eachitem.slide_no,
          description: updatedDescription,
          heading: eachitem.heading,
        }
        return updatedData
      }
      return eachitem
    })
    this.setState({slidesList: updatedList})
  }

  changeHeadingType = () =>
    this.setState(prevState => ({
      isHeadingElementSelected: !prevState.isHeadingElementSelected,
    }))

  changeDescriptionType = () =>
    this.setState(prevState => ({
      isDescriptionElementSelected: !prevState.isDescriptionElementSelected,
    }))

  render() {
    const {
      slidesList,
      selectedItem,
      isHeadingElementSelected,
      isDescriptionElementSelected,
    } = this.state
    const content = slidesList.filter(eachitem => eachitem.id === selectedItem)
    return (
      <>
        <Navbar />
        <div className="home-page-bg-container">
          <button
            className="add-new-slide-button"
            type="button"
            onClick={this.onAddNewSlide}
            testid="New"
          >
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-slides/nxt-slides-plus-icon.png"
              alt="new plus icon"
              className="plus-icon"
            />
            New
          </button>
          <div className="display-card-bg-container">
            <ol className="sidebar">
              {slidesList.map(eachitem => (
                <SidebarItem
                  eachitem={eachitem}
                  selectedItem={selectedItem}
                  onChangeSlideItem={this.onChangeSlideItem}
                  key={eachitem.id}
                />
              ))}
            </ol>
            <div className="mainbar">
              {isHeadingElementSelected === true ? (
                <HeadingInput
                  data={{heading: content[0].heading, id: selectedItem}}
                  onChangeHeadingInput={this.onChangeHeadingInput}
                  changeHeadingType={this.changeHeadingType}
                />
              ) : (
                <h1 className="heading-input" onClick={this.changeHeadingType}>
                  {content[0].heading}
                </h1>
              )}
              {isDescriptionElementSelected === true ? (
                <DescriptionInput
                  data={{description: content[0].description, id: selectedItem}}
                  onChangeDescriptionInput={this.onChangeDescriptionInput}
                  changeDescriptionType={this.changeDescriptionType}
                />
              ) : (
                <p
                  className="description-input"
                  onClick={this.changeDescriptionType}
                >
                  {content[0].description}
                </p>
              )}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default HomePage
