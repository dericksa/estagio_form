import React, { ChangeEvent } from 'react';
import { translate } from 'react-jhipster';
import classnames from 'classnames';
import InputMask from 'react-input-mask';
import './input-field.css';
import _ from 'lodash';

export interface IInputFieldProps {
  title?: string;
  placeholder?: string;
  value: string | Number;
  inputClassName: string;
  type?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, text?: string, floatValue?: number) => void;
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
  maxLength?: number;
  error?: boolean;
  valid?: boolean;
  isMaskRequired?: boolean;
  maskFormat?: string;
  onKeyPress?: (event) => void;
  onKeyDownPress?: (event) => void;
  isTextArea?: boolean;
  hasInfo?: boolean;
  info?: string;
}

export interface IInputFieldState {
  fieldActivated?: boolean;
  formBorderClassName?: string;
  validationIcon?: string;
  labelClassName?: string;
  userIsTyping?: boolean;
}

export class InputField extends React.Component<IInputFieldProps, IInputFieldState> {
  backLineBelowInputToNormal$: any;

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

  cleanIcon = () => {
    this.setState({ validationIcon: '' });
  };


  componentWillUnmount() {}

  activateField = () => {
    if (!this.props.onClick) {
      this.setState({ fieldActivated: true });
    }
  };

  disableField = () => {
    if (!this.props.onClick) {
      this.setState({ fieldActivated: false });
    }
  };

  handleOnInput = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    this.setState({
      formBorderClassName: 'form-field'
    });
  };

  render() {
    return (
      <div className={'input-field-container'}>

        <div className={'input-info-header'}>
          <label className="form-label">
            {this.props.title != null ? this.props.title : ''}
          </label>

          {this.props.hasInfo &&
          <label className="input-info-text-style">
            {this.props.info != null ? this.props.info : ''}
          </label>
          }
        </div>
        <div className={'input-field-wrapper'}>
          {this.props.isMaskRequired &&
            !!!this.props.isTextArea &&(
              <InputMask
                autoComplete={'off'}
                onKeyUp={this.handleOnInput}
                onFocus={this.activateField}
                onBlur={this.disableField}
                onChange={!!this.props.onChange ? this.props.onChange : () => void 0}
                value={this.props.value}
                placeholder={!this.state.fieldActivated && !!this.props.placeholder ? this.props.placeholder : ''}
                mask={this.props.maskFormat}
                onKeyPress={!!this.props.onKeyPress ? this.props.onKeyPress : () => void 0}
                className={this.state.formBorderClassName}
                onKeyDown={!!this.props.onKeyDownPress ? this.props.onKeyDownPress : () => void 0}
              />
            )}

          {!this.props.isMaskRequired &&
            !!!this.props.isTextArea && (
              <input
                autoComplete={'off'}
                onKeyUp={this.handleOnInput}
                onFocus={this.activateField}
                onBlur={this.disableField}
                maxLength={!!this.props.maxLength ? this.props.maxLength : 50}
                type={!!this.props.type ? this.props.type : 'text'}
                className= {this.state.formBorderClassName}
                value={this.props.value ? this.props.value.toString() : ''}
                onChange={!!this.props.onChange ? this.props.onChange : () => void 0}
                placeholder={!this.state.fieldActivated && !!this.props.placeholder ? this.props.placeholder : ''}
                onClick={!!this.props.onClick ? this.props.onClick : () => void 0}
              />
            )}

          {this.props.isTextArea && (
            <textarea
              autoComplete={'off'}
              onKeyUp={this.handleOnInput}
              onFocus={this.activateField}
              maxLength={!!this.props.maxLength ? this.props.maxLength : 50}
              onBlur={this.disableField}
              onChange={!!this.props.onChange ? this.props.onChange : () => void 0}
              className={this.state.formBorderClassName}
              value={this.props.value ? this.props.value.toString() : ''}
              placeholder={!this.state.fieldActivated && !!this.props.placeholder ? translate(this.props.placeholder) : ''}
            />
          )}

        </div>
      </div>
    );
  }
}

export default InputField;
