import {
    BrowserRouter as Router,
    Route,
    Routes,
} from 'react-router-dom';

import Home from "../pages/home";

import ListarEmpresas from '../pages/empresas/listar';
import ListarEquipamentos from '../pages/equipamentos/listar';
import ListarFiliais from '../pages/filiais/listar';
import ListarColaboradores from '../pages/colaboradores/listar';

import CadastrarEmpresa from '../pages/empresas/cadastrar';
import CadastrarColaboradores from '../pages/colaboradores/cadastrar';
import CadastrarEquipamentos from '../pages/equipamentos/cadastrar';
import CadastrarFiliais from '../pages/filiais/cadastrar';

import Login from '../pages/login';
import { PrivateRoutes } from './privateRoutes';

const AppRoutes = () => {
    return (
        <Router>
            <Routes>

                {/* Login */}
                <Route exact path='/' element={<Login />} />

                {/* Home */}
                <Route exact path="/home" element={<PrivateRoutes />} >
                    <Route exact path='/home' element={<Home />} />
                </Route>

                {/* Empresas */}
                <Route exact path="/empresas" element={<PrivateRoutes />} >
                    <Route exact path='/empresas' element={<ListarEmpresas />} />
                </Route>

                <Route exact path="/empresas/cadastrar" element={<PrivateRoutes />} >
                    <Route exact path='/empresas/cadastrar' element={<CadastrarEmpresa />} />
                </Route>

                <Route exact path="/empresas/cadastrar/:id" element={<PrivateRoutes />} >
                    <Route exact path='/empresas/cadastrar/:id' element={<CadastrarEmpresa />} />
                </Route>

                {/* Colaboradores */}
                <Route exact path="/colaboradores" element={<PrivateRoutes />} >
                    <Route exact path='/colaboradores' element={<ListarColaboradores />} />
                </Route>
                <Route exact path="/colaboradores/cadastrar" element={<PrivateRoutes />} >
                    <Route exact path='/colaboradores/cadastrar' element={<CadastrarColaboradores />} />
                </Route>
                <Route exact path="/colaboradores/cadastrar/:id" element={<PrivateRoutes />} >
                    <Route exact path='/colaboradores/cadastrar/:id' element={<CadastrarColaboradores />} />
                </Route>

                {/* Equipamentos */}
                <Route exact path="/equipamentos" element={<PrivateRoutes />} >
                    <Route exact path='/equipamentos' element={<ListarEquipamentos />} />
                </Route>
                <Route exact path="/equipamentos/cadastrar" element={<PrivateRoutes />} >
                    <Route exact path='/equipamentos/cadastrar' element={<CadastrarEquipamentos />} />
                </Route>
                <Route exact path="/equipamentos/cadastrar/:id" element={<PrivateRoutes />} >
                    <Route exact path='/equipamentos/cadastrar/:id' element={<CadastrarEquipamentos />} />
                </Route>

                {/* Filiais */}
                <Route exact path="/filiais" element={<PrivateRoutes />} >
                    <Route exact path='/filiais' element={<ListarFiliais />} />
                </Route>

                <Route exact path="/filiais/cadastrar" element={<PrivateRoutes />} >
                    <Route exact path='/filiais/cadastrar' element={<CadastrarFiliais />} />
                </Route>
                <Route exact path="/filiais/cadastrar/:id" element={<PrivateRoutes />} >
                    <Route exact path='/filiais/cadastrar/:id' element={<CadastrarFiliais />} />
                </Route>

            </Routes>
        </Router>
    )
}

export default AppRoutes;