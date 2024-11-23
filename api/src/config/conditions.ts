import { mapObjectKeys } from '../utils/mapper';

const conditions = {
    GOOD: 1,
    BREAK: 2,
};

export const conditionsRuLocale = {
    1: 'Хорошее',
    2: 'Сломано',
};

export default conditions;
export const mapConditions = mapObjectKeys(conditions);
