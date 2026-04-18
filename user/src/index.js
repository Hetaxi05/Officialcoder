
import ReactDom from "react-dom/client";
import App from './App';
import '../src/assets/css/style.css';
import '../src/assets/css/media.css';

const root =ReactDom.createRoot(document.getElementById('root'));


root.render(
    <div>
        <App/>
    </div>
)