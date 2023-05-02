import Image from 'next/image';
import { SearchIcon } from '../../components/SearchBar/material';
import styles from './index.module.scss';
import StrSvg from '@/components/StrSvg';
import StrIcon from '../StrIcon';
import { useEffect } from 'react';
import { Input, Modal } from '@douyinfe/semi-ui';
import clsx from 'clsx';

interface SearchProps {
  placeholder?: string;
  children?: React.ReactNode;
  searchValue: string;
  modalVisible: boolean;
  onSearchValueChange: (value: string) => void;
  onModalVisibleChange: (visible: boolean) => void;
  handleInputEnter: () => void;
}

const Search = (props: SearchProps) => {
  const {
    placeholder = '搜索...',
    children,
    searchValue,
    modalVisible,
    onSearchValueChange,
    onModalVisibleChange,
    handleInputEnter,
  } = props;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === '/') {
        event.preventDefault(); // 阻止默认行为，例如搜索栏中的输入
        onModalVisibleChange(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleModalCancel = () => {
    onModalVisibleChange(false);
  };

  return (
    <>
      <div className={styles.search} onClick={() => onModalVisibleChange(true)}>
        <div className={styles.searchLeft}>
          <StrSvg svgString={SearchIcon} />
          <div className={clsx({ [styles.placeholder]: true })}>
            {placeholder}
          </div>
        </div>
        <div className={styles.searchRight}>
          <StrIcon>/</StrIcon>
        </div>
      </div>
      <Modal
        width={'calc(100% - 350px)'}
        style={{ marginTop: '10px !important', padding: '0 !important' }}
        visible={modalVisible}
        onCancel={handleModalCancel}
        closable={false}
        footer={null}
        className={styles.searchModal}
      >
        <div className={styles.inputContainer}>
          <Input
            tabIndex={0}
            className={styles.searchInput}
            prefix={<StrSvg svgString={SearchIcon} />}
            value={searchValue}
            onChange={(e) => onSearchValueChange(e)}
            showClear
            onEnterPress={handleInputEnter}
          />
        </div>

        <div>{children}</div>
      </Modal>
    </>
  );
};

export default Search;
