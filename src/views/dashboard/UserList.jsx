import React, { useMemo, useState } from "react";
import DataTable from "../../components/ui/table/DataTable";
import { getTableData, SetTableCOl } from "../../utils/Datatable";
import UserCreateModal from "./UserCreateModal";


const Userlist = () => {
  const data = useMemo(() => getTableData(), []);
  const columns = useMemo(() => SetTableCOl(), []);
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        
        {/* Header */}
        <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-400">
              User Management
            </h1>
            <p className="text-gray-500 mt-2">
              Manage your system users and permissions
            </p>
          </div>

          {/* Add User Button */}
          <button
            onClick={() => setOpenModal(true)}
            className="px-5 py-2 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-600 transition"
          >
            + Add User
          </button>
        </div>

        {/* Table */}
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

      {/* Modal */}
      {openModal && (
        <UserCreateModal onClose={() => setOpenModal(false)} />
      )}
    </div>
  );
};

export default Userlist;
