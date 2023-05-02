import { Button, Form, Spin } from '@douyinfe/semi-ui';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { AddMaterialParmas } from '@/api/types/material';
import styles from './index.module.scss';
import clsx from 'clsx';
import FormSide from './FormSide';
import { addMaterial } from '@/api/material';
import { ToastSuccess } from '@/utils/common';
import { MarkdownEditor } from '../Markdown';

const { Input } = Form;

export default function NewForm() {
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [formSideVisible, setFormSideVisible] = useState(false);
  const handleSubmit = async (values: AddMaterialParmas) => {
    // let description = document.querySelector('.markdown-body')
    //   ?.innerHTML as string;
    // description = description.slice(0, description.length - 9);

    const data = {
      ...values,
      description,
    };
    console.info('handleSubmit', data);
    setLoading(true);
    addMaterial(data)
      .then((res) => {
        // TODO: 跳转到详情页
        ToastSuccess('添加成功');
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
              label={{ text: '物料名称', required: true }}
              placeholder='输入物料名称'
              className={styles.input}
            ></Input>
            <Input
              field='npmName'
              label={{ text: 'npm 包名', required: true }}
              placeholder='输入npm 包名'
              className={styles.input}
            ></Input>
            <Input
              field='version'
              label={{ text: 'npm 包版本', required: true }}
              className={styles.input}
              placeholder='输入npm 包版本'
            ></Input>
            <Button
              type='primary'
              theme='solid'
              onClick={() => setFormSideVisible(true)}
            >
              发布
            </Button>
          </div>

          <div className={styles.formDescriptionItem}>
            <div className={clsx(styles.formItemRequired, styles.required)}>
              描述
            </div>
            <MarkdownEditor value={description} setValue={setDescription} />
          </div>
          <FormSide
            values={values}
            visible={formSideVisible}
            setFormSideVisible={setFormSideVisible}
            onSubmit={handleSubmit}
          />
          <div>{loading && <Spin />}</div>
        </>
      )}
    </Form>
  );
}
