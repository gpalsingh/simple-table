import React from 'react';

type addTableCellType = {
  table: any,
  x: number,
  y: number,
  data: any,
  flipped: boolean
}

export const addTableCell = ({table, x, y, data, flipped}: addTableCellType) => {
  if (flipped) {
    table[y][x] = data;
    return;
  }
  table[x][y] = data;
}

export const wrapRowsInTr = (table: any) => {
  for (let i = 0; i < table.length; i++) {
    table[i] = <tr key={"tablerow" + i.toString()}>{table[i]}</tr>;
  }
}

export const createTable = (x: number, y: number) => {
  /* Create x by y 2D array */
  let table: any = [];
  for (let i = 0; i < x; i++) {
    table.push([]);
    for (let j = 0; j < y; j++) {
      table[i].push([]);
    }
  }

  return table;
}