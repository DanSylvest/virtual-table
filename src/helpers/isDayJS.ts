import dayjs from 'dayjs';
import { VFChangeEventProps } from 'src/components/ValueField';

export function isDayJS(value: VFChangeEventProps): value is dayjs.Dayjs {
	return value instanceof dayjs;
}
