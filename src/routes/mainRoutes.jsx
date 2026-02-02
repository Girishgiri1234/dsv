import { routes } from "../utils/routes";
import { lazy } from "react";
import laodable from "../components/common/Loadable";
import MainLayout from "../layouts/mainLayout";


//routes
const Login = laodable(lazy(() => import("views/Login/Login")));
const Dashboard = laodable(lazy(() => import("../views/dashboard/dashboard")));
const Userlist = laodable(lazy(() => import("../views/dashboard/Userlist")));

const mainRoutes = () => {
	return [
		{
			path: routes.home,
			element: <Login />,
		},
		{
			element: <MainLayout />,
			children: [
				{ path: routes.exampledashboard, element: <Dashboard /> },
				{ path: routes.exampleUserList, element: <Userlist /> },
			],
		},
	];
};

export default mainRoutes;
