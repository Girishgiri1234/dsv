import { routes } from "../utils/routes";
import { lazy } from "react";
import laodable from "../components/common/Loadable";
import MainLayout from "../layouts/mainLayout";


//routes
const Login = laodable(lazy(() => import("views/Login/Login")));
const Dashboard = laodable(lazy(() => import("../views/dashboard/dashboard")));
const Userlist = laodable(lazy(() => import("../views/dashboard/UserList")));
const Speakers = laodable(lazy(() => import("../views/Speaker/Speakers")));
const SpeakerDetails = laodable(lazy(() => import("../views/Speaker/SpeakerDetails")));
const CartDetails = laodable(lazy(() => import("../views/Cart/CartDetails")));

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
				{ path: routes.exampleSpeakersList, element: <Speakers /> },
				{ path: routes.exampleSpeakersDetails, element: <SpeakerDetails /> },
				{ path: routes.cart, element: <CartDetails /> },

			],
		},
	];
};

export default mainRoutes;
