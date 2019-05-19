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
  isCurrency?: boolean;
  isTextArea?: boolean;
  readOnly?: boolean;
  withoutLineBelow?: boolean;
}

export interface IInputFieldState {
  fieldActivated?: boolean;
  lineBelowInputClassName?: string;
  validationIcon?: string;
  labelClassName?: string;
  userIsTyping?: boolean;
}

export class InputField extends React.Component<IInputFieldProps, IInputFieldState> {
  backLineBelowInputToNormal$: any;

  constructor(props) {
    super(props);

    this.state = {
      lineBelowInputClassName: 'input-field-line-below-input-inactive-and-empty'
    };

    this.backLineBelowInputToNormal$ = _.debounce(this.backLineBelowInputToNormal, 500);
  }

  componentDidMount() {
    this.mapLabelClassName(this.props.error, this.props.valid);
  }

  componentWillReceiveProps(newProps) {
    this.mapLabelClassName(newProps.error, newProps.valid);

    if (!!newProps.error) {
      this.setState({
        lineBelowInputClassName: classnames('input-field-line-below-input-inactive-and-empty', 'input-field-line-below-input-error'),
        validationIcon: 'content/images/error-icon.png'
      });
    }

    if (!!newProps.valid) {
      this.setState({
        lineBelowInputClassName: classnames('input-field-line-below-input-inactive-and-empty', 'input-field-line-below-input-success'),
        validationIcon: 'content/images/valid-icon.png'
      });
    }
  }

  backLineBelowInputToNormal = () => {
    this.setState({ lineBelowInputClassName: 'input-field-line-below-input-inactive-and-empty' });
  };

  cleanIcon = () => {
    this.setState({ validationIcon: '' });
  };

  mapLabelClassName = (error?: boolean, valid?: boolean) => {
    if (!!error) {
      this.setState({
        labelClassName: classnames('label-without-error', 'label-with-error'),
        lineBelowInputClassName: classnames('input-field-line-below-input-inactive-and-empty', 'input-field-line-below-input-error'),
        validationIcon: 'content/images/error-icon.png'
      });
      return;
    }

    if (!!valid) {
      this.setState({
        labelClassName: classnames('label-without-error', 'label-with-success'),
        lineBelowInputClassName: classnames('input-field-line-below-input-inactive-and-empty', 'input-field-line-below-input-success'),
        validationIcon: 'content/images/valid-icon.png'
      });
      return;
    }

    this.setState({
      labelClassName: classnames('label-without-error'),
      lineBelowInputClassName: classnames('input-field-line-below-input-inactive-and-empty'),
      validationIcon: ''
    });
  };

  componentWillUnmount() {}

  mapClassName = () => {
    const className = this.props.inputClassName ? classnames([this.props.inputClassName, 'input-field']) : classnames('input-field');

    return className;
  };

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
      lineBelowInputClassName: classnames('input-field-line-below-input-inactive-and-empty', 'input-field-line-below-input-typing')
    });
    this.mapLabelClassName();
    this.backLineBelowInputToNormal$();
    this.cleanIcon();
  };

  render() {
    return (
      <div className={'input-field-container'}>
        <label
          className={
            this.state.fieldActivated || this.props.value
              ? classnames([this.state.labelClassName, 'transition'])
              : this.state.labelClassName
          }
        >
          {(this.state.fieldActivated || this.props.value) && this.props.title != null ? this.props.title : ''}
        </label>

        <div className={'input-field-wrapper'}>
          {this.props.isMaskRequired &&
            !!!this.props.isTextArea &&
            !!!this.props.isCurrency && (
              <InputMask
                autoComplete={'off'}
                readOnly={!!this.props.readOnly ? this.props.readOnly : false}
                onKeyUp={this.handleOnInput}
                onFocus={this.activateField}
                onBlur={this.disableField}
                onChange={!!this.props.onChange ? this.props.onChange : () => void 0}
                value={this.props.value}
                placeholder={!this.state.fieldActivated && !!this.props.placeholder ? this.props.placeholder : ''}
                mask={this.props.maskFormat}
                onKeyPress={!!this.props.onKeyPress ? this.props.onKeyPress : () => void 0}
                className={this.mapClassName()}
                onKeyDown={!!this.props.onKeyDownPress ? this.props.onKeyDownPress : () => void 0}
              />
            )}

          {!this.props.isMaskRequired &&
            !!!this.props.isTextArea &&
            !!!this.props.isCurrency && (
              <input
                autoComplete={'off'}
                onKeyUp={this.handleOnInput}
                onFocus={this.activateField}
                onBlur={this.disableField}
                maxLength={!!this.props.maxLength ? this.props.maxLength : 50}
                type={!!this.props.type ? this.props.type : 'text'}
                className={this.mapClassName()}
                value={this.props.value ? this.props.value.toString() : ''}
                onChange={!!this.props.onChange ? this.props.onChange : () => void 0}
                placeholder={!this.state.fieldActivated && !!this.props.placeholder ? this.props.placeholder : ''}
                readOnly={!!this.props.readOnly ? this.props.readOnly : false}
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
              className={this.mapClassName()}
              value={this.props.value ? this.props.value.toString() : ''}
              readOnly={!!this.props.readOnly ? this.props.readOnly : false}
              placeholder={!this.state.fieldActivated && !!this.props.placeholder ? this.props.placeholder : ''}
            />
          )}

          <img src={this.state.validationIcon} className={'icon-img'} />

          {!this.props.withoutLineBelow && <div className={this.state.lineBelowInputClassName} />}
        </div>
      </div>
    );
  }
}

export default InputField;
