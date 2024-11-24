import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

//! Функция генерации файла для скачивания
export const generateAndDownloadExcel = (data, nameTable) => {
    console.log("data", data)
    console.log("nameTable", nameTable)
    let validName = nameTable === 'Equipment' ? 'Оборудование' : nameTable === 'Staff' ? 'Сотрудники' : 'Офисы';
  let transformedData = {};
  const server = process.env.REACT_APP_API_URL;
 
  if (nameTable === 'Equipment') {
    transformedData = data.map(({ ...item }) => ({
      Название_Оборудования: item?.name,
      Описание: item?.description,
      Состояние_Оборудования: item?.conditionHuman,
      Тип_Оборудования: item?.typeHuman,
      Инвентарный_номер: item?.inventoryNumber,
      Дата_Создания: item?.createdAtHuman,
      Дата_Последнего_ТО: item?.inspectionDateHuman,
      Начальная_Стоимость: item?.cost,
      Остаточная_Стоимость: item?.factCost,
    }));
  }else if(nameTable === 'Staff'){
    transformedData = data.map(({ ...item }) => ({
      ФИО_Сотрудника: item?.name,
      Должность: item?.positionHuman,
      Офис: item?.building,
    }))
  }else{
        transformedData = data.map(({ ...item }) => ({
            Название_офиса: item?.name,
            Город: item?.city,
            Адрес: item?.address,
            Количество_сотрудников: item?.countOfEmployees,
    }))
};
  const worksheet = XLSX.utils.json_to_sheet(transformedData);

  // Установка ширины столбцов
  const columnWidths = transformedData.reduce((widths, row) => {
    Object.keys(row).forEach((key, index) => {
      const value = row[key] ? row[key].toString() : "";
      widths[index] = Math.max(widths[index] || 10, value.length);
    });
    return widths;
  }, []);

  worksheet["!cols"] = columnWidths.map((width) => ({ wch: width + 10 })); // Добавляем немного запаса
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  const currentDate = new Date();
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Europe/Moscow",
  };
  const formattedDate = currentDate
    .toLocaleString("ru-RU", options)
    .replace(/(\d+)\.(\d+)\.(\d+), (\d+):(\d+)/, "$3.$2.$1_$4:$5");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });
  const excelData = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  saveAs(excelData, `Экспорт_Таблицы_${validName}_${formattedDate}.xlsx`);
};
