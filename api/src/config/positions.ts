import { mapObjectKeys } from '../utils/mapper';

const positions = {
    NA: 1,
    INTERN: 2,
    JUNIOR_DEVELOPER: 3,
    MIDDLE_DEVELOPER: 4,
    SENIOR_DEVELOPER: 5,
    LEAD_DEVELOPER: 6,
    QA_ENGINEER: 7,
    DEVOPS_ENGINEER: 8,
    TEAM_LEAD: 9,
    PROJECT_MANAGER: 10,
    PRODUCT_MANAGER: 11,
    ARCHITECT: 12,
    CTO: 13,
    CEO: 14,
};

export const positionsRuLocale = {
    1: 'Не определен',
    2: 'Стажёр',
    3: 'Джуниор-разработчик',
    4: 'Мидл-разработчик',
    5: 'Сеньор-разработчик',
    6: 'Лид-разработчик',
    7: 'Тестировщик',
    8: 'DevOps инженер',
    9: 'Тимлид',
    10: 'Менеджер проекта',
    11: 'Продуктовый менеджер',
    12: 'Архитектор',
    13: 'Технический директор',
    14: 'Генеральный директор',
};

export default positions;
export const mapRoles = mapObjectKeys(positions);
