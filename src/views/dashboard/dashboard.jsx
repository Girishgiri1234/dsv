import { useNavigate } from "react-router-dom";
import { Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
} from "chart.js";
import { getTableData } from "../../utils/Datatable";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
);

const Dashboard = () => {
  const navigate = useNavigate();

  // Sample Data

  

  const tableData = getTableData();
  const roleCounts = tableData.reduce((acc, user) => {
  acc[user.role] = (acc[user.role] || 0) + 1;
  return acc;
}, {});

const adminCount = roleCounts.Admin || 0;
const userCount = roleCounts.User || 0;
const editorCount = roleCounts.Editor || 0;

  // Pie Chart Data
  const pieData = {
    labels: ["Users", "Admins","Editor"],
    datasets: [
      {
        label: "Count",
        data: [userCount, adminCount,editorCount],
      backgroundColor: ["#3B82F6", "#8B5CF6", "#22C55E"], // Blue, Purple, Green
        borderColor: ["#2563EB", "#7C3AED", "#16A34A"], 
        borderWidth: 1,
      },
    ],
  };

  // Line Chart Data
  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "User Registrations",
        data: [10, 25, 40, 30, 50, 65],
        borderColor: "#3B82F6",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        tension: 0.4, // smooth line
      },
      {
        label: "Admin Registrations",
        data: [1, 2, 2, 3, 4, 5],
        borderColor: "#8B5CF6",
        backgroundColor: "rgba(139, 92, 246, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Monthly Registrations",
      },
    },
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">Dashboard</h1>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {/* User Card */}
        <div
          onClick={() => navigate("/userlist")}
          className="bg-white rounded-2xl shadow p-6 cursor-pointer
                     hover:shadow-lg hover:scale-[1.02] transition"
        >
          <p className="text-sm text-gray-500">User List</p>
          <h2 className="text-4xl font-bold text-blue-600 mt-2">{userCount+adminCount+editorCount}</h2>
          <p className="text-xs text-gray-400 mt-2">Click to view all users</p>
        </div>

        {/* Admin Card */}
        <div className="bg-white rounded-2xl shadow p-6">
          <p className="text-sm text-gray-500">Total Admins</p>
          <h2 className="text-4xl font-bold text-purple-600 mt-2">{adminCount}</h2>
        </div>
         <div className="bg-white rounded-2xl shadow p-6">
          <p className="text-sm text-gray-500">Total User</p>
          <h2 className="text-4xl font-bold text-purple-600 mt-2">{userCount}</h2>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-2xl shadow max-w-md mx-auto">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Users vs Admins</h2>

          <div className="w-full h-64">
            <Pie data={pieData} />
          </div>
        </div>


        {/* Line Chart */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Monthly Registrations</h2>
          <Line data={lineData} options={lineOptions} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
