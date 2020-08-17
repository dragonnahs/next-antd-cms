import 'braft-editor/dist/index.css'
import React from 'react'
import BraftEditor from 'braft-editor'

export default class Editor extends React.Component {
  constructor(props){
    super(props)
  }
  state = {
    editorState: BraftEditor.createEditorState(this.props.content),
  }
  render () {
    return (
      <BraftEditor value={this.state.editorState} onChange={this.handleChange}/>
    )
  }

  handleChange = (editorState) => {
    this.setState({ editorState })
    this.props.handleChangeContent(editorState.toHTML())
  }

}