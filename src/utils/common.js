import { createColumnHelper } from "@tanstack/react-table";
import DataTable from "../../components/ui/table/DataTable";
export const handleApiCallError = (error) => {
	if (error?.name == "AxiosError") {
		throw error?.response?.data;
	} else throw error;
};






