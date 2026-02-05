import "./App.css";
import { Toaster } from "react-hot-toast";
import Approutes from "./routes";
import { CartProvider } from "./views/context/CartContext";

function App() {
	return (
		<>
			<Toaster />
			<CartProvider>
				<Approutes />
			</CartProvider>
		</>
	);
}

export default App;
