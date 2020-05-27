import React, { memo } from "react";
import { Checkbox } from "galio-framework";
import PropTypes from 'prop-types';

const Check = ({ label, initValue, onChange }) => (
    <Checkbox color="warning" label={label} initialValue={initValue} onChange={onChange} style={{ margin: 5 }} />
);

Check.propTypes = {
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
}

export default memo(Check);
