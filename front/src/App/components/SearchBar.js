import React, { PureComponent } from "react"
import { Redirect } from "react-router-dom"
import classnames from "classnames/bind"

import css from "./SearchBar.scss"
const cx = classnames.bind(css)
const moduleName = "SearchBar"
class SearchBar extends PureComponent {
  state = {
    term: "",
    redir: false
  }
  onInputChange = term => {
    this.setState({ term })
  }
  handleSubmit = e => {
    e.preventDefault()
    console.log("submit", this.state.term)
    //this.props.loadKeywordMusicRequest(this.state.term)

    this.setState(() => {
      return {
        term: "",
        redir: true
      }
    })
  }
  renderRedirect = () => {
    if (this.state.redir) {
      return <Redirect to={"/search/" + this.state.term} />
    }
  }
  render() {
    return (
      <div className={cx(`${moduleName}`)}>
        {this.renderRedirect()}
        <form className={cx(`${moduleName}-form`)} onSubmit={this.handleSubmit}>
          <i className={cx(`${moduleName}-form-icon`)} />
          <input
            className={cx(`${moduleName}-form-input`)}
            value={this.state.term}
            onChange={event => this.onInputChange(event.target.value)}
            type="text"
          />
        </form>
      </div>
    )
  }
}
export default SearchBar
