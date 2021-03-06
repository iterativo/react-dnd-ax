import React from 'react'
import {Icon} from 'react-fa'

import {DragNDropContainer, DragNDropItem} from 'react-dnd-ax'
import {basicItems} from '../data'

import '../styles/common.scss'
import './basic-example.scss'

class BasicExample extends React.Component {
  state = {
    items: basicItems,
  }

  onReorderLinks = (newItems) => {
    this.setState({
      items: [...newItems]
    })
  }

  render() {
    const BasicItem = DragNDropItem(({item, itemRef, dragPointRef}) => {
      return (
        <div
          className="item-row"
          ref={itemRef} // mandatory: put this attribute to the container element of the movable item
        >
            <span className="text">{item.text}</span>
            <button
              ref={dragPointRef} // mandatory: put this attribute to the drag handler
              className="drag-point"
              draggable // mandatory HTML attribute for drag handler
              tabIndex="0" // mandatory HTML attribute, make it possible to focus on the drag handler
              title="Drag this link to reorder the item" // AX title
            >
              <Icon name="arrows"/>
            </button>
        </div>
      )
    })

    const BasicList = DragNDropContainer((props) => {
      return (
        <div id="modules-section">
          {
            props.items.map((item, index) => {
              return <BasicItem
                item={item}
                index={index} // mandatory: give index to the DragNDropItem HOC
                key={item.id}
                preview={<div>{item.text}</div>} // customize your preview
                {...props} // mandatory: need to pass down the props
              />
            })
          }
        </div>
      )
    })

    return (
      <div id="basic-container" className="container">
        <BasicList
          items={this.state.items}
          onReorderItem={this.onReorderLinks}
          scrollContainerId="basic-container"
        />
      </div>
    )
  }
}

export default BasicExample
