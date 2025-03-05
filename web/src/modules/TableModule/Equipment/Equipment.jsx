import { useEffect, useState } from "react";
import TableComponent from "../../../components/TableComponent/TableComponent";
import HeadMenu from "../Components/HeadMenu/HeadMenu";
import { header, testData } from "./data";
import styles from "./Equipment.module.scss";
import { GetEquipment } from "../../../API/ApiRequest";
import { useQuery } from "@tanstack/react-query";
import { generateAndDownloadExcel } from "../../../components/HomePageTableMenu/function";

function Equipment() {
  const [tableData, setTableData] = useState([]);
  const [search, setSearch] = useState("");

  const qery = useQuery({
    queryKey: ["equipment", search],
    queryFn: () => GetEquipment(search),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    const req = qery?.data?.data?.data;
    console.log("req", req);
    if (req) {
      const data = req?.map((item) => item || "__");
      setTableData(data);
    }
  }, [qery?.data?.data]);

  //! функция экспорта файла
  const handleExport = () => {
    generateAndDownloadExcel(tableData, header, "Офисы");
  };

  return (
    <div className={styles.Equipment}>
      <HeadMenu
        title={"Оборудование"}
        search={search}
        setSearch={setSearch}
        handleExport={handleExport}
      />
      <TableComponent header={header} data={tableData} />
    </div>
  );
}

export default Equipment;
