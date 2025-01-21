import Table from 'cli-table3';
import { getClient } from './libs/client';

export async function list(page: number = 1, pageSize: number = 100) {
  const res = await getCodes(page, pageSize);

  const table = new Table({
    head: ['id', 'code', 'files', 'retrieves', 'createdAt']
  });

  res.list.forEach(code => {
    table.push([code.id, code.code, code.files, code.retrieves, code.createdAt]);
  });

  const totalPage = Math.ceil(res.total / pageSize);

  console.log(table.toString());
  console.log(`Page: ${page}/${totalPage} Total: ${res.total}`);
}

async function getCodes(page: number = 1, pageSize: number = 100) {
  const client = getClient();
  const codes = await client.code.codeList({
    pageSize,
    page
  });

  if (codes.error) {
    throw new Error(codes.error.message);
  }

  return codes.data.data;
}
