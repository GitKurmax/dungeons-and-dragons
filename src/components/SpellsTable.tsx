import React, {useEffect, useState} from 'react'
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Spell} from '../types/types'
import {fetchData} from '../utils'
import {Routes} from '../api'

interface TablePaginationActionsProps {
    count: number;
    page: number;
    rowsPerPage: number;
    onPageChange: (
        event: React.MouseEvent<HTMLButtonElement>,
        newPage: number,
    ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (
        event: React.MouseEvent<HTMLButtonElement>,
    ) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}

type TableDataType = {
    index: string,
    name: string,
}

function createData(index: string, name: string): TableDataType {
    return { index, name };
}

type SpellsProps = {
    data: Spell[]
}

function SpellsTable(props: SpellsProps) {
    const {data} = props
    const tData = createTableData(data)
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [tableData, setTableData] = useState(tData)
    const [detailsHeight, setDetailsHeight] = useState<string>('0px')
    const [details, setDetails] = useState<object>({})
    const [detailsIndex, setDetailsIndex] = useState<string>('')
    const [detailsOpen, setDetailsOpen] = useState<boolean>(false)

    useEffect(() => {
        const tData = data.map(item => {
            return createData(item.index, item.name)
        })
        setTableData(tData)
    }, [data.length])

    function createTableData (data: any): any {
        return data.map((item: any) => {
            return createData(item.index, item.name)
        })
    }

    // Avoid a layout jump when reaching the last page with empty rows.
    // const emptyRows =
    //     page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const showTableData =  () =>  {
        return  tableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    }

    const showDetails = async (route: string) => {
        const spellDetails = await fetchData(`${Routes.SPELLS}/${route}`)
        setDetailsHeight(detailsHeight === '100px' ? '0px' : '100px')
        setDetailsIndex(route)
        setDetails(spellDetails)
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0
                            ? showTableData()
                            : tableData
                    ).map((row: TableDataType) => (
                        <>
                            <TableRow key={row.name}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell style={{ width: 160 }} align="right">
                                    <ExpandMoreIcon
                                        sx={{}}
                                        onClick={() => showDetails(row.index)}/>
                                </TableCell>
                            </TableRow>
                            <TableRow sx={{
                              textAlign: 'center',
                                width: '100%',
                            }}>
                                <Box sx={{
                                    textAlign: 'center',
                                    margin: 'auto',
                                    maxHeight: detailsHeight,
                                    width: '100%',
                                    overflowY: 'hidden',
                                    transition: 'max-height 0.5s ease-out'
                                }}>
                                    {detailsIndex === row.index && <Box>{JSON.stringify(details)}</Box>}
                                </Box>
                            </TableRow>
                        </>

                    ))}
                    {/*{emptyRows > 0 && (*/}
                    {/*    <TableRow style={{ height: 53 * emptyRows }}>*/}
                    {/*        <TableCell colSpan={6} />*/}
                    {/*    </TableRow>*/}
                    {/*)}*/}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                            colSpan={3}
                            count={tableData.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: {
                                    'aria-label': 'rows per page',
                                },
                                native: true,
                            }}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
}

export default SpellsTable