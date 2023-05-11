import moment from 'moment';
import { Material } from '@/api/types/user';
import styles from './index.module.scss';
import { Tag } from '@douyinfe/semi-ui';
import HoverLink from '../HoverLink';
import NpmInstallText from '../NpmInstallText';
import OperationBar from '../OperationBar';
import clsx from 'clsx';
import { MarkdownView } from '../Markdown';
import Comment from '../Comment';
import { CustomTag } from '../CustomTag';

interface MaterialViewProps {
  material: Material;
}

const MaterialView = ({ material }: MaterialViewProps) => {
  return (
    <div className={styles.materiview}>
      <div className={styles.header}>
        <div className={styles.materialInfo}>
          <div className={styles.materialInfoTop}>
            <div className={styles.materialName}>{material.name}</div>
          </div>
          <div className={styles.materialInfobottom}>
            <div className={styles.materialInfobottomLeft}>
              <div className={styles.npmSource}>
                <HoverLink
                  href={`https://www.npmjs.com/package/$${material.npmName}`}
                >
                  仓库地址
                </HoverLink>
              </div>
              <div className={styles.version}>{material.version}</div>

              <div className={styles.creatAt}>
                发布于{moment(material.createdAt).format('lll')}
              </div>
              <div className={styles.updateAt}>
                {moment(material.createdAt).startOf('hour').fromNow()}更新
              </div>
            </div>
            <div className={styles.materialOperation}>
              <NpmInstallText text={`devlink install ${material.npmName}`} />
            </div>
          </div>
          <div className={styles.tags}>
            {material.tags.map((tag, index) => (
              <CustomTag size='small' key={tag.id} href={`/tag/${tag.id}`}>
                {tag.name}
              </CustomTag>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.materialDescription}>
        <div className={styles.materialDescriptionContent}>
          <MarkdownView value={material.description} />
        </div>
      </div>
      <OperationBar material={material} />
      <div className={styles.commentContainer}>
        <Comment />
      </div>
    </div>
  );
};

export default MaterialView;
