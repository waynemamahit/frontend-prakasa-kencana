import { UserOutlined } from '@ant-design/icons';
import { Avatar, Card, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';

export default function ScheduleTable({
  dataColumn,
  dataSource,
}: {
  dataColumn: ColumnsType<any>;
  dataSource: any[];
}) {
  const columns: ColumnsType<any> = [
    {
      title: 'Employees',
      dataIndex: 'name',
      fixed: 'left',
      width: 200,
      render: (value: any) => (
        <>
          <Avatar icon={<UserOutlined />} style={{ marginRight: 10 }} />
          {value}
        </>
      ),
    },
    ...dataColumn,
  ];

  return (
    <Table
      bordered
      dataSource={dataSource}
      columns={columns}
      pagination={{ pageSize: 10 }}
    />
  );
}
