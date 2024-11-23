import { mapObjectKeys } from '../utils/mapper';

const types = {
    LAPTOP: 1,
    TABLE: 2,
    LAMP: 3,
    MONITOR: 4,
    SOFA: 5,
    PRINTER: 6,
    PC: 7,
    COFFER: 8,
    KEYBOARD: 9,
    CHAIR: 10,
};

export const typesRuLocale = {
    1: 'Ноутбук',
    2: 'Стол',
    3: 'Лампа',
    4: 'Монитор',
    5: 'Диван',
    6: 'Принтер',
    7: 'Компьютер',
    8: 'Кофемашина',
    9: 'Клавиатура',
    10: 'Стул',
};

export default types;
export const mapRoles = mapObjectKeys(types);
