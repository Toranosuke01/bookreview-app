import Pagination from '@mui/material/Pagination';
import { BooksPaginationProps } from '../types/types';

export const BooksPagination: React.FC<BooksPaginationProps> = ({offset, setOffset}) => {
    const handleChange = (event:React.ChangeEvent<unknown>, value: number) => {
      setOffset((value - 1) * 10);
    };

    return (
      <Pagination count={offset === 0 ? 11 : offset / 10 + 11} color="primary" onChange={handleChange} />
    );
}
