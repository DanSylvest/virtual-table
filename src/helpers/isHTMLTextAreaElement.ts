import { ChangeEvent } from 'react';
import { isDayJS } from 'src/helpers/isDayJS';
import { VFChangeEventProps } from 'src/components/ValueField';

export function isHTMLTextAreaElement(value: VFChangeEventProps): value is ChangeEvent<HTMLTextAreaElement> {
	if (isDayJS(value)) {
		return false;
	}

	return value?.target?.value != null;
}
