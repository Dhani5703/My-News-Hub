import React, { useState, useEffect } from 'react';
import { useTable, useSortBy } from 'react-table';
import dataFile from '../../src/datas/table.json'; 
import '../styles/Table.css';

const TableComponent = () => {
  const [filter, setFilter] = useState('');
  const [filteredData, setFilteredData] = useState(dataFile.data); 

  // 필터 상태가 변경될 때마다 필터링된 데이트를 업데이트
  useEffect(() => {
    if (filter) {
      //필터가 설정된 경우 주소에 필터 문자열이 포함된 데이터만 설정
      setFilteredData(dataFile.data.filter(row => row.address.includes(filter)));
    } else {
      //필터가 설정되지 않은 경우 전체 데이터를 설정
      setFilteredData(dataFile.data);
    }
  }, [filter]);

  //테이블 정의
  const columns = React.useMemo(
    () => [
      {
        Header: '이름',
        accessor: 'name',
        disableSortBy: true // 정렬 비활성화
      },
      {
        Header: '나이',
        accessor: 'age',
        sortType: 'basic'

      },
      {
        Header: '주소',
        accessor: 'address',
        disableSortBy: true // 정렬 비활성화
      }
    ],
    []
  );

  //테이블 속성 가져오기
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { sortBy }
  } = useTable(
    {
      columns,
      data: filteredData,
      initialState: {
        sortBy: [
          {
            id: 'age',
            desc: true
          }
        ]
      }
    },
    useSortBy
  );

  return (
    <div>
      <div className="filter-container">
        <label htmlFor="region">지역:</label>
        <select id="region" onChange={(e) => setFilter(e.target.value)}>
          <option value="">전체</option>
          <option value="서울특별시">서울특별시</option>
          <option value="경기도">경기도</option>
          <option value="부산광역시">부산광역시</option>
        </select>
      </div>
      <table {...getTableProps()} className="table">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  {column.id === 'age' && (
                    <span>
                     {sortBy.length > 0 && sortBy[0].id === column.id ? (
                       sortBy[0].desc ? ' 🔽' : ' 🔼'
                      ) : ' 🔽'}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
