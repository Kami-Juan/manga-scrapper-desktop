import moment from 'moment';

const formatDate = (date) => moment(date).format('YYYY/MM/DD');

export { formatDate };
