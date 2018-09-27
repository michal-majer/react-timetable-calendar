import React, {Component} from 'react';
import styled from 'styled-components';

const FloatingAddButton = styled.button`
  width: 56px;
  height: 56px;
  cursor: pointer;
  border: 2.5px solid #7FDBFF;
  border-radius: 50px;
  color: #7FDBFF;
  background: #FFF;
  font-size: 20px;
`;


class AddButton extends Component {
    addActivity = () => {
        this.props.addActivity(this.state);
    }

    render() {
      return (
      <div>
        <FloatingAddButton onClick={this.addActivity}>+</FloatingAddButton>
        <input onChange={(event) => this.setState({name: event.target.value})} />
        <input type="date" onChange={(event) => this.setState({date: event.target.value})} />
        <input onChange={(event) => this.setState({description: event.target.value})} />
        <input onChange={(event) => this.setState({startAtTime: event.target.value})} />
        <input onChange={(event) => this.setState({endAtTime: event.target.value})} />
      </div>
      )
    }
}

export default AddButton;
