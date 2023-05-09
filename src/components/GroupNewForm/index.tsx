import { Button, Form, Spin } from '@douyinfe/semi-ui';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { AddMaterialParmas } from '@/api/types/material';
import styles from './index.module.scss';
import clsx from 'clsx';
import { addMaterial } from '@/api/material';
import { NoticeSuccess, ToastSuccess } from '@/utils/common';
import { MarkdownEditor } from '../Markdown';
import { useRouter } from 'next/router';
import { newGroup } from '@/api/group';

const { Input } = Form;

export default function GroupNewForm() {
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();
  const handleSubmit = async (values: AddMaterialParmas) => {
    const data = {
      ...values,
      description,
    };
    console.info('handleSubmit', data);
    setLoading(true);
    newGroup(data)
      .then((res) => {
        const groupId = res.data.id;
        const groupName = res.data.name;
        push(`/group/${groupId}`);
        NoticeSuccess('添加成功', groupName);
      })
      .catch()
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Form onSubmit={(values) => handleSubmit(values)} style={{ width: '70%' }}>
      {({ formState, values, formApi }) => (
        <>
          <div className={styles.inputContainer}>
            <Input
              field='name'
              label={{ text: '分组名称', required: true }}
              placeholder='输入分组名称'
              className={styles.input}
            ></Input>
            <Button type='primary' theme='solid' htmlType='submit'>
              发布
            </Button>
          </div>

          <div className={styles.formDescriptionItem}>
            <div className={clsx(styles.formItemRequired, styles.required)}>
              描述
            </div>
            <MarkdownEditor value={description} setValue={setDescription} />
          </div>
          <div>{loading && <Spin />}</div>
        </>
      )}
    </Form>
  );
}
