import * as React from "react";
import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Checkbox.module.scss"


const defaultCssClasses = {
  checkBoxClass: "",
  labelClass: styles.label
};

export default class CheckBox extends React.Component {
  constructor(props) {
    super(props);

    this.onCheckChanged = this.onCheckChanged.bind(this);
  }

  onCheckChanged(event) {
    const { checked } = this.props;
    event.stopPropagation();

    if (this.props.onChange !== null && this.props.onChange !== undefined) {
      this.props.onChange({
        name: this.props.name,
        checkState: !checked
      });
    }
  }

  render() {
    const { checked, name, label, classNames, size } = this.props;

    const icon = checked ? ["fas", "check-square"] : ["far", "square"];
    const classes = Object.assign({}, defaultCssClasses, classNames);

    return (
      <div className={`${styles.checkbox} ${this.props.className || ""}`}>
        <FontAwesomeIcon
          className={classes.checkBoxClass}
          icon={icon}
          onClick={this.onCheckChanged}
          size={size}
        />
        {label && (
          <label
            className={classes.labelClass}
            onClick={this.onCheckChanged}
            dangerouslySetInnerHTML={{ __html: label }}
          />
        )}
        <input
          type="checkbox"
          name={name}
          checked={checked || false}
          readOnly
        />
      </div>
    );
  }
}

CheckBox.propTypes = {
  checked: PropTypes.bool,
  label: PropTypes.string,
  size: PropTypes.oneOf(["", "xs", "sm", "lg", "2x", "3x", "5x", "7x", "10x"]),
  onChange: PropTypes.func.isRequired
};

CheckBox.defaultProps = {
  checked: false,
  label: null,
  size: "lg"
};
