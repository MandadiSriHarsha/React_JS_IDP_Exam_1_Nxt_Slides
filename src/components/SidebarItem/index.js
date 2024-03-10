import './index.css'

const SidebarItem = props => {
  const {eachitem, selectedItem, onChangeSlideItem} = props
  const isItemSelected = eachitem.id === selectedItem
  const applyClass = isItemSelected === true ? 'apply-selected-class' : ''
  const selectOption = () => {
    onChangeSlideItem(eachitem.id)
  }

  return (
    <li
      id={eachitem.id}
      className={`list-item ${applyClass}`}
      testid={`slideTab${eachitem.slide_no}`}
    >
      <button className="slide-item" type="button" onClick={selectOption}>
        <p className="slide-item-id">{eachitem.slide_no}</p>
        <div className="slide-item-content-card">
          <h1 className="slide-item-content-card-heading">
            {eachitem.heading}
          </h1>
          <p className="slide-item-content-card-description">
            {eachitem.description}
          </p>
        </div>
      </button>
    </li>
  )
}

export default SidebarItem
