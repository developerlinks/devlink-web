import { Button, Dropdown, Form, Spin } from '@douyinfe/semi-ui';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { AddMaterialParmas } from '@/api/types/material';
import styles from './index.module.scss';
import clsx from 'clsx';
import FormSide from './FormSide';
import { addMaterial } from '@/api/material';
import { ToastSuccess } from '@/utils/common';
import { MarkdownEditor } from '../Markdown';
import { useRouter } from 'next/router';
import { IconBulb } from '@douyinfe/semi-icons';
import { textPolisher } from '@/api/ai';

const { Input } = Form;

export default function NewForm() {
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [formSideVisible, setFormSideVisible] = useState(false);
  const [aiIsLoading, setAiIsLoading] = useState(false);
  const [aiResultVisible, setAiResultVisible] = useState(false);
  const [aiResult, setAiResult] = useState('');
  const { push } = useRouter();
  const handleSubmit = async (values: AddMaterialParmas) => {
    const data = {
      ...values,
      description,
    };
    setLoading(true);
    addMaterial(data)
      .then((res) => {
        const materialId = res.data.id;
        push(`/material/${materialId}`);
        ToastSuccess('添加成功');
      })
      .catch()
      .finally(() => {
        setLoading(false);
      });
  };

  const textPolisherHandle = (text: string) => {
    setAiIsLoading(true);
    textPolisher({ text })
      .then((data) => {
        setAiResult(data.data.text);
        setAiResultVisible(true);
      })
      .catch(() => {})
      .finally(() => {
        setAiIsLoading(false);
      });
  };

  const aiDropDownHandle = (formApi) => {
    formApi.setValues({ name: aiResult });
    setAiResultVisible(false);
  };

  return (
    <Form onSubmit={(values) => handleSubmit(values)} style={{ width: '70%' }}>
      {({ formState, values, formApi }) => (
        <>
          <div className={styles.inputContainer}>
            <Dropdown
              position={'bottomLeft'}
              trigger='custom'
              visible={aiResultVisible}
              render={
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => aiDropDownHandle(formApi)}>
                    {aiResult}
                  </Dropdown.Item>
                </Dropdown.Menu>
              }
            >
              <Input
                field='name'
                label={{ text: '物料名称', required: true }}
                placeholder='输入物料名称'
                className={styles.input}
                suffix={
                  <Button
                    onClick={() => textPolisherHandle(values.name)}
                    loading={aiIsLoading}
                    icon={<IconBulb />}
                  />
                }
              ></Input>
            </Dropdown>

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
