import React, { ChangeEvent, useCallback } from 'react';
import Input from '@mui/joy/Input';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { Textarea } from '@mui/joy';
import { DateTimeField } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { DATE_EXCLUDE_RX, EMAIL_RX, VALUE_TYPES } from 'src/constants';
import { isDayJS } from 'src/helpers/isDayJS';
import { isHTMLInputElement, isHTMLTextAreaElement } from 'src/helpers';
import { AvailableDataValueTypes } from 'src/types';

export type VFChangeEventProps = ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement> | (dayjs.Dayjs | null);

interface ValueFieldProps {
    id: string;
    value: AvailableDataValueTypes;
    disabled?: boolean;
    onChange: (id: string, e: AvailableDataValueTypes) => void;
}

export const ValueField = ({
	id, value, disabled, onChange,
}: ValueFieldProps) => {
	const onChangeInner = useCallback((type: VALUE_TYPES, ev: VFChangeEventProps) => {
		if (type === VALUE_TYPES.string) {
			if (isHTMLTextAreaElement(ev)) {
				onChange(id, ev.target.value);
				return;
			}

			if (isDayJS(ev)) {
				onChange(id, ev.toISOString());
				return;
			}
		}

		if (isHTMLInputElement(ev)) {
			switch (type) {
			case VALUE_TYPES.number:
				onChange(id, parseFloat(ev.target.value) || 0);
				return;
			case VALUE_TYPES.bool:
				onChange(id, ev.target.value === 'true');
				return;
			}
			onChange(id, ev.target.value);
		}
	}, [id, onChange]);

	const onChangeNumber = useCallback((e: VFChangeEventProps) => onChangeInner(VALUE_TYPES.number, e), [onChangeInner]);
	const onChangeBool = useCallback((e: VFChangeEventProps) => onChangeInner(VALUE_TYPES.bool, e), [onChangeInner]);
	const onChangeString = useCallback((e: VFChangeEventProps) => onChangeInner(VALUE_TYPES.string, e), [onChangeInner]);

	const props = { disabled };

	if (typeof value === 'number') {
		return <Input {...props} onChange={onChangeNumber} type="number" value={value} />;
	}

	if (typeof value === 'boolean') {
		return (
			<RadioGroup
				{...props}
				row
				aria-labelledby="demo-row-radio-buttons-group-label"
				name="row-radio-buttons-group"
				value={value}
				onChange={onChangeBool}
			>
				<FormControlLabel value="true" control={<Radio />} label="true" />
				<FormControlLabel value="false" control={<Radio />} label="false" />
			</RadioGroup>
		);
	}

	if (value.length > 80) {
		return <Textarea {...props} onChange={onChangeString} value={value} minRows={3} maxRows={5} />;
	}

	if (!value.match(DATE_EXCLUDE_RX) && dayjs(value).isValid()) {
		return (
			<DateTimeField
				{...props}
				sx={{ width: 200 }}
				value={dayjs(value)}
				onChange={onChangeString}
			/>
		);
	}

	if (value.match(EMAIL_RX)) {
		return <Input {...props} type="email" value={value} onChange={onChangeString} />;
	}

	return <Input {...props} type="text" value={value} onChange={onChangeString} />;
};

ValueField.defaultProps = {
	disabled: false,
};
