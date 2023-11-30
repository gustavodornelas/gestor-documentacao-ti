import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add'; // Ícone para o botão "Cadastrar"
import EditIcon from '@mui/icons-material/Edit'; // Ícone para o botão "Editar"
import { visuallyHidden } from '@mui/utils';


function comparadorDescendente(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparador(ordem, ordenacao) {
  return ordem === 'desc'
    ? (a, b) => comparadorDescendente(a, b, ordenacao)
    : (a, b) => -comparadorDescendente(a, b, ordenacao);
}

function classificacaoEstavel(array, comparador) {
  const estabilizado = array.map((el, index) => [el, index]);
  estabilizado.sort((a, b) => {
    const ordem = comparador(a[0], b[0]);
    if (ordem !== 0) {
      return ordem;
    }
    return a[1] - b[1];
  });
  return estabilizado.map((el) => el[0]);
}

function gerarChavesPeloObjeto(dados) {
  const chaves = Object.keys(dados[0]).map(key => ({
    id: key,
    numeric: typeof dados[key] === 'number',
    disablePadding: false,
    label: key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ')
  }));

  return chaves;
}

function CabecalhoTabela(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, chaves } = props;
  
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'selecionar todos os itens',
            }}
          />
        </TableCell>
        {chaves.map((headCell) => (
          headCell.id !== 'id' ?
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'ordenado descendente' : 'ordenado ascendente'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell> : null
        ))}
      </TableRow>
    </TableHead>
  );
}

CabecalhoTabela.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function BarraSuperior(props) {
  const { numSelected: numSelecionados, titulo, onEdit, onAdd, onDelete } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelecionados > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelecionados > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelecionados} selecionados
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {titulo}
        </Typography>
      )}

      <div>
        
      </div>

      {numSelecionados === 1 ? (
        <div>
          <Tooltip title="Editar">
            <IconButton onClick={onEdit}>
              <EditIcon />
            </IconButton>
          </Tooltip>
        </div>
      ) : null}

      {numSelecionados === 0 ? (
        <Tooltip title="Cadastrar">
          <IconButton onClick={onAdd}>
            <AddIcon />
          </IconButton>
        </Tooltip>
      ) : (
      <Tooltip title="Excluir">
        <IconButton onClick={onDelete}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      )}

      <div>
        <Tooltip title="Filtrar lista">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      </div>
    </Toolbar>
  );
}

BarraSuperior.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function Tabela({ dados, titulo, onEdit, onAdd, onDelete }) {

  const chaves = gerarChavesPeloObjeto(dados);

  const [ordem, setOrdem] = React.useState('asc');
  const [ordenacao, setOrdenacao] = React.useState('calories');
  const [selecionado, setSelecionado] = React.useState([]);
  const [pagina, setPagina] = React.useState(0);
  const [densidade, setDensidade] = React.useState(false);
  const [linhasPorPagina, setLinhasPorPagina] = React.useState(5);

  const handleEdit = () => {
    // Chame a função onEdit passando o array selecionado
    onEdit(selecionado);
  };

  const handleDelete = () => {
    // Chame a função onDelete passando o array selecionado
    onDelete(selecionado);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = ordenacao === property && ordem === 'asc';
    setOrdem(isAsc ? 'desc' : 'asc');
    setOrdenacao(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = dados.map((n) => n.id);
      setSelecionado(newSelected);
      return;
    }
    setSelecionado([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selecionado.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selecionado, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selecionado.slice(1));
    } else if (selectedIndex === selecionado.length - 1) {
      newSelected = newSelected.concat(selecionado.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selecionado.slice(0, selectedIndex),
        selecionado.slice(selectedIndex + 1),
      );
    }
    setSelecionado(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPagina(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setLinhasPorPagina(parseInt(event.target.value, 10));
    setPagina(0);
  };

  const handleChangeDense = (event) => {
    setDensidade(event.target.checked);
  };

  const isSelected = (id) => selecionado.indexOf(id) !== -1;

  // Evitar salto de layout ao chegar na última página com linhas vazias.
  const linhasVazias =
    pagina > 0 ? Math.max(0, (1 + pagina) * linhasPorPagina - dados.length) : 0;

  const linhasVisiveis = React.useMemo(
    () =>
      classificacaoEstavel(dados, getComparador(ordem, ordenacao)).slice(
        pagina * linhasPorPagina,
        pagina * linhasPorPagina + linhasPorPagina,
      ),
    [dados, ordem, ordenacao, pagina, linhasPorPagina],
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <BarraSuperior 
          numSelected={selecionado.length}
          titulo={titulo} 
          onAdd={onAdd}
          onEdit={handleEdit}
          onDelete={handleDelete}
          />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={densidade ? 'small' : 'medium'}
          >
            <CabecalhoTabela
              numSelected={selecionado.length}
              order={ordem}
              orderBy={ordenacao}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={dados.length}
              chaves={chaves}
            />
            <TableBody>
              {linhasVisiveis.map((linha, index) => {
                const isItemSelected = isSelected(linha.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, linha.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={linha.id}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>

                    {chaves.map((chave) => (
                      chave.id !== 'id' ? 
                      <TableCell key={chave.id} align="left">
                        {linha[chave.id]}
                      </TableCell>
                      : null
                    ))}
                  </TableRow>
                );
              })}
              {linhasVazias > 0 && (
                <TableRow
                  style={{
                    height: (densidade ? 33 : 53) * linhasVazias,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={dados.length}
          rowsPerPage={linhasPorPagina}
          page={pagina}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={densidade} onChange={handleChangeDense} />}
        label="Espaçamento denso"
      />
    </Box>
  );
}
