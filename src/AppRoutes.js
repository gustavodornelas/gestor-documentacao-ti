import {
    BrowserRouter as Router,
    Route,
    Routes,
} from 'react-router-dom';


import Home from "./pages/home";
import ListarEmpresas from './pages/listar-empresas';
import ListarEquipamentos from './pages/listar-equipamentos';
import ListarFiliais from './pages/listar-filiais';
import ListarColaboradores from './pages/listar-colaboradores';
import CadastrarEmpresa from './pages/cadastrar-empresa';

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route exact path='/colaboradores' element={<ListarColaboradores />} />
                <Route exact path='/empresas' element={<ListarEmpresas />} />
                <Route exact path='/equipamentos' element={<ListarEquipamentos />} />
                <Route exact path='/filiais' element={<ListarFiliais />} />
                <Route exact path='cadastrar-empresa' element={<CadastrarEmpresa />} />
                <Route exact path='/' element={<Home />} />
            </Routes>
        </Router>
    )
}

export default AppRoutes;