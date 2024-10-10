import { useState } from 'react';
import { getNormalizedText } from '../../utils/strings';

const scheduleFilter = ({ filter, rows, setFilteredRows, timeouts }) => {
  // Do NOT filter while User actively types
  // TODO: Create global timeout singleton or similar concept to schedule timeouts anywhere and clear all when needed
  timeouts.map((timeout) => clearTimeout(timeout));

  timeouts.push(
    setTimeout(() => {
      filterRows({ filter, rows, setFilteredRows });
    }, 333),
  );
};

const filterRows = ({ filter, rows, setFilteredRows }) => {
  const filteredRows = rows.filter((row) => {
    return row.some((cell) => {
      // If cell is string filter it unless it has the filter value
      if (typeof cell === 'string') {
        return getNormalizedText(cell).includes(getNormalizedText(filter));
      }

      // If cell is not string filter it
      return false;
    });
  });

  setFilteredRows(filteredRows);
};

const timeouts = [];
const Table = ({ headers, rows, minCellHeight = 'md', showSearch = true }) => {
  const [filter, setFilter] = useState('');
  const [filteredRows, setFilteredRows] = useState();

  return (
    <div>
      {showSearch && (
        <input
          className="tableSearch"
          value={filter}
          type="text"
          placeholder="Search by any text field"
          onChange={({ target }) => {
            setFilter(target.value);
            scheduleFilter({
              filter: target.value,
              rows,
              setFilteredRows,
              timeouts,
            });
          }}
        />
      )}

      <div className="table">
        {headers.map((header, columnIndex) => (
          <div className="tableColumn" key={columnIndex}>
            <div className="tableHeaderCell">{header}</div>

            <div className="tableRow">
              {(filteredRows ? filteredRows : rows).map((row, rowIndex) => (
                <div key={rowIndex} className={`tableCell ${minCellHeight}`}>
                  {/* &nbsp; below is important!
                It makes empty cells match padding of siblings with content
                Remove at your own peril
                */}
                  {row[columnIndex] || <>&nbsp;</>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Table;
