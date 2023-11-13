import { ChangeEvent } from 'react';
import { VFChangeEventProps } from 'src/components/ValueField';
import { isDayJS } from 'src/helpers/isDayJS';

export function isHTMLInputElement(value: VFChangeEventProps): value is ChangeEvent<HTMLInputElement> {
	if (isDayJS(value)) {
		return false;
	}

	return value?.target?.value != null;
}
