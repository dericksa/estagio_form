import React, { ChangeEvent } from 'react';
import { translate } from 'react-jhipster';
import classnames from 'classnames';
import InputMask from 'react-input-mask';
import '../InputField/input-field.css';
import _ from 'lodash';

export interface ISelectProps {
  name?: string;
  title?: string;
  value?: string;
  options?: string[];
  placeholder?: string
  error?: boolean
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
}

export interface ISelectState {
  formBorderClassName?: string
}


export class Select extends React.Component<ISelectProps, ISelectState> {

  constructor(props) {
    super(props);

    this.state = {
      formBorderClassName: 'form-field'
    };

  }

  componentDidMount() {
  }

  componentWillReceiveProps(newProps) {

    if (!!newProps.error) {
      this.setState({
        formBorderClassName: 'form-field-error'
      });
    }

    if (!!!newProps.error) {
      this.setState({
        formBorderClassName: 'form-field'
      });
    }
  }

  render() {
    return (
        <div className="form-group">
          <label> {this.props.title} </label>
          <select
            id={this.props.name}
            name={this.props.name}
            value={this.props.value}
            onChange={this.props.onChange}
            className={this.state.formBorderClassName}
          >
            <option value="" disabled>
              {this.props.placeholder}
            </option>
            {this.props.options.map(option => {
              return (
                <option key={option} value={option} label={option}>
                  {option}
                </option>
              );
            })}
          </select>
        </div>
      );
    }

}

export default Select;
