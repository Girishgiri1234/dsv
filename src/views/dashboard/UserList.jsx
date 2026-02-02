import React, { useMemo } from "react";

import DataTable from "../../components/ui/table/DataTable";
import { getTableData, SetTableCOl } from "../../utils/Datatable";



const Userlist = () => {

  const data = useMemo(() => getTableData(), []);
  const columns = useMemo(() => SetTableCOl(), []);


  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-400">
            User Management
          </h1>
          <p className="text-gray-500 mt-2">Manage your system users and permissions</p>
        </div>
        <div className="p-6">
          <DataTable
            data={data}
            columns={columns}
            showFooter={false}
            enablePagination={true}
            className="rounded-xl border-gray-200"
          />
        </div>
      </div>
    </div>
  );
};

export default Userlist;
