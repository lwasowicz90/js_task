import { $ } from 'moneysafe';

const percentDivider = 100;
const percent2decimal = (value) => $(value).dividedBy(percentDivider).valueOf();

const roundComission = (value, precision = 2) =>
  $(Math.ceil($(value).multipliedBy(10 ** precision)))
    .dividedBy(10 ** precision)
    .valueOf();

export { percent2decimal, roundComission };
