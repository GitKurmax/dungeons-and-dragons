import React, {useEffect, useState} from 'react'
import {useTheme} from '@mui/material/styles';
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
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {Details, Spell} from '../types/types'
import {fetchData} from '../utils'
import {Routes} from '../api'
import RowDetails from "./RowDetails";
import {Switch} from "@mui/material";
import TransitionsModal from "./Modal";

type TableDataType = {
    index: string,
    name: string,
}

type SpellsProps = {
    data: Spell[]
}

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
    const {count, page, rowsPerPage, onPageChange} = props;

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
        <Box sx={{flexShrink: 0, ml: 2.5}}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon/> : <FirstPageIcon/>}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight/> : <KeyboardArrowLeft/>}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft/> : <KeyboardArrowRight/>}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon/> : <LastPageIcon/>}
            </IconButton>
        </Box>
    );
}

function createData(index: string, name: string): TableDataType {
    return {index, name};
}

function SpellsTable(props: SpellsProps) {
    const {data} = props
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);
    const [tableData, setTableData] = useState<TableDataType[]>([])
    const [details, setDetails] = useState<{ [key: string]: object }>({})
    const [detailsOpen, setDetailsOpen] = useState<string[]>([])
    const [favoriteIndex, setFavotiteIndex] = useState<string[]>([])
    const [showFavorite, setShowFavorite] = useState<boolean>(false)
    const [checked, setChecked] = useState(false);
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [spellDetailIndex, setSpellDetailIndex] = useState<string>('')

    useEffect(() => {
        const tData = data.map(item => {
            return createData(item.index, item.name)
        })
        setTableData(tData)
    }, [data, data.length])

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tableData.length) : 0;

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage)
        setDetails({})
        setDetailsOpen([])
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const showTableData = () => {
        if (showFavorite) {
            return tableData
                .filter(item => favoriteIndex.includes(item.index))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        }

        return tableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    }

    const showDetails = async (route: string) => {
        if (!details[route]) {
            const spellDetails = await fetchData(`${Routes.SPELLS}/${route}`)
            setDetails({...details, [route]: spellDetails})
        }

        addRemoveIndex(detailsOpen, setDetailsOpen, route)
    }

    const addRemoveIndex = (indexArray: string[], setNewData: (arg: string[])=> void, index: string) => {
        let newIndexArray
        if (indexArray.includes(index)) {
            newIndexArray = indexArray.filter(i => i !== index)
        } else {
            newIndexArray = [...indexArray, index]
        }

        setNewData(newIndexArray)
        return newIndexArray
    }

    const handleFavorite = (index: string) => {
        const newFavoriteIndex = addRemoveIndex(favoriteIndex, setFavotiteIndex, index)

        if (!newFavoriteIndex.length) {
            setShowFavorite(false)
            setChecked(false)
        }
    }

    const handleSwitch = () => {
        if (!checked) {
            setShowFavorite(true)
            setPage(0)
        } else {
            setShowFavorite(false)
        }
        setChecked(!checked)
    }

    const handleOpenModal = (index: string) => {
        return (open: boolean) => {
            setSpellDetailIndex(index)
            setOpenModal(open)
        }
    }

    return (
        <>
            {tableData.length && (
                <>
                    <TableContainer component={Paper} sx={styles.tableContainer}>
                        <Table sx={{minWidth: 250}} aria-label="custom pagination table">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{
                                        ...styles.headerTitle,
                                        ...styles.favoriteCell
                                    }} align="left">
                                        Favorite
                                        <Switch
                                            disabled={Boolean(!favoriteIndex.length)}
                                            checked={checked}
                                            onChange={handleSwitch}
                                            color={'secondary'}
                                        />
                                    </TableCell>
                                    <TableCell sx={{
                                        ...styles.headerTitle,
                                        ...styles.spellTitleCell
                                    }} align={'left'}>Spell</TableCell>
                                    <TableCell align="right" sx={{width: '60px'}}></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {(rowsPerPage > 0
                                        ? showTableData()
                                        : tableData
                                ).map((row: TableDataType) => (
                                    <React.Fragment key={row.index}>
                                        <TableRow sx={{
                                            '& .MuiTableCell-root:nth-of-type(2)': {
                                                fontSize: detailsOpen.includes(row.index) ? '24px' : '16px',
                                            },
                                            '&:hover .MuiTableCell-root:nth-of-type(2)': {
                                                fontSize: '28px',
                                            },
                                            '@media screen and (max-width: 450px)': {
                                                '& .MuiTableCell-root:nth-of-type(2)': {
                                                    fontSize: detailsOpen.includes(row.index) ? '18px' : '16px',
                                                },
                                                '&:hover .MuiTableCell-root:nth-of-type(2)': {
                                                    fontSize: '18px',
                                                },
                                            }
                                        }}>
                                            <TableCell component="th" scope="row" sx={{
                                                ...styles.rowTitle,
                                                '@media screen and (max-width: 450px)': {
                                                    width: '80px'
                                                }
                                            }}>
                                                {favoriteIndex.includes(row.index) ? (
                                                    <FavoriteIcon color={'secondary'} sx={styles.favorite}
                                                                  onClick={() => handleFavorite(row.index)}/>

                                                ) : (
                                                    <FavoriteBorderIcon color={'secondary'} sx={styles.favorite}
                                                                        onClick={() => handleFavorite(row.index)}/>
                                                )}
                                            </TableCell>
                                            <TableCell component="th" scope="row" sx={styles.rowTitle}>
                                                {row.name}
                                            </TableCell>
                                            <TableCell align="right">
                                                <IconButton onClick={() => showDetails(row.index)}>
                                                    <ExpandMoreIcon color={'secondary'}
                                                                    sx={{
                                                                        transform: detailsOpen.includes(row.index) ? 'rotate(180deg)' : ''
                                                                    }}
                                                    />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow sx={styles.detailsRow}>
                                            <TableCell sx={{border: 'none', padding: 0}} colSpan={3}>
                                                <Box sx={{
                                                    maxHeight: detailsOpen.includes(row.index) ? '1700px' : 0,
                                                    overflowY: 'hidden',
                                                    transition: 'all 0.2s ease-out',
                                                    padding: detailsOpen.includes(row.index) ? '10px 30px' : '0 30px',
                                                    marginLeft: '100px',
                                                    borderLeft: detailsOpen.includes(row.index) ? '1px solid #8a68c850' : '0px solid #8a6c8850',
                                                    borderBottom: detailsOpen.includes(row.index) ? '1px solid #8a68c850' : '0px solid #8a6c8850',
                                                    borderRight: detailsOpen.includes(row.index) ? '1px solid #8a68c850' : '0px solid #8a6c8850',
                                                    borderRadius: '20px',
                                                    '@media screen and (max-width: 650px)': {
                                                        marginLeft: '0',
                                                        padding: detailsOpen.includes(row.index) ? '10px' : '0 10px',
                                                    }
                                                }}>
                                                    {details[row.index] && <RowDetails
                                                        details={details[row.index] as Details}
                                                        openModal={handleOpenModal(row.index)}
                                                    />}
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    </React.Fragment>
                                ))}
                                {emptyRows > 0 && (
                                    <TableRow style={{height: 73 * emptyRows}}>
                                        <TableCell colSpan={6}/>
                                    </TableRow>
                                )}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TablePagination
                                        sx={styles.pagination}
                                        rowsPerPageOptions={[5, 10, 25, {label: 'All', value: -1}]}
                                        colSpan={3}
                                        count={showFavorite ? favoriteIndex.length : tableData.length}
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
                    <TransitionsModal open={openModal} handleOpen={setOpenModal}
                                      detailsObj={details[spellDetailIndex] as Details}/>
                </>
            )}
        </>
    );
}

export default SpellsTable

const styles = {
    tableContainer: {
        maxWidth: 1040,
        margin: 'auto',
        border: 'none'
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 700,
        color: '#9c27b0',
    },
    favoriteCell: {
        width: '160px',
        '@media screen and (max-width: 450px)': {
            width: 'max-content',
            fontSize: '14px',
            display: 'flex',
            flexDirection: 'column'
        }
    },
    spellTitleCell: {
        '@media screen and (max-width: 450px)': {
            verticalAlign: 'top',
            fontSize: '14px'
        }
    },
    rowTitle: {
        fontSize: 18,
        fontWeight: 700,
        fontStyle: 'italic',
        color: '#8a68c8',
    },
    favorite: {
        cursor: 'pointer'
    },
    pagination: {
        color: '#9c27b0',
        '& .MuiButtonBase-root': {
            color: '#9c27b0',
        },
        '& .MuiToolbar-root': {
            flexWrap: 'wrap',
            justifyContent: 'center',
            padding: '0 16px'
        }
    },
    detailsRow: {
        textAlign: 'center',
        width: '100%',
        border: 'none'
    }
}